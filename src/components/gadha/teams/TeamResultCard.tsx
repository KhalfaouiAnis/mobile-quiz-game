import { View, Text } from 'react-native';
import type { ResultTeam, Difficulty } from '@/src/types/game.gadha.types';
import { useTranslation } from 'react-i18next';
import { fontScale } from '@/src/utils/dimensions';

const DIFF_COLORS: Record<Difficulty, string> = {
    easy: 'text-game-green',
    medium: 'text-game-amber',
    hard: 'text-game-red',
};

export default function TeamResultCard({ team, highlight }: { team: ResultTeam; highlight: boolean }) {
    const { t } = useTranslation()
    return (
        <View className={`rounded-3xl p-5 mb-4 border ${highlight
            ? 'bg-game-surface border-game-border'
            : 'bg-game-surface border-game-border'
            }`}
        >
            {/* Team header */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-2">
                    <Text
                        style={{ fontSize: fontScale(30), lineHeight: 30 }}
                        className="font-cairo">{['🥇', '🥈', '🥉'][team.rank - 1] ?? `#${team.rank}`}</Text>
                    <View>
                        <Text
                            style={{ fontSize: fontScale(18), lineHeight: 28 }}
                            className={`font-cairo-bold ${highlight ? 'text-game-purpleL' : 'text-white'}`}
                        >
                            {team.name}
                        </Text>
                        {team.isBoostUsed && (
                            <Text
                                style={{ fontSize: fontScale(12), lineHeight: 16 }}
                                className="text-game-amber font-cairo">تم استخدام Boost ⚡</Text>
                        )}
                    </View>
                </View>
                <Text
                    style={{ fontSize: fontScale(24), lineHeight: 32 }}
                    className="text-white font-bagel-regular">{team.score.toLocaleString()}</Text>
            </View>

            {/* Stats row */}
            <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-game-bg/50 rounded-xl px-3 py-2 items-center">
                    <Text
                        style={{ fontSize: fontScale(16), lineHeight: 24 }}
                        className="text-white font-bagel-regular">{team.correctAnswers}</Text>
                    <Text className="text-white/40 text-xs font-cairo">صحيح</Text>
                </View>
                <View className="flex-1 bg-game-bg/50 rounded-xl px-3 py-2 items-center">
                    <Text
                        style={{ fontSize: fontScale(16), lineHeight: 24 }}
                        className="text-white font-bagel-regular">{team.totalAnswered}</Text>
                    <Text className="text-white/40 text-x font-cairos">محاولة</Text>
                </View>
                <View className="flex-1 bg-game-bg/50 rounded-xl px-3 py-2 items-center">
                    <Text
                        style={{ fontSize: fontScale(16), lineHeight: 24 }}
                        className="text-white font-bagel-regular">%{team.accuracy}</Text>
                    <Text className="text-white/40 text-xs font-cairo">الدقة</Text>
                </View>
            </View>

            {team.answerHistory.length > 0 && (
                <View>
                    <Text className="text-white/30 text-xs uppercase tracking-widest mb-2">سجل الإجابات</Text>
                    <View className="gap-1">
                        {team.answerHistory.map((h) => (
                            <View
                                key={h.questionId}
                                className="flex-row items-center justify-between py-1.5 border-b border-game-border/40"
                            >
                                <View className="flex-row items-center gap-2">
                                    <Text className={h.isCorrect ? 'text-game-green' : 'text-game-red'}>
                                        {h.isCorrect ? '✓' : '✗'}
                                    </Text>
                                    <Text className={`text-xs font-semibold ${DIFF_COLORS[h.difficulty]}`}>
                                        {t(`common.difficulty.${h.difficulty}`)}
                                    </Text>
                                    <Text className="text-white/60 text-xs">{h.basePoints} نقطة</Text>
                                </View>
                                <Text className={`text-sm font-cairo-bold ${h.isCorrect ? 'text-white' : 'text-white/30'}`}>
                                    {h.isCorrect ? `+${h.pointsAwarded}` : '0'}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}