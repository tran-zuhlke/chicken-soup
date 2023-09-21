export interface UploadedFile {
    originalName: string;
    fileName: string;
    destinationPath: string;
}
export interface UploadImagesResponse {
    uploadedFiles: UploadedFile[];
}
