import type { Direction, Locale } from '@/types/locale'
import type { DeepPartial } from '@/types/utils'
import { defu } from 'defu'

interface DefineLocaleOptions<M> {
  name: string
  code: string
  dir?: Direction
  messages: M
}

/**
 * 定义一个语言包
 * @param options 语言包的配置
 * @returns 语言包
 * @__NO_SIDE_EFFECTS__ 作用：防止在编译时，对代码进行优化，导致代码执行顺序发生变化
 */
/* @__NO_SIDE_EFFECTS__ */
export function defineLocale<M>(options: DefineLocaleOptions<M>): Locale<M> {
  return defu<DefineLocaleOptions<M>, [{ dir: Direction }]>(options, { dir: 'ltr' })
}

/**
 * 扩展一个语言包
 * @param locale 语言包
 * @param options 扩展的配置
 * @returns 扩展后的语言包
 */
/* @__NO_SIDE_EFFECTS__ */
export function extendLocale<M>(locale: Locale<M>, options: Partial<DefineLocaleOptions<DeepPartial<M>>>): Locale<M> {
  return defu<Locale<M>, [DefineLocaleOptions<M>]>(options, locale)
}
