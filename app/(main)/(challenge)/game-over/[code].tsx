import { useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useGameChallengeStore } from '@/src/stores/game.challenge.store';
import { useAuthStore } from '@/src/stores/auth.store';
import { destroySocket } from '@/src/lib/socket';
import type { LeaderboardEntry } from '@/src/types/game.challenge.types';
import { useAuth } from '@/src/hooks/useAuth';

function PodiumCard({ entry }: { entry: LeaderboardEntry }) {
    const heights: Record<number, string> = { 1: 'h-24', 2: 'h-16', 3: 'h-12' };
    const colors: Record<number, string> = {
        1: 'bg-game-amber/20 border border-game-amber',
        2: 'bg-white/10 border border-white/20',
        3: 'bg-game-amber/10 border border-game-amber/30',
    };
    if (entry.rank > 3) return null;

    return (
        <View className="flex-1 items-center">
            <Text className="text-white font-semibold text-xs mb-2 text-center" numberOfLines={1}>
                {entry.username}
            </Text>
            <Text className="text-white/50 text-xs mb-2">{entry.score.toLocaleString()}</Text>
            <View className={`w-full ${heights[entry.rank]} ${colors[entry.rank]} rounded-t-xl items-center justify-end pb-2`}>
                <Text className="text-2xl">{['🥇', '🥈', '🥉'][entry.rank - 1]}</Text>
            </View>
        </View>
    );
}

function RankRow({ item, myUserId }: { item: LeaderboardEntry; myUserId: number | undefined }) {
    const isMe = item.userId === myUserId;
    return (
        <View className={`flex-row items-center py-3 border-b border-game-border ${isMe ? 'bg-game-purple/10' : ''}`}>
            <Text className="w-8 text-center text-white/40 font-bold">{item.rank}</Text>
            <View className="w-9 h-9 rounded-full bg-game-purple/20 items-center justify-center mx-3">
                <Text className="text-game-purpleL font-bold text-sm">
                    {item.username.charAt(0).toUpperCase()}
                </Text>
            </View>
            <Text className={`flex-1 font-semibold ${isMe ? 'text-game-purpleL' : 'text-white'}`}>
                {item.username}{isMe ? ' (you)' : ''}
            </Text>
            <Text className="text-white font-bold tabular-nums">{item.score.toLocaleString()}</Text>
        </View>
    );
}

export default function GameOverScreen() {
    const leaderboard = useGameChallengeStore(s => s.globalLeaderboard ?? []);
    const { user } = useAuth();

    // Clean up socket and store on this screen
    useEffect(() => {
        return () => {
            destroySocket();
            useGameChallengeStore.getState().reset();
        };
    }, []);

    const top3 = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);
    const myEntry = leaderboard.find(e => e.userId === user?.id);

    const handlePlayAgain = () => {
        router.replace('/(challenge)/create');
    };

    const handleHome = () => {
        router.replace('/');
    };

    return (
        <View className="flex-1 bg-game-bg px-5 pt-14">
            {/* Header */}
            <Text className="text-white text-3xl font-bold text-center mb-1">🎉 Game over!</Text>
            {myEntry && (
                <Text className="text-white/50 text-sm text-center mb-8">
                    You finished #{myEntry.rank} with {myEntry.score.toLocaleString()} points
                </Text>
            )}

            {/* Podium */}
            {top3.length >= 2 && (
                <View className="flex-row items-end gap-2 mb-8 px-4">
                    {/* 2nd place left, 1st centre, 3rd right */}
                    {top3[1] && <PodiumCard entry={top3[1]} />}
                    {top3[0] && <PodiumCard entry={top3[0]} />}
                    {top3[2] && <PodiumCard entry={top3[2]} />}
                </View>
            )}

            {/* Full list */}
            {rest.length > 0 && (
                <View className="flex-1 bg-game-surface rounded-3xl px-5 py-4 mb-5">
                    <Text className="text-white/40 text-xs uppercase tracking-widest mb-3">Full standings</Text>
                    <FlatList
                        data={rest}
                        renderItem={({ item }) => <RankRow item={item} myUserId={user?.id} />}
                        keyExtractor={e => String(e.userId)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}

            {/* CTAs */}
            <View className="gap-3 pb-10">
                <Pressable
                    onPress={handlePlayAgain}
                    className="h-14 bg-game-purple rounded-2xl items-center justify-center"
                >
                    <Text className="text-white font-bold text-base">Play again</Text>
                </Pressable>
                <Pressable
                    onPress={handleHome}
                    className="h-14 bg-game-surface rounded-2xl items-center justify-center border border-game-border"
                >
                    <Text className="text-white/70 font-semibold text-base">Back to home</Text>
                </Pressable>
            </View>
        </View>
    );
}