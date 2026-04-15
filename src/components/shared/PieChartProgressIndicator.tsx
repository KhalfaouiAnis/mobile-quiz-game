import React from 'react';
import Svg, { Path, Text as SvgText, G } from 'react-native-svg';

export default function PieChartProgressIndicator({ percentage = 0 }: { percentage?: number }) {
    const radius = 32;

    const colors = {
        primarySlice: '#00AAFF',
        secondarySlice: '#FFFFFF',
        text: '#000000'
    };

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    const createPieSlice = (startPercent: number, endPercent: number) => {
        const [startX, startY] = getCoordinatesForPercent(startPercent);
        const [endX, endY] = getCoordinatesForPercent(endPercent);

        const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;

        return [
            `M ${startX * radius} ${startY * radius}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX * radius} ${endY * radius}`,
            `L 0 0`,
        ].join(' ');
    };

    const startAngle = -0.25;
    const splitAngle = startAngle + (percentage / 100);
    const endAngle = startAngle + 1;

    const primaryPath = createPieSlice(startAngle, splitAngle);
    const secondaryPath = createPieSlice(splitAngle, endAngle);

    return (
        <Svg height={radius * 2} width={radius * 2} viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}>
            <G>
                <Path d={secondaryPath} fill={colors.secondarySlice} />
                <Path d={primaryPath} fill={colors.primarySlice} />
                <SvgText
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill={colors.text}
                    fontSize="18"
                    fontWeight="bold"
                >
                    {`${percentage}%`}
                </SvgText>
            </G>
        </Svg>
    );
}