import XiRequest from "~/core/message/XiRequest";

export default class NewViewRequest extends XiRequest {
  public readonly filePath?: string;

  constructor(requestId: number, filePath?: string) {
    super(requestId, "new_view");
    this.filePath = filePath;
  }

  public serialize() : string { 
    return `${JSON.stringify({ id: this.id, method: this.method, params: { file_path: this.filePath } })}\r\n`; 
  }
}