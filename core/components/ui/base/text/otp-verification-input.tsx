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
  gameCode?: boolean
};

export default function OTPVerificationInput({ numberOfElements, gameCode, onComplete }: OTPVerificationInputProps) {
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
          style={{
            width: gameCode ? 16 : 45,
            height: gameCode ? 26 : 45,
            borderWidth: gameCode ? undefined : 2,
            borderBottomWidth: gameCode ? 4 : undefined,
            borderColor: gameCode ? "#00A6DA" : '#FFF900',
            // borderEndEndRadius: gameCode ? 12: undefined,
            // borderStartStartRadius: gameCode ? 12: undefined,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 8,
            boxShadow: gameCode ? undefined : boxShadow().button.boxShadow,
          }}
        >
          <Text className='text-xl text-black text-center font-bagel-regular'>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};