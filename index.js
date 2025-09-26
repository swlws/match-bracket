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

  function findMatchingBracket(
    brackets,
    rowIndex,
    bracketStr,
    stepIndex = 0,
    remainBracket = 0,
    isLeftBracket
  ) {
    if (rowIndex < 0 || rowIndex > brackets.length - 1) {
      return null;
    }
    isLeftBracket = isLeftBracket ?? bracketStr.includes('(');
    const direction = isLeftBracket ? 1 : -1;

    const currentRow = brackets[rowIndex];
    const leftCount = isLeftBracket
      ? remainBracket !== 0
        ? currentRow.left.length - remainBracket
        : currentRow.left.length - bracketStr.length + 1
      : currentRow.left.length;

    const rightCount = !isLeftBracket
      ? remainBracket !== 0
        ? currentRow.right.length - remainBracket
        : bracketStr.length
      : currentRow.right.length;

    const bracketIndex = isLeftBracket
      ? rightCount - leftCount
      : leftCount - rightCount;

    if (bracketIndex >= 0) {
      const bracketDirection = isLeftBracket ? 'right' : 'left';
      const resultIndex = isLeftBracket
        ? rightCount - bracketIndex - 1
        : bracketIndex;

      return {
        startRowIndex: rowIndex - stepIndex * direction,
        endRowIndex: rowIndex,
        bracketDirection,
        bracketIndex:
          bracketIndex === 0
            ? isLeftBracket
              ? currentRow.right.length - 1
              : 0
            : resultIndex,
        stepIndex: stepIndex * direction,
        exactMatch: bracketIndex === 0,
      };
    }
    return findMatchingBracket(
      brackets,
      rowIndex + direction,
      '',
      stepIndex + 1,
      bracketIndex,
      isLeftBracket
    );
  }

  function matchBracket({ data = [], rowIndex = 0, bracketString = '' }) {
    if (!data[rowIndex] || !bracketString) return null;
    let isLeftBracket = bracketString.includes('(');
    let leftBracketString = data[rowIndex].left;
    let leftLength = leftBracketString.length - bracketString.length + 1;
    if (isLeftBracket) {
      bracketString = leftBracketString.slice(0, leftLength);
    }
    let result = findMatchingBracket(data, rowIndex, bracketString);
    if (!result) {
      return null;
    }
    let [start, end] = [result.startRowIndex, result.endRowIndex].sort(
      (a, b) => a - b
    );
    return {
      exactMatch: result.exactMatch,
      leftBracketRowIndex: start,
      rightBracketRowIndex: end,
      leftBracketIndex: isLeftBracket ? leftLength - 1 : result.bracketIndex,
      rightBracketIndex: isLeftBracket
        ? result.bracketIndex
        : bracketString.length - 1,
    };
  }

  // UMD 导出
  return matchBracket;
});
