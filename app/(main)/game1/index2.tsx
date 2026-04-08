import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Focusable } from '@/core/components/base/Focusable';
import { TVScreen } from '@/core/components/base/TVScreen';
import { TVModal } from '@/core/components/base/TVModal';
import { isTV } from '@/core/utils/platform';
import { BORDER_RADIUS, scale } from '@/core/constants/dimensions';
import { COLORS } from '@/core/constants/colors';

// ─── Constants ───────────────────────────────────────────────────────────────

const SIDEBAR_W = scale(isTV ? 132 : 96);
const CELL_GAP = scale(isTV ? 6 : 4);
const BORDER_W = scale(isTV ? 5 : 3.5);  // yellow sidebar border

// ─── Data ────────────────────────────────────────────────────────────────────

interface Category {
    id: string;
    label: string;
    imageUrl: string;
}

// Left-to-right order matching the design (RTL label reading, LTR visual order)
const CATEGORIES: Category[] = [
    { id: 'kids', label: 'اطفال', imageUrl: 'https://picsum.photos/seed/kids123/280/160' },
    { id: 'fashion', label: 'فاشن', imageUrl: 'https://picsum.photos/seed/fashion22/280/160' },
    { id: 'culture', label: 'ثقافة', imageUrl: 'https://picsum.photos/seed/culture9/280/160' },
    { id: 'movies', label: 'أفلام', imageUrl: 'https://picsum.photos/seed/cinema55/280/160' },
    { id: 'misc', label: 'منوعات', imageUrl: 'https://picsum.photos/seed/colorful7/280/160' },
    { id: 'football', label: 'كرة القدم', imageUrl: 'https://picsum.photos/seed/soccer88/280/160' },
];

// 6 rows × 6 columns — value per row
const ROW_VALUES = [200, 200, 400, 400, 600, 600];
const NUM_ROWS = ROW_VALUES.length;
const NUM_COLS = CATEGORIES.length;

// Pre-played cards (row_col keys)
const INITIAL_PLAYED = new Set(['1_5']); // row 1, col 5 → the grey card

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Category header tile with image background + dark overlay + label */
const CategoryTile: React.FC<{ cat: Category; colIndex: number }> = ({ cat, colIndex }) => (
    <View style={styles.catTile}>
        <ExpoImage
            source={{ uri: cat.imageUrl }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={300}
        />
        {/* Dark overlay */}
        <View style={styles.catOverlay} />
        <Text style={styles.catLabel} numberOfLines={2}>
            {cat.label}
        </Text>
    </View>
);

/** Single question cell — cyan or grey if played */
const QuestionCell: React.FC<{
    row: number;
    col: number;
    value: number;
    played: boolean;
    onPress: (row: number, col: number, value: number) => void;
}> = ({ row, col, value, played, onPress }) => {
    const fk = `BOARD_CELL_${row}_${col}`;

    if (played) {
        return (
            <View style={[styles.cell, styles.cellPlayed]}>
                <Text style={styles.cellTextPlayed}>{value}</Text>
            </View>
        );
    }

    return (
        <Focusable
            focusKey={fk}
            onSelect={() => onPress(row, col, value)}
            showFocusRing={false}
            style={styles.cellFocusable}
        >
            {({ focused }) => (
                <TouchableOpacity
                    onPress={() => onPress(row, col, value)}
                    activeOpacity={0.75}
                    style={[styles.cell, focused && styles.cellFocused]}
                >
                    {/* 3-D raised bottom edge */}
                    {!focused && <View style={styles.cellShadowEdge} />}
                    <Text style={[styles.cellText, focused && styles.cellTextFocused]}>
                        {value}
                    </Text>
                </TouchableOpacity>
            )}
        </Focusable>
    );
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

interface SidebarProps {
    team: 'A' | 'B';
    score: number;
    onAdd: () => void;
    onSubtract: () => void;
    onAction: () => void;  // رجوع | انهاء
}

const TeamSidebar: React.FC<SidebarProps> = ({
    team, score, onAdd, onSubtract, onAction,
}) => {
    const isA = team === 'A';
    const scoreColor = isA ? COLORS.yellow : COLORS.cyan;
    const fkPfx = `BOARD_TEAM_${team}`;

    return (
        <View style={styles.sidebar}>
            {/* ── Team title ─────────────────────── */}
            <View style={styles.sidebarSection}>
                <View style={styles.teamTitleBox}>
                    <Text style={styles.teamTitleText}>Team</Text>
                    <Text style={[styles.teamTitleLetter, { color: COLORS.red }]}>{team}</Text>
                </View>
            </View>

            {/* ── Plus button ────────────────────── */}
            <View style={styles.sidebarSection}>
                <Focusable focusKey={`${fkPfx}_PLUS`} onSelect={onAdd} showFocusRing={false}>
                    {({ focused }) => (
                        <TouchableOpacity
                            onPress={onAdd}
                            style={[styles.roundBtn, styles.plusBtn, focused && styles.roundBtnFocused]}
                        >
                            <Text style={styles.plusBtnText}>+</Text>
                        </TouchableOpacity>
                    )}
                </Focusable>
            </View>

            {/* ── Score ──────────────────────────── */}
            <View style={[styles.sidebarSection, styles.sidebarScoreSection]}>
                <Text style={[styles.scoreText, { color: scoreColor }]}>
                    {score.toLocaleString()}
                </Text>
            </View>

            {/* ── Minus button ───────────────────── */}
            <View style={styles.sidebarSection}>
                <Focusable focusKey={`${fkPfx}_MINUS`} onSelect={onSubtract} showFocusRing={false}>
                    {({ focused }) => (
                        <TouchableOpacity
                            onPress={onSubtract}
                            style={[styles.roundBtn, styles.minusBtn, focused && styles.roundBtnFocused]}
                        >
                            <Text style={styles.minusBtnText}>−</Text>
                        </TouchableOpacity>
                    )}
                </Focusable>
            </View>

            {/* ── Avatar + x2 ────────────────────── */}
            <View style={[styles.sidebarSection, styles.avatarSection]}>
                <View style={styles.avatarWrap}>
                    {/* Avatar circle */}
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarEmoji}>👥</Text>
                    </View>
                    {/* N badge (Team A only) */}
                    {isA && (
                        <View style={styles.nBadge}>
                            <Text style={styles.nBadgeText}>N</Text>
                        </View>
                    )}
                </View>
                {/* x2 badge */}
                <View style={styles.x2Badge}>
                    <Text style={styles.x2Text}>x2</Text>
                </View>
            </View>

            {/* ── Action button (رجوع / انهاء) ──── */}
            <View style={styles.sidebarSection}>
                <Focusable focusKey={`${fkPfx}_ACTION`} onSelect={onAction} showFocusRing={false}>
                    {({ focused }) => (
                        <TouchableOpacity
                            onPress={onAction}
                            activeOpacity={0.85}
                            style={[
                                styles.actionBtn,
                                isA ? styles.actionBtnEnd : styles.actionBtnBack,
                                focused && styles.actionBtnFocused,
                            ]}
                        >
                            <Text style={styles.actionBtnIcon}>{isA ? '✕' : '→'}</Text>
                            <Text style={styles.actionBtnText}>{isA ? 'انهاء' : 'رجوع'}</Text>
                        </TouchableOpacity>
                    )}
                </Focusable>
            </View>
        </View>
    );
};

// ─── Screen ──────────────────────────────────────────────────────────────────

interface ActiveCard {
    row: number;
    col: number;
    value: number;
    category: string;
}

export default function GameBoardScreen() {
    const [scoreA, setScoreA] = useState(2400);
    const [scoreB, setScoreB] = useState(2400);
    const [played, setPlayed] = useState<Set<string>>(new Set(INITIAL_PLAYED));
    const [active, setActive] = useState<ActiveCard | null>(null);
    const [showEnd, setShowEnd] = useState(false);

    const handleCellPress = useCallback(
        (row: number, col: number, value: number) => {
            const key = `${row}_${col}`;
            if (played.has(key)) return;
            setActive({ row, col, value, category: CATEGORIES[col].label });
        },
        [played],
    );

    const handleMarkPlayed = useCallback(
        (teamScored: 'A' | 'B' | null) => {
            if (!active) return;
            const key = `${active.row}_${active.col}`;
            setPlayed((prev) => new Set(prev).add(key));
            if (teamScored === 'A') setScoreA((s) => s + active.value);
            if (teamScored === 'B') setScoreB((s) => s + active.value);
            setActive(null);
        },
        [active],
    );

    return (
        <TVScreen
            focusKey="GAME_BOARD_SCREEN"
            initialFocusKey="BOARD_CELL_0_0"
            backgroundColor={COLORS.cyan}
            disableOverscan
        >
            <View style={styles.root}>

                {/* ── Team B sidebar (left) ────────────────────────── */}
                <TeamSidebar
                    team="B"
                    score={scoreB}
                    onAdd={() => setScoreB((s) => s + 200)}
                    onSubtract={() => setScoreB((s) => Math.max(0, s - 200))}
                    onAction={() => { /* navigate back */ }}
                />

                {/* ── Center grid ──────────────────────────────────── */}
                <View style={styles.grid}>

                    {/* Category header row */}
                    <View style={styles.headerRow}>
                        {CATEGORIES.map((cat, ci) => (
                            <View key={cat.id} style={styles.catCell}>
                                <CategoryTile cat={cat} colIndex={ci} />
                            </View>
                        ))}
                    </View>

                    {/* Question rows */}
                    {ROW_VALUES.map((value, ri) => (
                        <View key={`row_${ri}`} style={styles.questionRow}>
                            {CATEGORIES.map((cat, ci) => {
                                const key = `${ri}_${ci}`;
                                return (
                                    <View key={key} style={styles.questionCell}>
                                        <QuestionCell
                                            row={ri}
                                            col={ci}
                                            value={value}
                                            played={played.has(key)}
                                            onPress={handleCellPress}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>

                {/* ── Team A sidebar (right) ───────────────────────── */}
                <TeamSidebar
                    team="A"
                    score={scoreA}
                    onAdd={() => setScoreA((s) => s + 200)}
                    onSubtract={() => setScoreA((s) => Math.max(0, s - 200))}
                    onAction={() => setShowEnd(true)}
                />
            </View>

            {/* ── Question reveal modal ─────────────────────────── */}
            <TVModal
                visible={active !== null}
                title={`${active?.category ?? ''} — ${active?.value ?? ''} نقطة`}
                message="أي فريق يستحق النقاط؟"
                actions={[
                    {
                        label: `الفريق B (+${active?.value})`,
                        variant: 'secondary',
                        focusKey: 'MODAL_SCORE_B',
                        autoFocus: true,
                        onPress: () => handleMarkPlayed('B'),
                    },
                    {
                        label: 'تجاوز',
                        variant: 'ghost',
                        focusKey: 'MODAL_SKIP',
                        onPress: () => handleMarkPlayed(null),
                    },
                    {
                        label: `الفريق A (+${active?.value})`,
                        variant: 'primary',
                        focusKey: 'MODAL_SCORE_A',
                        onPress: () => handleMarkPlayed('A'),
                    },
                ]}
                onDismiss={() => setActive(null)}
            />

            {/* ── End game modal ────────────────────────────────── */}
            <TVModal
                visible={showEnd}
                title="إنهاء اللعبة؟"
                message={`الفريق A: ${scoreA} — الفريق B: ${scoreB}`}
                actions={[
                    {
                        label: 'إلغاء',
                        variant: 'secondary',
                        focusKey: 'MODAL_END_CANCEL',
                        autoFocus: true,
                        onPress: () => setShowEnd(false),
                    },
                    {
                        label: 'انهاء',
                        variant: 'danger',
                        focusKey: 'MODAL_END_CONFIRM',
                        onPress: () => {
                            setShowEnd(false);
                            // navigate back to home
                        },
                    },
                ]}
                onDismiss={() => setShowEnd(false)}
            />
        </TVScreen>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

    // ── Root layout ─────────────────────────────────────────────────
    root: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.cyan,
        gap: CELL_GAP,
        padding: CELL_GAP,
    },

    // ── Sidebar ──────────────────────────────────────────────────────
    sidebar: {
        width: SIDEBAR_W,
        flexDirection: 'column',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: BORDER_W,
        borderColor: COLORS.yellow,
        overflow: 'hidden',
        paddingVertical: CELL_GAP,
        paddingHorizontal: CELL_GAP,
        gap: CELL_GAP,
    },
    sidebarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebarScoreSection: {
        flex: 1.2,
    },

    // Team title
    teamTitleBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    teamTitleText: {
        fontSize: scale(isTV ? 18 : 13),
        fontWeight: '900',
        color: COLORS.textDark,
        lineHeight: scale(isTV ? 20 : 15),
    },
    teamTitleLetter: {
        fontSize: scale(isTV ? 22 : 16),
        fontWeight: '900',
        lineHeight: scale(isTV ? 26 : 19),
    },

    // Score
    scoreText: {
        fontSize: scale(isTV ? 28 : 20),
        fontWeight: '900',
        letterSpacing: 0.5,
    },

    // +/− buttons
    roundBtn: {
        width: '85%',
        aspectRatio: 2.8,
        borderRadius: BORDER_RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: scale(2),
    },
    plusBtn: {
        backgroundColor: COLORS.yellow,
        borderColor: COLORS.cyan,
    },
    minusBtn: {
        backgroundColor: COLORS.red,
        borderColor: '#C62828',
    },
    roundBtnFocused: {
        shadowColor: COLORS.yellow,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.9,
        elevation: 10,
        transform: [{ scale: 1.05 }],
    },
    plusBtnText: {
        fontSize: scale(isTV ? 22 : 17),
        fontWeight: '900',
        color: COLORS.textDark,
        lineHeight: scale(isTV ? 26 : 20),
    },
    minusBtnText: {
        fontSize: scale(isTV ? 24 : 18),
        fontWeight: '900',
        color: COLORS.white,
        lineHeight: scale(isTV ? 28 : 22),
    },

    // Avatar + x2
    avatarSection: {
        flexDirection: 'row',
        gap: scale(4),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1.1,
    },
    avatarWrap: {
        position: 'relative',
    },
    avatarCircle: {
        width: scale(isTV ? 40 : 30),
        height: scale(isTV ? 40 : 30),
        borderRadius: 999,
        backgroundColor: COLORS.cyanLight,
        borderWidth: 2,
        borderColor: COLORS.cyan,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: {
        fontSize: scale(isTV ? 18 : 14),
    },
    nBadge: {
        position: 'absolute',
        top: -scale(5),
        right: -scale(6),
        width: scale(isTV ? 18 : 14),
        height: scale(isTV ? 18 : 14),
        borderRadius: 999,
        backgroundColor: COLORS.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.white,
    },
    nBadgeText: {
        fontSize: scale(isTV ? 9 : 7),
        fontWeight: '900',
        color: COLORS.white,
    },
    x2Badge: {
        backgroundColor: COLORS.yellow,
        paddingHorizontal: scale(5),
        paddingVertical: scale(2),
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.yellowDark,
    },
    x2Text: {
        fontSize: scale(isTV ? 13 : 10),
        fontWeight: '900',
        color: COLORS.textDark,
    },

    // Action button
    actionBtn: {
        width: '90%',
        paddingVertical: scale(isTV ? 6 : 4),
        borderRadius: BORDER_RADIUS.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(4),
        borderWidth: scale(2),
    },
    actionBtnBack: {
        backgroundColor: COLORS.yellow,
        borderColor: COLORS.yellowDark,
    },
    actionBtnEnd: {
        backgroundColor: COLORS.red,
        borderColor: '#B71C1C',
    },
    actionBtnFocused: {
        transform: [{ scale: 1.04 }],
        shadowColor: COLORS.yellow,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.8,
        elevation: 10,
    },
    actionBtnIcon: {
        fontSize: scale(isTV ? 14 : 11),
        color: COLORS.white,
        fontWeight: '900',
    },
    actionBtnText: {
        fontSize: scale(isTV ? 14 : 10),
        fontWeight: '900',
        color: COLORS.white,
        writingDirection: 'rtl',
    },

    // ── Center grid ───────────────────────────────────────────────────
    grid: {
        flex: 1,
        flexDirection: 'column',
        gap: CELL_GAP,
    },

    // Header row
    headerRow: {
        flex: 1.35,         // header is taller than question rows
        flexDirection: 'row',
        gap: CELL_GAP,
    },
    catCell: {
        flex: 1,
        borderRadius: BORDER_RADIUS.md,
        overflow: 'hidden',
    },
    catTile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: scale(isTV ? 8 : 5),
        overflow: 'hidden',
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.cyanDark,  // fallback while image loads
    },
    catOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.42)',
        borderRadius: BORDER_RADIUS.md,
    },
    catLabel: {
        fontSize: scale(isTV ? 17 : 12),
        fontWeight: '900',
        color: COLORS.white,
        textAlign: 'center',
        writingDirection: 'rtl',
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        paddingHorizontal: scale(4),
        lineHeight: scale(isTV ? 20 : 14),
    },

    // Question rows
    questionRow: {
        flex: 1,
        flexDirection: 'row',
        gap: CELL_GAP,
    },
    questionCell: {
        flex: 1,
    },

    // Question cell button
    cellFocusable: {
        flex: 1,
    },
    cell: {
        flex: 1,
        backgroundColor: '#29B8E8',   // brighter cyan for cells
        borderRadius: BORDER_RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: scale(2),
        borderColor: '#1A9FCC',
        position: 'relative',
        overflow: 'hidden',
    },
    // 3D raised-button bottom edge
    cellShadowEdge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: scale(isTV ? 5 : 3.5),
        backgroundColor: '#1585A8',
        borderBottomLeftRadius: BORDER_RADIUS.md,
        borderBottomRightRadius: BORDER_RADIUS.md,
    },
    cellFocused: {
        backgroundColor: '#1A9FCC',
        borderColor: COLORS.yellow,
        borderWidth: scale(isTV ? 3.5 : 2.5),
        shadowColor: COLORS.yellow,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: isTV ? 10 : 6,
        shadowOpacity: 0.85,
        elevation: 10,
    },
    cellPlayed: {
        backgroundColor: '#AEAEAE',
        borderColor: '#909090',
    },
    cellText: {
        fontSize: scale(isTV ? 24 : 17),
        fontWeight: '900',
        color: COLORS.white,
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        letterSpacing: 0.5,
        marginBottom: scale(isTV ? 4 : 3),   // offset for 3D edge
    },
    cellTextFocused: {
        color: COLORS.yellow,
        marginBottom: 0,
    },
    cellTextPlayed: {
        fontSize: scale(isTV ? 22 : 16),
        fontWeight: '700',
        color: '#686868',
    },
});
