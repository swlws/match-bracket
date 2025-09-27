const matchBracket = require('./index');

// 测试用例
(() => {
  function caseTest(name, params, expectResult) {
    const result = matchBracket(params);
    const keys = [
      'balanced',
      'leftRowIndex',
      'rightRowIndex',
      'leftBracketIndex',
      'rightBracketIndex',
    ];
    if (!expectResult || !result) {
      if (expectResult !== result) {
        console.log(
          `caseTest: ${name} ❌, actual: ${JSON.stringify(
            result
          )}, expect: ${JSON.stringify(expectResult)} `
        );
      }
      console.log(`caseTest: ${name} ✅ `);
      return;
    }

    for (const key of keys) {
      if (result[key] !== expectResult[key]) {
        console.log(
          `caseTest: ${name} ❌, actual: ${JSON.stringify(
            result
          )}, expect: ${JSON.stringify(expectResult)} `
        );
        return;
      }
    }
    console.log(`caseTest: ${name} ✅ `);
  }

  const bracketList = [
    { left: '((', right: ')' },
    { left: '(', right: '))' },
    { left: '(((((', right: ')))' },
    { left: '(', right: ')))' },
    { left: '((', right: ')' },
  ];

  // -------- 左括号 --------
  const leftBracket_01 = { bracketList, rowIndex: 0, bracketString: '(' };
  caseTest('leftBracket_01', leftBracket_01, {
    balanced: false,
    leftRowIndex: 0,
    rightRowIndex: 0,
    leftBracketIndex: 1,
    rightBracketIndex: 0,
  });

  const leftBracket_02 = { bracketList, rowIndex: 0, bracketString: '((' };
  caseTest('leftBracket_02', leftBracket_02, {
    balanced: true,
    leftRowIndex: 0,
    rightRowIndex: 1,
    leftBracketIndex: 0,
    rightBracketIndex: 1,
  });

  const leftBracket_03 = { bracketList, rowIndex: 1, bracketString: '(' };
  caseTest('leftBracket_03', leftBracket_03, {
    balanced: false,
    leftRowIndex: 1,
    rightRowIndex: 1,
    leftBracketIndex: 0,
    rightBracketIndex: 0,
  });

  const leftBracket_04 = { bracketList, rowIndex: 2, bracketString: '(' };
  caseTest('leftBracket_04', leftBracket_04, {
    balanced: false,
    leftRowIndex: 2,
    rightRowIndex: 2,
    leftBracketIndex: 4,
    rightBracketIndex: 0,
  });

  const leftBracket_05 = { bracketList, rowIndex: 2, bracketString: '((((' };
  caseTest('leftBracket_05', leftBracket_05, {
    balanced: false,
    leftRowIndex: 2,
    rightRowIndex: 3,
    leftBracketIndex: 1,
    rightBracketIndex: 1,
  });

  const leftBracket_06 = { bracketList, rowIndex: 4, bracketString: '((' };
  caseTest('leftBracket_06', leftBracket_06, null);

  // -------- 右括号 --------
  const rightBracket_01 = { bracketList, rowIndex: 0, bracketString: ')' };
  caseTest('rightBracket_01', rightBracket_01, {
    balanced: false,
    leftRowIndex: 0,
    rightRowIndex: 0,
    leftBracketIndex: 1,
    rightBracketIndex: 0,
  });

  const rightBracket_02 = { bracketList, rowIndex: 1, bracketString: '))' };
  caseTest('rightBracket_02', rightBracket_02, {
    balanced: true,
    leftRowIndex: 0,
    rightRowIndex: 1,
    leftBracketIndex: 0,
    rightBracketIndex: 1,
  });

  const rightBracket_03 = { bracketList, rowIndex: 2, bracketString: ')' };
  caseTest('rightBracket_03', rightBracket_03, {
    balanced: false,
    leftRowIndex: 2,
    rightRowIndex: 2,
    leftBracketIndex: 4,
    rightBracketIndex: 0,
  });

  const rightBracket_04 = { bracketList, rowIndex: 2, bracketString: ')))' };
  caseTest('rightBracket_04', rightBracket_04, {
    balanced: false,
    leftRowIndex: 2,
    rightRowIndex: 2,
    leftBracketIndex: 2,
    rightBracketIndex: 2,
  });

  const rightBracket_05 = { bracketList, rowIndex: 3, bracketString: ')))' };
  caseTest('rightBracket_05', rightBracket_05, {
    balanced: false,
    leftRowIndex: 2,
    rightRowIndex: 3,
    leftBracketIndex: 0,
    rightBracketIndex: 2,
  });
})();
