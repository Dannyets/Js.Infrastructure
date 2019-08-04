import { Target, File } from ".";

export interface UploadClient {
    uploadFile: (file: File) => Promise<string>
}