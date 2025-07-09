import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import type { Direction, Locale } from '../types/locale'
import { computed, isRef, ref, unref } from 'vue'
import { get } from './index'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export interface LocaleContext<M> {
  locale: Ref<Locale<M>>
  lang: Ref<string>
  dir: Ref<Direction>
  code: Ref<string>
  t: Translator
}

/**
 * 构建翻译器
 * @param locale 语言包
 * @returns 翻译器
 */
export function buildTranslator<M>(locale: MaybeRef<Locale<M>>): Translator {
  return (path, option) => translate(path, option, unref(locale))
}

/**
 * 翻译
 * @param path 路径
 * @param option 选项
 * @param locale 语言包
 * @returns 翻译后的文本
 */
export function translate<M>(path: string, option: undefined | TranslatorOption, locale: Locale<M>): string {
  const prop: string = get(locale, `messages.${path}`, path)

  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`,
  )
}

/**
 * 构建语言包上下文
 * @param locale 语言包
 * @returns 语言包上下文
 */
export function buildLocaleContext<M>(locale: MaybeRef<Locale<M>>): LocaleContext<M> {
  const lang = computed(() => unref(locale).name)
  const code = computed(() => unref(locale).code)
  const dir = computed(() => unref(locale).dir)
  const localeRef = isRef(locale) ? locale : ref(locale) as Ref<Locale<M>>

  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale),
  }
}
