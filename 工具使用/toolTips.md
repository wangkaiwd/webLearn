## 常用网站
1. 查英文单词: iciba.com  
  ![iciba](./images/iciba.com.png)
2. `CSS`浏览器兼容性查询: caniuse.com  
  ![caniuse](./images/caniuse.png)
3. 前端开发中文文档导航: cndevdocs.com  
  ![cndevdocs](./images/cndevdocs.png)
4. 阿里字体图标库: iconfont.cn  
  ![iconfont](./images/iconfont.png)

## 常用编辑器设置及快捷键

### `webStorm`
#### 常用快捷键
1. 查找和文件替换
    全局功能：
    1. `ctrl+shift+f`: 全局搜索项目中的任意代码
    2. ![webstorm](./images/findFile.png)
      自己的按键: `ctrl+p`,`ctrl+shift+p`
    3. `shift+shift`: 全局搜索任意内容（代码，编辑器功能，文件）
    4. `ctrl+shift+a`: 快速查找并使用编辑器的所有功能  
    5. `ctrl+shift+r`: 全局替换(`ctrl+shift+h`)

    局部功能：
    1. `ctrl+f`：当前文件（局部）搜索
    2. `ctrl+r`: 当前文件替换(`ctrl+h`)

2. 重构代码
    1. `ctrl+j`: 代码行缩进
    2. `shift+f6`: 重构作用域内的某个字符(`ctrl+6`)

3. `vcs`操作
    1. `ctrl+y`: `git pull`拉取代码
    2. `ctrl+k`: `git commit`提交代码
    3. `ctrl+i`: `git push`推送代码

4. 其它操作(自己设置的快捷键)：
    1. `ctrl+w`: 关闭当前的代码窗口
    2. `ctrl+o`: 选中一个词（类似于双击）

#### [常用设置](https://juejin.im/entry/599ad8f26fb9a0249174ef09)
1. `Allow unsigned requests`:允许为签名的请求  
  ![allowUnsignedRequest](./images/allowUnsignedRequest.png)
2. 设置修改文件手动保存，并添加未保存时的图标样式
   ![webstorm](./images/cancel.png)  
3. 设置js格式化风格（目前常用为`JavaScript Standard Style`）
  ![jsStyle](./images/jsStyle.png)
4. 关闭安全写入  
  ![safeWrite](./images/safeWrite.png)  
  ![parcelDocument](./images/parcelDocument.png)
5. 可以鼠标双击选中驼峰式命名的变量  
    修改设置之后就可以直接双击选中input-wrapper,否则只能选中input或wrapper
    ```html
    <div class="input-wrapper"></div>
    ```
   ![webstorm](./images/doubleClick.png)  
   ![webstorm](./images/camelHumps.png)

### `vscode`
#### 常用快捷键
##### 对于行的操作
1. 重开一行: `ctrl+enter`向下重开一行，`ctrl+shift+enter`向上重开一行
2. 删除一行：**光标没有选择内容时**，`ctrl+x`剪切一行；`ctrl+shift+k`直接删除一行
3. 移动一行：`alt+↑`向上移动一行，`alt+↓`向下移动一行
4. 复制一行：`shift+alt+↓`向上复制一行，`shift+alt+↑`向下复制一行
##### 对于词的操作
1. 选中一个词: `ctrl+d`
##### 搜索或替换
1. 搜索编辑器功能：`ctrl+shift+p`
2. 搜索函数: `ctrl+f:@`
3. 搜索行：`ctrl+G:行数`
4. 搜索文件： `ctrl+p`
5. 搜索最近打开的文件: `ctrl+e`
6. 当前文件内替换: `ctrl+h`
7. 全局替换: `ctrl+shift+h`
8. 全局搜索：`ctrl+shift+f`
