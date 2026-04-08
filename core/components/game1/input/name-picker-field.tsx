import { COMMON_TEAM_NAMES, TEXT_SCALE_FACOTR } from "@/core/constants";
import { usePopup } from "@/core/hooks/use-popup";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, Path } from "react-hook-form";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    View
} from "react-native";

interface Props {
    control: Control<CreateGame1SessionRequest>;
    name: Path<CreateGame1SessionRequest>;
    label: string
}
export default function TeamNamePicker({ control, name, label }: Props) {
    const { close, open, isVisible, triggerRef } = usePopup()

    const renderItem = ({ item }: {
        item: {
            id: string;
            teamName: string;
        }
    }) => (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <Pressable
                    className="flex-row items-center"
                    onPress={() => {
                        onChange(item.teamName);
                        close()
                    }}
                >
                    <Text
                        style={{ textAlign: "center", color: value === item.teamName ? "green" : undefined, }}
                    >
                        {item.teamName}
                    </Text>
                </Pressable>
            )}
        />
    );

    return (
        <View collapsable={false}>
            <Pressable
                hitSlop={6}
                onPress={open}
                ref={triggerRef}
                className="flex-row items-center gap-1 ps-1"
            >
                <Text>
                    {label}
                </Text>
                <Ionicons name="chevron-down" size={16 * TEXT_SCALE_FACOTR} color="#00A6DA" />
            </Pressable>

            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
            >
                <Pressable
                    onPress={close}
                    collapsable={false}
                    className="flex-1 items-center justify-center bg-black/20">
                    <View
                        className="bg-white p-4 dark:bg-darkish rounded-lg max-h-52">
                        <FlatList
                            contentContainerClassName="gap-y-4 px-4"
                            keyExtractor={(item) => item.id}
                            data={COMMON_TEAM_NAMES}
                            renderItem={renderItem}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}
