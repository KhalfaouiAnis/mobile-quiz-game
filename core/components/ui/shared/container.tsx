import { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = ({ children, backgroundColor, header }:
    PropsWithChildren<{ backgroundColor?: string, header?: ReactNode }>
) => {
    const { bottom } = useSafeAreaInsets()
    return <SafeAreaView
        edges={['left', 'right', "bottom", "top"]}
        style={{ marginBottom: bottom, backgroundColor: backgroundColor || "#00A6DA", flex: 1, direction: "rtl", paddingTop: 2 }}
    >
        {header && header}
        {children}
    </SafeAreaView>;
};

export default Container;
