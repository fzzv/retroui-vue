import type { UnpluginOptions } from 'unplugin'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import type { ModuleOptions } from './module'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defu } from 'defu'
import { normalize } from 'pathe'
import { createUnplugin } from 'unplugin'
import { defaultOptions } from './default'
import ComponentImportPlugin from './plugins/components'

export interface RetroUIOptions extends ModuleOptions {
  /**
   * 是否生成 TypeScript 声明文件
   */
  dts?: boolean
  /**
   * 用于覆盖unplugin-vue-components的配置
   */
  components?: Partial<ComponentsOptions>
}

// 源码目录
export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)))

export const RetroUIPlugin = createUnplugin<RetroUIOptions>((_options = {}, meta) => {
  // 合并默认配置
  const options = defu(_options, { fonts: false }, defaultOptions)
  options.theme = options.theme || {}
  return [
    ComponentImportPlugin(options, meta),
    tailwindcss(),
  ].flat(1) as UnpluginOptions[]
})
