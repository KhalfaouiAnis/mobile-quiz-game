// import Checkbox from "@/core/components/ui/input/checkbox";
// import InputWithIcon from "@/core/components/ui/input/input-with-icon";
// import { useSignIn } from "@/core/hooks/auth/useAuth";
// import { Link } from "expo-router";
// import { useTranslation } from "react-i18next";
// import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

// export default function SignInForm() {
//     const { t } = useTranslation("auth");
//     const { errors, handleSubmit, onSubmit, isSubmitting, control } = useSignIn();

//     return (
//         <View className="pt-20 px-4 pb-10">
//             <View className="gap-y-3">
//                 <InputWithIcon
//                     icon="call-outline"
//                     placeholder={t("phoneNumber")}
//                     name="phone"
//                     error={errors.phone?.message}
//                     control={control}
//                 />
//                 <InputWithIcon
//                     icon="lock-closed-outline"
//                     placeholder={t("password")}
//                     endIcon="eye-outline"
//                     name="password"
//                     error={errors.password?.message}
//                     secureTextEntry
//                     control={control}
//                 />
//             </View>
//             <View className="flex-row items-center justify-between mt-4">
//                 <View className="flex-row items-center gap-x-1">
//                     <Checkbox
//                         checked={false}
//                         size={28}
//                     />
//                     <Text className="text-base text-secondary-900 dark:text-white">{t("rememberMe")}</Text>
//                 </View>
//                 <Link href={"/(auth)/forgot_password"} className="items-center">
//                     <Text className="text-base dark:text-white">{t("passwordForgotten")}</Text>
//                 </Link>
//             </View>
//             <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-20"
//                 onPress={handleSubmit(onSubmit)}
//                 disabled={isSubmitting}
//             >
//                 <Text className="text-lg font-semibold text-secondary-900">
//                     {isSubmitting ? <ActivityIndicator size="small" color="#fff" /> : t("signIn")}
//                 </Text>
//             </TouchableOpacity>
//             <Link href={"/(auth)/signup"} className="items-center mt-4">
//                 <Text className="text-base text-center dark:text-white">{t("dontHaveAccount")} <Text className="text-primary-500 font-bold dark:text-white">{t("signUp")}</Text></Text>
//             </Link>
//         </View>
//     )
// }