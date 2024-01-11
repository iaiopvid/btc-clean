export interface IBtcObjectionModel {
  id: number | string;
  userId: number | string;
  balance: number | string;
  rate?: number | string;
  operation?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}