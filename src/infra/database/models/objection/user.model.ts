import { Model, ModelObject } from 'objection';
import { IUserObjectionModel } from '@/data/models/sql/user/IUserObjectionModel';
import knex from '../../postgres/knex';
import BtcModel from './btc.model';

const USER_TABLE = 'users';
const BTC_TABLE = 'btcs';
Model.knex(knex)

interface UserModel extends IUserObjectionModel, Model {}

class UserModel extends Model {
  static tableName = USER_TABLE;
  static idColumn = 'id';

  static get relationMappings() {
    return {
      btc: {
        relation: Model.HasManyRelation,
        modelClass: BtcModel,
        join: {
          from: `${USER_TABLE}.id`,
          to: `${BTC_TABLE}.userId`
        }
      }
    }
  }
}

export default UserModel;
export type User = ModelObject<UserModel>