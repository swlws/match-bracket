(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS / Node
    module.exports = factory();
  } else {
    // 浏览器全局
    root.matchBracket = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * 匹配括号
   * @param {Object} options - 选项
   * @param {Array<{left: string, right: string}>} options.bracketList - 括号列表。
   * @param {number} options.rowIndex - 行索引
   * @param {string} options.bracketString - 要查找的括号字符串
   * @returns {Object|null} - 匹配结果
   */
  function matchBracket({
    bracketList = [],
    rowIndex = 0,
    bracketString = '',
  } = {}) {
    if (!bracketList.length || rowIndex < 0 || rowIndex >= bracketList.length) {
      return null;
    }

    const current = bracketList[rowIndex];
    const isLeft = current.left.includes(bracketString);
    const isRight = current.right.includes(bracketString);

    if (!isLeft && !isRight) {
      return null;
    }

    // 定义遍历方向
    const step = isLeft ? +1 : -1;
    let remain = bracketString.length;
    const bracketIndex = isLeft
      ? current.left.length - remain // 左括号索引
      : remain - 1; // 右括号索引

    for (let i = rowIndex; i >= 0 && i < bracketList.length; i += step) {
      const { left, right } = bracketList[i];

      if (i !== rowIndex) {
        // 如果是向右查找，就累加 left；如果是向左查找，就累加 right
        remain += isLeft ? left.length : right.length;
      }

      const oppositeSize = isLeft ? right.length : left.length;
      if (oppositeSize === 0) continue;

      if (oppositeSize < remain) {
        remain -= oppositeSize;
        continue;
      }

      // 找到匹配位置
      return {
        balanced: isLeft
          ? bracketIndex === 0 && remain === oppositeSize
          : bracketString.length === remain && remain === oppositeSize,
        leftRowIndex: isLeft ? rowIndex : i,
        rightRowIndex: isLeft ? i : rowIndex,
        leftBracketIndex: isLeft ? bracketIndex : left.length - remain,
        rightBracketIndex: isLeft ? remain - 1 : bracketIndex,
      };
    }

    return null;
  }

  // UMD 导出
  return matchBracket;
});
