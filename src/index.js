module.exports = function check(str, bracketsConfig) {
  if (!str || !bracketsConfig) {
    return false
  }
  let expression = '';
  for (i = 0; i < bracketsConfig.length; i++) {
    const openingBracket = bracketsConfig[i][0];
    const closingBracket = bracketsConfig[i][1];
    if ( i > 0 ) {
      expression += '|';
    }
    for (const bracket of [openingBracket, closingBracket]) {
      if (bracket.match(/[a-zA-Z0-9]/)) {
        expression += bracket;
      } else {
        expression += "\\" + bracket;
      }
    }
  }
  const regExp = new RegExp(expression, 'g');
  let stringBefore = str;
  let stringAfter = '';
  while (true) {
    if (stringBefore.length == 0) {
      return true
    }
    stringAfter = stringBefore.replace(regExp, "");
    if (stringBefore == stringAfter) {
      return false
    }
    stringBefore = stringAfter;
  }
}
