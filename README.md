[![NPM version](https://badge.fury.io/js/cdk-automated-waf.svg)](https://badge.fury.io/js/cdk-automated-waf)
[![PyPI version](https://badge.fury.io/py/cdk-automated-waf.svg)](https://badge.fury.io/py/cdk-automated-waf)
[![release](https://github.com/kimisme9386/cdk-automated-waf/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/kimisme9386/cdk-automated-waf/actions/workflows/release.yml)

# AWS WAF Solution

This CDK Construct modify and rebuild from [Cloudfront with Automated WAF](https://github.com/awslabs/aws-cloudfront-extensions/tree/main/templates/aws-cloudfront-waf).

The solution use CDK construct to automatically deploy a set of AWS WAF rules design to filter common web-based attacks.Users can select from preconfigured protective features that define the rules included in an AWS WAF web access control list (web ACL). After the solution deploys, AWS WAF begins inspecting web requests to the user’s existing Amazon CloudFront distributions、Application Load Balancers、API Gateway, and blocks them when applicable.

## What is difference

- The project is CDK Construct which is handy to integrate into your existing CDK project.

- Support count mode for testing WAF rule, see [API.md](https://github.com/iKala-Cloud/aws-waf-solution/blob/main/API.md#countmodeoptional-).

- Support Application Load Balancers and API Gateway (The origin repository doesn't support ALB any more in next release, see [issue](https://github.com/awslabs/aws-cloudfront-extensions/issues/164) )

- AWS Shield Advance is optional (The origin repository enforce to enable it)

## Construct Props

Ref [API Reference](API.md)

## Usage

### CloudFront

```ts
const envUSEast1 = {
  region: 'us-east-1',
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

/**
 * Test WAF for CloudFront
 */
new cdk.Stack(app, 'TestStackAutomatedWafForCloudFront', { env: envUSEast1 });

new AutomatedWaf(stackTest1, 'AutomatedWaf', {
  waf2Scope: Waf2ScopeOption.CLOUDFRONT,
  resourceNamingPrefix: 'CloudFront_ApiGW',
  errorThreshold: 55,
  requestThreshold: 300,
  blockPeriod: 60,
  logLevel: LogLevel.DEBUG,
});
```

Notice the WAF region must be `us-east-1` for CloudFront. 

After deploying, it need to do two things on AWS Management Console.

***1. Attach Cloudfront to WAF.***

Click `add AWS Resources`

![CloudFront-3](https://user-images.githubusercontent.com/7465652/136758293-bd1b7d86-2775-456f-a176-ff508fb91fd1.jpg)


Select existing CloudFront Distribution.

![CloudFront-4](https://user-images.githubusercontent.com/7465652/136758304-582141ab-6bb7-4aa5-b236-4b656ef53e1f.jpg)


***2. Set S3 bucket on CloudFront standand logging***

Find S3 bucket name on CloudFormation output

![CloudFront-1](https://user-images.githubusercontent.com/7465652/136758257-9dd42b8d-163e-4775-aba4-da33358d9497.jpg)


Set CloudFront standard logging on CloudFront Settings

![CloudFront-2](https://user-images.githubusercontent.com/7465652/136758273-95ae32c3-091a-4bef-a9de-57406ceee3b6.jpg)

:warning: Log Prefix must be "AWSLogs/"


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
