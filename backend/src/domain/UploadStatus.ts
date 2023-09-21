export enum UploadStatus {
  /**
   * The upload has been created but no images have been uploaded yet.
   */
  NEW = 'NEW',

  /**
   * The upload is in progress.
   */
  IN_PROGRESS = 'IN_PROGRESS',

  /**
   * The upload has been completed.
   */
  COMPLETE = 'COMPLETE',

  /**
   * The upload has failed to upload some images.
   */
  FAILED = 'FAILED',
}
