export interface ImageMetadata {
  sourceFilePath: string;
  checksum: string;
  sizeInBytes: number;
  lastModified: string;
  uploaded: boolean;
}

export interface UploadMetadata {
  images: ImageMetadata[];
}

export interface ImageChecksumMetadata {
  sourceFilePath: string;
  checksum: string;
}
