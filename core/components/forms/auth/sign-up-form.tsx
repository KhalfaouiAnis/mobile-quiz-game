// import Checkbox from "@/core/components/ui/input/checkbox";
// import InputWithIcon from "@/core/components/ui/input/input-with-icon";
// import PhoneInput from "@/core/components/ui/input/phone-input";
// import { PROVINCES } from "@/core/constants";
// import { useSignUp } from "@/core/hooks/auth/useAuth";
// import { Link } from "expo-router";
// import { useWatch } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
// import AreaSelector from "../../ui/input/area-selector";
// import ProvinceSelector from "../../ui/input/province-selector";
// import { renderProvinceAreaOption } from "../../ui/shared/render-option";

// export default function SignUpForm() {
//     const { t } = useTranslation("auth");
//     const { control, handleSubmit, onSubmit, isSubmitting, errors } = useSignUp()
//     const province = useWatch({ control, name: "province" })
//     const Areas = PROVINCES.find(prov => prov.province === province?.province)?.areas || []

//     return (
//         <View className="pt-8 px-4 pb-10">
//             <View className="gap-y-3">
//                 <InputWithIcon
//                     control={control}
//                     name="fullname"
//                     icon="person-outline"
//                     placeholder={t("yourName")}
//                     requiredMark
//                     error={errors.fullname?.message}
//                 />
//                 <PhoneInput
//                     control={control}
//                     placeHolder={t("phoneNumber")}
//                     name="phone"
//                     error={errors.phone?.message}
//                 />
//                 <InputWithIcon
//                     control={control}
//                     name="password"
//                     secureTextEntry
//                     icon="lock-closed-outline"
//                     placeholder={t("yourPass")}
//                     requiredMark
//                     endIcon="eye-outline"
//                     error={errors.password?.message}
//                 />
//                 <InputWithIcon
//                     control={control}
//                     name="email"
//                     icon="mail-outline"
//                     placeholder={t("yourEmail")}
//                     error={errors.email?.message}
//                 />
//                 <ProvinceSelector
//                     control={control}
//                     name="province"
//                     primary
//                     required
//                     options={PROVINCES}
//                     renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
//                     placeholder={t("yourProvince")}
//                 />
//                 <AreaSelector
//                     control={control}
//                     name="area"
//                     options={Areas}
//                     primary
//                     renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
//                     placeholder={t("yourArea")}
//                 />
//             </View>
//             <View className="flex-row items-center justify-between mt-2">
//                 <View className="flex-row items-center gap-x-1">
//                     <Checkbox
//                         checked={false}
//                         size={28}
//                         color="#4CAF50"
//                     />
//                     <Text className="text-base text-secondary-900 dark:text-white">{t("rememberMe")}</Text>
//                 </View>
//             </View>

//             <TouchableOpacity className="bg-primary-500 py-3 rounded-lg items-center mt-6"
//                 onPress={handleSubmit(onSubmit)}
//                 disabled={isSubmitting}
//             >
//                 <Text className="text-lg font-semibold text-secondary-900 dark:text-white">
//                     {isSubmitting ? <ActivityIndicator size="small" color="primary" /> : t("signUp")}
//                 </Text>
//             </TouchableOpacity>
//             <Link href={"/(auth)/signin"} className="items-center mt-4">
//                 <Text className="text-base text-center dark:text-white">{t("haveAccount")} <Text className="text-primary-500 font-bold dark:text-white">{t("signIn")}</Text> </Text>
//             </Link>
//         </View>
//     )
// }