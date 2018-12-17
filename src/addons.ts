require('@storybook/addon-knobs/register');
require('@storybook/addon-actions/register');
require('@storybook/addon-links/register');
require('@storybook/addon-options/register');
import { register } from './custom-addons/withThemes/register';

export { register as setupThemes };
