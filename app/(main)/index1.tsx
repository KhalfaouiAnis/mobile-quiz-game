import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { FONT_SIZE, SPACING, BORDER_RADIUS, scale, SCREEN } from '@/core/constants/dimensions';
import { COLORS } from '@/core/constants/colors';
import { Focusable } from '@/core/components/base/Focusable';
import { isTV } from '@/core/utils/platform';
import { TVScreen } from '@/core/components/base/TVScreen';
import { TVModal } from '@/core/components/base/TVModal';

// ─── Data ────────────────────────────────────────────────────────────────────

type GameShape = 'rect' | 'pill' | 'oval' | 'circle';

interface GameType {
    id: string;
    nameAr: string;
    nameEn?: string;
    shape: GameShape;
    bg: string;
    textColor: string;
    borderColor?: string;
    badge?: string;
    badgeColor?: string;
    featured?: boolean;
}

const GAME_TYPES: GameType[] = [
    {
        id: 'challenge',
        nameAr: 'التحدي',
        nameEn: 'THE CHALLENGE',
        shape: 'rect',
        bg: COLORS.white,
        textColor: COLORS.textDark,
        borderColor: COLORS.cyan,
    },
    {
        id: 'join_challenge',
        nameAr: 'الانضمام الى اللعبة',
        shape: 'pill',
        bg: COLORS.cyan,
        textColor: COLORS.white,
        badge: 'N',
        badgeColor: COLORS.green,
    },
    {
        id: 'godha',
        nameAr: 'قدها',
        shape: 'oval',
        bg: COLORS.white,
        textColor: COLORS.textDark,
        borderColor: COLORS.cyan,
        featured: true,
    },
    {
        id: 'join_liar',
        nameAr: 'الانضمام الى اللعبة',
        shape: 'pill',
        bg: COLORS.cyan,
        textColor: COLORS.white,
    },
    {
        id: 'liar',
        nameAr: 'THE Liar',
        shape: 'circle',
        bg: COLORS.white,
        textColor: COLORS.textDark,
        borderColor: COLORS.cyan,
    },
];

interface InfoCard {
    id: string;
    title: string;
    description: string;
    subTitle?: string;
    isContact?: boolean;
    hasPointsInfo?: boolean;
}

const INFO_CARDS: InfoCard[] = [
    {
        id: 'godha_info',
        title: 'عن لعبة قدها',
        description:
            'لعبة تجمع بين التحدي والمتعة والثقافة في أجواء حماسية، مع 6 فئات من اختيارك لتثبت أنك قدها.',
        hasPointsInfo: true,
    },
    {
        id: 'challenge_info',
        title: 'عن لعبة The Challenge',
        description:
            'لعبة تحدي تحتوي على 60 سؤال متنوع في مختلف المجالات. أجواء خيالية من المنافسة و التحدي و الإثارة..',
    },
    {
        id: 'liar_info',
        title: 'عن لعبة The Liar',
        description:
            'لعبة تحدي تحتوي على 60 سؤال متنوع في مختلف المجالات. كل لاعب يضع إجابة خاطئة و يجب أن يختار الإجابة الصحيحة الوحيدة.',
    },
    {
        id: 'contact',
        title: 'للاستفسار',
        description: 'يسعدنا تواصلك معنا',
        isContact: true,
    },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

/** The pill / rect / oval / circle shape that identifies each game */
const GameShape: React.FC<{ game: GameType; focused: boolean }> = ({
    game,
    focused,
}) => {
    const shapeStyle = (() => {
        switch (game.shape) {
            case 'rect':
                return styles.shapeRect;
            case 'pill':
                return styles.shapePill;
            case 'oval':
                return styles.shapeOval;
            case 'circle':
                return styles.shapeCircle;
        }
    })();

    return (
        <View
            style={[
                styles.shapeBase,
                shapeStyle,
                { backgroundColor: game.bg },
                game.borderColor
                    ? { borderWidth: 2.5, borderColor: focused ? COLORS.yellow : game.borderColor }
                    : null,
                game.featured && styles.shapeFeatured,
                focused && styles.shapeFocused,
            ]}
        >
            {/* Badge (e.g. "N" for new) */}
            {game.badge && (
                <View style={[styles.badge, { backgroundColor: game.badgeColor ?? COLORS.green }]}>
                    <Text style={styles.badgeText}>{game.badge}</Text>
                </View>
            )}

            <Text
                style={[
                    styles.shapeNameAr,
                    { color: focused && game.shape === 'pill' ? COLORS.yellow : game.textColor },
                ]}
                numberOfLines={2}
                textBreakStrategy="simple"
            >
                {game.nameAr}
            </Text>

            {game.nameEn && (
                <Text style={[styles.shapeNameEn, { color: game.textColor }]}>
                    {game.nameEn}
                </Text>
            )}
        </View>
    );
};

/** A single game type column (shape + create-game button) */
const GameCard: React.FC<{
    game: GameType;
    onCreateGame: (id: string) => void;
    index: number;
}> = ({ game, onCreateGame, index }) => (
    <Focusable
        focusKey={`HOME_GAME_${game.id.toUpperCase()}`}
        onSelect={() => onCreateGame(game.id)}
        autoFocus={isTV && index === 2} // default focus on center "قدها"
        showFocusRing={false}
        style={[styles.gameCardOuter, game.featured && styles.gameCardFeatured]}
    >
        {({ focused }) => (
            <>
                <GameShape game={game} focused={focused} />
                <TouchableOpacity
                    style={[styles.createBtn, focused && styles.createBtnFocused]}
                    onPress={() => onCreateGame(game.id)}
                    activeOpacity={0.85}
                >
                    <Text style={styles.createBtnText}>إنشاء لعبة</Text>
                </TouchableOpacity>
            </>
        )}
    </Focusable>
);

/** Info card at the bottom */
const InfoCard: React.FC<{ card: InfoCard }> = ({ card }) => (
    <View style={styles.infoCard}>
        {/* Red left accent strip */}
        <View style={styles.infoAccent} />

        <View style={styles.infoContent}>
            {/* Title row */}
            <View style={styles.infoTitleRow}>
                <View style={styles.infoTitleDot} />
                <Text style={styles.infoTitle} numberOfLines={1}>
                    {card.title}
                </Text>
            </View>

            {card.isContact ? (
                /* Contact card special layout */
                <View style={styles.contactBody}>
                    <View style={styles.contactAvatar} />
                    <Text style={styles.infoDesc}>{card.description}</Text>
                    {/* Phone icon placeholder */}
                    <View style={styles.phoneIcon}>
                        <Text style={styles.phoneEmoji}>📞</Text>
                    </View>
                </View>
            ) : (
                <Text style={styles.infoDesc} numberOfLines={5}>
                    {card.description}
                </Text>
            )}

            {card.hasPointsInfo && (
                <View style={styles.pointsRow}>
                    <View style={styles.pointsBadge}>
                        <Text style={styles.pointsBadgeText}>x2</Text>
                    </View>
                    <Text style={styles.pointsIcon}>👤</Text>
                    <Text style={styles.pointsIcon}>×</Text>
                    <View style={[styles.pointsBadge, { backgroundColor: COLORS.red }]}>
                        <Text style={styles.pointsBadgeText}>▶</Text>
                    </View>
                    <Text style={styles.pointsLabel}> بلوك  —  دبل نقاطك</Text>
                </View>
            )}
        </View>
    </View>
);

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function HomeScreen() {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleCreateGame = (gameId: string) => {
        setSelectedGame(gameId);
        setShowModal(true);
    };

    const gameLabel = GAME_TYPES.find((g) => g.id === selectedGame)?.nameAr ?? '';

    return (
        <TVScreen focusKey="HOME_SCREEN" backgroundColor={COLORS.yellow} disableOverscan>
            {/* ── Yellow header ────────────────────────────────────────── */}
            <View style={styles.header}>
                {/* Right side (RTL): avatar + name */}
                <View style={styles.headerUser}>
                    <Text style={styles.headerName}>الهام</Text>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarIcon}>👤</Text>
                    </View>
                </View>
                {/* Left side: could hold logo or hamburger */}
                <View style={styles.headerLeft} />
            </View>

            {/* ── Cyan content area ────────────────────────────────────── */}
            <View style={styles.contentArea}>

                {/* ── Row 1: 5 game type cards ─────────────────────────── */}
                <View style={styles.gameCardsRow}>
                    {GAME_TYPES.map((game, i) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            onCreateGame={handleCreateGame}
                            index={i}
                        />
                    ))}
                </View>

                {/* ── Row 2: Info cards ────────────────────────────────── */}
                <View style={styles.infoCardsRow}>
                    {INFO_CARDS.map((card) => (
                        <InfoCard key={card.id} card={card} />
                    ))}
                </View>
            </View>

            {/* ── Confirmation modal ────────────────────────────────── */}
            <TVModal
                visible={showModal}
                title={`إنشاء لعبة "${gameLabel}"`}
                message="هل أنت مستعد لإنشاء اللعبة؟"
                actions={[
                    {
                        label: 'إلغاء',
                        variant: 'secondary',
                        focusKey: 'HOME_MODAL_CANCEL',
                        autoFocus: true,
                        onPress: () => setShowModal(false),
                    },
                    {
                        label: 'إنشاء',
                        variant: 'primary',
                        focusKey: 'HOME_MODAL_CONFIRM',
                        onPress: () => {
                            setShowModal(false);
                            // navigate to game creation screen
                        },
                    },
                ]}
                onDismiss={() => setShowModal(false)}
            />
        </TVScreen>
    );
}

// ─── Styles
const CARD_WIDTH = (SCREEN.width - SPACING.md * 2) / 5;

const styles = StyleSheet.create({
    // ── Header ──────────────────────────────────────────────────────
    header: {
        height: scale(isTV ? 80 : 62),
        backgroundColor: COLORS.yellow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
    },
    headerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    headerName: {
        fontSize: FONT_SIZE.lg,
        fontWeight: '800',
        color: COLORS.textDark,
        writingDirection: 'rtl',
    },
    avatarCircle: {
        width: scale(isTV ? 56 : 44),
        height: scale(isTV ? 56 : 44),
        borderRadius: 999,
        backgroundColor: COLORS.white,
        borderWidth: 2.5,
        borderColor: COLORS.cyan,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarIcon: {
        fontSize: scale(isTV ? 28 : 22),
    },
    headerLeft: {
        width: scale(40),
    },

    // ── Content area (cyan) ─────────────────────────────────────────
    contentArea: {
        flex: 1,
        backgroundColor: COLORS.screenBg,
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.sm,
        paddingBottom: SPACING.sm,
        borderTopLeftRadius: BORDER_RADIUS.lg,
        borderTopRightRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
    },

    // ── Game cards row ───────────────────────────────────────────────
    gameCardsRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: isTV ? 0.48 : 0.46,
        paddingBottom: SPACING.sm,
    },
    gameCardOuter: {
        width: CARD_WIDTH,
        alignItems: 'center',
        gap: SPACING.sm,
    },
    gameCardFeatured: {
        // Center card is slightly taller
        marginBottom: -scale(4),
    },

    // ── Shape base styles ────────────────────────────────────────────
    shapeBase: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.sm,
        position: 'relative',
    },
    shapeRect: {
        width: CARD_WIDTH * 0.85,
        height: scale(isTV ? 72 : 58),
        borderRadius: BORDER_RADIUS.md,
    },
    shapePill: {
        width: CARD_WIDTH * 0.9,
        height: scale(isTV ? 52 : 44),
        borderRadius: 999,
    },
    shapeOval: {
        width: CARD_WIDTH * 0.92,
        height: scale(isTV ? 62 : 52),
        borderRadius: 999,
        transform: [{ scaleX: 1.05 }],
    },
    shapeCircle: {
        width: scale(isTV ? 80 : 66),
        height: scale(isTV ? 80 : 66),
        borderRadius: 999,
    },
    shapeFeatured: {
        transform: [{ scale: 1.08 }],
    },
    shapeFocused: {
        shadowColor: COLORS.yellow,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 12,
        shadowOpacity: 0.8,
        elevation: 10,
    },
    shapeNameAr: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '800',
        textAlign: 'center',
        writingDirection: 'rtl',
    },
    shapeNameEn: {
        fontSize: scale(isTV ? 11 : 9),
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 1,
        letterSpacing: 0.3,
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        width: scale(22),
        height: scale(22),
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    badgeText: {
        fontSize: scale(10),
        fontWeight: '900',
        color: COLORS.white,
    },

    // ── Create game button ───────────────────────────────────────────
    createBtn: {
        backgroundColor: COLORS.yellow,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        minWidth: CARD_WIDTH * 0.82,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.yellowDark,
    },
    createBtnFocused: {
        backgroundColor: COLORS.yellowDark,
        shadowColor: COLORS.textDark,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        elevation: 6,
    },
    createBtnText: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '800',
        color: COLORS.textDark,
        writingDirection: 'rtl',
    },

    // ── Info cards row ───────────────────────────────────────────────
    infoCardsRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
        flex: isTV ? 0.52 : 0.54,
    },
    infoCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 4,
    },
    infoAccent: {
        width: scale(6),
        backgroundColor: COLORS.red,
    },
    infoContent: {
        flex: 1,
        padding: SPACING.sm,
        alignItems: 'flex-end', // RTL
    },
    infoTitleRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    infoTitleDot: {
        width: scale(8),
        height: scale(8),
        borderRadius: 999,
        backgroundColor: COLORS.red,
    },
    infoTitle: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '800',
        color: COLORS.textDark,
        writingDirection: 'rtl',
        textAlign: 'right',
    },
    infoDesc: {
        fontSize: scale(isTV ? 16 : 10),
        color: COLORS.textMid,
        textAlign: 'right',
        writingDirection: 'rtl',
        lineHeight: scale(isTV ? 24 : 15),
        flex: 1,
    },

    // ── Contact card ─────────────────────────────────────────────────
    contactBody: {
        flex: 1,
        alignItems: 'flex-end',
        gap: SPACING.xs,
    },
    contactAvatar: {
        width: scale(isTV ? 56 : 44),
        height: scale(isTV ? 56 : 44),
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.cyanLight,
        alignSelf: 'center',
    },
    phoneIcon: {
        alignSelf: 'flex-end',
    },
    phoneEmoji: {
        fontSize: scale(isTV ? 22 : 18),
    },

    // ── Points info ──────────────────────────────────────────────────
    pointsRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: SPACING.xs,
        marginTop: SPACING.xs,
    },
    pointsBadge: {
        backgroundColor: COLORS.cyan,
        paddingHorizontal: SPACING.xs,
        paddingVertical: 2,
        borderRadius: BORDER_RADIUS.sm,
    },
    pointsBadgeText: {
        fontSize: scale(isTV ? 13 : 9),
        fontWeight: '800',
        color: COLORS.white,
    },
    pointsIcon: {
        fontSize: scale(isTV ? 16 : 12),
        color: COLORS.textDark,
    },
    pointsLabel: {
        fontSize: scale(isTV ? 14 : 10),
        fontWeight: '700',
        color: COLORS.cyanDark,
        writingDirection: 'rtl',
    },
});