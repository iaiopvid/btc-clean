import { Model, ModelObject } from 'objection';
import { IBtcObjectionModel } from '@/data/models/sql/btc/IBtcObjectionModel';
import knex from '../../postgres/knex';
import UserModel from './user.model';

const BTC_TABLE = 'btcs';
const USER_TABLE = 'users';
Model.knex(knex)

interface BtcModel extends IBtcObjectionModel, Model {}

class BtcModel extends Model {
  static tableName = BTC_TABLE;
  static idColumn = 'id';

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${BTC_TABLE}.userId`,
          to: `${USER_TABLE}.id`,
        }
      }
    }
  }
}

export default BtcModel;
export type Btc = ModelObject<BtcModel>