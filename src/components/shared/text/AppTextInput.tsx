import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { hideSystemBars } from "@/src/lib/navigation-bar";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { scale, verticalScale } from "@/src/utils/dimensions";

type Props<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    label?: string
    error?: string
    required?: boolean
    phone?: boolean
    boxShadow?: {
        offsetX: number;
        offsetY: number;
        blurRadius: number;
        spreadDistance: number;
        color: string;
    }[]
}

export default function AppTextInput<TForm extends FieldValues>({ control, name, label, required, phone, boxShadow, ...props }: Props<TForm>) {
    const { field: { onChange, value }, fieldState: { error } } = useController({ control, name });
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View
            className="relative flex-row items-center justify-between border-2 px-3  flex-1 rounded-2xl"
            style={{ boxShadow, direction: "rtl", borderColor: error ? "#F1190E" : "#00A6DA" }}>
            {label && (
                <View className="bg-white flex-row  absolute -top-3 right-6 z-10 px-2">
                    <Text className="text-gray-400 font-cairo text-xs">{label}</Text>
                    {required && <Text className="text-error mr-1">*</Text>}
                </View>
            )}
            <View style={{
                height: verticalScale(54),
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                {phone && (
                    <View className="flex-row items-center gap-1">
                        <Text className="ms-3 text-lg">🇰🇼</Text>
                        <Ionicons name="chevron-down" color={"black"} size={20} />
                    </View>
                )}
                <TextInput
                    style={{ writingDirection: "rtl", textAlign: "right", height: verticalScale(54), flex: 1, color: "black" }}
                    onChangeText={onChange}
                    value={value as string}
                    onBlur={hideSystemBars}
                    numberOfLines={1}
                    {...props}
                    secureTextEntry={props.secureTextEntry && !showPassword}
                />
            </View>
            {props.secureTextEntry && (
                <Pressable className="absolute end-2 z-10" hitSlop={10} onPress={() => setShowPassword(prevState => !prevState)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={error ? "#F1190E" : "#677185"} />
                </Pressable>
            )}
            {error && <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ maxWidth: scale(400) }}
                className="absolute right-0 -bottom-6 text-error text-sm ms-2 font-bagel-regular">
                {error.message}
            </Text>}
        </View>
    )
}