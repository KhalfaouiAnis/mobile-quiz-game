import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { connectSocket } from '@/src/lib/socket';
import { useAuthStore } from '@/src/stores/auth.store';
import { ClientEvent } from '@/src/types/game.challenge.types';

export default function JoinScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [manualCode, setManualCode] = useState('');
    const [scanned, setScanned] = useState(false);
    const [mode, setMode] = useState<'scan' | 'manual'>('scan');
    const token = useAuthStore(s => s.token)!;

    useEffect(() => { requestPermission(); }, []);

    const joinSession = (rawCode: string) => {
        const code = rawCode.trim().toUpperCase();
        if (code.length < 6) {
            Alert.alert('Invalid code', 'Session code must be 6 characters');
            return;
        }

        const socket = connectSocket(token);
        socket.emit(ClientEvent.JOIN_SESSION, { code });
        router.push(`/(game)/lobby/${code}`);
    };

    const handleBarcode = ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);
        joinSession(data);
    };

    return (
        <View className="flex-1 bg-game-bg">
            {/* Header */}
            <View className="px-5 pt-16 pb-4 z-10">
                <Pressable onPress={() => router.back()} className="mb-4">
                    <Text className="text-game-purpleL text-sm">← Back</Text>
                </Pressable>
                <Text className="text-white text-2xl font-bold">Join a game</Text>
            </View>

            {/* Mode toggle */}
            <View className="flex-row mx-5 mb-5 bg-game-surface rounded-xl overflow-hidden">
                {(['scan', 'manual'] as const).map(m => (
                    <Pressable
                        key={m}
                        onPress={() => { setMode(m); setScanned(false); }}
                        className={`flex-1 py-3 items-center ${mode === m ? 'bg-game-purple' : ''}`}
                    >
                        <Text className={`font-semibold text-sm ${mode === m ? 'text-white' : 'text-white/40'}`}>
                            {m === 'scan' ? '📷  Scan QR' : '✏️  Enter code'}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {mode === 'scan' ? (
                <View className="flex-1">
                    {permission?.granted ? (
                        <View className="flex-1 relative">
                            <CameraView
                                style={StyleSheet.absoluteFillObject}
                                facing="back"
                                onBarcodeScanned={scanned ? undefined : handleBarcode}
                                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                            />

                            {/* Viewfinder overlay */}
                            <View className="flex-1 items-center justify-center">
                                <View className="w-56 h-56 rounded-3xl border-2 border-game-purple" />
                                <Text className="text-white/70 text-sm mt-6 text-center px-8">
                                    Point your camera at the host's QR code
                                </Text>
                            </View>

                            {scanned && (
                                <Pressable
                                    onPress={() => setScanned(false)}
                                    className="absolute bottom-10 self-center bg-game-purple px-8 py-4 rounded-2xl"
                                >
                                    <Text className="text-white font-bold">Scan again</Text>
                                </Pressable>
                            )}
                        </View>
                    ) : (
                        <View className="flex-1 items-center justify-center px-8">
                            <Text className="text-white/70 text-center mb-6">
                                Camera permission is needed to scan QR codes
                            </Text>
                            <Pressable
                                onPress={requestPermission}
                                className="bg-game-purple px-8 py-4 rounded-2xl"
                            >
                                <Text className="text-white font-bold">Grant permission</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            ) : (
                <View className="px-5">
                    <TextInput
                        value={manualCode}
                        onChangeText={t => setManualCode(t.toUpperCase())}
                        placeholder="ABCD12"
                        placeholderTextColor="#4B5563"
                        maxLength={10}
                        autoCapitalize="characters"
                        autoFocus
                        className="bg-game-surface text-white text-2xl tracking-widest font-bold text-center h-20 rounded-2xl border border-game-border mb-5"
                    />
                    <Pressable
                        onPress={() => joinSession(manualCode)}
                        disabled={manualCode.length < 6}
                        className={`h-14 rounded-2xl items-center justify-center ${manualCode.length >= 6 ? 'bg-game-purple' : 'bg-game-border'
                            }`}
                    >
                        <Text className="text-white font-bold text-base">Join game</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}