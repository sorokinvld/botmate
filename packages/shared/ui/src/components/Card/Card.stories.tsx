import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BotMateUIProvider } from '../Provider';

import { BmCard } from '../Card';

export default {
  title: 'Card',
  component: BmCard,
  parameters: {},
} as ComponentMeta<typeof BmCard>;

const Template: ComponentStory<typeof BmCard> = (args) => (
  <BotMateUIProvider>
    <BmCard {...args} />
  </BotMateUIProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {};
Primary.args = {
  children: <>My Card commponent</>,
};
