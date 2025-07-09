import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // 插件入口 - 这些是纯 JS/TS 文件，可以用 rollup 打包
    'src/unplugin',
    'src/vite',
    // 使用 mkdist 处理其他文件
    // {
    //   input: 'src/', // 输入目录：指定要构建的源代码目录
    //   outDir: 'dist/', // 输出目录：构建后的文件存放位置
    //   builder: 'mkdist', // 构建器：使用 mkdist 来构建文件
    //   format: 'esm', // 格式：输出 ES 模块格式
    //   ext: 'js', // 扩展名：输出文件使用 .js 扩展名
    // },
  ],
  // 生成 .d.ts 类型声明
  declaration: true,
  // 打包前清理输出目录
  clean: true,
  // 有警告是否会构建失败
  failOnWarn: false,
  hooks: {
    'mkdist:entry:options': function (ctx, entry, options) {
      // 禁用自动添加相对路径的声明文件扩展名
      options.addRelativeDeclarationExtensions = false
    },
  },
})
