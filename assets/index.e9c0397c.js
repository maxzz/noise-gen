var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,o=(e,t)=>{for(var r in t||(t={}))l.call(t,r)&&s(e,r,t[r]);if(n)for(var r of n(t))a.call(t,r)&&s(e,r,t[r]);return e},c=(e,n)=>t(e,r(n));import{a as i,R as m,u,C as d,b as p,S as f,c as v,d as h,e as x,f as g}from"./vendor.3b914477.js";function E(){const e=Date.now(),t=E.last||e;return E.last=e>t?e:t+1}function y(){return E().toString(36)}const b=i(null),w=i(null),N=i("#887ed6"),k=i("13753932482421605"),C=i((e=>e(k)),((e,t)=>{t(k,`${Math.random()}`.replace(/^0\./,""))})),M=i({n1:6.3,n2:6.3,distortion:1,dotDiameter:.1}),L=i((e=>e(M).n1),((e,t,r)=>t(M,c(o({},e(M)),{n1:r})))),z=i((e=>e(M).n2),((e,t,r)=>t(M,c(o({},e(M)),{n2:r})))),j=i((e=>e(M).distortion),((e,t,r)=>t(M,c(o({},e(M)),{distortion:r})))),H=i((e=>e(M).dotDiameter),((e,t,r)=>t(M,c(o({},e(M)),{dotDiameter:r})))),P=i((e=>({seed:e(k),color:e(N),genParams:e(M)})),((e,t,r)=>{t(N,r.color),t(k,r.seed),t(M,r.genParams)})),O=i([]),S=i(null,((e,t,r)=>t(O,[...e(O),r]))),V=i(null,((e,t,r)=>t(O,e(O).filter((e=>e.id!==r))))),R=i(null,((e,t,r)=>{let n=new FileReader;n.onloadend=function(){if(n.result){const e={id:y(),preview:n.result,renderParams:r.renderParams};t(S,e)}},n.readAsDataURL(r.blob)})),W=i({w:325,h:300});function I(){return m.createElement("svg",{viewBox:"0 0 90 90",className:"w-full h-full"},m.createElement("path",{className:"st0",stroke:"currentColor",strokeWidth:"2",fill:"none",d:"M85 22.3v44.9L44.5 86M5 22.8L45.5 4 85 22.3M44.5 86L5 67.7V22.8M44.5 41.1L5 22.8M85 22.3L44.5 41.1M44.5 41.1V86"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"17.1",cy:"42",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"25",cy:"54.4",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"33.4",cy:"67.8",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"58.3",cy:"57.1",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"45",cy:"22.3",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"73.5",cy:"50.2",rx:"3.7",ry:"3.4"}))}function D(e){const{className:t,style:r={}}=e,[n,l]=u(N),[a,s]=d.exports.useState(!1),c=d.exports.useRef(null);return p(c,(()=>s(!1))),m.createElement("div",{className:"relative select-none",ref:c},m.createElement("div",{className:`${t} p-1 border rounded border-gray-400 bg-purple-100 transform active:scale-95`,style:o({},r),onClick:()=>s((e=>!e))},m.createElement("div",{className:"w-full h-full rounded",style:{backgroundColor:n}})),m.createElement("div",{className:"absolute right-0 top-full z-10 "+(a?"":"hidden")},m.createElement(f,{color:n,onChange:e=>{l(`rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`)}})))}function $(e){var t=e,{size:r,setSize:s,onActivated:i=(()=>{})}=t,u=((e,t)=>{var r={};for(var s in e)l.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&n)for(var s of n(e))t.indexOf(s)<0&&a.call(e,s)&&(r[s]=e[s]);return r})(t,["size","setSize","onActivated"]);const p=d.exports.useRef(),f=d.exports.useRef(),[{active:v,clientPt:h},x]=function(){const[e,t]=d.exports.useState(!1),[r,n]=d.exports.useState({x:0,y:0});return d.exports.useEffect((()=>{if(e){let e=function(e){n({x:e.clientX,y:e.clientY})},r=function(){t(!1),document.removeEventListener("mouseup",r)};return document.addEventListener("mousemove",e,!1),document.addEventListener("mouseup",r,!1),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",r)}}}),[e]),[{active:e,clientPt:r},t]}();return d.exports.useEffect((()=>{v&&s({w:f.current.w+(h.x-p.current.x),h:f.current.h+(h.y-p.current.y)})}),[h]),d.exports.useEffect((()=>i(v)),[v]),m.createElement("div",c(o({},u),{style:{cursor:"nwse-resize"},onMouseDown:e=>{e.preventDefault(),p.current={x:e.clientX,y:e.clientY},f.current={w:r.w,h:r.h},x(!0)},onMouseUp:()=>x(!1)}))}function B(){return new Worker("assets/web-worker.f0240fce.js",{type:"module"})}function U(){const e=m.useRef(null),t=function(e){const[t,r]=u(w),[n,l]=u(b);return d.exports.useEffect((()=>{if(!e.current)return;e.current.width=0,e.current.height=0;const a=n||e.current.transferControlToOffscreen();n||l(a);const s=new B;return s.queries=new Map,s.getImage=()=>new Promise((e=>{let t=y();s.queries.set(t,{resolve:e}),s.postMessage({type:"get-image",promiseId:t})})),s.addEventListener("message",(e=>{if("got-image"===e.data.type){let t=s.queries.get(e.data.resolveId);if(!t)return void console.error("missing promise ID");s.queries.delete(e.data.resolveId),t.resolve(e.data.blob)}console.log("reply")})),r(s),s.postMessage({type:"init",canvas:a},[a]),()=>{console.log("use off",e.current,n),null==t||t.terminate(),r(null),l(null)}}),[e]),t}(e),r=m.useRef(null),n=v(r),[l,a]=d.exports.useState(!1),[s,{width:o,height:c}]=h(),[i]=u(P),[,p]=u(R),[f,g]=u(W);return d.exports.useEffect((()=>{o&&c&&g({w:o,h:c})}),[o,c]),d.exports.useEffect((()=>{t&&(t.onmessage=e=>{"preview-blob"===e.data.type&&p(e.data)})}),[t]),x((()=>{null==t||t.postMessage({type:"run",canvasWidth:o,canvasHeight:c,renderParams:i})}),100,[o,c,i]),m.createElement("div",{className:"relative "+(l?"border border-dashed border-gray-600":""),ref:r},m.createElement("div",{className:"w-full h-full overflow-hidden",style:{resize:"both",width:`${f.w}px`,height:`${f.h}px`},ref:s},m.createElement("canvas",{ref:e,className:"w-full h-full"})),m.createElement($,{className:"absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10\r\n                    bg-green-500 border-green-700 active:border-green-600\r\n                    transform active:scale-0",size:f,setSize:g,onActivated:e=>a(e)}),(l||n)&&m.createElement("div",{className:"absolute text-[.6rem] text-gray-700"},o," x ",c))}function A({select:e,step:t}){return m.createElement("div",{className:"flex items-center justify-center\r\n                text-gray-400\r\n                transform active:scale-[.97] cursor-pointer",title:"300 x 300",onClick:e},m.createElement("svg",{className:"h-5 w-5",viewBox:"0 0 24 24",fill:"currentColor"},3===t&&m.createElement("path",{fill:"#d6d6d6",d:"M.5.5h23v23H.5z"}),m.createElement("path",{d:"M23 1v22H1V1h22m1-1H0v24h24V0z"}),2===t&&m.createElement("path",{fill:"#d6d6d6",d:"M2.6 2.6h18.7v18.7H2.6z"}),2===t&&m.createElement("path",{d:"M20.8 3.2v17.7H3.2V3.2h17.6m1.1-1.1H2.1v19.8h19.8V2.1z"}),1===t&&m.createElement("path",{fill:"#d6d6d6",d:"M5 5h14.1v14.1H5z"}),1===t&&m.createElement("path",{d:"M18.5 5.5v13.1h-13V5.5h13m1-1h-15v15.1h15.1V4.5h-.1z"}),0===t&&m.createElement("path",{fill:"#d6d6d6",d:"M7.2 7.2h9.7v9.7H7.2z"}),0===t&&m.createElement("path",{d:"M16.3 7.7v8.7H7.7V7.7h8.6m1-1H6.7v10.7h10.7V6.7h-.1z"})))}function q(){const[e,t]=u(W);function r(e,r){t({w:e,h:r})}return m.createElement(m.Fragment,null,m.createElement(A,{select:()=>r(300,300),step:0}),m.createElement(A,{select:()=>r(500,500),step:1}),m.createElement(A,{select:()=>r(700,700),step:2}),m.createElement(A,{select:()=>r(1e3,1e3),step:3}))}function F({label:e,min:t,max:r,step:n=.01,value:l,onChange:a}){return m.createElement("div",{className:"px-2 w-full h-5 flex items-center justify-center space-x-2 text-xs text-purple-900"},m.createElement("div",{className:"w-[4.5rem] flex-none"},e),m.createElement("input",{className:"ui-slider",type:"range",value:l,onChange:e=>a(+e.target.value),min:t,max:r,step:n}),m.createElement("input",{className:"w-8 bg-purple-100 text-[.6rem]",value:l,onChange:e=>a(+e.target.value)}))}function T({item:e,deleteItem:t,selectItem:r}){return m.createElement("div",{className:"preset px-1 py-2 cursor-pointer select-none transform active:scale-[.97]",onClick:()=>r(e)},m.createElement("div",{className:"relative border-4 border-gray-50",style:{width:"64px",height:"64px"}},m.createElement("img",{className:"maybe-broken w-full h-full object-cover",src:e.preview,alt:"preset"}),m.createElement("div",{className:"absolute p-1 -top-2 -right-1.5\r\n                        border rounded-full text-gray-500 border-gray-500 bg-gray-50\r\n                        remove-preset",onClick:r=>{r.stopPropagation(),t(e.id)}},m.createElement("svg",{className:"h-3 w-3",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeWidth:4,d:"M6 18L18 6M6 6l12 12"})))))}var X=function(){let e=document.createElement("a");return document.body.appendChild(e),e.style.display="none",function(t,r){let n=window.URL.createObjectURL(t);e.href=n,e.download=r,e.click(),window.URL.revokeObjectURL(n)}}();function Y(){const[e,t]=u(L),[r,n]=u(z),[l,a]=u(j),[s,o]=u(H),[c]=u(w),[i]=u(O),[,d]=u(P),[,p]=u(V);function f(e){p(e)}function v(e){d(e.renderParams)}return m.createElement("div",{className:"py-2 bg-purple-100 border rounded border-gray-400"},m.createElement(F,{min:-20,max:20,value:e,onChange:t,label:"N1"}),m.createElement(F,{min:-20,max:20,value:r,onChange:n,label:"N2"}),m.createElement(F,{min:0,max:200,value:l,onChange:a,label:"Distortion"}),m.createElement(F,{min:0,max:50,value:s,onChange:o,label:"Dot diameter"}),m.createElement("div",{className:"px-2 py-2 flex space-x-2"},m.createElement("div",{className:"px-1 flex items-center justify-center space-x-1 border rounded border-gray-400"},m.createElement(q,null)),m.createElement("div",{className:"w-full h-8 border rounded border-gray-400 flex items-center justify-center text-gray-400\r\n                        transform active:scale-[.97] cursor-pointer",title:"Save preset",onClick:function(){null==c||c.postMessage({type:"get-preview",smallWidth:56,smallHeight:56})}},m.createElement("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.6,d:"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"}))),m.createElement("div",{className:"w-full h-8 border rounded border-gray-400 flex items-center justify-center text-gray-400\r\n                        transform active:scale-[.97] cursor-pointer",title:"Save image",onClick:e=>async function(e){if(c){let e=c,t=await e.getImage();X(t,"testtest.png")}}()},m.createElement("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.6,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})))),m.createElement("div",{className:"px-1 flex flex-wrap"},i.map((e=>m.createElement(T,{key:e.id,item:e,deleteItem:f,selectItem:v})))))}function G(){const[e,t]=u(C);return m.createElement("div",{className:"App h-screen flex flex-col items-center space-y-4 bg-gray-100"},m.createElement("div",{className:"w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300"},m.createElement("div",{className:"mx-4 flex-none w-10 h-10"},m.createElement(I,null)),m.createElement("div",{className:"px-4 py-2 text-xl uppercase"},"Noise generator: xp10-525N")),m.createElement("div",{className:"max-w-md w-full flex-1 flex flex-col items-center"},m.createElement("div",{className:"w-full flex flex-col space-y-1"},m.createElement("div",{className:"flex space-x-1"},m.createElement("input",{className:"flex-1 w-full px-2 py-1 text-sm text-purple-900 bg-purple-100 border rounded border-gray-400",placeholder:"Type anything as a seed",value:e,onChange:e=>t(e.target.value)}),m.createElement("button",{className:"h-8 px-3 pb-0.5 text-sm\n                                rounded border border-gray-500 text-gray-100 bg-purple-400 \n                                uppercase transform active:scale-95",onClick:t},"Random Seed"),m.createElement(D,{className:"w-8 h-8"})),m.createElement(Y,null)),m.createElement("div",{className:"flex-1 flex items-center mt-1"},m.createElement(U,null))))}g.render(m.createElement(m.StrictMode,null,m.createElement(G,null)),document.getElementById("root"));
