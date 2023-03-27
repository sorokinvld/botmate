import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChakraProvider } from '../src';
import { theme } from '../src/theme';
import { HiHome } from 'react-icons/hi';

import { AppMenu } from '../src/components/AppMenu/AppMenu';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'AppMenu',
  component: AppMenu,
} as ComponentMeta<typeof AppMenu>;

const Template: ComponentStory<typeof AppMenu> = (args) => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AppMenu {...args} />
    </BrowserRouter>
  </ChakraProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
