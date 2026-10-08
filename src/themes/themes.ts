
export interface ThemeTokens {
  bg: string
  surface: string
  elevated: string
  text: string
  muted: string
  accent: string
  accentFg: string
  line: string
  radius: string
  fontDisplay: string
  fontBody: string
}

export interface Theme {
  id: string
  name: string
  description: string
  scheme: 'light' | 'dark'
  swatch: [string, string, string]
  tokens: ThemeTokens
}

const SANS =
  "system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif"
const MONO =
  "ui-monospace, 'Cascadia Code', 'JetBrains Mono', Consolas, 'Courier New', monospace"
const SERIF = "Georgia, 'Songti SC', 'Noto Serif SC', 'SimSun', serif"

export const CSS_VARS: Record<keyof ThemeTokens, string> = {
  bg: '--t-bg',
  surface: '--t-surface',
  elevated: '--t-elevated',
  text: '--t-text',
  muted: '--t-muted',
  accent: '--t-accent',
  accentFg: '--t-accent-fg',
  line: '--t-line',
  radius: '--t-radius',
  fontDisplay: '--t-font-display',
  fontBody: '--t-font-body',
}

export const themes: Theme[] = [
  {
    id: 'material',
    name: 'Material 浅色',
    description: '白底玫红',
    scheme: 'light',
    swatch: ['#f4f5f5', '#ffffff', '#ff4081'],
    tokens: {
      bg: '#f4f5f5',
      surface: '#ffffff',
      elevated: '#ffffff',
      text: '#212121',
      muted: '#6b7280',
      accent: '#ff4081',
      accentFg: '#ffffff',
      line: '#e0e0e0',
      radius: '12px',
      fontDisplay: SANS,
      fontBody: SANS,
    },
  },
  {
    id: 'terminal',
    name: '暗色终端',
    description: '黑底等宽字，绿色强调',
    scheme: 'dark',
    swatch: ['#0b0f0e', '#16201d', '#3ddc84'],
    tokens: {
      bg: '#0b0f0e',
      surface: '#121816',
      elevated: '#16201d',
      text: '#d7e6df',
      muted: '#6b8a80',
      accent: '#3ddc84',
      accentFg: '#06140d',
      line: '#23332e',
      radius: '4px',
      fontDisplay: MONO,
      fontBody: MONO,
    },
  },
  {
    id: 'glass',
    name: '柔光玻璃',
    description: '蓝粉渐变，卡片半透明',
    scheme: 'light',
    swatch: ['#f0f7ff', '#ffb7c5', '#4ca9e1'],
    tokens: {
      bg: '#f0f7ff',
      surface: 'rgba(255, 255, 255, 0.62)',
      elevated: 'rgba(255, 255, 255, 0.85)',
      text: '#2b3a67',
      muted: '#6b7a99',
      accent: '#4ca9e1',
      accentFg: '#ffffff',
      line: 'rgba(255, 255, 255, 0.75)',
      radius: '24px',
      fontDisplay: SANS,
      fontBody: SANS,
    },
  },
  {
    id: 'paper',
    name: '纸白',
    description: '米白底，衬线字',
    scheme: 'light',
    swatch: ['#f7f4ed', '#fffdf8', '#b45309'],
    tokens: {
      bg: '#f7f4ed',
      surface: '#fffdf8',
      elevated: '#fffdf8',
      text: '#2e2a24',
      muted: '#7a7266',
      accent: '#b45309',
      accentFg: '#fffdf8',
      line: '#e3ddd0',
      radius: '6px',
      fontDisplay: SERIF,
      fontBody: SERIF,
    },
  },
  {
    id: 'midnight',
    name: '深蓝夜色',
    description: '深蓝黑，亮度低',
    scheme: 'dark',
    swatch: ['#0d1117', '#161b22', '#58a6ff'],
    tokens: {
      bg: '#0d1117',
      surface: '#161b22',
      elevated: '#1c2330',
      text: '#e6edf3',
      muted: '#8b949e',
      accent: '#58a6ff',
      accentFg: '#0d1117',
      line: '#23303f',
      radius: '12px',
      fontDisplay: SANS,
      fontBody: SANS,
    },
  },
  {
    id: 'sakura',
    name: '樱花',
    description: '粉色系，偏暖',
    scheme: 'light',
    swatch: ['#fff5f7', '#ffffff', '#e8799a'],
    tokens: {
      bg: '#fff5f7',
      surface: '#ffffff',
      elevated: '#ffffff',
      text: '#4a2b35',
      muted: '#9c7480',
      accent: '#e8799a',
      accentFg: '#ffffff',
      line: '#f6dde4',
      radius: '18px',
      fontDisplay: SANS,
      fontBody: SANS,
    },
  },
  {
    id: 'nord',
    name: '冷灰蓝',
    description: 'Nord 配色，冷灰蓝',
    scheme: 'dark',
    swatch: ['#2e3440', '#3b4252', '#88c0d0'],
    tokens: {
      bg: '#2e3440',
      surface: '#3b4252',
      elevated: '#434c5e',
      text: '#eceff4',
      muted: '#a3adc0',
      accent: '#88c0d0',
      accentFg: '#2e3440',
      line: '#4c566a',
      radius: '10px',
      fontDisplay: SANS,
      fontBody: SANS,
    },
  },
  {
    id: 'contrast',
    name: '高对比',
    description: '纯黑白，链接深蓝',
    scheme: 'light',
    swatch: ['#ffffff', '#000000', '#0000cc'],
    tokens: {
      bg: '#ffffff',
      surface: '#ffffff',
      elevated: '#ffffff',
      text: '#000000',
      muted: '#333333',
      accent: '#0000cc',
      accentFg: '#ffffff',
      line: '#000000',
      radius: '2px',
      fontDisplay: SANS,
      fontBody: SANS,
    },
  },
]

export const DEFAULT_THEME_ID = 'material'

export function themeForScheme(dark: boolean): Theme {
  const id = dark ? 'midnight' : DEFAULT_THEME_ID
  return themes.find((t) => t.id === id) ?? themes[0]!
}

export function findTheme(id: string): Theme | undefined {
  return themes.find((t) => t.id === id)
}
