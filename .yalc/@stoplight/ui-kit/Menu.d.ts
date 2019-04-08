import { IMenuDividerProps as BPMenuDividerProps, IMenuItemProps as BPMenuItemProps, IMenuProps as BPMenuProps } from '@blueprintjs/core';
import * as React from 'react';
interface IMenuProps extends BPMenuProps {
}
declare const Menu: React.FunctionComponent<IMenuProps>;
interface IMenuItemProps extends BPMenuItemProps {
}
declare const MenuItem: React.FunctionComponent<IMenuItemProps>;
interface IMenuDividerProps extends BPMenuDividerProps {
}
declare const MenuDivider: React.FunctionComponent<IMenuDividerProps>;
export { IMenuDividerProps, IMenuItemProps, IMenuProps, MenuDivider, MenuItem, Menu };
