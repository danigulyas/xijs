import BaseNotification from "./BaseNotification";
import { assertEqual, assertType } from "util/ValidatorUtils";

export type AvailableThemesNotificationParams = { themes: Array<string> };

export default class AvailableThemesNotification extends BaseNotification {
  public static readonly METHOD: string = "available_themes";
  public readonly params: AvailableThemesNotificationParams;

  public constructor(themes: Array<string>) {
    super(AvailableThemesNotification.METHOD);
    this.params = { themes };
  }

  public static fromObject(obj: object) : AvailableThemesNotification {
    assertEqual(obj, "method", AvailableThemesNotification.METHOD);
    return new AvailableThemesNotification(assertType(obj, "params.themes", "array"));
  }

  public static guard(obj: object) : obj is AvailableThemesNotification { 
    return obj instanceof AvailableThemesNotification; 
  }
}