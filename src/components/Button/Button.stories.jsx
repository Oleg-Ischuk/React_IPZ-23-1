import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>{args.label}</Button>;

export const Primary = Template.bind({});
Primary.args = { label: 'Primary Button', variant: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { label: 'Secondary', variant: 'secondary' };

export const WithClick = Template.bind({});
WithClick.args = { label: 'Click me', variant: 'primary', onClick: () => alert('Clicked') };
