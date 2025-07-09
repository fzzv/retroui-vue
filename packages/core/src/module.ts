import { addComponentsDir, addImportsDir, addVitePlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import defu from 'defu'
import { name, version } from '../package.json'
import { defaultOptions, getDefaultUiConfig, resolveColors } from './default'

export interface ModuleOptions {
  /**
   * 组件前缀
   */
  prefix?: string
  theme?: {
    /**
     * 组件可用的颜色别名
     * @defaultValue `['primary', 'secondary', 'success', 'info', 'warning', 'error']`
     */
    colors?: string[]

    /**
     * 是否启用组件过渡动画
     * @defaultValue `true`
     */
    transitions?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name, // 模块名称
    version, // 版本号
    docs: '', // 文档链接
    configKey: 'retroui', // nuxt.config.ts 中的配置键
    compatibility: {
      nuxt: '>=3.16.0', // 兼容的 Nuxt 版本
    },
  },
  // 默认配置
  defaults: defaultOptions,
  // 模块的主逻辑
  async setup(options, nuxt) {
    // 创建路径解析器，基于当前文件
    const { resolve } = createResolver(import.meta.url)
    // 处理主题配置，确保 theme 对象存在
    options.theme = options.theme || {}
    // 解析主题颜色，合并默认色板
    options.theme.colors = resolveColors(options.theme.colors)

    // 将最终 options 挂载到 nuxt.options.ui，供后续使用
    // @ts-expect-error: nuxt.options.ui 是动态扩展的属性
    nuxt.options.ui = options

    // 配置 #ui 路径别名，指向 runtime 目录
    nuxt.options.alias['#ui'] = resolve('./runtime')

    // 合并 appConfig.ui，注入默认 UI 配置
    nuxt.options.appConfig.ui = defu(
      nuxt.options.appConfig.ui || {},
      getDefaultUiConfig(options.theme.colors),
    )

    // 让根节点具备 isolate 类，防止 portal 组件样式污染
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, 'isolate'].filter(Boolean).join(' ')

    // 根据构建工具类型，分别添加 Tailwind 插件
    if (nuxt.options.builder === '@nuxt/vite-builder') {
      // Vite 构建，动态引入 @tailwindcss/vite 并注册
      const plugin = await import('@tailwindcss/vite').then(r => r.default)
      addVitePlugin(plugin())
    }
    else {
      // 其他构建工具，注册 PostCSS 插件
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}
    }

    // 注册组件目录，实现自动组件注册和前缀支持
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false, // 不使用路径前缀
    })

    // 注册自动导入目录（如 composables）
    addImportsDir(resolve('./runtime/composables'))
  },
})
