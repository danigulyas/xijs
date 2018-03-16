import BaseNotification from "./BaseNotification";
import { assertEqual, assertType } from "util/ValidatorUtils";

export type AvailablePlugins = Array<{name: string, running: boolean}>;
export type AvailablePluginsNotificationParams = {  
  plugins: AvailablePlugins
  viewId: string
};

export default class AvailablePluginsNotification extends BaseNotification {
  public static readonly METHOD: string = "available_plugins";
  public readonly params: AvailablePluginsNotificationParams;

  public constructor(plugins: AvailablePlugins, viewId: string) {
    super(AvailablePluginsNotification.METHOD);
    this.params = { plugins, viewId };
  }

  public static fromJSON(obj: object) : AvailablePluginsNotification {
    assertEqual(obj, "method", AvailablePluginsNotification.METHOD);
    
    return new AvailablePluginsNotification(
      assertType(obj, "params.view_id", "string"),
      assertType(obj, "params.plugins", "array")
    ); 
  }

  public static guard(obj: object) : obj is AvailablePluginsNotification { 
    return obj instanceof AvailablePluginsNotification; 
  }
}