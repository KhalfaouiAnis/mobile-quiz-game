import { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';

const Container = ({ children, backgroundColor, header }:
    PropsWithChildren<{ backgroundColor?: string, header?: ReactNode }>
) => {
    return (
        <View style={{ backgroundColor: backgroundColor || "#00A6DA", flex: 1, direction: "rtl" }}>
            {header && header}
            {children}
        </View>
    );
};

export default Container;
