global.POLYGLOT = { data: { captures: { meta: { lang: "cpp" } } } };
const api = require("/home/claude/comic-site/assets/comic.js");
console.log(api.highlight('    << "total: " << n << "\\n"; // done'));
console.log(api.highlight('std::cout << "a"'));
