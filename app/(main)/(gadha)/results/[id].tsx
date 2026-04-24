import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useGadhaResults } from '@/src/hooks/queries/gameGadha/useGadhaResults';
import TeamResultCard from '@/src/components/gadha/teams/TeamResultCard';

export default function ResultsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const sessionId = Number(id);

    const { data: results, isLoading, isError, refetch } = useGadhaResults(sessionId);

    const handlePlayAgain = () => {
        router.replace('/(gadha)/setup');
    };

    const handleHome = () => {
        router.replace('/');
    };

    if (isLoading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator color="#7C3AED" size="large" />
            </View>
        );
    }

    if (isError || !results) {
        return (
            <View className="flex-1 bg-game-bg items-center justify-center px-8">
                <Text className="text-white/50 text-center mb-4">Could not load results</Text>
                <Pressable onPress={() => refetch()} className="bg-game-purple px-6 py-3 rounded-xl">
                    <Text className="text-white font-semibold">Retry</Text>
                </Pressable>
            </View>
        );
    }

    const isTie = !results.winner;

    return (
        <View className="flex-1 bg-white" style={{ direction: "rtl" }}>
            <ScrollView
                contentContainerClassName="px-5 pb-2 pt-4"
                showsVerticalScrollIndicator={false}
            >
                {/* ── Winner banner ── */}
                <View className="items-center mb-8">
                    <Text className="text-5xl mb-3">{isTie ? '🤝' : '🏆'}</Text>
                    <Text className="text-primary-500 text-2xl font-cairo-bold text-center">
                        {isTie ? "تعادل!" : `فاز ${results.winner!.name}!`}
                    </Text>
                    {!isTie && (
                        <Text className="text-black/50 font-cairo mt-1">
                            {results.winner!.score.toLocaleString()} نقطة
                        </Text>
                    )}
                </View>

                {/* ── Board progress ── */}
                <View className="bg-primary-500 rounded-2xl px-5 py-3 mb-5 flex-row items-center justify-between">
                    <Text className="text-white/80 text-sm font-cairo">تم إنجاز اللوحة</Text>
                    <Text className="text-white font-cairo-bold">
                        أسئلة {results.boardProgress.uniqueAnswered} / {results.boardProgress.total}
                    </Text>
                </View>

                {/* ── Team cards ── */}
                {results.teams.map((team) => (
                    <TeamResultCard
                        team={team}
                        key={team.id}
                        highlight={team.id === results.winner?.id}
                    />
                ))}
            </ScrollView>

            {/* ── CTAs ── */}
            <View className="px-5 py-2 gap-6 flex-row items-center">
                <Pressable
                    onPress={handlePlayAgain}
                    className="p-3 items-center flex-1 bg-primary-500 rounded-2xl"
                >
                    <Text className="text-white font-cairo-bold text-base">بدء لعبة جديدة</Text>
                </Pressable>
                <Pressable
                    onPress={handleHome}
                    className="p-3 items-center flex-1 bg-game-surface border border-game-border rounded-2xl"
                >
                    <Text className="text-white/70 font-cairo-semibold text-base">العودة إلى الصفحة الرئيسية</Text>
                </Pressable>
            </View>
        </View>
    );
}