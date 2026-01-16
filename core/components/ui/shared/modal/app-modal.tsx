import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface AppModalProps {
    visible: boolean;
    content: ReactNode,
    onClose: () => void;
}

const AppModal: React.FC<AppModalProps> = ({
    visible,
    content,
    onClose,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback className="flex-1" onPress={onClose}>
                <View className="flex-1 justify-center items-center bg-black/80">
                    {content}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AppModal;