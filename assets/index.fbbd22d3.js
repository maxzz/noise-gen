var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,o=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&s(e,r,t[r]);if(n)for(var r of n(t))l.call(t,r)&&s(e,r,t[r]);return e},c=(e,n)=>t(e,r(n));import{a as i,R as m,u,C as d,b as p,S as f,c as v,d as x,e as g,f as h}from"./vendor.3b914477.js";function b(){const e=Date.now(),t=b.last||e;return b.last=e>t?e:t+1}const E=i(null),y=i(null),w=i("#887ed6"),N=i("13753932482421605"),k=i((e=>e(N)),((e,t)=>{t(N,`${Math.random()}`.replace(/^0\./,""))})),C=i({n1:6.3,n2:6.3,distortion:1,dotDiameter:.1}),M=i((e=>e(C).n1),((e,t,r)=>t(C,c(o({},e(C)),{n1:r})))),L=i((e=>e(C).n2),((e,t,r)=>t(C,c(o({},e(C)),{n2:r})))),P=i((e=>e(C).distortion),((e,t,r)=>t(C,c(o({},e(C)),{distortion:r})))),z=i((e=>e(C).dotDiameter),((e,t,r)=>t(C,c(o({},e(C)),{dotDiameter:r})))),S=i((e=>({seed:e(N),color:e(w),genParams:e(C)})),((e,t,r)=>{t(w,r.color),t(N,r.seed),t(C,r.genParams)})),j=i([]),O=i(null,((e,t,r)=>t(j,[...e(j),r]))),W=i(null,((e,t,r)=>t(j,e(j).filter((e=>e.id!==r))))),D=i(null,((e,t,r)=>{let n=new FileReader;n.onloadend=function(){if(n.result){const e={id:b().toString(36),preview:n.result,renderParams:r.data.renderParams};t(O,e)}},n.readAsDataURL(r.data.blob)}));function R(){return m.createElement("svg",{viewBox:"0 0 90 90",className:"w-full h-full"},m.createElement("path",{className:"st0",stroke:"currentColor",strokeWidth:"2",fill:"none",d:"M85 22.3v44.9L44.5 86M5 22.8L45.5 4 85 22.3M44.5 86L5 67.7V22.8M44.5 41.1L5 22.8M85 22.3L44.5 41.1M44.5 41.1V86"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"17.1",cy:"42",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"25",cy:"54.4",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"33.4",cy:"67.8",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"58.3",cy:"57.1",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"45",cy:"22.3",rx:"3.7",ry:"3.4"}),m.createElement("ellipse",{className:"st1",stroke:"currentColor",strokeWidth:"2",fill:"none",cx:"73.5",cy:"50.2",rx:"3.7",ry:"3.4"}))}function $(e){const{className:t,style:r={}}=e,[n,a]=u(w),[l,s]=d.exports.useState(!1),c=d.exports.useRef(null);return p(c,(()=>s(!1))),m.createElement("div",{className:"relative select-none",ref:c},m.createElement("div",{className:`${t} p-1 border rounded border-gray-400 bg-purple-100 transform active:scale-95`,style:o({},r),onClick:()=>s((e=>!e))},m.createElement("div",{className:"w-full h-full rounded",style:{backgroundColor:n}})),m.createElement("div",{className:"absolute right-0 top-full z-10 "+(l?"":"hidden")},m.createElement(f,{color:n,onChange:e=>{a(`rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`)}})))}function I(){return new Worker("assets/web-worker.48571392.js",{type:"module"})}function A(e){var t=e,{size:r,setSize:s,onActivated:i=(()=>{})}=t,u=((e,t)=>{var r={};for(var s in e)a.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&n)for(var s of n(e))t.indexOf(s)<0&&l.call(e,s)&&(r[s]=e[s]);return r})(t,["size","setSize","onActivated"]);const p=d.exports.useRef(),f=d.exports.useRef(),[{active:v,clientPt:x},g]=function(){const[e,t]=d.exports.useState(!1),[r,n]=d.exports.useState({x:0,y:0});return d.exports.useEffect((()=>{if(e){let e=function(e){n({x:e.clientX,y:e.clientY})},r=function(){t(!1),document.removeEventListener("mouseup",r)};return document.addEventListener("mousemove",e,!1),document.addEventListener("mouseup",r,!1),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",r)}}}),[e]),[{active:e,clientPt:r},t]}();return d.exports.useEffect((()=>{v&&s({w:f.current.w+(x.x-p.current.x),h:f.current.h+(x.y-p.current.y)})}),[x]),d.exports.useEffect((()=>i(v)),[v]),m.createElement("div",c(o({},u),{style:{cursor:"nwse-resize"},onMouseDown:e=>{e.preventDefault(),p.current={x:e.clientX,y:e.clientY},f.current={w:r.w,h:r.h},g(!0)},onMouseUp:()=>g(!1)}))}function B(){const e=m.useRef(null),t=function(e){const[t,r]=u(y),[n,a]=u(E);return d.exports.useEffect((()=>{if(!e.current)return;e.current.width=0,e.current.height=0;const l=n||e.current.transferControlToOffscreen();n||a(l);const s=new I;return r(s),s.postMessage({type:"init",canvas:l},[l]),()=>{console.log("use off",e.current,n),null==t||t.terminate(),r(null),a(null)}}),[e]),t}(e),r=m.useRef(null),n=v(r),[a,l]=d.exports.useState(!1),[s,{width:o,height:c}]=x(),[i]=u(S),[,p]=u(D),[f,h]=d.exports.useState({w:325,h:300});return d.exports.useEffect((()=>{o&&c&&h({w:o,h:c})}),[o,c]),d.exports.useEffect((()=>{t&&(t.onmessage=e=>{"preview-blob"===e.data.type&&p(e)})}),[t]),g((()=>{null==t||t.postMessage({type:"run",canvasWidth:o,canvasHeight:c,renderParams:i})}),100,[o,c,i]),m.createElement("div",{className:"relative "+(a?"border border-dashed border-gray-600":""),ref:r},m.createElement("div",{className:"w-full h-full overflow-hidden",style:{resize:"both",width:`${f.w}px`,height:`${f.h}px`},ref:s},m.createElement("canvas",{ref:e,className:"w-full h-full"})),m.createElement(A,{className:"absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10\r\n                    bg-green-500 border-green-700 active:border-green-600\r\n                    transform active:scale-0",size:f,setSize:h,onActivated:e=>l(e)}),(a||n)&&m.createElement("div",{className:"absolute text-[.6rem] text-gray-700"},o," x ",c))}function H({label:e,min:t,max:r,step:n=.01,value:a,onChange:l}){return m.createElement("div",{className:"px-2 w-full h-5 flex items-center justify-center space-x-2 text-xs text-purple-900"},m.createElement("div",{className:"w-[4.5rem] flex-none"},e),m.createElement("input",{className:"ui-slider",type:"range",value:a,onChange:e=>l(+e.target.value),min:t,max:r,step:n}),m.createElement("input",{className:"w-8 bg-purple-100 text-[.6rem]",value:a,onChange:e=>l(+e.target.value)}))}function V({item:e,deleteItem:t,selectItem:r}){return m.createElement("div",{className:"preset px-1 py-2 cursor-pointer select-none transform active:scale-[.97]",onClick:()=>r(e)},m.createElement("div",{className:"w-8 h-24 relative ring-1 ring-gray-600 rounded border-gray-400"},m.createElement("img",{className:"maybe-broken",width:"32px",height:"96px",src:e.preview,alt:"preset"}),m.createElement("div",{className:"absolute p-1 -top-2 -right-2 \r\n                        border rounded-full text-gray-500 border-gray-500 bg-gray-50\r\n                        remove-preset",onClick:r=>{r.stopPropagation(),t(e.id)}},m.createElement("svg",{className:"h-3 w-3",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeWidth:4,d:"M6 18L18 6M6 6l12 12"})))))}function T(){const[e,t]=u(M),[r,n]=u(L),[a,l]=u(P),[s,o]=u(z),[c]=u(y),[i]=u(j),[,d]=u(S),[,p]=u(W);function f(e){p(e)}function v(e){d(e.renderParams)}return m.createElement("div",{className:"py-2 bg-purple-100 border rounded border-gray-400"},m.createElement(H,{min:-20,max:20,value:e,onChange:t,label:"N1"}),m.createElement(H,{min:-20,max:20,value:r,onChange:n,label:"N2"}),m.createElement(H,{min:0,max:200,value:a,onChange:l,label:"Distortion"}),m.createElement(H,{min:0,max:50,value:s,onChange:o,label:"Dot diameter"}),m.createElement("div",{className:"px-1 flex flex-wrap"},m.createElement("div",{className:"px-1 py-2"},m.createElement("div",{className:"w-8 h-24 border rounded border-gray-400 flex items-center justify-center text-gray-400 transform active:scale-95",onClick:function(){null==c||c.postMessage({type:"get-preview",smallWidth:32,smallHeight:96})}},m.createElement("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.6,d:"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"})))),i.map((e=>m.createElement(V,{key:e.id,item:e,deleteItem:f,selectItem:v})))))}function U(){const[e,t]=u(k);return m.createElement("div",{className:"App h-screen flex flex-col items-center space-y-4 bg-gray-100"},m.createElement("div",{className:"w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300"},m.createElement("div",{className:"mx-4 flex-none w-10 h-10"},m.createElement(R,null)),m.createElement("div",{className:"px-4 py-2 text-xl uppercase"},"Noise generator: xp10-525N")),m.createElement("div",{className:"max-w-md w-full flex-1 flex flex-col items-center"},m.createElement("div",{className:"w-full flex flex-col space-y-1"},m.createElement("div",{className:"flex space-x-1"},m.createElement("input",{className:"flex-1 w-full px-2 py-1 text-sm text-purple-900 bg-purple-100 border rounded border-gray-400",placeholder:"Type anything as a seed",value:e,onChange:e=>t(e.target.value)}),m.createElement("button",{className:"h-8 px-3 pb-0.5 text-sm\n                                rounded border border-gray-500 text-gray-100 bg-purple-400 \n                                uppercase transform active:scale-95",onClick:t},"Random Seed"),m.createElement($,{className:"w-8 h-8"})),m.createElement(T,null)),m.createElement("div",{className:"flex-1 flex items-center mt-1"},m.createElement(B,null))))}h.render(m.createElement(m.StrictMode,null,m.createElement(U,null)),document.getElementById("root"));
