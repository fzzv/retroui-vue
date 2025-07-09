<script setup lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { Locale, Messages } from '../types'
import { reactivePick } from '@vueuse/core'
import { ConfigProvider, TooltipProvider, useForwardProps } from 'reka-ui'
import { provide, toRef, useId } from 'vue'
import { localeContextInjectionKey } from '../composables/useLocale'
import { portalTargetInjectionKey } from '../composables/usePortal'

export interface AppProps<T extends Messages = Messages> extends Omit<ConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  tooltip?: TooltipProviderProps
  toaster?: null
  locale?: Locale<T>
  portal?: string | HTMLElement
}

export interface AppSlots {
  default: (props?: {}) => any
}

const props = withDefaults(defineProps<AppProps>(), {
  portal: 'body',
})

defineSlots<AppSlots>()

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'))
const tooltipProps = toRef(() => props.tooltip)

const locale = toRef(() => props.locale)
provide(localeContextInjectionKey, locale)

const portal = toRef(() => props.portal)
provide(portalTargetInjectionKey, portal)
</script>

<template>
  <ConfigProvider :use-id="() => (useId() as string)" :dir="locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <slot />
    </TooltipProvider>
  </ConfigProvider>
</template>
