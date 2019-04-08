import * as React from 'react';
declare type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
declare type ContextMenuEventFunc = (event: ContextMenuEvent) => void;
interface IContectMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    target: React.ReactElement;
    content: React.ReactElement;
    onContextMenuOpen?: ContextMenuEventFunc;
    onContextMenuClose?: ContextMenuEventFunc;
}
declare const ContextMenu: React.FunctionComponent<IContectMenuProps>;
export { ContextMenu, IContectMenuProps };
