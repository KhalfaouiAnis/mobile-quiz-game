export const COLORS = {
  // ── Brand ──────────────────────────────────────────────────────
  yellow:        '#FFCC00',
  yellowDark:    '#E6B800',
  yellowLight:   '#FFF3B0',

  cyan:          '#00C2D9',
  cyanDark:      '#0099AF',
  cyanMid:       '#00AABF',
  cyanLight:     '#E0F8FB',

  // ── UI surfaces ────────────────────────────────────────────────
  white:         '#FFFFFF',
  offWhite:      '#F4FBFD',
  cardBg:        '#FFFFFF',
  headerBg:      '#FFCC00',         // yellow header strip
  screenBg:      '#00C2D9',         // cyan screen background

  // ── Semantic ──────────────────────────────────────────────────
  red:           '#E53935',
  redLight:      '#FFEBEE',
  green:         '#43A047',
  greenBadge:    '#2E7D32',

  // ── Text ──────────────────────────────────────────────────────
  textDark:      '#1A1A2E',
  textMid:       '#4A5568',
  textLight:     '#718096',
  textWhite:     '#FFFFFF',
  textCyan:      '#006B80',

  // ── Selection / Focus ─────────────────────────────────────────
  selectedBg:    '#0077A0',
  selectedBorder:'#005580',
  focusRing:     '#FFCC00',

  // ── Borders ───────────────────────────────────────────────────
  border:        'rgba(0, 194, 217, 0.45)',
  borderWhite:   'rgba(255,255,255,0.3)',
  borderDark:    'rgba(0, 0, 0, 0.08)',
} as const;
