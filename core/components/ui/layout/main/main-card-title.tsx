import { TEXT_SCALE_FACOTR } from '@/core/constants';
import { moderateScale } from '@/core/utils/sizes';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MainCardTitle = ({ title }: { title: string }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.textWrapper}>
                <Text className='font-cairo-bold' style={styles.text}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        width: '100%',
        position: 'absolute',
        backgroundColor: '#F1190E',
    },
    textWrapper: {
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    text: {
        color: "#00A6DA",
        fontWeight: '500',
        writingDirection: 'rtl',
        fontSize: moderateScale(16) * TEXT_SCALE_FACOTR
    },
});
