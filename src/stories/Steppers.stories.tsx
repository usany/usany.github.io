import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Steppers from 'src/stories/Steppers';
import { Header } from './Header';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const meta = {
  title: 'Example/Steppers',
  component: Steppers,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // args: {
  //   onLogin: fn(),
  //   onLogout: fn(),
  //   onCreateAccount: fn(),
  // },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const LoggedIn: Story = {
  args: {
    msgObj: {
      name: 'Jane Doe',
      round: 1,
      text: {
        choose: 1
      }
    },
  },
};

export const LoggedOut: Story = {
  args: {
    msgObj: {
      name: 'Jane Doe',
      round: 1,
      text: {
        choose: 2
      }
    },
  },
};
