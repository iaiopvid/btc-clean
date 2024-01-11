
// Na arquitetura hexagonal esta interface é uma Porta!
// A porta faz parte do core da sua aplicação
export default interface CriptoProvider {
    set(texto: string): string
    compare(senha: string, senhaCriptografada: string): boolean
}