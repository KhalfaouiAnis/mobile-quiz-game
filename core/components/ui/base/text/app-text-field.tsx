import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
    label?: string
    error?: string
}

export default function AppTextInput({ label, error, ...props }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View
            className="relative flex-row items-center justify-between border-2 border-primary-500 px-3 py-2 flex-1 rounded-2xl"
            style={{ direction: "rtl" }}>
            {label && <View className="bg-white absolute -top-3 right-6 z-10 px-2">
                <Text className="text-secondary-500">{label}</Text>
            </View>}
            <View style={{
                width: '90%',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TextInput
                    numberOfLines={1}
                    style={{ writingDirection: "rtl", textAlign: "right", height: '100%' }}
                    {...props}
                    secureTextEntry={props.secureTextEntry && !showPassword}
                />
            </View>
            {props.secureTextEntry && (
                <Pressable className="me-auto" hitSlop={6} onPress={() => setShowPassword(prevState => !prevState)}>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={error ? "#F1190E" : "#677185"} />
                </Pressable>
            )}
        </View>
    )
}