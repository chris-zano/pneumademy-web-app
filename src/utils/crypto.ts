import nacl from 'tweetnacl';
import { decodeBase64, encodeBase64, encodeUTF8 } from 'tweetnacl-util';

export const deriveKey = async (fingerprint:string): Promise<Uint8Array> => {
    const hashBuffer = new TextEncoder().encode(fingerprint);
    const hash = await crypto.subtle.digest("SHA-256", hashBuffer);
    return new Uint8Array(hash).slice(0, 32);
}

export const encryptData = async (message:string, fingerprint:string) => {
    const key = await deriveKey(fingerprint);
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const messageUnit8 = new TextEncoder().encode(message);
    const encryptedData = nacl.secretbox(messageUnit8, nonce, key);

    return {
        nonce: encodeBase64(nonce),
        encrypted: encodeBase64(encryptedData)
    }
}

export const decryptData = async (
    encryptedData: {nonce:string; encrypted: string} | undefined,
    fingerprint: string | null
) => {
    if (!encryptedData || !fingerprint) {
        console.error("Invalid encrypted data or fingerprint");
        return null;
    }

    const key = await deriveKey(fingerprint!);
    const nonce = decodeBase64(encryptedData!.nonce);
    const encryptedMessage = decodeBase64(encryptedData!.encrypted);
    const decrypted = nacl.secretbox.open(encryptedMessage, nonce, key);

   if (!decrypted) {
        console.error("Decryption failed! Incorrect key or corrupt data.");
        return null;
    }

    return encodeUTF8(decrypted);
}