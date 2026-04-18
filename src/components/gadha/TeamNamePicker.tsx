import { COMMON_TEAM_NAMES } from "@/src/constants";
import { hideSystemBars } from "@/src/lib/navigation-bar";
import { CreateGadhaGameSession } from "@/src/types/game.gadha.types";
import { GlobalSelectOption } from "@/src/types/index.types";
import { boxShadow } from "@/src/utils/cn";
import { fontScale, verticalScale } from "@/src/utils/dimensions";
import { moderateScale, scale } from "@/src/utils/sizes";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Control, Path, useController } from "react-hook-form";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { useDropdown } from "react-native-anchor-dropdown";

interface Props {
    control: Control<CreateGadhaGameSession>;
    name: Path<CreateGadhaGameSession>;
}
export default function TeamNamePicker({ control, name }: Props) {
    const { field: { onChange, value }, fieldState: { error } } = useController({ control, name });

    const {
        triggerRef,
        coords,
        isVisible,
        onDropdownLayout,
        close,
        toggle,
    } = useDropdown({ maxHeight: 200, gap: 8, placement: "auto" });

    const renderItem = ({ item }: {
        item: GlobalSelectOption
    }) => (renderSelectOption(item, handleSelect));

    const renderSelectOption = useCallback((option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)} style={[styles.selectOption, { backgroundColor: value === option.value ? "#FFF900" : "white" }]}>
            <Text className="text-center font-cairo">{option.label}</Text>
        </Pressable>
    ), [value])


    const handleSelect = useCallback((option: GlobalSelectOption) => {
        onChange(option.value);
        close();
    }, [onChange, close])

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.value, []);

    return (
        <View collapsable={false}>
            <View
                className="bg-secondary-500 border border-error"
                style={{ boxShadow: boxShadow().button.boxShadow, width: scale(295), height: verticalScale(60), position: "relative", borderRadius: 8 }}
            >
                <TextInput
                    className="text-primary-500 font-cairo-bold rounded-lg ps-4"
                    style={{ width: scale(200), height: verticalScale(60), writingDirection: "rtl", textAlign: "right", fontSize: fontScale(20) }}
                    value={value?.toString()}
                    onChangeText={onChange}
                    onBlur={hideSystemBars}
                    maxLength={20}
                />
                <Pressable
                    hitSlop={10}
                    onPress={toggle}
                    ref={triggerRef}
                    className="flex-row items-center gap-1 ps-1"
                    style={{ position: "absolute", end: 10, top: verticalScale(18), zIndex: 2 }}
                >
                    <Ionicons name="chevron-down" size={moderateScale(24)} color="#00A6DA" />
                </Pressable>
                {error && <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ maxWidth: scale(200), fontSize: moderateScale(14) }}
                    className="text-error text-center font-cairo mt-1">
                    {error.message}
                </Text>}
            </View>

            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={close}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={close} className="flex-1">
                    <View
                        onLayout={onDropdownLayout}
                        style={[coords, styles.dropdown]}
                    >
                        <FlatList
                            renderItem={renderItem}
                            data={COMMON_TEAM_NAMES}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    selectOption: {
        height: verticalScale(30),
        width: "auto",
        borderRadius: 12,
        paddingHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
        ...boxShadow(0, 4, 9).button,
    },
    dropdown: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 20,
        width: "auto",
        padding: 4,
        ...boxShadow().button,
    },
    listContent: {
        gap: 12,
        padding: 6,
        paddingBottom: 12,
    },
});