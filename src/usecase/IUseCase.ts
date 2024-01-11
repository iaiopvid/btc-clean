export interface IUseCase<E, S> {
  execute(entrada: E): Promise<S> | S
}
