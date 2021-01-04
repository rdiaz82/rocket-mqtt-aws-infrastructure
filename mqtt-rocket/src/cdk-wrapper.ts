import { CfnTopicRule, CfnTopicRuleProps } from "@aws-cdk/aws-iot";
import { Stack } from "@aws-cdk/core";
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda'
import { ServicePrincipal, Role, ManagedPolicy } from '@aws-cdk/aws-iam'
import * as path from 'path'
import { BoosterConfig } from "@boostercloud/framework-types";

export class CdkWrapper {
  public static registerTopic(stack:Stack, ruleName:string, topic:string, lambda: Function): CfnTopicRule {
    const topicProps: CfnTopicRuleProps = {
      ruleName: ruleName,
      topicRulePayload:{
        actions:[{lambda:{functionArn:lambda.functionArn}}],
        ruleDisabled:false,
        sql: `SELECT * FROM '${topic}'`,
      }
    }
    return new CfnTopicRule(stack, ruleName, topicProps)
  }

  public static createLambda(stack:Stack, ruleName:string, topic:string, config: BoosterConfig): Function {
    const lambdaARole = new Role(stack, `mqtt-${ruleName}-LambdaRole`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });
    
    lambdaARole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
    );

    const lambda = new Function(stack, `${ruleName}-lambda`, {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambda-handler', "lambda.zip")),
      environment: {
        'topic': topic,
        'eventStore': config.resourceNames.eventsStore,
      },
      role: lambdaARole,
    })
    lambda.addPermission(`${ruleName}-permission`, {
      principal: new ServicePrincipal('iot.amazonaws.com'),
    })
    return lambda
  } 
}