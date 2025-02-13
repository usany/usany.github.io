import type { Meta, StoryObj } from '@storybook/react';

import Switches from './Switches';

const meta = {
  component: Switches,
} satisfies Meta<typeof Switches>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};