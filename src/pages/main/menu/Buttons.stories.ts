import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Buttons";

const meta = {
	title: "Components/Buttons",
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: "Button",
	},
};

export const PrimaryLongName: Story = {
	args: {
		...Primary.args,
		label: "Primary with a really long name",
	},
};
