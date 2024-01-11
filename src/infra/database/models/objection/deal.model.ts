import { Model, ModelObject } from 'objection';
import { IDealObjectionModel } from '@/data/models/sql/deal/IDealObjectionModel';
import knex from '../../postgres/knex';
import UserModel from './user.model';

const DEAL_TABLE = 'deals';
const USER_TABLE = 'users';
Model.knex(knex)

interface DealModel extends IDealObjectionModel, Model {}

class DealModel extends Model {
  static tableName = DEAL_TABLE;
  static idColumn = 'id';

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DEAL_TABLE}.userId`,
          to: `${USER_TABLE}.id`,
        }
      }
    }
  }
}

export default DealModel;
export type Deal = ModelObject<DealModel>