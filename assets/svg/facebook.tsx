import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export default function FacebookIcon({ size = 40 }) {
    return (
        <Svg width={size} height={size} fill="none" viewBox="0 0 53 55">
            <Path
                fill="#0163E0"
                d="M52.5 26.25C52.5 40.7475 40.7475 52.5 26.25 52.5C11.7525 52.5 0 40.7475 0 26.25C0 11.7525 11.7525 0 26.25 0C40.7475 0 52.5 11.7525 52.5 26.25Z"
            />
            <Path
                fill="white"
                d="M36.0257 36.6779L37.1917 29.269H29.8973V24.4631C29.8973 22.4357 30.9144 20.4583 34.1815 20.4583H37.5V14.1506C37.5 14.1506 34.4897 13.65 31.613 13.65C25.6028 13.65 21.6781 17.1993 21.6781 23.6221V29.269H15V36.6779H21.6781V54.5897C23.0188 54.7949 24.3904 54.9 25.7877 54.9C27.185 54.9 28.5566 54.7949 29.8973 54.5897V36.6779H36.0257Z"
            />
            <Defs>
                <LinearGradient id="paint0_linear_258_358" x1="26.25" y1="0" x2="26.25" y2="52.3443" gradientUnits="userSpaceOnUse">
                    <Stop stop-color="#18ACFE" />
                    <Stop offset="1" stop-color="#0163E0" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}

