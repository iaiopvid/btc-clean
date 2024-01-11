import { ObjectId } from 'mongodb';

export type BaseDocumentMongoDbType = {
  _id?: ObjectId;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  __v?: number;
  updatedBy?: number;
};

export interface LogicalDeleteSubDocumentMongoDbType {
  isDeleted: boolean;
  updateHistory: LogicalDeleteSubDocumentUpdateHistoryDocument[];
  createdAt?: Date | number;
  updatedAt?: Date | number;
}

interface LogicalDeleteSubDocumentUpdateHistoryDocument {
  updatedBy: number;
  action: LogicalDeleteSubDocumentUpdateHistoryDocumentActionKeys;
  createdAt?: Date | number;
  updatedAt?: Date | number;
}

export enum LogicalDeleteSubDocumentUpdateHistoryDocumentActionKeys {
  DELETE = 'DELETE',
  REVERT = 'REVERT',
}
