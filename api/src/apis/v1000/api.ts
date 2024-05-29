import { GearApi } from '../../GearApi.ts';
import { V1000Message } from './message.ts';
import { V1000Program } from './program.ts';

export class VaraApiV1000 extends GearApi {
  public declare program: V1000Program;
  public declare message: V1000Message;
}
