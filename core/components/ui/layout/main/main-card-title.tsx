import { TEXT_SCALE_FACOTR } from '@/core/constants';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MainCardTitle = ({ title }: { title: string }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.textWrapper}>
                <Text className='font-cairo-bold' style={styles.orText}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#F1190E',
        position: 'absolute',
    },
    textWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
    },
    orText: {
        fontWeight: '500',
        writingDirection: 'rtl',
        color: "#00A6DA",
        fontSize: 16 * TEXT_SCALE_FACOTR
    },
});
