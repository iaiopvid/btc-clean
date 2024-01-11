import { IUseCase } from '@/usecase/IUseCase';

const Allowed = {
  Uppers: 'QWERTYUIOPASDFGHJKLZXCVBNM',
  Lowers: 'qwertyuiopasdfghjklzxcvbnm',
  Numbers: '1234567890',
  Symbols: '!@#$%^&*',
};

const getRandomCharFromString = (str) => str.charAt(Math.floor(Math.random() * str.length));

export class GenerateNewPasswordUseCase implements IUseCase<number, string> {
  constructor() {}

  public execute(length: number = 20): string {
    let pwd = '';
    pwd += getRandomCharFromString(Allowed.Uppers);
    pwd += getRandomCharFromString(Allowed.Lowers);
    pwd += getRandomCharFromString(Allowed.Numbers);
    pwd += getRandomCharFromString(Allowed.Symbols);
    for (let i = pwd.length; i < length; i++) pwd += getRandomCharFromString(Object.values(Allowed).join(''));
    return pwd;
  }
}
