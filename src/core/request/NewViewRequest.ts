import BaseRequest from "core/request/BaseRequest";

export type NewViewRequestParams = { file_path?: string };

export default class NewViewRequest extends BaseRequest {
  public readonly params: NewViewRequestParams;

  constructor(requestId: number, params: NewViewRequestParams = {}) {
    super(requestId, "new_view");
    this.params = params;
  }
}