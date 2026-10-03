document.addEventListener("DOMContentLoaded",()=>{
const bar0=document.getElementById("progress");
addEventListener("scroll",()=>{const h=document.documentElement;bar0.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"});
document.querySelectorAll(".acc-head").forEach(b=>b.addEventListener("click",()=>{b.classList.toggle("open");b.nextElementSibling.classList.toggle("show")}));
document.querySelectorAll(".tabs").forEach(t=>{
 const btns=t.querySelectorAll(".tabbar button"),ps=t.querySelectorAll(".panel");
 const open=i=>{btns.forEach((b,j)=>b.classList.toggle("on",i===j));ps.forEach((p,j)=>p.classList.toggle("on",i===j))};
 btns.forEach((b,i)=>b.addEventListener("click",()=>open(i)));open(0)});
document.querySelectorAll(".stepper").forEach(s=>{
 const st=[...s.querySelectorAll(".step")];let i=-1;
 const show=()=>st.forEach((e,j)=>e.classList.toggle("on",j<=i));
 s.querySelector(".next").onclick=()=>{i=Math.min(i+1,st.length-1);show()};
 s.querySelector(".reset").onclick=()=>{i=-1;show()};show()});
const RX=/(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*")|\b(abstract|boolean|break|byte|case|catch|char|class|continue|default|do|double|else|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|try|void|volatile|while|true|false)\b|(\b\d+(?:\.\d+)?[LlFf]?\b)/g;
const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
function hl(t){let o="",l=0,m;RX.lastIndex=0;while((m=RX.exec(t))){o+=esc(t.slice(l,m.index));const c=m[1]?"c":m[2]?"s":m[3]?"k":"n";o+=`<span class="${c}">${esc(m[0])}</span>`;l=RX.lastIndex}return o+esc(t.slice(l))}
document.querySelectorAll(".codebox").forEach(box=>{
 const pre=box.querySelector("pre"),src=pre.textContent.trim();pre.innerHTML=hl(src);
 const bar=document.createElement("div");bar.className="codebar";bar.innerHTML=`<span>${box.dataset.title||"Java"}</span>`;
 const mk=(t,cls,fn)=>{const b=document.createElement("button");b.className="btn "+cls;b.textContent=t;b.onclick=fn;bar.appendChild(b)};
 box.prepend(bar);
 const out=document.createElement("div");out.className="out";box.appendChild(out);
 const ex=document.createElement("div");ex.className="exp";box.appendChild(ex);
 if(box.dataset.output!==undefined)mk("▶ Run","",()=>{out.textContent="$ "+(box.dataset.cmd||"java Main")+"\n"+box.dataset.output.replace(/\\n/g,"\n");out.style.display="block"});
 if(box.dataset.explain)mk("💡 Explain","alt",()=>{ex.textContent=box.dataset.explain.replace(/\\n/g,"\n");ex.style.display=ex.style.display==="block"?"none":"block"});
 mk("Copy","alt",e=>{navigator.clipboard&&navigator.clipboard.writeText(src);e.target.textContent="Copied";setTimeout(()=>e.target.textContent="Copy",1200)});
});
document.querySelectorAll(".quiz").forEach(qz=>{
 const qs=qz.querySelectorAll(".q"),sc=qz.querySelector(".score");let right=0,done=0;
 qs.forEach(q=>{const lis=q.querySelectorAll("li"),a=+q.dataset.answer,fb=q.querySelector(".fb");let ans=false;
  lis.forEach((li,i)=>li.addEventListener("click",()=>{if(ans)return;ans=true;done++;
   li.classList.add(i===a?"right":"wrong");lis[a].classList.add("right");if(i===a)right++;
   fb.style.display="block";fb.textContent=(i===a?"✅ Correct. ":"❌ Not quite. ")+fb.dataset.t;
   sc.textContent=`Score: ${right}/${qs.length}`+(done===qs.length?(right===qs.length?" 🎉 Perfect!":" – review the sections above."):"")}))})});
});
