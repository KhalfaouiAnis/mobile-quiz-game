// import { fontScale, scale, verticalScale } from '@/src/utils/dimensions';
// import React, { memo, useMemo } from 'react';
// import { Defs, FeDropShadow, Filter, Svg, Text as SvgText } from 'react-native-svg';

// interface Propss {
//     content: string;
//     uniqueId?: number;
//     fontSize?: number;
//     fillColor?: string;
//     dropsShadow?: { dx: string; dy: string };
// }

// const DEFAULT_SHADOW = { dx: "0", dy: '4' }

// export default memo(function ShadowedText({
//     content,
//     fontSize = 27,
//     fillColor = '#FFF900',
//     uniqueId,
//     dropsShadow = DEFAULT_SHADOW
// }: Propss) {

//     const height = useMemo(() => verticalScale(fontSize * 1.5), [fontSize]);
//     const width = useMemo(() => scale((content.length * fontSize) * 0.8), [content, fontSize]);

//     return (
//         <Svg
//             height={height} width={width} viewBox={`0 0 ${width} ${height}`}
//         >
//             <Defs>
//                 <Filter id={`shadow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
//                     <FeDropShadow
//                         dx={dropsShadow.dx}
//                         dy={dropsShadow.dy}
//                         stdDeviation="2"
//                         floodColor="#000"
//                         floodOpacity="0.13"
//                     />
//                 </Filter>
//             </Defs>

//             <SvgText
//                 fontSize={fontScale(fontSize)}
//                 fill={fillColor}
//                 stroke="#000000"
//                 strokeWidth="1"
//                 strokeLinejoin="round"
//                 fontFamily="BagelRegular"
//                 x="50%"
//                 y="50%"
//                 textAnchor="middle"
//                 alignmentBaseline="central"
//                 filter={`url(#shadow-${uniqueId})`}
//             >
//                 {content}
//             </SvgText>
//         </Svg>
//     );
// });

import { fontScale } from '@/src/utils/dimensions'
import { memo } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const STROKE_OFFSETS = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
] as const

const DEFAULT_SHADOW = { dx: 0, dy: 4 }

interface Props {
    content: string | number
    fontSize?: number
    fillColor?: string
    dropShadow?: { dx: number; dy: number }
}

const ShadowedText = memo(function ShadowedText({
    content,
    fontSize = 27,
    fillColor = '#FFF900',
    dropShadow = DEFAULT_SHADOW,
}: Props) {
    const baseStyle = { fontFamily: 'BagelRegular', fontSize: fontScale(fontSize) }

    return (
        <View style={styles.wrapper}>
            {STROKE_OFFSETS.map(([dx, dy], i) => (
                <Text
                    key={i}
                    numberOfLines={1}
                    style={[styles.stroke, baseStyle, { left: dx + 1, top: dy + 1, width: content === 4 ? "100%" : undefined }]}
                >
                    {content}
                </Text>
            ))}
            <Text
                style={[
                    baseStyle,
                    {
                        color: fillColor,
                        textShadowRadius: 2,
                        textShadowColor: 'rgba(0,0,0,0.13)',
                        textShadowOffset: { width: dropShadow.dx, height: dropShadow.dy },
                    },
                ]}
                numberOfLines={1}
            >
                {content}
            </Text>
        </View>
    )
})

export default ShadowedText

const styles = StyleSheet.create({
    wrapper: {
        padding: 1,
        alignSelf: 'center',
    },
    stroke: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
})