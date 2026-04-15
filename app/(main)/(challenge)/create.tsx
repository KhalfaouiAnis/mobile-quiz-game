import { router } from 'expo-router';
import { useState, useCallback } from 'react';
import { View, Text, Pressable, FlatList, Image, ActivityIndicator, Alert, } from 'react-native';
import { useCategories } from '@/src/hooks/queries/gameChallenge/useCategories';
import { useCreateSession } from '@/src/hooks/mutations/gameChallenge/useCreateSession';
import { connectSocket } from '@/src/lib/socket';
import { useAuthStore } from '@/src/stores/auth.store';
import { ClientEvent } from '@/src/types/game.challenge.types';
import type { Category } from '@/src/types/game.challenge.types';

const MAX_CATEGORIES = 6;

export default function CreateScreen() {
    const [selected, setSelected] = useState<number[]>([]);
    const { data: categories, isLoading } = useCategories();
    const createSession = useCreateSession();
    const token = useAuthStore(s => s.token)!;

    const toggle = useCallback((id: number) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : prev.length < MAX_CATEGORIES
                    ? [...prev, id]
                    : prev,
        );
    }, []);

    const handleCreate = async () => {
        if (selected.length !== MAX_CATEGORIES) {
            Alert.alert('Select exactly 6 categories');
            return;
        }
        try {
            const { code } = await createSession.mutateAsync({ categoryIds: selected });

            // Connect socket immediately so listeners are ready before the
            // join_session emit in the lobby screen
            const socket = connectSocket(token);
            socket.emit(ClientEvent.JOIN_SESSION, { code });

            router.push(`/(challenge)/lobby/${code}`);
        } catch (e: any) {
            Alert.alert('Error', e?.response?.data?.message ?? 'Could not create session');
        }
    };

    const renderCategory = ({ item }: { item: Category }) => {
        const isSelected = selected.includes(item.id);
        const hasEnough = selected.length === MAX_CATEGORIES && !isSelected;

        return (
            <Pressable
                onPress={() => toggle(item.id)}
                disabled={hasEnough}
                className={[
                    'w-[30%] aspect-square rounded-2xl items-center justify-center m-[1.5%] overflow-hidden',
                    isSelected ? 'border-2 border-game-purple bg-game-purple/20' : 'bg-game-card',
                    hasEnough ? 'opacity-30' : '',
                ].join(' ')}
            >
                {item.image_url && (
                    <Image source={{ uri: item.image_url }} className="w-10 h-10 rounded-lg mb-1" />
                )}
                <Text
                    numberOfLines={2}
                    className={`text-xs text-center px-1 font-medium ${isSelected ? 'text-game-purpleL' : 'text-white/70'}`}
                >
                    {item.name}
                </Text>
                <Text className="text-[10px] text-white/30 mt-0.5">
                    {item._count.questions} Qs
                </Text>
                {isSelected && (
                    <View className="absolute top-2 right-2 w-5 h-5 rounded-full bg-game-purple items-center justify-center">
                        <Text className="text-white text-[10px] font-bold">
                            {selected.indexOf(item.id) + 1}
                        </Text>
                    </View>
                )}
            </Pressable>
        );
    };

    return (
        <View className="flex-1 bg-game-bg">
            {/* Header */}
            <View className="px-5 pt-16 pb-4">
                <Pressable onPress={() => router.back()} className="mb-4">
                    <Text className="text-game-purpleL text-sm">← Back</Text>
                </Pressable>
                <Text className="text-white text-2xl font-bold">Create game</Text>
                <Text className="text-white/50 text-sm mt-1">
                    Choose {MAX_CATEGORIES} categories — {selected.length}/{MAX_CATEGORIES} selected
                </Text>
            </View>

            {/* Selection progress dots */}
            <View className="flex-row px-5 gap-1.5 mb-4">
                {Array.from({ length: MAX_CATEGORIES }).map((_, i) => (
                    <View
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${i < selected.length ? 'bg-game-purple' : 'bg-game-border'}`}
                    />
                ))}
            </View>

            {/* Grid */}
            {isLoading ? (
                <ActivityIndicator color="#7C3AED" className="mt-10" />
            ) : (
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={item => String(item.id)}
                    numColumns={3}
                    contentContainerClassName="px-3 pb-32"
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* CTA */}
            <View className="absolute bottom-0 left-0 right-0 px-5 pb-10 pt-4 bg-game-bg/95">
                <Pressable
                    onPress={handleCreate}
                    disabled={selected.length !== MAX_CATEGORIES || createSession.isPending}
                    className={`h-14 rounded-2xl items-center justify-center ${selected.length === MAX_CATEGORIES ? 'bg-game-purple' : 'bg-game-border'
                        }`}
                >
                    {createSession.isPending ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-bold text-base">
                            Create game room
                        </Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}