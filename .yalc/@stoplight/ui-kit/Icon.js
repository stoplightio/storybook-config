"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const icons_1 = require("@blueprintjs/icons");
exports.IconNames = icons_1.IconNames;
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const FaIcon = (props) => {
    return React.createElement(react_fontawesome_1.FontAwesomeIcon, Object.assign({}, props));
};
exports.FaIcon = FaIcon;
const Icon = (props) => {
    return React.createElement(core_1.Icon, Object.assign({}, props));
};
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map