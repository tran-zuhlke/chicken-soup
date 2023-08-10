export class ApiException extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
  }
}
