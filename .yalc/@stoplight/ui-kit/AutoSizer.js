"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const use_resize_observer_1 = require("use-resize-observer");
const AutoSizer = props => {
    const { children } = props, rest = tslib_1.__rest(props, ["children"]);
    const [ref, width = '100%', height = '100%'] = use_resize_observer_1.default();
    return (React.createElement("div", Object.assign({}, rest, { ref: ref }), children({ width, height })));
};
exports.AutoSizer = AutoSizer;
//# sourceMappingURL=AutoSizer.js.map