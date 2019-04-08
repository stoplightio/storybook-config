import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from '@stoplight/ui-kit';

storiesOf('Forms:Button', module)
  .addDecorator(withKnobs)

  .add('with defaults', () => {
    return <Button>Button Text</Button>;
  });
