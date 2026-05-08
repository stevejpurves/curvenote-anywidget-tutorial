var $=[[0,68,1,84],[.25,59,82,139],[.5,33,145,140],[.75,94,201,98],[1,253,231,37]],M=[[0,0,0,4],[.25,87,16,110],[.5,188,55,84],[.75,249,142,9],[1,252,255,164]],N=[[0,13,8,135],[.25,126,3,168],[.5,204,71,120],[.75,248,149,64],[1,240,249,33]],v={viridis:$,inferno:M,plasma:N};function w(e,l,o){return e+(l-e)*o}function L(e,l){l=Math.max(0,Math.min(1,l));for(let a=1;a<e.length;a++)if(l<=e[a][0]){let[m,r,h,t]=e[a-1],[f,p,g,u]=e[a],c=(l-m)/(f-m);return`rgb(${Math.round(w(r,p,c))}, ${Math.round(w(h,g,c))}, ${Math.round(w(t,u,c))})`}let[,o,x,s]=e[e.length-1];return`rgb(${o}, ${x}, ${s})`}function I(e,l,o){return o===l?.5:(e-l)/(o-l)}function z(e,l={}){let{data:o=[],colormap:x="viridis",cellSize:s=32,gap:a=2,showValues:m=!1}=l,r=document.createElement("div");r.className="gp-grid",e.appendChild(r);function h(){if(r.innerHTML="",!o.length)return;let t=o.flat(),f=Math.min(...t),p=Math.max(...t),g=v[x]||v.viridis,u=o[0].length;r.style.display="grid",r.style.gridTemplateColumns=`repeat(${u}, ${s}px)`,r.style.gap=`${a}px`,r.style.width="fit-content";for(let c=0;c<o.length;c++)for(let y=0;y<u;y++){let i=o[c][y],C=I(i,f,p),d=L(g,C),n=document.createElement("div");n.className="gp-cell",n.style.width=`${s}px`,n.style.height=`${s}px`,n.style.backgroundColor=d,n.style.borderRadius="3px",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",m&&(n.style.fontSize=`${Math.max(9,s*.3)}px`,n.style.color=C>.55?"#000":"#fff",n.style.fontFamily="monospace",n.textContent=Number.isInteger(i)?i:i.toFixed(1)),r.appendChild(n)}}return h(),{update(t){t.data!==void 0&&(o=t.data),t.colormap!==void 0&&(x=t.colormap),t.cellSize!==void 0&&(s=t.cellSize),t.gap!==void 0&&(a=t.gap),t.showValues!==void 0&&(m=t.showValues),h()},destroy(){r.remove()}}}var E=`/* grid-painter-widget styles */

.gpw-root {
  font-family: system-ui, -apple-system, sans-serif;
  padding: 12px;
}

.gpw-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.gpw-controls label {
  font-size: 13px;
  font-weight: 500;
  color: #444;
}

.gpw-controls select,
.gpw-controls input[type="range"] {
  font-size: 13px;
  padding: 2px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
}

.gpw-controls select:focus,
.gpw-controls input:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 1px;
}

.gpw-grid-container {
  display: flex;
  justify-content: center;
}
`;function R({model:e,el:l}){let o=document.createElement("style");o.textContent=E,l.appendChild(o);let x=e.get("data")||[[0,1],[2,3]],s=e.get("colormap")||"viridis",a=e.get("cell_size")||32,m=e.get("gap")||2,r=e.get("show_values")||!1,h=e.get("show_controls")!==!1,t=document.createElement("div");t.className="gpw-root",l.appendChild(t);let f=s,p=a;if(h){let c=document.createElement("div");c.className="gpw-controls";let y=document.createElement("label");y.textContent="Colourmap:";let i=document.createElement("select");for(let S of Object.keys(v)){let b=document.createElement("option");b.value=S,b.textContent=S,S===s&&(b.selected=!0),i.appendChild(b)}i.addEventListener("change",()=>{f=i.value,u.update({colormap:f})});let C=document.createElement("label");C.textContent="Cell size:";let d=document.createElement("input");d.type="range",d.min="12",d.max="64",d.value=String(a);let n=document.createElement("span");n.textContent=`${a}px`,n.style.fontSize="13px",n.style.minWidth="36px",d.addEventListener("input",()=>{p=Number(d.value),n.textContent=`${p}px`,u.update({cellSize:p})}),c.append(y,i,C,d,n),t.appendChild(c)}let g=document.createElement("div");g.className="gpw-grid-container",t.appendChild(g);let u=z(g,{data:x,colormap:f,cellSize:p,gap:m,showValues:r});return()=>{u.destroy()}}var F={render:R};export{F as default};
