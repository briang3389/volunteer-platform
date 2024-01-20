import { error } from '@sveltejs/kit';
import { createRequire } from 'module';
const QRCode = createRequire(import.meta.url)('qrcode');


export async function generateQRCode(data: string, width: number, height: number): Promise<string> {
    try {
        return QRCode.toDataURL(data, { width, height });
    }
    catch (e) {
        throw error(400, "invalid qr data");
    }
}