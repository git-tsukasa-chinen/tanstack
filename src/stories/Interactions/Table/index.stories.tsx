import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from "@storybook/jest";

import {rows, columns} from '@/app/components/TanStackTable/Data';
import TanStackTable from '@/app/components/TanStackTable';
/**
 * TanStack Table は headless UIです。"機能"のみを提供し、デザインはユーザーが自由にカスタマイズできます。
 */
const meta: Meta<typeof TanStackTable> = {
  title: 'Interaction Tests/Table',
  component: TanStackTable,
  tags: ['autodocs'], // このStoriesのドキュメンをを自動生成
  parameters: {
    controls: {
      sort: 'requiredFirst'
    },
    description: {
      docs: {
        component: 'コメントがDocに反映される',
      }
    },
  },
  argTypes: { // constrolsの設定
    columns: {
      table: {disable: true},
    },
    data: {
      table: {disable: true}
    },
    columnHeight: {
      description: 'カラムの高さ',
      table: {
        defaultValue: {summary: '50'},
      }
    },
  }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: rows,
    columns: columns,
    columnHeight: 50,
    rowHeight: 50,
    checkboxSelection: true,
    enableMultiRowSelection: true,
    enableRowSelection: () => true,
    enableRowSelectionOnClick: true,
    enableSorting: true,
    enableMultiSort: true,
    sortDescFirst: false
  }
}