export default {
  printWidth: 80, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: true, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: "as-needed", //仅在必需时为对象的key添加引号
  trailingComma: "all", //多行时尽可能打印尾随逗号
  bracketSpacing: false, //在对象前后添加空格-eg: { foo: bar }
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  proseWrap: "preserve", //不知道怎么翻译
  htmlWhitespaceSensitivity: "ignore", //对HTML全局空白不敏感
  singleAttributePerLine: false, //多个属性时每个属性独占一行
  vueIndentScriptAndStyle: true, //不对vue中的script及style标签缩进
  bracketSameLine: false, //将>多行元素的'>'折叠到最后一行的末尾
  endOfLine: "lf", //结束行形式
  embeddedLanguageFormatting: "auto", //对引用代码进行格式化
};
