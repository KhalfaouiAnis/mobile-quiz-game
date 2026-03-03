import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";
import { Controller, Control, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface Props {
  control: Control<CreateGame1SessionRequest>;
  name: Path<CreateGame1SessionRequest>;
  label: string
}

export const NameTextInput = ({ control, name, label }: Props) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value } }) => (
      <View
        style={[{ direction: "rtl" }]}>
        <Text className="text-gray-400 font-cairo text-sm mb-0.5 ms-2">{label}</Text>
        <TextInput
          style={{ width: 200 * VIEW_SCALE_FACTOR, height: 50 * VIEW_SCALE_FACTOR, writingDirection: "rtl", textAlign: "right", }}
          className="text-primary-500 font-cairo-bold bg-secondary-500 border border-error flex-row justify-center items-center rounded-lg"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value?.toString()}
        />
      </View>
    )}
  />
);