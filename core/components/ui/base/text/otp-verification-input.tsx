import { boxShadow } from '@/core/utils/cn';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

type OTPVerificationInputProps = {
  onComplete: (code: string) => void;
  numberOfElements: number
};

export default function OTPVerificationInput({ numberOfElements, onComplete }: OTPVerificationInputProps) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: numberOfElements });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onChangeText = (text: string) => {
    setValue(text)
    if (text.length === numberOfElements) {
      onComplete(text)
    }
  }

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={onChangeText}
      cellCount={numberOfElements}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete="one-time-code"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          onLayout={getCellOnLayoutHandler(index)}
          style={[styles.cell]}
        >
          <Text className='text-xl text-black text-center font-bagel-regular'>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: '#FFF900',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    boxShadow: boxShadow().button.boxShadow,
  },
});
