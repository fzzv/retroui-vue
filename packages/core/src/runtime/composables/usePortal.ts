import type { InjectionKey, Ref } from 'vue'
import { computed, inject, provide } from 'vue'

/**
 * portal 目标元素注入键
 */
export const portalTargetInjectionKey: InjectionKey<Ref<string | HTMLElement>> = Symbol('retroui-vue.portal-target')

/**
 * 使用 portal，用于管理和提供“传送门”目标（即内容渲染的挂载点），
 * 常用于弹窗、对话框、通知等需要将内容渲染到 body 或其他 DOM 节点的场景
 * @param portal 目标元素
 * @returns 目标元素和禁用状态
 * @example const { to, disabled } = usePortal(ref('#app')).value
 */
export function usePortal(portal: Ref<string | HTMLElement | boolean | undefined>) {
  const portalTarget = inject(portalTargetInjectionKey, undefined)

  const to = computed(() => {
    if (typeof portal.value === 'boolean' || portal.value === undefined) {
      return portalTarget?.value ?? 'body'
    }

    return portal.value
  })

  const disabled = computed(() => typeof portal.value === 'boolean' ? !portal.value : false)

  provide(portalTargetInjectionKey, computed(() => to.value))

  return computed(() => ({
    to: to.value,
    disabled: disabled.value,
  }))
}
