import Svg, { Text as SvgText } from 'react-native-svg';

interface Props {
    strokeColor?: string;
    content?: string | number;
    size?: string | number
}

const StrokeText = ({ strokeColor = "#F1190E", content = "x2", size = 24 }: Props) => (
    <Svg height={size} width={size} viewBox="0 0 40 40">
        <SvgText
            fill="white"
            stroke={strokeColor}
            strokeWidth="1.5"
            fontSize={size}
            fontFamily='BagelRegular'
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
        >
            {content}
        </SvgText>
    </Svg>
);

export default StrokeText;