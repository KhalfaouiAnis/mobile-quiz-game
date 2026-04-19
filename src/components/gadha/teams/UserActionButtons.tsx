import { boxShadow } from '@/src/utils/cn';
import { scale, verticalScale } from '@/src/utils/dimensions';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoosterButton from '../buttons/BoosterButton';
import BlockUserButton from '../buttons/BlockUser';

const BOX_WIDTH = scale(103);
const BOX_HEIGHT = verticalScale(64);

const diagonal = Math.sqrt(Math.pow(BOX_WIDTH, 2) + Math.pow(BOX_HEIGHT, 2));
const angle = -Math.atan2(BOX_HEIGHT, BOX_WIDTH) * (180 / Math.PI);

interface UserActionButtonsProps {
    boost: {
        onPress: () => void;
        disabled?: boolean;
    }
    block: {
        onPress: () => void;
        disabled?: boolean;
    }
}

const UserActionButtons = ({ block, boost }: UserActionButtonsProps) => {
    return (
        <View style={[styles.card, styles.blueBase]}>
            <View style={styles.whiteBackground}>
                <View style={[
                    styles.diagonalLine,
                    { width: diagonal, transform: [{ rotate: `${angle}deg` }] }
                ]} />
                <View className='absolute top-0.5 end-0.5'>
                    <BlockUserButton {...block} />
                </View>
                <View className='absolute bottom-1 -start-0.5'>
                    <BoosterButton {...boost} />
                </View>
            </View>
        </View>
    );
};

export default UserActionButtons

const styles = StyleSheet.create({
    card: {
        boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow,
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        borderRadius: 12,
    },
    blueBase: {
        backgroundColor: '#00ADEF',
        padding: 6,
        overflow: 'hidden',
    },
    whiteBackground: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative"
    },
    diagonalLine: {
        position: 'absolute',
        height: 4,
        backgroundColor: '#00ADEF',
    },
});
