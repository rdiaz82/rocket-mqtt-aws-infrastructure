import { Stack } from "@aws-cdk/core";
import { RocketUtils } from "@boostercloud/framework-provider-aws-infrastructure";
import { MQTTBridgeParams } from "./types";
import { CdkWrapper } from "./cdk-wrapper";

export class MQTTBridgeStack {
  public static mountStack(params: MQTTBridgeParams, stack: Stack): void {
    if (params.topics) {
      var index = 1
      for (const topic of params.topics) {
        const ruleName = `TopicRule${index}`
        console.log("creating the lambda function")
        const lambda = CdkWrapper.createLambda(stack, ruleName, topic, params.config)
        console.log(lambda.functionArn)
        CdkWrapper.registerTopic(stack, ruleName, topic, lambda)
        index += 1
      }
    }
  }

  public static async unmountStack(params: MQTTBridgeParams, utils: RocketUtils): Promise<void> {
    console.log("unmounting MQTT stack")
  }
}