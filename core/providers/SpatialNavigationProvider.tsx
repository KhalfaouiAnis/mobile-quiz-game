import React, { createContext, useContext, useEffect } from 'react';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { isTV } from '../utils/platform';

interface SpatialNavigationConfig {
    /** Whether to log debug info to the console. Off by default. */
    debug?: boolean;
    /** Whether to visually highlight focus zones. Off by default. */
    visualDebug?: boolean;
    /**
     * In React Native (TV), the native engine handles element measurement,
     * so we must disable the DOM-based measurement that norigin uses on web.
     * Always true for TV builds.
     */
    nativeMode?: boolean;
}

const SpatialNavigationContext = createContext<{ isReady: boolean }>({
    isReady: false,
});

export const useSpatialNavigation = () => useContext(SpatialNavigationContext);

interface Props extends SpatialNavigationConfig {
    children: React.ReactNode;
}

/**
 * SpatialNavigationProvider
 *
 * Wrap the root of your app with this. It initialises the norigin spatial
 * navigation engine once on mount. On TV, `nativeMode` is forced to true so
 * the library does not attempt DOM-based measurements.
 */
export const SpatialNavigationProvider: React.FC<Props> = ({
    children,
    debug = false,
    visualDebug = false,
    nativeMode,
}) => {
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        init({
            debug,
            visualDebug,
            // Force native mode on TV — skips getBoundingClientRect calls
            nativeMode: nativeMode !== undefined ? nativeMode : isTV,
        });
        setIsReady(true);
    }, []);

    return (
        <SpatialNavigationContext.Provider value={{ isReady }}>
            {children}
        </SpatialNavigationContext.Provider>
    );
};
