# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### AutomatedWaf <a name="@ikala-cloud/aws-waf-solution.AutomatedWaf"></a>

#### Initializers <a name="@ikala-cloud/aws-waf-solution.AutomatedWaf.Initializer"></a>

```typescript
import { AutomatedWaf } from '@ikala-cloud/aws-waf-solution'

new AutomatedWaf(scope: Construct, id: string, props: AutomatedWafProps)
```

##### `scope`<sup>Required</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWaf.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWaf.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWaf.parameter.props"></a>

- *Type:* [`@ikala-cloud/aws-waf-solution.AutomatedWafProps`](#@ikala-cloud/aws-waf-solution.AutomatedWafProps)

---

#### Methods <a name="Methods"></a>

##### `validateResourceNamingPrefix` <a name="@ikala-cloud/aws-waf-solution.AutomatedWaf.validateResourceNamingPrefix"></a>

```typescript
public validateResourceNamingPrefix(resourceNamingPrefix: string)
```

###### `resourceNamingPrefix`<sup>Required</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWaf.parameter.resourceNamingPrefix"></a>

- *Type:* `string`

---




## Structs <a name="Structs"></a>

### AutomatedWafProps <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AutomatedWafProps } from '@ikala-cloud/aws-waf-solution'

const automatedWafProps: AutomatedWafProps = { ... }
```

##### `waf2Scope`<sup>Required</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.waf2Scope"></a>

```typescript
public readonly waf2Scope: Waf2ScopeOption;
```

- *Type:* [`@ikala-cloud/aws-waf-solution.Waf2ScopeOption`](#@ikala-cloud/aws-waf-solution.Waf2ScopeOption)

CLOUDFRONT or REGIONAL.

If use REGIONAL, it support ALB、API Gateway

---

##### `appAccessLogBucketName`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.appAccessLogBucketName"></a>

```typescript
public readonly appAccessLogBucketName: string;
```

- *Type:* `string`

---

##### `associatedResourceArn`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.associatedResourceArn"></a>

```typescript
public readonly associatedResourceArn: string;
```

- *Type:* `string`

Only support ALB arn or API Gateway arn when waf2Scope is Regional.

This property doesn't support CloudFront arn because it is restricted by CloudFormation `AWS::WAFv2::WebACLAssociation` , see more details: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webaclassociation.html#cfn-wafv2-webaclassociation-resourcearndetails:

---

##### `blockPeriod`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.blockPeriod"></a>

```typescript
public readonly blockPeriod: number;
```

- *Type:* `number`

The period (in minutes) to block applicable IP addresses.

---

##### `enableShieldAdvancedLambda`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.enableShieldAdvancedLambda"></a>

```typescript
public readonly enableShieldAdvancedLambda: boolean;
```

- *Type:* `boolean`

Enable AWS Shield Advanced.

Notice! it need $3000 USD per month.
Default is false

---

##### `errorThreshold`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.errorThreshold"></a>

```typescript
public readonly errorThreshold: number;
```

- *Type:* `number`

The maximum acceptable bad requests per minute per IP.

:warning: The property map WAF `Scanners and Probes` Rule which support only CloudFront and ALB.

---

##### `logLevel`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.logLevel"></a>

```typescript
public readonly logLevel: LogLevel;
```

- *Type:* [`@ikala-cloud/aws-waf-solution.LogLevel`](#@ikala-cloud/aws-waf-solution.LogLevel)

Valid value is 'INFO', 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'.

---

##### `requestThreshold`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.requestThreshold"></a>

```typescript
public readonly requestThreshold: number;
```

- *Type:* `number`

The maximum acceptable requests per FIVE-minute period per IP address.

---

##### `resourceNamingPrefix`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.resourceNamingPrefix"></a>

```typescript
public readonly resourceNamingPrefix: string;
```

- *Type:* `string`

If the construct need to deploy more than one times, specify the property to prevent AWS resource name conflict.

(The property only allow alphanumeric and "_" symbol because glue database naming is needed)

---

##### `wafLogBucketName`<sup>Optional</sup> <a name="@ikala-cloud/aws-waf-solution.AutomatedWafProps.property.wafLogBucketName"></a>

```typescript
public readonly wafLogBucketName: string;
```

- *Type:* `string`

---



## Enums <a name="Enums"></a>

### LogLevel <a name="LogLevel"></a>

#### `DEBUG` <a name="@ikala-cloud/aws-waf-solution.LogLevel.DEBUG"></a>

---


#### `INFO` <a name="@ikala-cloud/aws-waf-solution.LogLevel.INFO"></a>

---


#### `WARNING` <a name="@ikala-cloud/aws-waf-solution.LogLevel.WARNING"></a>

---


#### `ERROR` <a name="@ikala-cloud/aws-waf-solution.LogLevel.ERROR"></a>

---


#### `CRITICAL` <a name="@ikala-cloud/aws-waf-solution.LogLevel.CRITICAL"></a>

---


### Waf2ScopeOption <a name="Waf2ScopeOption"></a>

#### `CLOUDFRONT` <a name="@ikala-cloud/aws-waf-solution.Waf2ScopeOption.CLOUDFRONT"></a>

---


#### `REGIONAL` <a name="@ikala-cloud/aws-waf-solution.Waf2ScopeOption.REGIONAL"></a>

---

