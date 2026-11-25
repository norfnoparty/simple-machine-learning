//Buat JWT Tokennya 

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Secret diambil dari env yang udah di generate
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Fungsi untuk memastikn bahwa sign itu hanya untuk id email dan role
export async function signToken(payload: {
    id: number;
    email: string; 
    role: 'EMPLOYEE' | 'HRD' | 'BOD';
}) 

// Disini untuk membuat token baru 
{
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h') // Token berlaku 24 jam
        .sign(secret);
    return token;
}

// Di cek dulu apakah tokennya valid atau ngga 
export async function verifyToken(token: string){
    try {
        const verified = await jwtVerify(token, secret);
        return verified.payload;  
    } catch (error) {
        return null; // Token invalid 
    }
}

// Ambil user dari cookie yang ada di request, kalau ngga ada return null
export async function getCurrentUser(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value; // Ambil token dari cookie

    if (!token) return null; 

    const payload = await verifyToken(token);
    if (!payload) return null; 

    return {
        id: payload.id as number,
        email: payload.email as string,
        role: payload.role as 'EMPLOYEE' | 'HRD' | 'BOD',
    };
}

// Set auth cookie, simpan tokennya di cookie
export async function setAuthCookie(token: string){
    const cookieStore = await cookies();
    cookieStore.set('token', token,{
        httpOnly: true, // Gabisa diakses dari javascript, aman dari XSS
        secure: process.env.NODE_ENV === 'production', // HTTPS Only di production
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 hari
    });
}

// Delete auth cookie, logout user 
export async function deleteAuthCookie(){
    const cookieStore = await cookies();
    cookieStore.delete('token');
}

