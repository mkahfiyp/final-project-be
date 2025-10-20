//error handle
class AppError {
  public rc: number; //rc (response code)
  public readonly success: boolean;
  public message: string;

  constructor(_message: string, _rc: number) {
    this.message = _message;
    this.rc = _rc;
    this.success = false; //default false
  }
}

export default AppError;
