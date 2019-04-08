import { CSSProperties } from 'react';
export declare const getScrollTransform: (client?: number, scroll?: number, currentLocation?: number, thumb?: number) => number;
export declare const getThumbDimension: ({ scroll, client }: {
    scroll?: number | undefined;
    client?: number | undefined;
}) => number;
export declare const horizontalTrackStyle: (style?: object | undefined) => CSSProperties;
export declare const verticalTrackStyle: (style?: object | undefined) => CSSProperties;
export declare const scrollToHash: (hash?: string | undefined) => void;
