import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BotMateUIProvider } from '../src/components/Provider';

import { BmCard } from '../src/components/Card';
import { Box } from '@chakra-ui/react';

export default {
  title: 'Card',
  component: BmCard,
  parameters: {},
} as ComponentMeta<typeof BmCard>;

const Template: ComponentStory<typeof BmCard> = (args) => (
  <BotMateUIProvider>
    <Box bg="background" p={4}>
      <BmCard {...args} />
    </Box>
  </BotMateUIProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Awesome BotMate',
  subtitle: 'This is a subtitle',
  children: (
    <>
      <p>My card content</p>
    </>
  ),
};

export const WithShadow = Template.bind({});
WithShadow.args = {
  title: 'Awesome BotMate',
  subtitle: 'This is a subtitle',
  shadow: true,
  children: (
    <>
      <p>My card content</p>
    </>
  ),
};
