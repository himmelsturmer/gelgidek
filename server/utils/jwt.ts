import { SignJWT, jwtVerify } from 'jose'

export async function signToken(
    payload: Record<string, unknown>,
    secret: string,
    expiresIn: string = '7d'
): Promise<string> {
    const key = new TextEncoder().encode(secret)
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(key)
}

export async function verifyToken(token: string, secret: string) {
    const key = new TextEncoder().encode(secret)
    const { payload } = await jwtVerify(token, key)
    return payload
}
