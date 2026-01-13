import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { TEXT_SCALE_FACOTR } from "@/core/constants";

type Props<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    label?: string
    error?: string
    required?: boolean
}

export default function AppTextInput<TForm extends FieldValues>({ control, name, label, error, required, ...props }: Props<TForm>) {
    const { field: { onChange, value } } = useController({ control, name });
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View
            className="relative flex-row items-center justify-between border-2 border-primary-500 px-3  flex-1 rounded-2xl"
            style={{ direction: "rtl" }}>
            {label && (
                <View className="bg-white flex-row  absolute -top-3 right-6 z-10 px-2">
                    <Text className="text-secondary-500 font-cairo text-xs">{label}</Text>
                    {required && <Text className="text-error mr-1">*</Text>}
                </View>
            )            }
            <View style={{
                width: '100%',
                height: 47 * TEXT_SCALE_FACOTR,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TextInput
                    numberOfLines={1}
                    style={{ writingDirection: "rtl", textAlign: "right", height: '100%', flex:1, color: "black" }}
                    onChangeText={onChange}
                    value={value as string}
                    {...props}
                    secureTextEntry={props.secureTextEntry && !showPassword}
                />
            </View>
            {props.secureTextEntry && (
                <Pressable className="absolute end-2 z-10" hitSlop={10} onPress={() => setShowPassword(prevState => !prevState)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={error ? "#F1190E" : "#677185"} />
                </Pressable>
            )}
            {error && <Text className="absolute right-0 -bottom-6 text-error text-sm ms-2 font-bagel-regular">خطأ في الدخول!</Text>}
        </View>
    )
}