const path=require("path"),fs=require("fs");const {chromium}=require("playwright");
const SITE="/home/claude/comic-site";
const pages=[];for(const b of ["python","rust","go","cpp","javascript"]){for(const f of fs.readdirSync(path.join(SITE,b))){if(/^ch\d+\.html$/.test(f))pages.push(b+"/"+f);}}
pages.sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
(async()=>{const br=await chromium.launch();const ctx=await br.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
await ctx.route(/^https?:/,r=>r.abort());
const out=[];
for(const rel of pages){const pg=await ctx.newPage();await pg.goto("file://"+path.join(SITE,rel));await pg.waitForTimeout(250);
const r=await pg.evaluate(()=>{const res={overflow:document.scrollingElement.scrollWidth-innerWidth,tracers:[],mems:[],traceOver:[]};
function sc(svg){const vb=svg.viewBox.baseVal;const w=svg.getBoundingClientRect().width;return vb&&vb.width?w/vb.width:1;}
for(const box of document.querySelectorAll("[data-tracer]")){const svg=box.querySelector("svg.tracer-svg");if(!svg)continue;const next=box.querySelector('[data-act="next"]');let min=9,g=0,widths=new Set();
 do{const s=sc(svg);min=Math.min(min,s);widths.add(Math.round(svg.viewBox.baseVal.width));if(!next||next.getAttribute("aria-disabled")==="true")break;next.click();}while(g++<120);
 const rs=box.querySelector('[data-act="reset"]');if(rs)rs.click();
 res.tracers.push({id:box.id||box.getAttribute("data-tracer"),label:(box.getAttribute("aria-label")||"").slice(0,40),minPx:+(12*min).toFixed(1),vbWidths:[...widths].length});}
for(const svg of document.querySelectorAll("svg.mem-svg")){res.mems.push({label:((svg.closest("section")||{}).getAttribute?svg.closest("section").getAttribute("aria-label"):"").slice(0,40),minPx:+(11*sc(svg)).toFixed(1)});}
for(const t of document.querySelectorAll("table.trace")){const card=t.closest(".ex-card");if(!card)continue;const tr=t.getBoundingClientRect(),cr=card.getBoundingClientRect();if(tr.right>cr.right+1||card.scrollWidth>card.clientWidth+1)res.traceOver.push(card.id);}
return res;});
out.push({page:rel,...r});await pg.close();}
fs.writeFileSync("measure.json",JSON.stringify(out,null,1));await br.close();})();
