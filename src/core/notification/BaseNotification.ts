export default abstract class BaseNotification {
  public readonly method : string;
  public abstract params : any;

  constructor(method: string) {
    this.method = method;
  }
}