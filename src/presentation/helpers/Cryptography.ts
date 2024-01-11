import bcrypt from "bcrypt"
import CriptoProvider from "@/core/domain/User/CriptoProvider"

export default class Cryptography
    implements CriptoProvider
{
    set(text: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(text, salt)
    }

    compare(password: string, encryptedPassword: string): boolean {
        return bcrypt.compareSync(password, encryptedPassword)
    }
}
