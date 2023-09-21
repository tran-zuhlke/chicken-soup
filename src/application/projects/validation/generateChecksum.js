"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChecksum = void 0;
const crypto = require("crypto");
const CHECKSUM_HASH_ALGORITHM = 'SHA-256';
const generateChecksum = (uploadedImage) => {
    const hash = crypto.createHash(CHECKSUM_HASH_ALGORITHM);
    hash.update(uploadedImage.buffer);
    return hash.digest('hex');
};
exports.generateChecksum = generateChecksum;
//# sourceMappingURL=generateChecksum.js.map