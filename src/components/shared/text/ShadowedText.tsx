import { fontScale, scale, verticalScale } from '@/src/utils/dimensions';
import React, { memo, useMemo } from 'react';
import { Defs, FeDropShadow, Filter, Svg, Text as SvgText } from 'react-native-svg';

interface Propss {
    content: string;
    uniqueId?: number;
    fontSize?: number;
    fillColor?: string;
    dropsShadow?: { dx: string; dy: string };
}

const DEFAULT_SHADOW = { dx: "0", dy: '4' }

export default memo(function ShadowedText({
    content,
    fontSize = 27,
    fillColor = '#FFF900',
    uniqueId,
    dropsShadow = DEFAULT_SHADOW
}: Propss) {

    const height = useMemo(() => verticalScale(fontSize * 1.5), [fontSize]);
    const width = useMemo(() => scale((content.length * fontSize) * 0.8), [content, fontSize]);

    return (
        <Svg
            height={height} width={width} viewBox={`0 0 ${width} ${height}`}
        >
            <Defs>
                <Filter id={`shadow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
                    <FeDropShadow
                        dx={dropsShadow.dx}
                        dy={dropsShadow.dy}
                        stdDeviation="2"
                        floodColor="#000"
                        floodOpacity="0.13"
                    />
                </Filter>
            </Defs>

            <SvgText
                fontSize={fontScale(fontSize)}
                fill={fillColor}
                stroke="#000000"
                strokeWidth="1"
                strokeLinejoin="round"
                fontFamily="BagelRegular"
                x="50%"
                y="50%"
                textAnchor="middle"
                alignmentBaseline="central"
                filter={`url(#shadow-${uniqueId})`}
            >
                {content}
            </SvgText>
        </Svg>
    );
});