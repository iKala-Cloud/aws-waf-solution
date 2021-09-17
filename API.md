# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### AutomatedWaf <a name="cdk-automated-waf.AutomatedWaf"></a>

#### Initializers <a name="cdk-automated-waf.AutomatedWaf.Initializer"></a>

```typescript
import { AutomatedWaf } from 'cdk-automated-waf'

new AutomatedWaf(scope: Construct, id: string, props: AutomatedWafProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-automated-waf.AutomatedWaf.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-automated-waf.AutomatedWaf.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-automated-waf.AutomatedWaf.parameter.props"></a>

- *Type:* [`cdk-automated-waf.AutomatedWafProps`](#cdk-automated-waf.AutomatedWafProps)

---

#### Methods <a name="Methods"></a>

##### `validateResourceNamingPrefix` <a name="cdk-automated-waf.AutomatedWaf.validateResourceNamingPrefix"></a>

```typescript
public validateResourceNamingPrefix(resourceNamingPrefix: string)
```

###### `resourceNamingPrefix`<sup>Required</sup> <a name="cdk-automated-waf.AutomatedWaf.parameter.resourceNamingPrefix"></a>

- *Type:* `string`

---




## Structs <a name="Structs"></a>

### AutomatedWafProps <a name="cdk-automated-waf.AutomatedWafProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AutomatedWafProps } from 'cdk-automated-waf'

const automatedWafProps: AutomatedWafProps = { ... }
```

##### `waf2Scope`<sup>Required</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.waf2Scope"></a>

```typescript
public readonly waf2Scope: Waf2ScopeOption;
```

- *Type:* [`cdk-automated-waf.Waf2ScopeOption`](#cdk-automated-waf.Waf2ScopeOption)

---

##### `albArn`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.albArn"></a>

```typescript
public readonly albArn: string;
```

- *Type:* `string`

if waf2Scope is REGIONAL, give albArn to associate to waf acl.

---

##### `appAccessLogBucketName`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.appAccessLogBucketName"></a>

```typescript
public readonly appAccessLogBucketName: string;
```

- *Type:* `string`

---

##### `blockPeriod`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.blockPeriod"></a>

```typescript
public readonly blockPeriod: number;
```

- *Type:* `number`

The period (in minutes) to block applicable IP addresses.

---

##### `enableShieldAdvancedLambda`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.enableShieldAdvancedLambda"></a>

```typescript
public readonly enableShieldAdvancedLambda: boolean;
```

- *Type:* `boolean`

Enable AWS Shield Advanced.

Notice! it need $3000 USD per month.
Default is false

---

##### `errorThreshold`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.errorThreshold"></a>

```typescript
public readonly errorThreshold: number;
```

- *Type:* `number`

The maximum acceptable bad requests per minute per IP.

---

##### `logLevel`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.logLevel"></a>

```typescript
public readonly logLevel: LogLevel;
```

- *Type:* [`cdk-automated-waf.LogLevel`](#cdk-automated-waf.LogLevel)

---

##### `requestThreshold`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.requestThreshold"></a>

```typescript
public readonly requestThreshold: number;
```

- *Type:* `number`

The maximum acceptable requests per FIVE-minute period per IP address.

---

##### `resourceNamingPrefix`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.resourceNamingPrefix"></a>

```typescript
public readonly resourceNamingPrefix: string;
```

- *Type:* `string`

If the construct need to deploy more than one times, specify the property to prevent AWS resource name conflict.

---

##### `wafLogBucketName`<sup>Optional</sup> <a name="cdk-automated-waf.AutomatedWafProps.property.wafLogBucketName"></a>

```typescript
public readonly wafLogBucketName: string;
```

- *Type:* `string`

---



## Enums <a name="Enums"></a>

### LogLevel <a name="LogLevel"></a>

#### `DEBUG` <a name="cdk-automated-waf.LogLevel.DEBUG"></a>

---


#### `INFO` <a name="cdk-automated-waf.LogLevel.INFO"></a>

---


#### `WARNING` <a name="cdk-automated-waf.LogLevel.WARNING"></a>

---


#### `ERROR` <a name="cdk-automated-waf.LogLevel.ERROR"></a>

---


#### `CRITICAL` <a name="cdk-automated-waf.LogLevel.CRITICAL"></a>

---


### Waf2ScopeOption <a name="Waf2ScopeOption"></a>

#### `CLOUDFRONT` <a name="cdk-automated-waf.Waf2ScopeOption.CLOUDFRONT"></a>

---


#### `REGIONAL` <a name="cdk-automated-waf.Waf2ScopeOption.REGIONAL"></a>

---

