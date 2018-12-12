## `Chrome`调试笔记
### `console`中的`$`
* `$0`:关联到当前选中的`html`节点（支持$0~$4）
* `$`:`document.querySelector`的一个别名
* `$$`: 执行`document.querySelectorAll`，并返回一个数组(并不是伪数组)。
* `$i`: 可以安装`chrome`插件:`Console Importer`,通过`$i('lodash')`