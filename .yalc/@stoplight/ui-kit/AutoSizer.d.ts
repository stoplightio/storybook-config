import { Omit } from '@stoplight/types';
import * as React from 'react';
interface IAutoSizerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    children: ({ width, height }: {
        width: React.ReactText;
        height: React.ReactText;
    }) => React.ReactNode;
}
declare const AutoSizer: React.FunctionComponent<IAutoSizerProps>;
export { AutoSizer, IAutoSizerProps };
