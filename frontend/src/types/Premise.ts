export interface Premise {
  id: string;
  name: string;
  cameras: Camera[];
}

export interface Camera {
  id: string;
  name: string;
  streamUrl: string;
  incidents?: Incident[];
}

export interface Incident {
  id: string;
  name: string;
  ignored: boolean;
  guardId?: string;
  cameraId: string;
  dateCreated: string;
}
