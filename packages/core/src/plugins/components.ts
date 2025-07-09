import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import type { RetroUIOptions } from '../unplugin'
import { defu } from 'defu'
import { join, normalize } from 'pathe'
import { globSync } from 'tinyglobby'
import AutoImportComponents from 'unplugin-vue-components'
import { runtimeDir } from '../unplugin'

// 相对导入的正则表达式（匹配 ./ 或 ../ 开头的路径）
const RELATIVE_IMPORT_RE = /^\.{1,2}\//

export default function ComponentImportPlugin(options: RetroUIOptions & {
  prefix: NonNullable<RetroUIOptions['prefix']>
}, meta: UnpluginContextMeta) {
  // 扫描 components 目录下的所有 Vue 组件文件
  const components = globSync('**/*.vue', { cwd: join(runtimeDir, 'components') })
  // 生成组件名称集合，添加前缀（如 RButton、RCard）
  const componentNames = new Set(components.map(c => `${options.prefix}${c.replace(/\.vue$/, '')}`))

  // 配置 unplugin-vue-components 插件选项
  const pluginOptions = defu(options.components, <ComponentsOptions>{
    // 是否生成 TypeScript 声明文件
    dts: options.dts ?? true,
    // 排除的文件路径模式
    exclude: [
      // 排除 node_modules（除了 pnpm、retroui-vue）
      /[\\/]node_modules[\\/](?!\.pnpm|retroui-vue)/,
      // 排除 .git 目录
      /[\\/]\.git[\\/]/,
    ],
    // 自定义组件解析器
    resolvers: [
      (componentName) => {
        // 否则使用默认组件
        if (componentNames.has(componentName)) {
          return {
            name: 'default',
            from: join(runtimeDir, 'components', `${componentName.slice(options.prefix.length)}.vue`),
          }
        }
        return null
      },
    ],
  })

  return [
    /**
     * 这个插件自动导出组件
     * TODO: 需要考虑同时支持vue和nuxt
     */
    {
      name: 'retro:ui:components',
      enforce: 'pre', // 在其他插件之前执行
      /**
       * 模块解析钩子，用于处理组件导入路径
       * @param id 模块 ID
       * @param importer 导入者文件路径
       * @returns 解析后的文件路径或 undefined
       */
      resolveId(id, importer) {
        // 如果没有导入者，直接返回
        if (!importer) {
          return null
        }
        // 检查导入者是否在 runtimeDir 中
        if (!normalize(importer).includes(runtimeDir)) {
          return null
        }

        // 只处理相对导入或 retroui-vue/components/ 开头的导入
        if (!RELATIVE_IMPORT_RE.test(id) && !id.startsWith('retroui-vue/components/')) {
          return null
        }
        // 提取文件名（不含扩展名）
        // const filename = id.match(/([^/]+)\.vue$/)?.[1]
        // TODO: 判断文件是否需要适配
        return null
      },
    },
    // 使用 unplugin-vue-components 插件，传入配置选项
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions,
  ] satisfies UnpluginOptions[]
}
