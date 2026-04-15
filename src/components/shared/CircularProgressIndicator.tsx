import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CircularProgressProps } from 'react-native-circular-progress-indicator/lib/typescript/types';

export default function CircularProgressIndicator({ value, radius = 32, ...props }: CircularProgressProps) {
    return (
        <CircularProgress
            inActiveStrokeColor={'#ECF0F3'}
            progressValueColor={'#1f2937'}
            activeStrokeColor={'#A4DD60'}
            inActiveStrokeOpacity={0.5}
            activeStrokeWidth={16}
            inActiveStrokeWidth={16}
            {...props}
            valuePrefix={'%'}
            value={value}
            radius={radius}
            duration={1000}
        />
    );
}
