import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '../src/components/Select/Select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];



storiesOf('Select', module)
  .add('Default', () => (
    <Select
      options={options}
      placeholder={'Select'}
      multiselect
      onChange={value => alert(`Selected Value ${JSON.stringify(value)}`)}
    />
  ))
  .add('Single Select', () => (
    <Select
      options={options}
      placeholder={'Select'}
      onChange={value => alert(`Selected Value ${JSON.stringify(value)}`)}
    />
  ));
