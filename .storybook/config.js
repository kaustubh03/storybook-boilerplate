import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/select.js');
}

configure(loadStories, module);
