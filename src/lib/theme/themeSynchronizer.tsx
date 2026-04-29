import { useTheme } from '@react-navigation/native';
import { useColorScheme as useNativeWind } from 'nativewind';
import { useEffect } from 'react';

export const ThemeSynchronizer = () => {
    const { setColorScheme } = useNativeWind();
    const { dark } = useTheme();

    useEffect(() => {
        setColorScheme(dark ? 'dark' : 'light');
    }, [dark, setColorScheme]);

    return null;
};