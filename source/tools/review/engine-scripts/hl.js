global.POLYGLOT = {};
const api = require(process.argv[2] + "/assets/comic.js");
const fs = require("fs");
const src = fs.readFileSync(process.argv[3], "utf8");
console.log(api.highlight(src, process.argv[4]));
