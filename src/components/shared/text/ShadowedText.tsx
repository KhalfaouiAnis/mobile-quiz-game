import React from 'react';
import { Defs, FeDropShadow, Filter, Svg, Text as SvgText } from 'react-native-svg';

interface Propss {
    content: string;
    fontSize?: number;
    fillColor?: string;
    dropsShadow?: { dx: string; dy: string };
}

export default function ShadowedText({
    content,
    fontSize = 27,
    fillColor = '#FFF900',
    dropsShadow = { dx: "0", dy: '4' }
}: Propss) {

    // We use a larger vertical padding to ensure the Filter (shadow) 
    // and descenders (y, g, p) aren't clipped.
    const height = fontSize * 1.5;
    // Estimate width based on character count + padding
    const width = (content.length * fontSize) * 0.8;

    return (
        <Svg
            height={height}
            width={width}
            viewBox={`0 0 ${width} ${height}`}
        >
            <Defs>
                <Filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
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
                fontSize={fontSize}
                fill={fillColor}
                stroke="#000000"
                strokeWidth="1"
                strokeLinejoin="round"
                fontFamily="BagelRegular"
                x="50%"
                y="50%"
                textAnchor="middle"
                alignmentBaseline="central"
                filter="url(#shadow)"
            >
                {content}
            </SvgText>
        </Svg>
    );
};