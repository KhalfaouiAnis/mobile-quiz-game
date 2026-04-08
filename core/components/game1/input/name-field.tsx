import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { hideSystemBars } from "@/core/lib/navigation-bar";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";
import { Controller, Control, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface Props {
  control: Control<CreateGame1SessionRequest>;
  name: Path<CreateGame1SessionRequest>;
}

export const NameTextInput = ({ control, name }: Props) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <View>
        <TextInput
          className="text-primary-500 font-cairo-bold bg-secondary-500 border border-error flex-row justify-center items-center rounded-lg ps-4"
          style={{ width: 200 * VIEW_SCALE_FACTOR, height: 50 * VIEW_SCALE_FACTOR, writingDirection: "rtl", textAlign: "right", }}
          value={value?.toString()}
          onChangeText={onChange}
          onBlur={hideSystemBars}
        />
        {error && <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ maxWidth: 200 * TEXT_SCALE_FACOTR }}
          className="text-error text-sm text-center font-cairo mt-1">
          {error.message}
        </Text>}
      </View>
    )}
  />
);