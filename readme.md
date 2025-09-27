# 括号匹配工具

一个轻量级括号匹配工具，用于在代码或文本中查找匹配的括号/括号对，支持自定义括号类型和多字符括号。

## 功能特点

- 支持任意类型的括号（如`()`, `[]`, `{}`, `<>`, 甚至多字符括号）
- 精确匹配括号位置，返回平衡状态和索引信息
- 轻量级无依赖，兼容Node.js和浏览器环境
- 支持从左括号查找右括号或从右括号查找左括号

## 安装

```bash
npm install bracket-match
```

## 使用方法

### 基础用法

```javascript
import { bracketMatch } from 'bracket-match';

// 定义括号列表（每个对象包含left和right属性）
const bracketList = [
  { left: '((', right: ')' },    // 多字符左括号
  { left: '(', right: '))' },     // 多字符右括号
  { left: '(((', right: ')))' }   // 对称多字符括号
];

// 查找左括号匹配
const result = bracketMatch({
  bracketList,
  rowIndex: 0,          // 起始行索引
  bracketString: '('    // 要查找的括号字符串
});

console.log(result);
// {
//   balanced: false,
//   leftRowIndex: 0,
//   rightRowIndex: 0,
//   leftBracketIndex: 1,
//   rightBracketIndex: 0
// }
```

## API 文档

bracketMatch(options)

### 参数

- options Object - 配置选项
  - bracketList Array<{left: string, right: string}> - 括号定义列表，每个对象包含：
    - left string - 左括号字符串（可多字符）
    - right string - 右括号字符串（可多字符）
  - rowIndex number - 起始行索引（从0开始）
  - bracketString string - 要查找匹配的括号字符串

### 返回值

Object | null - 匹配结果对象（未找到时返回null），包含：

- balanced boolean - 是否完全平衡匹配
- leftRowIndex number - 左括号所在行索引
- rightRowIndex number - 右括号所在行索引
- leftBracketIndex number - 左括号在其行内的字符索引
- rightBracketIndex number - 右括号在其行内的字符索引

## 示例

### 示例1：匹配多字符左括号

```javascript
const bracketList = [
  { left: '((', right: ')' },
  { left: '(', right: '))' }
];

// 查找第0行的"(( "（完整左括号）
const result = bracketMatch({
  bracketList,
  rowIndex: 0,
  bracketString: '(('
});

console.log(result);
// {
//   balanced: true,
//   leftRowIndex: 0,
//   rightRowIndex: 1,
//   leftBracketIndex: 0,
//   rightBracketIndex: 1
// }
```

### 示例2：匹配右括号

```javascript
const bracketList = [
  { left: '((', right: ')' },
  { left: '(', right: '))' }
];

// 查找第1行的"))"（完整右括号）
const result = bracketMatch({
  bracketList,
  rowIndex: 1,
  bracketString: '))'
});

console.log(result);
// {
//   balanced: true,
//   leftRowIndex: 0,
//   rightRowIndex: 1,
//   leftBracketIndex: 0,
//   rightBracketIndex: 1
// }
```

## 测试

项目包含基础测试用例，可通过以下命令运行：

```bash
npm test
```
