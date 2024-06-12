import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from "@storybook/jest";

import { CheckboxCell } from '@/app/components/TanStackTable/Cell/CheckboxCell';

const meta: Meta<typeof CheckboxCell> = {
  title: 'Components/Cells/CheckboxCell',
  component: CheckboxCell,
  argTypes: {
    checked: {
      table: {
        disable: false,
      },
    },
    indeterminate: {
      table: {
        disable: false,
      },
    },
    onClick: {
      table: {
        disable: false,
      },
    },
    onChange: {
      table: {
        disable: false,
      },
    }
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    indeterminate: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    indeterminate: false,
  },
}
export const Indeterminate: Story = {
  args: {
    checked: false,
    indeterminate: true,
  },
}
