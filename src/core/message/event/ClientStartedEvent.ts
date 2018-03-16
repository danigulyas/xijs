import XiEvent from "~/core/message/XiEvent";
import Sendable from "~/core/message/Sendable";

class ClientStartedEvent implements XiEvent, Sendable {
  public readonly configDir?: string;
  public readonly clientExtrasDir?: string;

  /**
   * An event fired when the client is ready to talk with the Xi server.
   * @param configDir is the directory of Xi configurations.
   * @param clientExtrasDir is the directory where client extras (like plugins) are.
   */
  public constructor(configDir?: string, clientExtrasDir?: string) {
    this.configDir = configDir;
    this.clientExtrasDir = clientExtrasDir;
  }

  /**
   * {@inheritdoc}
   */
  public serialize() : string {
    const payload = {
      method: ClientStartedEvent.METHOD,
      params: {
        config_dir: this.configDir,
        client_extras_dir: this.clientExtrasDir
      }
    };
    
    return `${JSON.stringify(payload)}\r\n`;
  }
}

namespace ClientStartedEvent {
  export const METHOD = "client_started";
}

export default ClientStartedEvent;