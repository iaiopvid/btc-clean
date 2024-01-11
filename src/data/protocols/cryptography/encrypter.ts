export interface IEncrypter {
  encrypt(data: { stringToCrypto: string; cryptoAlgorithmn: string; digest: string }): string;
}
