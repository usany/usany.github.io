import type { Meta, StoryObj } from '@storybook/react';

import Specific from './Specific';

const meta = {
  component: Specific,
} satisfies Meta<typeof Specific>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};