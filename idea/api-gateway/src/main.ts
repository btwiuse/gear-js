import { RMQService } from './rmq';
import { Server, changeStatus } from './server';

const bootstrap = async () => {
  const rmq = new RMQService();
  await rmq.init();

  changeStatus();

  const server = new Server(rmq);

  await rmq.runScheduler();

  server.run();
};

bootstrap();
