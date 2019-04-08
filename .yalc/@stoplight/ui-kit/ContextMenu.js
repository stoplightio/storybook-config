"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@blueprintjs/core");
const React = require("react");
const ContextMenu = props => {
    const { target, content, onContextMenuOpen, onContextMenuClose } = props, rest = tslib_1.__rest(props, ["target", "content", "onContextMenuOpen", "onContextMenuClose"]);
    const onContextMenu = React.useCallback((event) => {
        if (onContextMenuOpen) {
            onContextMenuOpen(event);
        }
        core_1.ContextMenu.show(content, { left: event.clientX, top: event.clientY }, () => {
            if (onContextMenuClose) {
                onContextMenuClose(event);
            }
        });
    }, [content]);
    return (React.createElement("div", Object.assign({}, rest, { onContextMenu: onContextMenu }), target));
};
exports.ContextMenu = ContextMenu;
//# sourceMappingURL=ContextMenu.js.map