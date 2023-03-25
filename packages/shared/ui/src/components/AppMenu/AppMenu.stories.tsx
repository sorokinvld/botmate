import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChakraProvider } from '../..';
import { theme } from '../../theme';
import { HiHome } from 'react-icons/hi';

import { AppMenu } from './AppMenu';
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
