import { Module } from '@nestjs/common';
import { GearNodeModule } from 'src/gear-node/gear-node.module';
import { HttpRpcMethods } from './rpc.methods';
import { RpcController } from './rpc.controller';
import { HttpRpcMessageHandler } from './rpc.handler';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProgramsModule } from 'src/programs/programs.module';
import { EventsModule } from 'sample-polkadotjs-typegen/events/events.module';

@Module({
  imports: [
    GearNodeModule,
    UsersModule,
    AuthModule,
    ProgramsModule,
    EventsModule,
  ],
  providers: [HttpRpcMessageHandler, HttpRpcMethods],
  controllers: [RpcController],
})
export class RpcModule {}