import * as crypto from 'crypto';

const CHECKSUM_HASH_ALGORITHM = 'SHA-256';

export const generateChecksum = (uploadedImage: Express.Multer.File): string => {
  const hash = crypto.createHash(CHECKSUM_HASH_ALGORITHM);
  hash.update(uploadedImage.buffer);
  return hash.digest('hex');
};
