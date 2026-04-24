import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import ProfileLinkIcon from "@/src/components/layout/profile/ProfileLinkIcon";
import GenericModal from "@/src/components/shared/modal/GenericModalContent";
import ProfileHeader from "@/src/components/layout/profile/ProfileHeader";
import AppModal from "@/src/components/shared/modal/AppModal";
import Switch from "@/src/components/shared/button/switch";
import Container from "@/src/components/shared/Container";
import { useAuth } from "@/src/hooks/useAuth";
import { boxShadow } from "@/src/utils/cn";
import { queryClient } from "@/src/lib/query-client";

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [notifications, setNotifications] = useState(true)
    const { logout, isLoggingOut } = useAuth()

    const handleSignout = () => {
        logout();
        queryClient.clear()
    }

    return (
        <Container header={<ProfileHeader />}>
            <ScrollView
                className="mt-1"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="items-center my-2 pb-6 px-6"
            >
                <Pressable
                    style={boxShadow().button}
                    onPress={() => router.navigate("/(profile)/update")}
                    className="bg-white w-1/2 flex-row gap-6 items-center justify-between py-3 px-4 rounded-lg border border-secondary-500"
                >
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
                            onPress={() => router.navigate("/(profile)/(subscription)")}
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
                                <Switch value={notifications} onValueChange={setNotifications} />
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

                <Pressable
                    style={boxShadow().button}
                    onPress={() => setShowModal(true)}
                    className="bg-white w-1/2 flex-row gap-6 items-center justify-between py-3 px-4 rounded-lg border border-secondary-500"
                >
                    <ProfileLinkIcon bgColor="bg-error">
                        <Ionicons name="log-out-outline" className="rotate-180" color="white" size={24} />
                    </ProfileLinkIcon>
                    <View>
                        <Text className="font-cairo-medium">خروج</Text>
                    </View>
                    <View>
                        <Ionicons name="chevron-back" size={24} color="#00A6DA" />
                    </View>
                </Pressable>
            </ScrollView>
            <AppModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                content={<GenericModal
                    description="هل تريد حقا تسجيل الخروج؟"
                    cancelButton={{ title: "الغاء", action: () => setShowModal(false) }}
                    actionButton={{ title: "خروج", action: handleSignout, loading: isLoggingOut }}
                />}
            />
        </Container>
    );
}
