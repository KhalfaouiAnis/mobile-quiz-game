import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const OrSeparator = ({ label }: { label: string }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.textWrapper}>
                <Text style={styles.orText}>{label}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        height: 20,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#00A6DA',
        position: 'absolute',
    },
    textWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
    },
    orText: {
        fontWeight: '500',
        writingDirection: 'rtl',
    },
});
