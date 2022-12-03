// MyForm.stories.ts
// Replace your-framework with the name of your framework
import type { Meta, StoryFn } from '@storybook/react'

import { Canvas } from './Canvas'

const meta: Meta<typeof Canvas> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Canvas',
  component: Canvas,
  argTypes: {
    onClick: { action: true },
  },
}

export default meta

/*
 * See https://storybook.js.org/docs/7.0/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */

const Template: StoryFn<typeof Canvas> = (args) => <Canvas />

export const Default = Template.bind({})
