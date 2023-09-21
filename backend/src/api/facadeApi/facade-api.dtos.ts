export interface AuthorizationRequest {
  user: string;
  password: string;
}

export interface ProjectDetailsResponse {
  status: string;
  message: {
    status: boolean;
    companyName: string;
    blockId: string;
    batchId: string;
  };
}

export interface NotifyProjectUploadCompletionRequest {
  blockId: string;
  batchId: string;
}

export interface NotifyProjectUploadCompletionResponse {
  message: string;
  status: boolean;
}

export interface FacadeApiErrorResponse {
  message: {
    status: boolean;
    error: string;
  };
}
