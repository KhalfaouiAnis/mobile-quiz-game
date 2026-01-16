import AppButton from "@/core/components/ui/base/button/app-button";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import ProfileLinkIcon from "@/core/components/ui/layout/profile/profile-link-icon";
import Container from "@/core/components/ui/shared/container";
import { TEXT_SCALE_FACOTR } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Guest() {
    return (
        <Container header={<AuthHeader showLogo={false} />}>
            <View className='-mt-2 flex-row items-center justify-center gap-6'>
                <View className='relative bg-white p-4 rounded-full border-2 border-secondary-500'>
                    <Feather name="user" size={60 * TEXT_SCALE_FACOTR} color="#00A6DA" />
                </View>
                <Text className='text-white font-cairo-semibold text-3xl'>
                    زائر
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="items-center pb-10" className="px-6 pt-6">
                <Pressable
                    onPress={() => router.navigate("/(main)/(profile)/update")}
                    className="bg-white w-1/2 flex-row items-center py-3 px-4 rounded-lg border border-secondary-500"
                    style={boxShadow().button}>
                    <ProfileLinkIcon>
                        <Ionicons name="person-outline" size={24} color="#00A6DA" />
                    </ProfileLinkIcon>
                    <View className="ms-8">
                        <Text className="font-cairo-medium text-xl">نبذة عنا </Text>
                    </View>
                    <View className="ms-auto">
                        <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                    </View>
                </Pressable>
                <View
                    style={boxShadow().button}
                    className="flex-1 w-1/2 my-4 bg-white items-center py-2 gap-y-4 rounded-lg border border-secondary-500">
                    <Pressable
                        onPress={() => router.navigate("/(main)/(profile)/(help)")}
                        className="bg-white flex-row w-full items-center py-2 px-4">
                        <ProfileLinkIcon>
                            <Ionicons name="card-outline" size={24} color="#00A6DA" />
                        </ProfileLinkIcon>
                        <View className="ms-8">
                            <Text className="font-cairo-medium text-xl">سياسة الخصوصية</Text>
                        </View>
                        <View className="ms-auto">
                            <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => router.navigate("/(main)/(profile)/(help)")}
                        className="bg-white flex-row w-full items-center py-2 px-4">
                        <ProfileLinkIcon>
                            <Ionicons name="call-outline" size={24} color="#00A6DA" />
                        </ProfileLinkIcon>
                        <View className="ms-8">
                            <Text className="font-cairo-medium text-xl">الدعم</Text>
                        </View>
                        <View className="ms-auto">
                            <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                        </View>
                    </Pressable>
                </View>
                <View className="w-1/4">
                    <AppButton
                        title="تسجيل الدخول"
                        onPress={() => router.navigate("/(auth)/signup")} />
                </View>
            </ScrollView>
        </Container>
    );
}
