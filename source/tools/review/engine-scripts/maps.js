const path=require("path"),fs=require("fs");const {chromium}=require("playwright");
const SITE="/home/claude/comic-site";const pages=[];
for(const b of ["python","rust","go","cpp","javascript"])for(const f of fs.readdirSync(path.join(SITE,b)))if(/^ch\d+\.html$/.test(f))pages.push(b+"/"+f);
(async()=>{const br=await chromium.launch();const ctx=await br.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});await ctx.route(/^https?:/,r=>r.abort());
const res=[];for(const rel of pages){const pg=await ctx.newPage();await pg.goto("file://"+path.join(SITE,rel));await pg.waitForTimeout(150);
const r=await pg.evaluate(()=>[...document.querySelectorAll("svg.map-svg")].map(s=>{const vb=s.viewBox.baseVal;const w=s.getBoundingClientRect().width;const t=[...s.querySelectorAll("text")].map(x=>parseFloat(getComputedStyle(x).fontSize)*w/vb.width);const tc=[...s.querySelectorAll("tspan.c")].map(x=>parseFloat(getComputedStyle(x).fontSize)*w/vb.width);return Math.min(...t,...tc);}));
r.forEach(v=>res.push([rel,+v.toFixed(1)]));await pg.close();}
fs.writeFileSync("maps.json",JSON.stringify(res));await br.close();
const v=res.map(x=>x[1]);console.log("maps",v.length,"min",Math.min(...v),"below12",v.filter(x=>x<12).length);})();
