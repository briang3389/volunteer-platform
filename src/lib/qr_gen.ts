import { error } from '@sveltejs/kit';
//import { createRequire } from 'module';
//const QRCode = createRequire(import.meta.url)('qrcode');
import QRCode from 'qrcode';

export async function generateQRCode(data: string, width: number, height: number): Promise<string> {
	try {
		// FIXME: get ride of @ts-ignore
		// neded because it returns a void & Promise<string> and idk how you have a product type with void
		// @ts-ignore
		return QRCode.toDataURL(data, { width, height });
	} catch (e) {
		throw error(400, 'invalid qr data');
	}
}
