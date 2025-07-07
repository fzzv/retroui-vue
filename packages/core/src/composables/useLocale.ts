import type { InjectionKey, Ref } from 'vue'
import type { Locale, Messages } from '../types/locale'
import { createSharedComposable } from '@vueuse/core'
import { computed, inject, toRef } from 'vue'
import { buildLocaleContext } from '@/lib/locale'
import en from '@/locale/en'

/**
 * 语言包上下文注入键
 */
export const localeContextInjectionKey: InjectionKey<Ref<Locale<unknown> | undefined>> = Symbol.for('retroui-vue.locale-context')

/**
 * 使用语言包
 * @param localeOverrides 语言包
 * @returns 语言包上下文
 */
function _useLocale(localeOverrides?: Ref<Locale<Messages> | undefined>) {
  const locale = localeOverrides || toRef(inject<Locale<Messages>>(localeContextInjectionKey))

  return buildLocaleContext<Messages>(computed(() => locale.value || en))
}

/**
 * @__PURE__ 作用：防止在编译时，对代码进行优化，导致代码执行顺序发生变化
 * createSharedComposable 作用：创建一个共享的组合式函数，避免重复创建。
 * 无论在多少个组件里调用 useLocale()，拿到的都是同一个 locale 状态
 */
export const useLocale = /* @__PURE__ */ createSharedComposable(_useLocale)
