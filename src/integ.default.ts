import * as cdk from '@aws-cdk/core';
import { AutomatedWaf, LogLevel, Waf2ScopeOption } from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const envUSEast1 = {
      region: 'us-east-1',
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    /**
     * Test WAF for CloudFront
     */
    const stackTest1 = new cdk.Stack(app, 'TestStackAutomatedWafForCloudFront', { env: envUSEast1 });

    new AutomatedWaf(stackTest1, 'AutomatedWaf', {
      waf2Scope: Waf2ScopeOption.CLOUDFRONT,
      resourceNamingPrefix: 'CloudFront_ApiGW',
      errorThreshold: 55,
      requestThreshold: 3000,
      blockPeriod: 60,
      logLevel: LogLevel.DEBUG,
    });

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    /**
     * Test For ALB
     */
    const stackTest2 = new cdk.Stack(app, 'TestStackAutomatedWafForALB', { env });

    const albArn = `arn:aws:elasticloadbalancing:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:loadbalancer/app/ApiNe-Alb16-2VIC9075YQEZ/db92cdc88d2e7c9d`;

    new AutomatedWaf(stackTest2, 'AutomatedWaf', {
      waf2Scope: Waf2ScopeOption.REGIONAL,
      associatedResourceArn: albArn,
      resourceNamingPrefix: 'Alb_Api',
      errorThreshold: 50,
      requestThreshold: 300,
      blockPeriod: 60,
      logLevel: LogLevel.DEBUG,
    });


    /**
     * Test For API Gateway
     */
    const stackTest3 = new cdk.Stack(app, 'TestStackAutomatedWafForApiGW', { env });

    /**
     * Ref Stage arn in https://docs.aws.amazon.com/apigateway/latest/developerguide/arn-format-reference.html
     */
    const restApiArn = `arn:aws:apigateway:${cdk.Aws.REGION}::/restapis/0j90w09yf9/stages/prod`;

    new AutomatedWaf(stackTest3, 'AutomatedWaf', {
      waf2Scope: Waf2ScopeOption.REGIONAL,
      associatedResourceArn: restApiArn,
      resourceNamingPrefix: 'ApiGW',
      errorThreshold: 50,
      requestThreshold: 300,
      blockPeriod: 60,
      logLevel: LogLevel.DEBUG,
    });


    /**
     * Test For ALB on count mode
     */
     const stackTest4 = new cdk.Stack(app, 'TestStackAutomatedWafForALBOnCountMode', { env });
 
     new AutomatedWaf(stackTest4, 'AutomatedWaf', {
       waf2Scope: Waf2ScopeOption.REGIONAL,
       countMode: true,
       resourceNamingPrefix: 'Alb_CountMode',
       errorThreshold: 50,
       requestThreshold: 300,
       blockPeriod: 60,
       logLevel: LogLevel.DEBUG,
     });

    app.synth();
    this.stack = [stackTest1, stackTest2, stackTest3, stackTest4];
  }
}

new IntegTesting();
