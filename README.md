[![NPM version](https://badge.fury.io/js/cdk-automated-waf.svg)](https://badge.fury.io/js/cdk-automated-waf)
[![PyPI version](https://badge.fury.io/py/cdk-automated-waf.svg)](https://badge.fury.io/py/cdk-automated-waf)
[![release](https://github.com/kimisme9386/cdk-automated-waf/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/kimisme9386/cdk-automated-waf/actions/workflows/release.yml)

# AWS WAF Solution

This CDK Construct modify and rebuild from [Cloudfront with Automated WAF](https://github.com/awslabs/aws-cloudfront-extensions/tree/main/templates/aws-cloudfront-waf).

The solution use CDK construct to automatically deploy a set of AWS WAF rules design to filter common web-based attacks.Users can select from preconfigured protective features that define the rules included in an AWS WAF web access control list (web ACL). After the solution deploys, AWS WAF begins inspecting web requests to the user’s existing Amazon CloudFront distributions or Application Load Balancers, and blocks them when applicable.

## What is difference

- The project is CDK Construct which is handy to integrate into your existing CDK project.

- Support count mode for testing WAF rule, see [API.md](https://github.com/iKala-Cloud/aws-waf-solution/blob/main/API.md#countmodeoptional-).

- Support Application Load Balancers and API Gateway (The origin repository doesn't support ALB any more in next release, see [issue](https://github.com/awslabs/aws-cloudfront-extensions/issues/164) )

- AWS Shield Advance is optional (The origin repository enforce to enable it)

## Construct Props

Ref [API Reference](API.md)

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
