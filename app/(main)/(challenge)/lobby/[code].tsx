import { useEffect } from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { useGameChallengeStore } from '@/src/stores/game.challenge.store';
import { useAuthStore } from '@/src/stores/auth.store';
import { getSocket } from '@/src/lib/socket';
import { ClientEvent } from '@/src/types/game.challenge.types';
import type { Participant } from '@/src/types/game.challenge.types';

export default function LobbyScreen() {
    const { code } = useLocalSearchParams<{ code: string }>();
    const isHost = useGameChallengeStore(s => s.isHost);
    const status = useGameChallengeStore(s => s.status);
    const participants = useGameChallengeStore(s => s.participants);
    const token = useAuthStore(s => s.token)!;

    // Safety net: if user navigated here but socket isn't connected yet
    useEffect(() => {
        const socket = getSocket(token);
        if (!socket.connected) socket.connect();
    }, []);

    const handleStart = () => {
        getSocket().emit(ClientEvent.START_GAME);
    };

    const handleLeave = () => {
        getSocket().emit(ClientEvent.LEAVE_SESSION);
        useGameChallengeStore.getState().reset();
        router.replace('/');
    };

    const renderParticipant = ({ item }: { item: Participant }) => (
        <View className="flex-row items-center gap-3 py-2.5 border-b border-game-border">
            <View className="w-9 h-9 rounded-full bg-game-purple/30 items-center justify-center">
                <Text className="text-game-purpleL font-bold text-sm">
                    {item.username.charAt(0).toUpperCase()}
                </Text>
            </View>
            <Text className="text-white font-medium flex-1">{item.username}</Text>
            {!item.isConnected && (
                <Text className="text-white/30 text-xs">disconnected</Text>
            )}
        </View>
    );

    return (
        <View className="flex-1 bg-game-bg px-5 pt-16">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <View>
                    <Text className="text-white text-2xl font-bold">Game lobby</Text>
                    <Text className="text-white/50 text-sm mt-0.5">
                        Waiting for players...
                    </Text>
                </View>
                <Pressable onPress={handleLeave}>
                    <Text className="text-game-red text-sm">Leave</Text>
                </Pressable>
            </View>

            {/* QR Code card */}
            <View className="bg-game-surface rounded-3xl p-6 items-center mb-6">
                <View className="bg-white p-4 rounded-2xl mb-4">
                    <QRCode value={code} size={160} />
                </View>
                <Text className="text-white/50 text-sm mb-2">Session code</Text>
                <Text className="text-white text-3xl font-bold tracking-[0.2em]">{code}</Text>
            </View>

            {/* Participants list */}
            <View className="flex-1 bg-game-surface rounded-3xl px-5 py-4">
                <Text className="text-white/50 text-xs uppercase tracking-widest mb-3">
                    Players — {participants.length}
                </Text>
                <FlatList
                    data={participants}
                    renderItem={renderParticipant}
                    keyExtractor={p => String(p.userId)}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* Start button (host only) */}
            {isHost && (
                <View className="pb-10 pt-4">
                    <Pressable
                        onPress={handleStart}
                        disabled={participants.length < 1 || status !== 'waiting'}
                        className={`h-14 rounded-2xl items-center justify-center ${participants.length >= 1 ? 'bg-game-purple' : 'bg-game-border'
                            }`}
                    >
                        <Text className="text-white font-bold text-base">
                            Start game ({participants.length} {participants.length === 1 ? 'player' : 'players'})
                        </Text>
                    </Pressable>
                </View>
            )}

            {!isHost && (
                <View className="pb-10 pt-4 items-center">
                    <ActivityIndicator color="#7C3AED" />
                    <Text className="text-white/40 text-sm mt-2">Waiting for host to start…</Text>
                </View>
            )}
        </View>
    );
}