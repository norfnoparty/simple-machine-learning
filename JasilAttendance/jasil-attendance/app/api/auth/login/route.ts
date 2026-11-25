import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        // parse input
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email dan password wajib diisi'},
                { status: 400}

            );
        }
        // Cari user di database berdasarkan email
        const user = await prisma.pengguna.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Email/password salah'},
                { status: 401 }
            );
        }

        // Cek password, di compare dengan bycrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Email/password salah'},
                { status: 401 }
            );
        }
        
        // Kalau berhasil, buat token JWT
        const token = await signToken({
            id: user.id,
            email: user.email,
            role: user.role as 'EMPLOYEE' | 'HRD' | 'BOD',
        });

        // Set token di cookie
        await setAuthCookie(token);
        
        // Return sukses, jangan lupa return user role juga biar bisa di redirect sesuai role
        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },  
        });
    } catch (error) {
        console.error('Login error: ', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan server'},
            { status: 500 }
        );
    }
}