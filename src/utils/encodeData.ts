/* eslint-disable @typescript-eslint/no-explicit-any */
class Encoder {
    constructor(){}

    encode(data: unknown): string {
        const jsonString = JSON.stringify(data);
        const unit8Aray = new TextEncoder().encode(jsonString);
        const base64String = btoa(String.fromCharCode(...unit8Aray));

        return base64String;

    }


    decode(base64String: string): any {
        const binaryString = atob(base64String);
        const unit8Array = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
        const jsonString = new TextDecoder().decode(unit8Array);
        return JSON.parse(jsonString);
    }
}

export default Encoder;