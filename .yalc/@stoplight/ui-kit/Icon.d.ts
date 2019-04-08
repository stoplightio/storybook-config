import * as React from 'react';
import { IIconProps as BPIconProps } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Props as FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
interface IFaIconProps extends FontAwesomeIconProps {
}
declare const FaIcon: React.FunctionComponent<IFaIconProps>;
interface IIconProps extends BPIconProps {
}
declare const Icon: React.FunctionComponent<IIconProps>;
export { Icon, IconNames, IIconProps, IFaIconProps, FaIcon };
