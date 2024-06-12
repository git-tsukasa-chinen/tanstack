import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      // expanded: true, // Storybookの下のタブに「Description」や「Default」を表示
      presetColors: [
        {color: '#ff4785', title: 'Coral' },
        'rgba(0, 159, 183, 1)', '#fe4a49'
      ],
    },
  },
};

export default preview;
