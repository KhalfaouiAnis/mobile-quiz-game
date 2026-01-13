import ProfileHeader from "@/core/components/ui/layout/profile/profile-header";
import ProfileLinkIcon from "@/core/components/ui/layout/profile/profile-link-icon";
import Container from "@/core/components/ui/shared/container";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
    return (
        <Container backgroundColor="#00A6DA" header={<ProfileHeader />}>
            <ScrollView
                className="mt-4"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="items-center my-2 pb-6 px-6"
            >
                <Pressable
                    onPress={() => router.navigate("/(profile)/update")}
                    className="bg-white w-1/2 flex-row gap-6 items-center justify-between py-3 px-4 rounded-lg border border-secondary-500"
                    style={boxShadow().button}>
                    <ProfileLinkIcon>
                        <Ionicons name="person-outline" size={24} color="#00A6DA" />
                    </ProfileLinkIcon>
                    <View>
                        <Text className="font-cairo-medium">تعديل الملف الشخصي</Text>
                    </View>
                    <View>
                        <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                    </View>
                </Pressable>

                <View className="flex-row gap-6 my-4">
                    <View className="flex-1 bg-white items-center py-2 gap-y-4 rounded-lg border border-secondary-500">
                        <Pressable
                            onPress={() => router.navigate("/(profile)/(help)")}
                            className="bg-white flex-row w-full items-center justify-between py-2 px-4">
                            <ProfileLinkIcon>
                                <Ionicons name="card-outline" size={24} color="#00A6DA" />
                            </ProfileLinkIcon>
                            <View>
                                <Text className="font-cairo-medium">اشتراكي</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => router.navigate("/(profile)/(help)")}
                            className="bg-white flex-row w-full items-center justify-between py-2 px-4">
                            <ProfileLinkIcon>
                                <Ionicons name="call-outline" size={24} color="#00A6DA" />
                            </ProfileLinkIcon>
                            <View>
                                <Text className="font-cairo-medium">الدعم</Text>
                            </View>
                            <View >
                                <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                            </View>
                        </Pressable>
                    </View>
                    <View className="flex-1 bg-white items-center py-2 gap-y-4 rounded-lg border border-secondary-500">
                        <View
                            className="bg-white flex-row w-full items-center justify-between py-2 px-4">
                            <ProfileLinkIcon>
                                <Ionicons name="notifications" size={24} color="#00A6DA" />
                            </ProfileLinkIcon>
                            <View>
                                <Text className="font-cairo-medium">إشعارات</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                            </View>
                        </View>
                        <Pressable
                            onPress={() => router.navigate("/(profile)/history")}
                            className="bg-white flex-row w-full items-center justify-between py-2 px-4">
                            <ProfileLinkIcon>
                                <Ionicons name="refresh-outline" className="bg-white border border-primary-500 rounded-full" size={24} color="#00A6DA" />
                            </ProfileLinkIcon>
                            <View>
                                <Text className="font-cairo-medium">العابي السابقة</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                            </View>
                        </Pressable>
                    </View>
                </View>

                <View
                    className="bg-white w-1/2 flex-row gap-6 items-center justify-between py-3 px-4 rounded-lg border border-secondary-500"
                    style={boxShadow().button}>
                    <ProfileLinkIcon bgColor="bg-error">
                        <Ionicons name="log-out-outline" className="rotate-180" color="white" size={24} />
                    </ProfileLinkIcon>
                    <View>
                        <Text className="font-cairo-medium">خروج</Text>
                    </View>
                    <View>
                        <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
}
