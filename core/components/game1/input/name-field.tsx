import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Game1SetupValues } from "@/core/types/schema/game1";
import { Controller, Control, Path } from "react-hook-form";
import { TextInput } from "react-native";

interface Props {
  control: Control<Game1SetupValues>;
  name: Path<Game1SetupValues>;
  placeholder: string
}

export const NameTextInput = ({ control, name, placeholder }: Props) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        style={{ width: 200 * VIEW_SCALE_FACTOR, height: 50 * VIEW_SCALE_FACTOR }}
        className="text-primary-500 font-cairo-bold bg-secondary-500 border border-error flex-row justify-center items-center rounded-lg"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value?.toString()}
        placeholder={placeholder}
      />
    )}
  />
);