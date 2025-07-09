import icons from './runtime/theme/icons'
import { pick } from './runtime/utils'

/**
 * 默认配置
 */
export const defaultOptions = {
  prefix: 'R',
  theme: {
    colors: undefined,
    transitions: true,
  },
}

/**
 * 获取默认的 UI 配置
 * @param colors 颜色列表
 * @returns 默认的 UI 配置
 */
export function getDefaultUiConfig(colors?: string[]) {
  return {
    colors: pick({
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    }, [...(colors || []), 'neutral' as any]),
    icons,
  }
}

/**
 * 解析颜色
 * @param colors 颜色列表
 * @returns 解析后的颜色列表
 */
export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set(['primary', ...colors])]
    : ['primary', 'secondary', 'success', 'info', 'warning', 'error']
}
