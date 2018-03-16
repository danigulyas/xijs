import BaseNotification from "core/notification/BaseNotification";
import Sendable from "core/Sendable";
import { assertEqual, assertType, assertTypeIfPresent } from "util/ValidatorUtils";

class ClientStartedNotification extends BaseNotification implements Sendable {
  public static readonly METHOD: string = "client_started";
  
  public readonly params: ClientStartedNotification.Params;

  public constructor(configDir?: string, clientExtrasDir?: string) {
    super(ClientStartedNotification.METHOD);
    this.params = { configDir, clientExtrasDir };
  }

  public serialize() : string {
    const payload = {
      method: ClientStartedNotification.METHOD,
      params: {
        client_extras_dir: this.params.clientExtrasDir,

      }
    }
    
    return `${JSON.stringify(payload)}\r\n`;
  }
}

namespace ClientStartedNotification {
  export abstract class Params {
    abstract readonly configDir?: string;
    abstract readonly clientExtrasDir?: string;
  }
}

export default ClientStartedNotification;