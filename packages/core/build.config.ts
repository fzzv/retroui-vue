import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // 插件入口 - 这些是纯 JS/TS 文件，可以用 rollup 打包
    'src/unplugin',
    'src/vite',
    // 使用 mkdist 处理 Vue 文件
    {
      input: 'src/',
      outDir: 'dist/',
      builder: 'mkdist',
      format: 'esm',
      ext: 'js',
    },
  ],
  // 生成 .d.ts 类型声明
  declaration: true,
  // 打包前清理输出目录
  clean: true,
  // 不要因为警告而失败
  failOnWarn: false,
  hooks: {
    'mkdist:entry:options': function (ctx, entry, options) {
      options.addRelativeDeclarationExtensions = false
    },
  },
  externals: ['vite'],
})
