"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const scroll_1 = require("../utils/scroll");
exports.useScrollToHash = (elementId) => {
    const targetScrollTo = elementId || (typeof window !== 'undefined' ? window.location.hash : null);
    React.useEffect(() => {
        if (targetScrollTo) {
            scroll_1.scrollToHash(targetScrollTo);
        }
    }, [targetScrollTo]);
};
//# sourceMappingURL=useScrollToHash.js.map