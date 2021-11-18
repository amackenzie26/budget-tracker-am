const NEWLINE = /[\r\n]/g;
const IFENV = /\/\/\s?#ifenv\s(\S*)/;
const IFNENV = /\/\/\s?#ifnenv\s(\S*)/;
const ELSE = /\/\/\s?#else/;
const ENDIF = /\/\/\s?#endif/;

const eitherOf = (a, b) => line => {
  if (a.test(line)) {
    return a;
  }
  if (b.test(line)) {
    return b;
  }

  return undefined;
}
const isConditional = eitherOf(IFENV, IFNENV);

function preprocessor(buffer) {
  const lines = buffer.split(NEWLINE);
  const out = [];
  let index = 0;

  while (index < lines.length) {
    let line = lines[index];

    let conditional = isConditional(line);
    if (conditional) {
      const [, token] = line.match(conditional);
      let keep = conditional === IFENV
        ? process.env[token] !== undefined
        : process.env[token] === undefined;

      line = lines[++index];

      while (!ENDIF.test(line)) {
        if (ELSE.test(line)) {
          keep = !keep;

          line = lines[++index];
          continue;
        }

        if (keep) { out.push(line); }

        line = lines[++index];
      }

      index = index + 1;
      continue;
    }

    out.push(line);
    index = index + 1;
  }

  return out.join('\n');
}

module.exports = preprocessor;
