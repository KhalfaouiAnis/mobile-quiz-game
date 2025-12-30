import usePreferencesStore from '@/core/store/config.store';
import { Appearance } from 'react-native';
import { useEffect } from 'react';

export const ThemeSynchronizer = () => {
    const theme = usePreferencesStore((state) => state.theme);

    useEffect(() => {
        Appearance.setColorScheme(theme);
    }, [theme, Appearance.setColorScheme]);

    return null;
};