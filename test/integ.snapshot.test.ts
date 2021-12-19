import { Template } from 'aws-cdk-lib/assertions';
import { IntegTesting } from '../src/integ.default';

test('integ snapshot validation', () => {
  const integ = new IntegTesting();
  integ.stack.forEach((stack) => {
    const t = Template.fromStack(stack);
    expect(t).toMatchSnapshot();
  });
});
