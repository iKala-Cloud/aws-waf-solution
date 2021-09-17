[![NPM version](https://badge.fury.io/js/cdk-automated-waf.svg)](https://badge.fury.io/js/cdk-automated-waf)
[![PyPI version](https://badge.fury.io/py/cdk-automated-waf.svg)](https://badge.fury.io/py/cdk-automated-waf)
[![release](https://github.com/kimisme9386/cdk-automated-waf/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/kimisme9386/cdk-automated-waf/actions/workflows/release.yml)

# cdk-automated-waf

This CDK Construct modify from [Cloudfront with Automated WAF](https://github.com/awslabs/aws-cloudfront-extensions/tree/main/templates/aws-cloudfront-waf).

## Feature

Reference [Cloudfront with Automated WAF README](https://github.com/awslabs/aws-cloudfront-extensions/tree/main/templates/aws-cloudfront-waf#cloudfront-with-automated-waf)

## Construct Props

| Properties                     | Default                      | Description                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **waf2Scope**                  | No                           | `CLOUDFRONT` or `REGIONAL`. If use REGIONALREGIONAL, it support ALB only now                                                                                                                                                                                                                                                                                                |
| **albArn**                     | No                           | if waf2Scope is REGIONAL, it can be specified associated resource to ALB.                                                                                                                                                                                                                                                                                                   |
| **resourceNamingPrefix**       | No                           | If the construct need to deploy more than one times, specify the property to prevent AWS resource name conflict. (The property only allow alphanumeric and "\_" symbol because glue database naming is needed)                                                                                                                                                              |
| **enableShieldAdvancedLambda** | false                        | enable or disable AWS Shield Advance (it need [$3000 Monthly Fee](https://aws.amazon.com/shield/pricing/?nc1=h_ls))                                                                                                                                                                                                                                                         |
| **appAccessLogBucketName**     | access-log-bucket-cloudfront | The name for the Amazon S3 bucket where you want to store Cloud Front access logs for your CloudFront distribution. More about bucket name restriction here: http://amzn.to/1p1YlU5.                                                                                                                                                                                        |
| **logLevel**                   | waf-log-bucket-cloudfront    | The name for the Amazon S3 bucket where you want to store WAF access Cloud Front logs. More about bucket name restriction here: http://amzn.to/1p1YlU5.                                                                                                                                                                                                                     |
| **errorThreshold**             | 50                           | The maximum acceptable bad requests per minute per IP.                                                                                                                                                                                                                                                                                                                      |
| **requestThreshold**           | 100                          | The maximum acceptable requests per FIVE-minute period per IP address.                                                                                                                                                                                                                                                                                                      |
| **blockPeriod**                | 240                          | The period (in minutes) to block applicable IP addresses.                                                                                                                                                                                                                                                                                                                   |
| **WAFScope**                   | CLOUDFRONT                   | Specifies whether this is for an AWS CloudFront distribution or for a regional application. A regional application can be an Application Load Balancer (ALB), an Amazon API Gateway REST API, or an AWS AppSync GraphQL API. Valid Values are CLOUDFRONT and REGIONAL. For CLOUDFRONT, you must create your WAFv2 resources in the US East (N. Virginia) Region, us-east-1. |

## Usage

ALB

```ts
const stack = new cdk.Stack(app, 'TestStackAutomatedWaf', { env });

new AutomatedWaf(stack, 'AutomatedWaf', {
  waf2Scope: Waf2ScopeOption.REGIONAL,
  wafNamingPrefix: 'Alb-Api',
  errorThreshold: 50,
  requestThreshold: 500,
  blockPeriod: 120,
  logLevel: LogLevel.DEBUG,
});
```

:warning: If waf2Scope is REGIONAL, it has to enable ALB access logging and specify S3 location after deployment. The S3 location refer to CloudFormation Output which key is similar to "{stack name}AppAccessLogBucketName{hashCode}". See it in [AWS Document](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging)

CloudFront

```ts
const stack = new cdk.Stack(app, 'TestStackAutomatedWaf', { env });

new AutomatedWaf(stack, 'AutomatedWaf', {
  waf2Scope: Waf2ScopeOption.CLOUDFRONT,
  wafNamingPrefix: 'CloudFront-Api',
  errorThreshold: 50,
  requestThreshold: 500,
  blockPeriod: 120,
  logLevel: LogLevel.DEBUG,
});
```

Multiple Stacks

```ts
const stackTest1 = new cdk.Stack(app, 'TestStack1AutomatedWaf', { env });

new AutomatedWaf(stackTest1, 'AutomatedWaf', {
  waf2Scope: Waf2ScopeOption.REGIONAL,
  resourceNamingPrefix: 'Alb-Api',
  errorThreshold: 50,
  requestThreshold: 500,
  blockPeriod: 120,
  logLevel: LogLevel.DEBUG,
});

const stackTest2 = new cdk.Stack(app, 'TestStack2AutomatedWaf', { env });

new AutomatedWaf(stackTest2, 'AutomatedWaf', {
  waf2Scope: Waf2ScopeOption.REGIONAL,
  resourceNamingPrefix: 'Alb-Api2',
  errorThreshold: 60,
  requestThreshold: 600,
  blockPeriod: 120,
  logLevel: LogLevel.DEBUG,
});
```

:warning: If the construct need to deploy more than one times, specify the different value of `resourceNamingPrefix` property to prevent AWS resource name conflict

## Troubleshooting

If deployment error, the cloudFormation Error event like this

```
Received response status [FAILED] from custom resource. Message returned: 'HttpFloodLambdaLogParser' (RequestId: b4e08ea2-fe0a-46f8-98aa-6f96d4558579)
```

If any custom resource deploy error like above, delete the stack and redeploy it that will pass.

## Modified items

- CDK structure refactor from CDK Stack to CDK Construct
- Add optional `enableShieldAdvancedLambda` property on construct because AWS Shield advance need [$3000 Monthly Fee](https://aws.amazon.com/shield/pricing/?nc1=h_ls)
- Lambda deployment use docker image on CDK (DockerImageFunction)
- Fix glue table schema for ALB access log
