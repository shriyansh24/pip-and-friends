const vm = require("vm"), fs = require("fs");
const A = "/home/claude/comic-site/assets/";
function mkEl(attrs){ return { attrs: Object.assign({}, attrs), getAttribute(k){ return k in this.attrs ? this.attrs[k] : null; }, setAttribute(k,v){ this.attrs[k]=String(v); }, hasAttribute(k){return k in this.attrs;}, classList:{contains(){return false},toggle(){},add(){}}, style:{}, appendChild(){}, querySelectorAll(){return []}, querySelector(){return null} }; }
function ctx(book){
  const document = { documentElement: mkEl({"data-book": book}), readyState:"loading", addEventListener(){}, querySelectorAll(){return []}, querySelector(){return null}, getElementById(){return null}, createElementNS(){return mkEl({})}, createElement(){return mkEl({})} };
  const g = { console, document, POLYGLOT: {}, setTimeout(){}, setInterval(){}, clearInterval(){}, matchMedia(){return {matches:false}}, location:{pathname:"/x/ch1.html"}, localStorage:{getItem(){return null},setItem(){}}, IntersectionObserver: function(){ this.observe=function(){}; } , addEventListener(){} };
  g.globalThis = g; g.window = g; g.root = g;
  vm.createContext(g); return g;
}
function load(g, files){ files.forEach(f => { try { vm.runInContext(fs.readFileSync(f,"utf8"), g, {filename:f}); } catch(e){ console.error("LOADERR", f, e.message); } }); }
const [,, book, extFile, name, attrsJson] = process.argv;
const attrs = attrsJson ? JSON.parse(attrsJson) : {};
const engine = ["comic.js","comic-widgets.js","comic-critters.js","comic-cast.js","comic-memory.js"].map(f=>A+f);
const g1 = ctx(book); load(g1, engine);
const C1 = g1.POLYGLOT.comic.lib.cast;
const e1 = C1[name] ? C1[name].draw(mkEl(attrs)) : "(none)";
const g2 = ctx(book); load(g2, engine.concat([A+"ext/"+extFile+".js"]));
const C2 = g2.POLYGLOT.comic.lib.cast;
const e2 = C2[name] ? C2[name].draw(mkEl(attrs)) : "(none)";
const vb1 = C1[name] && (typeof C1[name].vb==="function"? "fn": C1[name].vb), vb2 = C2[name] && (typeof C2[name].vb==="function"?"fn":C2[name].vb);
console.log(extFile, name, e1 === e2 && vb1===vb2 ? "IDENTICAL" : "DIFFERENT (engine len "+e1.length+" vb "+vb1+", ext len "+e2.length+" vb "+vb2+")");
