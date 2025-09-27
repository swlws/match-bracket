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
   * @returns {Object} - 匹配结果
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

    if (isLeft) {
      let leftSize = bracketString.length;
      const bracketIndex = current.left.length - leftSize;
      for (let i = rowIndex; i < bracketList.length; i++) {
        const { left, right } = bracketList[i];
        if (i !== rowIndex) {
          leftSize += left.length;
        }
        const rightSize = right.length;
        if (rightSize === 0) continue;

        if (rightSize < leftSize) {
          leftSize = leftSize - rightSize;
          continue;
        }

        return {
          // 剩余的左括号，将当前行的右括号消耗完、且左括号的开始索引为 0 ，认为是平衡的
          balanced: bracketIndex === 0 && leftSize === rightSize,
          leftRowIndex: rowIndex,
          rightRowIndex: i,
          leftBracketIndex: bracketIndex,
          rightBracketIndex: leftSize - 1,
        };
      }

      return null;
    }

    if (isRight) {
      let rightSize = bracketString.length;
      const bracketIndex = rightSize - 1;

      for (let i = rowIndex; i >= 0; i--) {
        const { left, right } = bracketList[i];
        if (i !== rowIndex) {
          rightSize += right.length;
        }
        const leftSize = left.length;
        if (leftSize === 0) continue;

        if (leftSize < rightSize) {
          rightSize = rightSize - leftSize;
          continue;
        }

        return {
          // 剩余的右括号，将当前行的左括号消耗完、且右括号的结束索引为最后一个括号，认为是平衡的
          balanced:
            bracketString.length === rightSize && leftSize === rightSize,
          leftRowIndex: i,
          rightRowIndex: rowIndex,
          leftBracketIndex: leftSize - rightSize,
          rightBracketIndex: bracketIndex,
        };
      }

      return null;
    }

    return null;
  }

  // UMD 导出
  return matchBracket;
});
