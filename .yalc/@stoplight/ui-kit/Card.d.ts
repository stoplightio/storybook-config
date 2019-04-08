import { Elevation as CardElevation, ICardProps as BPCardProps } from '@blueprintjs/core';
import * as React from 'react';
interface ICardProps extends BPCardProps {
}
declare const Card: React.FunctionComponent<ICardProps>;
export { Card, CardElevation, ICardProps };
