export interface IUploadedFile {
  key: string;
  path: string;
  mimetype: string;
  originalname: string;
  size: number;
  buffer: Buffer;
  location?: string;
}
