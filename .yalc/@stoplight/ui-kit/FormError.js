"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@blueprintjs/core");
const React = require("react");
const FormError = ({ errors }) => {
    if (!errors || !errors.length)
        return null;
    return (React.createElement(core_1.Callout, { intent: "danger", className: "mb-5", icon: null }, errors.map((err, i) => (React.createElement("div", { key: i }, err.message)))));
};
exports.FormError = FormError;
//# sourceMappingURL=FormError.js.map