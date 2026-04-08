import { useDropdown, useEnhancedDropdown } from "@/core/hooks/use-popup";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
    useController
} from "react-hook-form";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

type GlobalSelectOption = {
    label: string,
    value: string
}

export default function GameTimePicker({
    name,
    control,
    options,
}: any) {
    // const { triggerRef, coords, open, close, isVisible } = useDropdown()
    const { triggerRef, coords, open, close, isVisible, onDropdownLayout } =
        useEnhancedDropdown();
    const { field: { onChange, value }, fieldState: { error } } = useController({ control, name });

    const renderSelectOption = useCallback((option: GlobalSelectOption, handleSelect: any) => (
        <Pressable onPress={() => handleSelect(option)} style={[styles.selectOption, { backgroundColor: value === option.value ? "#FFF900" : "white" }]}>
            <Text className="text-center font-cairo">{option.label}</Text>
        </Pressable>
    ), [value])


    const handleSelect = useCallback((option: GlobalSelectOption) => {
        onChange(option.value);
        close();
    }, [onChange, close])

    const renderItem = ({ item }: { item: GlobalSelectOption }) => (
        renderSelectOption(item, handleSelect)
    )

    const keyExtractor = useCallback((item: GlobalSelectOption) => item.value, []);

    return (
        <View
            collapsable={false}
            style={{ direction: "rtl" }}>
            <Pressable
                onPress={open}
                ref={triggerRef}
                className="relative ps-4 self-center justify-center border-[0.5px] px-3"
                style={[styles.wrapper]}
            >
                <View className="flex-row items-center justify-center">
                    <Text className="">
                        {value}
                    </Text>
                </View>
            </Pressable>
            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={close}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={close} className="flex-1">
                    <View
                        onLayout={onDropdownLayout}
                        style={[
                            coords,
                            styles.dropdown,
                        ]}
                    >
                        <FlatList
                            data={options}
                            renderItem={renderItem}
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
    wrapper: {
        height: 48,
        width: 150,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: "#00A6DA",
        borderWidth: 4,
        ...boxShadow().button,
    },
    selectOption: {
        height: 30,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        ...boxShadow(0, 4, 9).button,
    },
    dropdown: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        ...boxShadow().button,
    },
    listContent: {
        gap: 12,
        padding: 6,
        paddingBottom: 12,
    },
});