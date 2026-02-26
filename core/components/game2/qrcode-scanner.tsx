import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from '@/core/constants';

export default function QRCodeScanner({ setValue }: any) {
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [scanned, setScanned] = useState(false);

    if (!permission) return null;
    if (!permission.granted) {
        return (
            <View className='items-center gap-4'>
                <Text>We need your permission to show the camera</Text>
                <Pressable onPress={requestPermission}
                    className="flex-row items-center justify-center gap-4 rounded-xl bg-error p-2"
                >
                    <Text>Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        setIsCameraOpen(false);
        console.log(data);
    };

    return (
        <>
            {!isCameraOpen ? (
                <Pressable
                    onPress={() => {
                        setIsCameraOpen(true);
                        setScanned(false);
                    }}
                    style={{ width: 220 * VIEW_SCALE_FACTOR }}
                    className="flex-row items-center justify-center gap-4 rounded-xl bg-error py-2"
                >
                    <Ionicons name="qr-code-outline" size={30 * TEXT_SCALE_FACOTR} color="#fff" />
                    <Text className="text-white font-cairo-bold text-2xl">مسح رمز QR</Text>
                </Pressable>
            ) : (
                <CameraView
                    style={[StyleSheet.absoluteFillObject, { margin: 10, borderRadius: 10 }]}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                >
                    <Button title="أغلق" onPress={() => setIsCameraOpen(false)} />
                </CameraView>
            )}
        </>
    );
}
