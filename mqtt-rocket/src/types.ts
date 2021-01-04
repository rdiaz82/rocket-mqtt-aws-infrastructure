import { BoosterConfig } from "@boostercloud/framework-types";

export type MQTTBridgeParams = {
  topics?: string[],
  config: BoosterConfig,
}