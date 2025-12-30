import Svg, { Path, Rect, Text } from 'react-native-svg';

export default function SubscriptionPlan({ recColor = '#FAED02', textColor = "black", price = 0 }) {
    return (
        <Svg width="123" height="154" viewBox="0 0 123 181" fill="none">
            <Path d="M24.5 0L41.3875 29.25H7.6125L24.5 0Z" fill="black" />
            <Rect x="25" y="0" width="71" height="122" fill={recColor} />
            <Text
                fill={textColor}
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                x="60.5"
                y="20"
            >
                {price}
            </Text>
            <Path d="M61.5 42L114.761 146.25H8.23944L61.5 42Z" fill="#FEFEFC" />
        </Svg>
    );
}
