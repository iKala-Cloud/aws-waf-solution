const {
  awscdk,
  Gitpod,
  DevEnvironmentDockerImage,
  javascript,
} = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Chris Yang',
  authorUrl: 'https://9incloud.com/',
  cdkVersion: '1.123.0',
  /**
   * we default release the main branch(cdkv2) with major version 2.
   */
  majorVersion: 2,
  defaultReleaseBranch: 'master',
  /**
   * we also release the cdkv1 branch with major version 1.
   */
  releaseBranches: {
    cdkv1: { npmDistTag: 'cdkv1', majorVersion: 1 },
  },
  defaultReleaseBranch: 'main',
  name: '@ikala-cloud/aws-waf-solution',
  npmAccess: javascript.NpmAccess.PUBLIC,
  repositoryUrl: 'https://github.com/iKala-Cloud/aws-waf-solution',
  description: 'Cloudfront,ALB and API Gateway with Automated WAF',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-kinesisfirehose',
    '@aws-cdk/aws-glue',
    '@aws-cdk/aws-athena',
    '@aws-cdk/aws-wafv2',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-s3-notifications',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-cloudfront',
    '@aws-cdk/aws-apigateway',
  ],
  peerDeps: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-kinesisfirehose',
    '@aws-cdk/aws-glue',
    '@aws-cdk/aws-athena',
    '@aws-cdk/aws-wafv2',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-s3-notifications',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-cloudfront',
    '@aws-cdk/aws-apigateway',
  ],
  keywords: ['ikala', 'waf', 'cdk', 'solution'],
  publishToPypi: {
    distName: 'ikala-cloud.aws-waf-solution',
    module: 'ikala-cloud.aws-waf-solution',
  },
  catalog: {
    announce: true,
  },
  stability: 'experimental',
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['kimisme9386-bot'],
  },
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
      secret: AUTOMATION_TOKEN,
    },
    ignoreProjen: false,
  },
  release: true,
});

project.eslint.addRules({
  'comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    },
  ],
});

const common_exclude = [
  'cdk.out',
  'cdk.context.json',
  'images',
  'yarn-error.log',
  'dependabot.yml',
];

project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

const common_include = ['/lambda/codepipeline-event/tsconfig.json'];

project.npmignore.include(...common_include);
project.gitignore.include(...common_include);

// integration test
const cdkDiffInteg = project.addTask('cdk:diff-integ', {
  description: 'cdk diff for integration test',
});

cdkDiffInteg.exec('cdk diff --app "npx ts-node --prefer-ts-exts src/integ.default.ts" -R --require-approval never --all');

const cdkDeployInteg = project.addTask('cdk:deploy-integ', {
  description: 'cdk diff for integration test',
});

cdkDeployInteg.exec('cdk deploy --app "npx ts-node --prefer-ts-exts src/integ.default.ts" -R --require-approval never --all');


// gitpod
const gitpodPrebuild = project.addTask('gitpod:prebuild', {
  description: 'Prebuild setup for Gitpod',
});
gitpodPrebuild.exec('yarn install --frozen-lockfile --check-files');
gitpodPrebuild.exec('npx projen upgrade');
gitpodPrebuild.exec('npm i -g aws-cdk');

let gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromFile('.gitpod.Dockerfile'),
  prebuilds: {
    addCheck: true,
    addBadge: true,
    addLabel: true,
    branches: true,
    pullRequests: true,
    pullRequestsFromForks: true,
  },
});

gitpod.addCustomTask({
  name: 'install package and check zsh and zsh plugin',
  init: `yarn gitpod:prebuild
sudo chmod +x ./.gitpod/oh-my-zsh.sh && ./.gitpod/oh-my-zsh.sh`,
});

gitpod.addCustomTask({
  name: 'change default shell to zsh and start zsh shell',
  command: 'sudo chsh -s $(which zsh) && zsh',
});

/* spellchecker: disable */
gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
  'streetsidesoftware.code-spell-checker-spanish'
);

project.synth();
