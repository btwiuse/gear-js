import { Channel, connect, Connection } from 'amqplib';
import {
  FormResponse,
  RMQServices,
  META_STORAGE_METHODS,
  META_STORAGE_INTERNAL_METHODS,
  INDEXER_INTERNAL_METHODS,
  logger,
  RMQExchange,
  RMQQueue,
} from '@gear-js/common';

import config from './config';
import { MetaService } from './service';

export class RMQService {
  private channel: Channel;
  private indxrChannel: Channel;
  private connection: Connection;
  private methods: Record<META_STORAGE_METHODS | META_STORAGE_INTERNAL_METHODS, (params: any) => Promise<any>>;

  constructor(private metaService: MetaService) {
    this.methods = {
      [META_STORAGE_METHODS.META_ADD]: this.metaService.addMetaDetails.bind(this.metaService),
      [META_STORAGE_METHODS.META_GET]: this.metaService.get.bind(this.metaService),
      [META_STORAGE_METHODS.SAILS_ADD]: this.metaService.addIdl.bind(this.metaService),
      [META_STORAGE_METHODS.SAILS_GET]: this.metaService.getIdl.bind(this.metaService),
      [META_STORAGE_INTERNAL_METHODS.META_HASH_ADD]: this.metaService.addMeta.bind(this.metaService),
    };
  }

  public async init(): Promise<void> {
    this.connection = await connect(config.rmq.url);

    try {
      this.channel = await this.connection.createChannel();

      await this.setupMsgConsumer();
      await this.setupIndxrExchange();

      this.connection.on('close', (error) => {
        logger.error('RabbitMQ connection closed', { error });
        process.exit(1);
      });
    } catch (error) {
      logger.error('Failed to setup rabbitmq exchanges', { error, stack: error.stack });
      throw error;
    }
  }

  private async setupIndxrExchange() {
    this.indxrChannel = await this.connection.createChannel();
    this.indxrChannel.assertExchange(RMQExchange.INDXR_META, 'fanout', { autoDelete: true });
  }

  private sendMsg(exchange: RMQExchange, queue: RMQQueue, params: any, correlationId?: string, method?: string): void {
    const messageBuff = JSON.stringify(params);
    this.channel.publish(exchange, queue, Buffer.from(messageBuff), { correlationId, headers: { method } });
  }

  private sendMsgToIndxrTopic(params: any, method: string) {
    const msgBuf = Buffer.from(JSON.stringify(params));
    this.indxrChannel.publish('indxr_meta', '', msgBuf, { headers: { method } });
  }

  private async setupMsgConsumer(): Promise<void> {
    await this.channel.assertExchange(RMQExchange.DIRECT_EX, 'direct');
    const q = await this.channel.assertQueue(RMQServices.META_STORAGE, {
      durable: true,
      exclusive: false,
      autoDelete: false,
    });
    await this.channel.bindQueue(q.queue, RMQExchange.DIRECT_EX, RMQServices.META_STORAGE);
    try {
      await this.channel.consume(
        q.queue,
        async (msg) => {
          if (!msg) {
            return;
          }
          const method = msg.properties.headers.method;

          const params = JSON.parse(msg.content.toString());
          const correlationId = msg.properties.correlationId;

          try {
            const result = await this.handleIncomingMsg(method, params);

            this.sendMsg(RMQExchange.DIRECT_EX, RMQQueue.REPLIES, result, correlationId);
          } catch (error) {
            logger.error('Failed to handle incoming message', { error: error.message, stack: error.stack });
          }
        },
        { noAck: true },
      );
    } catch (error) {
      logger.error('Direct exchange consumer error.', { error, stack: error.stack });
    }
  }

  @FormResponse
  private async handleIncomingMsg(
    method: META_STORAGE_METHODS | META_STORAGE_INTERNAL_METHODS,
    params: any,
  ): Promise<any> {
    const result = await this.methods[method](params);

    if (META_STORAGE_METHODS.META_ADD === method) {
      if (result.hasState === true) {
        this.sendMsgToIndxrTopic([result.hash], INDEXER_INTERNAL_METHODS.META_HAS_STATE);
      }
      return { hash: result.hash, hex: result.hex };
    } else if (META_STORAGE_INTERNAL_METHODS.META_HASH_ADD === method) {
      if (result.length > 0) {
        this.sendMsgToIndxrTopic(result, INDEXER_INTERNAL_METHODS.META_HAS_STATE);
      }
    }
    return result;
  }
}
