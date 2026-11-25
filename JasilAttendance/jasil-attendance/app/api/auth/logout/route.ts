import { NextResponse } from "next/server";
import { deleteAuthCookie } from "@/lib/auth";

export async function POST(){
    try {
        // Hapus cookie auth
        await deleteAuthCookie();

        return NextResponse.json({
            success: true,
            message: "Logout berhasil"
        });
    
    } catch (error){
        console.error('Logout error: ', error);
        return NextResponse.json(
            { error: 'Logout gagal'},
            { status: 500 }
        );
    }
}