import { useDropdown } from "react-native-anchor-dropdown";
import { boxShadow } from "@/src/utils/cn";
import { Ionicons } from "@expo/vector-icons";
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
import { GlobalSelectOption } from "@/src/types/index.types";

export default function GadhaGameTimePicker({
    name,
    control,
    options,
}: any) {
    const {
        triggerRef,
        coords,
        isVisible,
        onDropdownLayout,
        close,
        toggle,
    } = useDropdown({ maxHeight: 200, gap: 8, placement: "auto" });
    const { field: { onChange, value } } = useController({ control, name });

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
            className="items-center justify-center"
            style={{ direction: "rtl", width: 155, height: 50, borderRadius: 16, boxShadow: boxShadow().button.boxShadow }}>
            <Pressable
                onPress={toggle}
                ref={triggerRef}
                className="relative flex-row items-center justify-center"
                style={[styles.wrapper]}
            >
                <Text>
                    {options.find((o: any) => o.value === value)?.label}
                </Text>
                <Ionicons name="chevron-down" size={24} color="#00A6DA" className="absolute end-2 top-3.5" />
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
        width: 154,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderColor: "#00A6DA",
        borderWidth: 3,
        ...boxShadow(0, 2, 2).button,
    },
    selectOption: {
        height: 30,
        width: 120,
        borderRadius: 12,
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