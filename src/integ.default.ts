import * as cdk from '@aws-cdk/core';
import { AutomatedWaf, LogLevel, Waf2ScopeOption } from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stackTest1 = new cdk.Stack(app, 'TestStack1AutomatedWaf', { env });

    new AutomatedWaf(stackTest1, 'AutomatedWaf', {
      waf2Scope: Waf2ScopeOption.REGIONAL,
      resourceNamingPrefix: 'Alb_Api',
      errorThreshold: 50,
      requestThreshold: 500,
      blockPeriod: 120,
      logLevel: LogLevel.DEBUG,
    });

    const stackTest2 = new cdk.Stack(app, 'TestStack2AutomatedWaf', { env });

    new AutomatedWaf(stackTest2, 'AutomatedWaf', {
      waf2Scope: Waf2ScopeOption.REGIONAL,
      resourceNamingPrefix: 'Alb_Api2',
      errorThreshold: 60,
      requestThreshold: 600,
      blockPeriod: 120,
      logLevel: LogLevel.DEBUG,
    });

    app.synth();
    this.stack = [stackTest1, stackTest2];
  }
}

new IntegTesting();
