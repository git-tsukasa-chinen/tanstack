import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from "@storybook/jest";

import { CheckboxCell } from '../../app/components/TanStackTable/Cell/CheckboxCell';

const meta: Meta<typeof CheckboxCell> = {
  title: 'Atoms/Cell/CheckboxCell',
  component: CheckboxCell,
  argTypes: {
    checked: {
      table: {
        disable: true,
      },
    },
    indeterminate: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    }
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
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
  },
  args: {
    checked: false,
    indeterminate: false,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await waitFor(() => expect(checkbox).toBeInTheDocument());
    await waitFor(() => expect(checkbox).not.toBeChecked());
  }
};

export const Checked: Story = {
  argTypes: {
    checked: {
      table: {
        disable: true,
      },
    },
    indeterminate: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    }
  },
  play: async (context) => {
    Primary.play?.(context);

    const canvas = within(context.canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await userEvent.click(checkbox);
    await waitFor(() => expect(checkbox).toBeChecked());
    await waitFor(() => expect(canvas.getByTestId('CheckBoxIcon')).toBeInTheDocument());

  }

}
export const Indeterminate: Story = {
  play: async (context) => {

    Primary.play?.(context);

    const canvas = within(context.canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    // await waitFor( () =>
    //   expect(checkbox).toHaveAttribute('data-indeterminate', true.toString())
    // );
    // await waitFor(() => expect(canvas.getByTestId('IndeterminateCheckBoxIcon')).toBeInTheDocument());

  }

}
