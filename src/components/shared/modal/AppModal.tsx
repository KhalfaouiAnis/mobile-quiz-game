import React, { ReactNode } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

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
            transparent
            visible={visible}
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