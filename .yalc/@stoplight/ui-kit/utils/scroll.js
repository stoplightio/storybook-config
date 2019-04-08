"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replace = require("lodash/replace");
exports.getScrollTransform = (client = 0, scroll = 0, currentLocation = 0, thumb = 0) => {
    const trackSize = client - 28;
    return (currentLocation / (scroll - client)) * (trackSize - thumb);
};
exports.getThumbDimension = ({ scroll = 0, client = 0 }) => {
    if (scroll < client)
        return 0;
    const track = client - 28;
    const height = Math.ceil((client / scroll) * track);
    return Math.max(height, 30);
};
exports.horizontalTrackStyle = (style) => (Object.assign({ background: 'transparent', position: 'absolute', cursor: 'pointer', right: 10, bottom: 2, left: 2 }, style));
exports.verticalTrackStyle = (style) => (Object.assign({ background: 'transparent', position: 'absolute', cursor: 'pointer', top: 2, right: 2, bottom: 10 }, style));
exports.scrollToHash = (hash) => {
    const element = document.getElementById(replace(hash || window.location.hash, '#', ''));
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
};
//# sourceMappingURL=scroll.js.map