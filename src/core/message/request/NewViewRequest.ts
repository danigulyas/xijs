import XiRequest from "~/core/message/XiRequest";

export type NewViewRequestParams = { file_path?: string };

export default class NewViewRequest extends XiRequest {
  public readonly params: NewViewRequestParams;

  constructor(requestId: number, params: NewViewRequestParams = {}) {
    super(requestId, "new_view");
    this.params = params;
  }
}