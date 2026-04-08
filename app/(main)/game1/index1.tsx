import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Focusable } from '@/core/components/base/Focusable';
import { TVScreen } from '@/core/components/base/TVScreen';
import { isTV } from '@/core/utils/platform';
import { FONT_SIZE, SPACING, BORDER_RADIUS, scale } from '@/core/constants/dimensions';
import { COLORS } from '@/core/constants/colors';

const { width: SW, height: SH } = Dimensions.get('window');

// ─── Constants ───────────────────────────────────────────────────────────────

const COLS = 6;
const GRID_GAP = scale(isTV ? 10 : 6);
const GRID_PADDING_H = SPACING.md;
const CARD_W = (SW - GRID_PADDING_H * 2 - GRID_GAP * (COLS - 1)) / COLS;
const CARD_H = CARD_W * 1.18;

const AVATAR_CARD_W = scale(isTV ? 80 : 58);
const AVATAR_CARD_H = scale(isTV ? 90 : 66);

const TEAMS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const TIMER_OPTIONS = ['30 ثانية', '45 ثانية', '60 ثانية', '90 ثانية'];

// ─── Data ────────────────────────────────────────────────────────────────────

interface CategoryItem {
  id: string;
  label: string;
  section: string;
}

// Generates mock categories. In a real app these come from an API.
const buildCategories = (section: string, count: number): CategoryItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${section}_${i}`,
    label: i % 2 === 0 ? 'شخصيات' : 'شعر و أدب',
    section,
  }));

const SECTIONS = [
  { id: 'general', title: 'معلومات عامة', items: buildCategories('general', 18) },
  { id: 'tech', title: 'تكنولوجيا', items: buildCategories('tech', 18) },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Top avatar/character selector card */
const AvatarCard: React.FC<{
  index: number;
  selected: boolean;
  onPress: () => void;
}> = ({ index, selected, onPress }) => (
  <Focusable
    focusKey={`AVATAR_CARD_${index}`}
    onSelect={onPress}
    showFocusRing={false}
  >
    {({ focused }) => (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.avatarCard,
          selected && styles.avatarCardSelected,
          focused && styles.avatarCardFocused,
        ]}
      >
        {/* Avatar silhouette placeholder */}
        <View style={styles.avatarImgWrap}>
          <Text style={styles.avatarEmoji}>🧑</Text>
        </View>
        {/* Label pill "A" */}
        <View style={[styles.avatarLabel, selected && styles.avatarLabelSelected]}>
          <Text style={[styles.avatarLabelText, selected && styles.avatarLabelTextSelected]}>
            A
          </Text>
        </View>
      </TouchableOpacity>
    )}
  </Focusable>
);

/** One category selection card in the grid */
const CategoryCard: React.FC<{
  item: CategoryItem;
  selected: boolean;
  onToggle: (id: string) => void;
}> = ({ item, selected, onToggle }) => (
  <Focusable
    focusKey={`CAT_${item.id.toUpperCase()}`}
    onSelect={() => onToggle(item.id)}
    showFocusRing={false}
  >
    {({ focused }) => (
      <TouchableOpacity
        onPress={() => onToggle(item.id)}
        activeOpacity={0.85}
        style={[
          styles.catCard,
          selected && styles.catCardSelected,
          focused && !selected && styles.catCardFocused,
        ]}
      >
        <View
          style={[
            styles.catAvatarWrap,
            selected && styles.catAvatarWrapSelected,
          ]}
        >
          <Text style={styles.catAvatarEmoji}>🧑</Text>
        </View>
        <Text
          style={[styles.catLabel, selected && styles.catLabelSelected]}
          numberOfLines={1}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    )}
  </Focusable>
);

/** Section header pill */
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeaderWrap}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  </View>
);

/** Category grid — renders items in rows of COLS */
const CategoryGrid: React.FC<{
  items: CategoryItem[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}> = ({ items, selected, onToggle }) => {
  const rows: CategoryItem[][] = [];
  for (let i = 0; i < items.length; i += COLS) {
    rows.push(items.slice(i, i + COLS));
  }
  return (
    <View style={styles.grid}>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.gridRow}>
          {row.map((item) => (
            <CategoryCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onToggle={onToggle}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

/** ▲ / ▼ dropdown selector button */
const DropdownBtn: React.FC<{
  label: string;
  focusKey: string;
  onPress: () => void;
  style?: object;
  labelStyle?: object;
}> = ({ label, focusKey: fk, onPress, style, labelStyle }) => (
  <Focusable focusKey={fk} onSelect={onPress} showFocusRing={false}>
    {({ focused }) => (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[ focused && styles.dropdownBtnFocused, style]}
      >
        <Text style={[styles.dropdownBtnText, labelStyle]}>{label}</Text>
        <Text style={styles.dropdownChevron}>  ⌄</Text>
      </TouchableOpacity>
    )}
  </Focusable>
);

/** Score counter  [−]  4  [+] */
const ScoreCounter: React.FC<{
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  focusKeyPrefix: string;
}> = ({ value, onDecrement, onIncrement, focusKeyPrefix }) => (
  <View style={styles.scoreRow}>
    {/* Minus */}
    <Focusable
      focusKey={`${focusKeyPrefix}_MINUS`}
      onSelect={onDecrement}
      showFocusRing={false}
    >
      {({ focused }) => (
        <TouchableOpacity
          onPress={onDecrement}
          style={[styles.scoreBtn, focused && styles.scoreBtnFocused]}
        >
          <Text style={styles.scoreBtnText}>−</Text>
        </TouchableOpacity>
      )}
    </Focusable>

    {/* Value */}
    <View style={styles.scoreValueBox}>
      <Text style={styles.scoreValue}>{value}</Text>
    </View>

    {/* Plus */}
    <Focusable
      focusKey={`${focusKeyPrefix}_PLUS`}
      onSelect={onIncrement}
      showFocusRing={false}
    >
      {({ focused }) => (
        <TouchableOpacity
          onPress={onIncrement}
          style={[styles.scoreBtn, styles.scoreBtnPlus, focused && styles.scoreBtnFocused]}
        >
          <Text style={styles.scoreBtnText}>+</Text>
        </TouchableOpacity>
      )}
    </Focusable>
  </View>
);

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function GameCreationScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(['general_0', 'general_3', 'general_6', 'tech_2', 'tech_9']),
  );
  const [teamA, setTeamA] = useState('A');
  const [teamB, setTeamB] = useState('B');
  const [timerIndex, setTimerIndex] = useState(1); // "45 ثانية"
  const [scoreA, setScoreA] = useState(4);
  const [scoreB, setScoreB] = useState(4);

  const toggleCategory = useCallback((id: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // keep at least 1 selected
      } else {
        if (next.size < 6) next.add(id); // max 6 categories
      }
      return next;
    });
  }, []);

  const cycleTimer = () =>
    setTimerIndex((i) => (i + 1) % TIMER_OPTIONS.length);

  return (
    <TVScreen focusKey="GAME_CREATION_SCREEN" backgroundColor={COLORS.cyan} disableOverscan>

      {/* ── Top: avatar / character selector ─────────────────────── */}
      <View style={styles.topBar}>
        {/* Hamburger menu */}
        <TouchableOpacity style={styles.hamburger}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.topBarTitle}>اختر فئات لعبتك</Text>

        {/* Scrollable avatar row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.avatarScroll}
          contentContainerStyle={styles.avatarScrollContent}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <AvatarCard
              key={i}
              index={i}
              selected={selectedAvatar === i}
              onPress={() => setSelectedAvatar(i)}
            />
          ))}
        </ScrollView>

        {/* Right arrow */}
        <TouchableOpacity style={styles.arrowBtn}>
          <Text style={styles.arrowBtnText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* ── Category scroll area ─────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <View key={section.id}>
            <SectionHeader title={section.title} />
            <CategoryGrid
              items={section.items}
              selected={selectedCategories}
              onToggle={toggleCategory}
            />
          </View>
        ))}

        {/* Spacer so last row isn't hidden behind bottom bar */}
        <View style={{ height: scale(isTV ? 180 : 150) }} />
      </ScrollView>

      {/* ── Fixed bottom control bar ─────────────────────────────── */}
      <View style={styles.bottomBar}>

        {/* Row 1: Team selectors + timer ──────────────────────── */}
        <View style={styles.bottomRow1}>
          {/* Team B (left, RTL) */}
          <DropdownBtn
            focusKey="GAME_TEAM_B"
            label={`الفريق ${teamB}`}
            onPress={() => {
              const idx = TEAMS.indexOf(teamB);
              setTeamB(TEAMS[(idx + 1) % TEAMS.length]);
            }}
            style={styles.teamDropdown}
          />

          {/* Timer */}
          <DropdownBtn
            focusKey="GAME_TIMER"
            label={TIMER_OPTIONS[timerIndex]}
            onPress={cycleTimer}
            style={styles.timerDropdown}
            labelStyle={styles.timerDropdownText}
          />

          {/* Team A (right, RTL) */}
          <DropdownBtn
            focusKey="GAME_TEAM_A"
            label={`الفريق ${teamA}`}
            onPress={() => {
              const idx = TEAMS.indexOf(teamA);
              setTeamA(TEAMS[(idx + 1) % TEAMS.length]);
            }}
            style={styles.teamDropdown}
          />
        </View>

        {/* Row 2: Score counters ────────────────────────────────── */}
        <View style={styles.bottomRow2}>
          {/* Team B score */}
          <ScoreCounter
            value={scoreB}
            onDecrement={() => setScoreB((v) => Math.max(0, v - 1))}
            onIncrement={() => setScoreB((v) => v + 1)}
            focusKeyPrefix="SCORE_B"
          />

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Team A score */}
          <ScoreCounter
            value={scoreA}
            onDecrement={() => setScoreA((v) => Math.max(0, v - 1))}
            onIncrement={() => setScoreA((v) => v + 1)}
            focusKeyPrefix="SCORE_A"
          />
        </View>

        {/* Row 3: Start game button ────────────────────────────── */}
        <View style={styles.bottomRow3}>
          <Focusable
            focusKey="GAME_START_BTN"
            onSelect={() => { /* navigate to game */ }}
            showFocusRing={false}
          >
            {({ focused }) => (
              <TouchableOpacity
                style={[styles.startBtn, focused && styles.startBtnFocused]}
                activeOpacity={0.85}
              >
                <Text style={styles.startBtnText}>ابدأ اللعب</Text>
              </TouchableOpacity>
            )}
          </Focusable>
        </View>
      </View>
    </TVScreen>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const BOTTOM_BAR_H = scale(isTV ? 170 : 140);

const styles = StyleSheet.create({

  // ── Top bar ─────────────────────────────────────────────────────
  topBar: {
    height: AVATAR_CARD_H + SPACING.md * 2,
    backgroundColor: COLORS.cyan,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.cyanDark,
    gap: SPACING.sm,
  },
  hamburger: {
    width: scale(36),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
  },
  hamburgerIcon: {
    fontSize: scale(isTV ? 20 : 16),
    color: COLORS.textDark,
  },
  topBarTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    color: COLORS.textDark,
    writingDirection: 'rtl',
    textAlign: 'right',
    minWidth: scale(isTV ? 180 : 130),
  },
  avatarScroll: {
    flex: 1,
  },
  avatarScrollContent: {
    flexDirection: 'row',
    gap: scale(isTV ? 10 : 8),
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
  },
  avatarCard: {
    width: AVATAR_CARD_W,
    height: AVATAR_CARD_H,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  avatarCardSelected: {
    backgroundColor: COLORS.selectedBg,
    borderColor: COLORS.selectedBorder,
  },
  avatarCardFocused: {
    borderColor: COLORS.yellow,
    shadowColor: COLORS.yellow,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.7,
    elevation: 8,
  },
  avatarImgWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: scale(isTV ? 28 : 22),
  },
  avatarLabel: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.cyanLight,
    paddingVertical: 2,
    borderBottomLeftRadius: BORDER_RADIUS.md,
    borderBottomRightRadius: BORDER_RADIUS.md,
  },
  avatarLabelSelected: {
    backgroundColor: COLORS.cyanDark,
  },
  avatarLabelText: {
    fontSize: scale(isTV ? 13 : 10),
    fontWeight: '800',
    color: COLORS.cyanDark,
  },
  avatarLabelTextSelected: {
    color: COLORS.white,
  },
  arrowBtn: {
    width: scale(36),
    height: scale(36),
    backgroundColor: COLORS.white,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.cyanDark,
  },
  arrowBtnText: {
    fontSize: scale(isTV ? 22 : 18),
    fontWeight: '800',
    color: COLORS.cyanDark,
    lineHeight: scale(isTV ? 26 : 20),
  },

  // ── Scroll area ──────────────────────────────────────────────────
  scroll: {
    flex: 1,
    backgroundColor: COLORS.cyanLight,
  },
  scrollContent: {
    paddingHorizontal: GRID_PADDING_H,
    paddingTop: SPACING.md,
  },

  // ── Section header ───────────────────────────────────────────────
  sectionHeaderWrap: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  sectionHeader: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.cyan,
  },
  sectionHeaderText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    color: COLORS.textDark,
    writingDirection: 'rtl',
  },

  // ── Category grid ────────────────────────────────────────────────
  grid: {
    gap: GRID_GAP,
    marginBottom: SPACING.md,
  },
  gridRow: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  catCard: {
    width: CARD_W,
    height: CARD_H,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: SPACING.xs,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  catCardSelected: {
    backgroundColor: COLORS.selectedBg,
    borderColor: COLORS.selectedBorder,
  },
  catCardFocused: {
    borderColor: COLORS.yellow,
    shadowColor: COLORS.yellow,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 6,
  },
  catAvatarWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    width: '100%',
  },
  catAvatarWrapSelected: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  catAvatarEmoji: {
    fontSize: scale(isTV ? 26 : 18),
  },
  catLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: scale(isTV ? 14 : 9),
    fontWeight: '700',
    color: COLORS.textDark,
    paddingVertical: scale(3),
    writingDirection: 'rtl',
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  catLabelSelected: {
    color: COLORS.white,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  // ── Bottom bar ───────────────────────────────────────────────────
  bottomBar: {
    height: BOTTOM_BAR_H,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderTopWidth: 2,
    borderTopColor: COLORS.border,
    gap: SPACING.xs,
    justifyContent: 'space-between',
  },
  bottomRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },
  bottomRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomRow3: {
    alignItems: 'center',
  },

  // ── Dropdown buttons ─────────────────────────────────────────────
  teamDropdown: {
    flex: 1,
    backgroundColor: COLORS.yellow,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.yellowDark,
    maxWidth: scale(200),
  },
  timerDropdown: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.cyan,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownBtnFocused: {
    shadowColor: COLORS.cyanDark,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.35,
    elevation: 8,
    borderColor: COLORS.cyanDark,
  },
  dropdownBtnText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
    color: COLORS.textDark,
    writingDirection: 'rtl',
  },
  timerDropdownText: {
    color: COLORS.cyanDark,
  },
  dropdownChevron: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textDark,
    fontWeight: '700',
  },

  // ── Score counter ────────────────────────────────────────────────
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  scoreBtn: {
    width: scale(isTV ? 44 : 34),
    height: scale(isTV ? 34 : 28),
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  scoreBtnPlus: {
    backgroundColor: COLORS.cyan,
  },
  scoreBtnFocused: {
    shadowColor: COLORS.cyanDark,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 6,
    transform: [{ scale: 1.06 }],
  },
  scoreBtnText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: FONT_SIZE.md * 1.2,
  },
  scoreValueBox: {
    width: scale(isTV ? 44 : 34),
    height: scale(isTV ? 34 : 28),
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.cyanLight,
    borderWidth: 2,
    borderColor: COLORS.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '900',
    color: COLORS.textDark,
  },

  // ── Start button ─────────────────────────────────────────────────
  startBtn: {
    backgroundColor: COLORS.yellow,
    paddingVertical: scale(isTV ? 12 : 9),
    paddingHorizontal: scale(isTV ? 80 : 60),
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2.5,
    borderColor: COLORS.yellowDark,
    alignItems: 'center',
    shadowColor: COLORS.yellowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.35,
    elevation: 6,
  },
  startBtnFocused: {
    backgroundColor: COLORS.yellowDark,
    transform: [{ scale: 1.04 }],
    shadowOpacity: 0.55,
  },
  startBtnText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '900',
    color: COLORS.textDark,
    writingDirection: 'rtl',
    letterSpacing: 0.5,
  },
});
