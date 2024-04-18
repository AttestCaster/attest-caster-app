import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import * as fs from "fs";

const imagePath = join(process.cwd(), 'public/account_abstraction/sword.png'); // TODO: replace with actual og-image
let pngBuffer = fs.readFileSync(imagePath)

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
    try {
        // Set the content type to PNG and send the response
        return new Response(pngBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'max-age=10'
            }
        })
    } catch (error) {
        console.error('Error generating frame pic:', error);
        return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    }
}

export const dynamic = 'force-dynamic';