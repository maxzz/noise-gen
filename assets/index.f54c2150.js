var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,c=(t,r,l)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[r]=l,s=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&c(e,r,t[r]);if(l)for(var r of l(t))n.call(t,r)&&c(e,r,t[r]);return e},o=(e,l)=>t(e,r(l));import{a as i,R as m,u,C as d,b as p,S as f,c as v,d as h,e as g,f as x}from"./vendor.1c334733.js";function E(){const e=Date.now(),t=E.last||e;return E.last=e>t?e:t+1}function b(){return E().toString(36)}const y=i(null),w=i(null),N=i("#887ed6"),M=i("13753932482421605"),k=i((e=>e(M)),((e,t)=>{t(M,`${Math.random()}`.replace(/^0\./,""))})),C=i({n1:6.3,n2:6.3,distortion:1,dotDiameter:.1}),L=i((e=>e(C).n1),((e,t,r)=>t(C,o(s({},e(C)),{n1:r})))),z=i((e=>e(C).n2),((e,t,r)=>t(C,o(s({},e(C)),{n2:r})))),j=i((e=>e(C).distortion),((e,t,r)=>t(C,o(s({},e(C)),{distortion:r})))),H=i((e=>e(C).dotDiameter),((e,t,r)=>t(C,o(s({},e(C)),{dotDiameter:r})))),P=i((e=>({seed:e(M),color:e(N),genParams:e(C)})),((e,t,r)=>{t(N,r.color),t(M,r.seed),t(C,r.genParams)})),S=i([]),V=i(null,((e,t,r)=>t(S,[...e(S),r]))),O=i(null,((e,t,r)=>t(S,e(S).filter((e=>e.id!==r))))),R=i(null,((e,t,r)=>{let l=new FileReader;l.onloadend=function(){if(l.result){const e={id:b(),preview:l.result,renderParams:r.renderParams};t(V,e)}},l.readAsDataURL(r.blob)})),I=i({w:325,h:300});function D(){return m.createElement("svg",{viewBox:"0 0 128 172.4",className:"w-full h-full",fill:"currentColor"},m.createElement("g",null,m.createElement("path",{d:"M126.9 38.1v.8l.1-.1.1-.1c.1 0 0-.1 0-.1v-.1-.1-.1l-.2-.2M66.4 84.5l-61.5-26 60.5-46.9 58.7 27.3-57.7 45.6m-1-74.9l-.3.1-.2.1-.2.1-.2.1L2 58.4l-.2.1-.1.2-.1.2V59.2l.1.1.1.1.1.1.2.1v-.4-.2l.1-.2.1-.1.1-.1H3.2L50 78.4l15.9 6.7.1-.1.1-.1.1-.1.1-.1 59.9-47-18-8.4-42-19.6H65.6l-.2-.1"}),m.createElement("path",{d:"M67.7 157.7l-.4.3.4.2v-.5m-.5-71.6l-.2.1.6 57.1-.1-20.5-.2-36.1v-.2-.2-.2c0 .1-.1.1-.1 0M2.7 58.5c-.1 0-.1 0 0 0h-.1-.1-.1l-.1.1-.1.1-.1.2V59.5l1 37.5.9 36.9v.2l.1.2.1.2.1.2.1.2.2.2.2.1.2.1 17 6.5 44.9 17.1H67.7l.1-.1.1-.1.1-.2V158.2l-.4-.2-.4.3-.1.1-.1.1c0 .1-.1 0-.1 0h-.1-.1-.1-.2l-.1-.1-.1-.1-.1-.1v-.1l-.2-15.8.1 14.2-60-22.9-1.9-72.4L65.3 87v-.4-.2-.2l.1-.2.1-.3.1-.1.1-.1.1-.1.1-.1L50 78.4 3.1 58.5H3h-.1-.2"}),m.createElement("path",{d:"M67.2 86.1l57.9-45.5-.6 69.5-56.8 45.4-.1-12.2-.6-57.1.2-.1m59.2-48.5h-.1-.1-.1l-59.9 47-.1.1-.1.1-.1.1-.1.1-.1.1-.1.1-.1.1-.1.1-.1.3-.1.2v.8l.4 35.6.2 19.7.2 15.8v.1l.1.1.1.1.1.1h.6l.1-.1.1-.1.4-.3.4-.3 57.7-46.2.2-.2.2-.2.1-.2.1-.2.1-.2.1-.2.1-.2v-.2l-.9.7v-1 1l.9-.7.3-35.5.3-35.4v-.8-.2l-.1-.1-.1-.1-.1-.1h-.1-.1l-.2.2"})),m.createElement("g",null,m.createElement("path",{d:"M65.6 24.2l-1.7.4-1.6.5-1.5.7-1.4.9a9 9 0 00-1.9 2.1c-.4.7-.6 1.4-.6 2.1 0 .7.2 1.3.7 1.9.4.6 1.1 1.1 1.9 1.5l1.4.5 1.5.2c.5 0 1.1.1 1.6 0l1.7-.2 1.7-.4 1.6-.5 1.5-.7 1.3-.9a9 9 0 001.9-2.1c.4-.7.6-1.4.6-2.1 0-.7-.2-1.3-.7-1.9a4.9 4.9 0 00-1.9-1.5l-1.4-.5-1.5-.3c-.5 0-1.1-.1-1.6 0-.5.2-1 .2-1.6.3M96.4 38.3l-1.6.4-1.6.5-1.5.7-1.3.9c-.8.6-1.4 1.3-1.9 2-.3.8-.5 1.5-.5 2.2 0 .7.2 1.3.6 1.9.4.6 1 1 1.9 1.4l1.3.4 1.5.2c.5 0 1 .1 1.6 0l1.6-.2 1.6-.4 1.6-.5 1.5-.7 1.3-.9c.8-.6 1.4-1.3 1.8-2 .4-.7.6-1.4.6-2.1 0-.7-.2-1.3-.6-1.9-.4-.6-1-1-1.8-1.4l-1.3-.5-1.5-.2c-.5 0-1-.1-1.6 0l-1.7.2M65.8 43.2l-1.6.4c-.5.2-1.1.3-1.6.6l-1.5.7-1.4.9a9 9 0 00-1.9 2.1c-.4.7-.6 1.4-.6 2.1 0 .7.2 1.3.7 1.9a4 4 0 001.9 1.4l1.4.4 1.5.2h1.6l1.6-.2 1.6-.4c.5-.2 1.1-.3 1.6-.6l1.5-.7 1.3-.9c.8-.7 1.5-1.3 1.9-2.1.4-.7.6-1.4.6-2.1 0-.7-.2-1.3-.6-1.9a4 4 0 00-1.9-1.4l-1.4-.5-1.5-.2c-.5 0-1.1-.1-1.6 0l-1.6.3M66.3 62l-1.6.4c-.5.2-1.1.3-1.6.6l-1.5.7-1.3.9c-.8.7-1.5 1.3-1.9 2.1-.4.7-.6 1.4-.6 2.1 0 .7.2 1.3.7 1.9.4.6 1.1 1 1.9 1.4l1.4.4 1.5.2h1.6l1.6-.2 1.6-.4c.5-.2 1.1-.3 1.6-.6l1.5-.7 1.3-.9c.8-.6 1.4-1.3 1.9-2 .4-.7.6-1.4.6-2.1 0-.7-.2-1.3-.6-1.9-.4-.6-1.1-1-1.9-1.4l-1.3-.4-1.5-.2h-1.6l-1.8.1M34.7 48.2l-1.7.4c-.6.2-1.1.3-1.6.6l-1.5.7-1.4.9c-.9.7-1.5 1.4-1.9 2.1-.4.7-.6 1.4-.6 2.1 0 .7.3 1.3.7 1.9.4.6 1.1 1.1 2 1.4l1.4.5 1.5.2h1.6l1.7-.2 1.7-.4c.6-.2 1.1-.3 1.6-.6l1.5-.7 1.4-.9a9 9 0 001.9-2.1c.4-.7.6-1.4.6-2.1 0-.7-.2-1.3-.7-1.9a3.8 3.8 0 00-2-1.4l-1.4-.5L38 48c-.5 0-1.1-.1-1.6 0l-1.7.2"}),m.createElement("path",{d:"M16.9 77.6c-.5.1-1 .3-1.4.6-.4.3-.8.6-1.1 1.1a6 6 0 00-.7 1.6c-.2.6-.2 1.3-.2 2 0 1 .2 2.1.6 3.1a12 12 0 003.5 5.3c.8.7 1.6 1.2 2.5 1.6l.8.3.7.1h.7l.7-.1c.5-.1 1-.3 1.4-.6.4-.3.8-.6 1.1-1.1.3-.4.5-1 .7-1.6.2-.6.2-1.3.2-2a11.2 11.2 0 00-1.9-6 9.6 9.6 0 00-4.5-4l-.8-.3-.7-.2h-.7l-.9.2M48.6 90.7l-1.4.5c-.4.3-.8.6-1.1 1.1-.3.4-.5 1-.7 1.5-.2.6-.2 1.2-.2 1.9a12 12 0 001.8 5.8 9 9 0 002 2.3 6 6 0 002.4 1.5l.7.2.7.1h.7l.6-.1c.5-.1 1-.3 1.4-.6.4-.3.8-.6 1.1-1.1.3-.4.5-.9.7-1.5.2-.6.2-1.2.2-1.9a12 12 0 00-3.8-8.2 7.8 7.8 0 00-2.4-1.6l-.7-.3-.7-.1h-.7c-.2.4-.4.5-.6.5M48.8 126.7c-.5.1-1 .3-1.4.6-.4.3-.8.6-1 1.1-.3.4-.5.9-.7 1.5-.2.6-.2 1.2-.2 1.9 0 1 .2 2 .5 3s.8 1.9 1.3 2.8c.6.9 1.2 1.6 1.9 2.3.7.6 1.5 1.1 2.4 1.5l.7.2.7.1h.7l.6-.1c.5-.1.9-.3 1.3-.6s.7-.6 1-1.1c.3-.4.5-.9.7-1.5.2-.6.2-1.2.2-1.9 0-1-.2-2-.5-2.9-.3-1-.8-1.9-1.3-2.8-.6-.9-1.2-1.6-1.9-2.3a7.5 7.5 0 00-3.1-1.7l-.7-.1h-1.2M17.5 114.6c-.5.1-1 .3-1.4.6-.4.3-.8.6-1.1 1.1-.3.4-.5 1-.7 1.5-.2.6-.2 1.2-.2 1.9 0 1 .2 2 .6 3 .3 1 .8 2 1.4 2.8.6.9 1.3 1.7 2 2.3.8.7 1.6 1.2 2.5 1.5l.7.2.7.1h.7l.6-.1c.5-.1 1-.3 1.4-.6.4-.3.8-.6 1.1-1.1.3-.4.5-.9.7-1.5.2-.6.2-1.2.2-1.9a10.5 10.5 0 00-1.9-5.8c-.6-.9-1.3-1.7-2-2.3a7.3 7.3 0 00-2.5-1.5l-.7-.2-.7-.1h-.7l-.7.1"}),m.createElement("path",{d:"M98.9 89.9l-.6.2-.6.3-.7.4a13.2 13.2 0 00-3 2.9 22 22 0 00-1.9 3c-.5 1.1-1 2.2-1.3 3.3a9 9 0 00-.3 4.9c.2.5.4.9.7 1.2l1 .7h1.3l.6-.2.6-.3.7-.4.7-.5c.8-.6 1.6-1.5 2.3-2.4a22 22 0 001.9-3l1.3-3.2a9 9 0 00.3-4.9l-.7-1.3-1-.7h-1.3"})))}function $(e){const{className:t,style:r={}}=e,[l,a]=u(N),[n,c]=d.exports.useState(!1),o=d.exports.useRef(null);return p(o,(()=>c(!1))),m.createElement("div",{className:"relative select-none",ref:o},m.createElement("div",{className:`${t} p-1 border rounded border-gray-400 bg-purple-100 transform active:scale-95`,style:s({},r),onClick:()=>c((e=>!e))},m.createElement("div",{className:"w-full h-full rounded",style:{backgroundColor:l}})),m.createElement("div",{className:"absolute right-0 top-full z-10 "+(n?"":"hidden")},m.createElement(f,{color:l,onChange:e=>{a(`rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`)}})))}function B(e){var t=e,{size:r,setSize:c,onActivated:i=(()=>{})}=t,u=((e,t)=>{var r={};for(var c in e)a.call(e,c)&&t.indexOf(c)<0&&(r[c]=e[c]);if(null!=e&&l)for(var c of l(e))t.indexOf(c)<0&&n.call(e,c)&&(r[c]=e[c]);return r})(t,["size","setSize","onActivated"]);const p=d.exports.useRef(),f=d.exports.useRef(),[{active:v,clientPt:h},g]=function(){const[e,t]=d.exports.useState(!1),[r,l]=d.exports.useState({x:0,y:0});return d.exports.useEffect((()=>{if(e){let e=function(e){l({x:e.clientX,y:e.clientY})},r=function(){t(!1),document.removeEventListener("mouseup",r)};return document.addEventListener("mousemove",e,!1),document.addEventListener("mouseup",r,!1),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",r)}}}),[e]),[{active:e,clientPt:r},t]}();return d.exports.useEffect((()=>{v&&c({w:f.current.w+(h.x-p.current.x),h:f.current.h+(h.y-p.current.y)})}),[h]),d.exports.useEffect((()=>i(v)),[v]),m.createElement("div",o(s({},u),{style:{cursor:"nwse-resize"},onMouseDown:e=>{e.preventDefault(),p.current={x:e.clientX,y:e.clientY},f.current={w:r.w,h:r.h},g(!0)},onMouseUp:()=>g(!1)}))}function U(){return new Worker("assets/web-worker.790dd9f7.js",{type:"module"})}function W(){const e=m.useRef(null),t=function(e){const[t,r]=u(w),[l,a]=u(y);return d.exports.useEffect((()=>{if(!e.current)return;e.current.width=0,e.current.height=0;const n=l||e.current.transferControlToOffscreen();l||a(n);const c=new U;return c.queries=new Map,c.getImage=()=>new Promise((e=>{let t=b();c.queries.set(t,{resolve:e}),c.postMessage({type:"get-image",promiseId:t})})),c.addEventListener("message",(e=>{if("got-image"===e.data.type){let t=c.queries.get(e.data.resolveId);if(!t)return void console.error("missing promise ID");c.queries.delete(e.data.resolveId),t.resolve(e.data.blob)}console.log("reply")})),r(c),c.postMessage({type:"init",canvas:n},[n]),()=>{console.log("use off",e.current,l),null==t||t.terminate(),r(null),a(null)}}),[e]),t}(e),r=m.useRef(null),l=v(r),[a,n]=d.exports.useState(!1),[c,{width:s,height:o}]=h(),[i]=u(P),[,p]=u(R),[f,x]=u(I);return d.exports.useEffect((()=>{s&&o&&x({w:s,h:o})}),[s,o]),d.exports.useEffect((()=>{t&&(t.onmessage=e=>{"preview-blob"===e.data.type&&p(e.data)})}),[t]),g((()=>{null==t||t.postMessage({type:"run",canvasWidth:s,canvasHeight:o,renderParams:i})}),100,[s,o,i]),m.createElement("div",{className:"w-full h-full flex items-center"},m.createElement("div",{className:"relative "+(a?"border border-dashed border-gray-600":""),ref:r},m.createElement("div",{className:"w-full h-full overflow-hidden",style:{resize:"both",width:`${f.w}px`,height:`${f.h}px`},ref:c},m.createElement("canvas",{ref:e,className:"w-full h-full"})),m.createElement(B,{className:"absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10\r\n                        bg-green-500 border-green-700 active:border-green-600\r\n                        transform active:scale-0",size:f,setSize:x,onActivated:e=>n(e)}),(a||l)&&m.createElement("div",{className:"absolute text-[.6rem] text-gray-700"},s," x ",o)))}const A=[[300,300],[500,500],[700,700],[900,900]];function q({select:e,step:t}){return m.createElement("div",{className:"flex items-center justify-center\r\n                text-gray-400 hover:text-purple-600\r\n                transform active:scale-[.97] cursor-pointer",title:`Set canvas ${A[t][0]} x ${A[t][1]}`,onClick:e},m.createElement("svg",{className:"h-5 w-5",viewBox:"0 0 24 24",fill:"currentColor"},3===t&&m.createElement("path",{fill:"#d6d6d6",d:"M.5.5h23v23H.5z"}),m.createElement("path",{d:"M23 1v22H1V1h22m1-1H0v24h24V0z"}),2===t&&m.createElement("path",{fill:"#d6d6d6",d:"M2.6 2.6h18.7v18.7H2.6z"}),2===t&&m.createElement("path",{d:"M20.8 3.2v17.7H3.2V3.2h17.6m1.1-1.1H2.1v19.8h19.8V2.1z"}),1===t&&m.createElement("path",{fill:"#d6d6d6",d:"M5 5h14.1v14.1H5z"}),1===t&&m.createElement("path",{d:"M18.5 5.5v13.1h-13V5.5h13m1-1h-15v15.1h15.1V4.5h-.1z"}),0===t&&m.createElement("path",{fill:"#d6d6d6",d:"M7.2 7.2h9.7v9.7H7.2z"}),0===t&&m.createElement("path",{d:"M16.3 7.7v8.7H7.7V7.7h8.6m1-1H6.7v10.7h10.7V6.7h-.1z"})))}function F(){const[e,t]=u(I);return m.createElement(m.Fragment,null,A.map((([e,r],l)=>m.createElement(q,{key:l,select:()=>function(e,r){t({w:e,h:r})}(e,r),step:l}))))}function T({label:e,min:t,max:r,step:l=.01,value:a,onChange:n}){return m.createElement("div",{className:"px-2 w-full h-5 flex items-center justify-center space-x-2 text-xs text-purple-900"},m.createElement("div",{className:"w-[4.5rem] flex-none"},e),m.createElement("input",{className:"ui-slider",type:"range",value:a,onChange:e=>n(+e.target.value),min:t,max:r,step:l}),m.createElement("input",{className:"w-8 bg-purple-100 text-[.6rem]",value:a,onChange:e=>n(+e.target.value)}))}function X({item:e,deleteItem:t,selectItem:r}){return m.createElement("div",{className:"preset px-1 py-2 cursor-pointer select-none transform active:scale-[.97]",onClick:()=>r(e)},m.createElement("div",{className:"relative border-4 border-gray-50",style:{width:"64px",height:"64px"}},m.createElement("img",{className:"maybe-broken w-full h-full object-cover",src:e.preview,alt:"preset"}),m.createElement("div",{className:"absolute p-1 -top-2 -right-1.5\r\n                        border rounded-full text-gray-500 border-gray-500 bg-gray-50\r\n                        remove-preset",onClick:r=>{r.stopPropagation(),t(e.id)}},m.createElement("svg",{className:"h-3 w-3",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeWidth:4,d:"M6 18L18 6M6 6l12 12"})))))}const Y=function(){const e=document.createElement("a");return document.body.appendChild(e),e.style.display="none",e.id="noise-gen-image",function(t,r){let l=window.URL.createObjectURL(t);e.href=l,e.download=r,e.click(),window.URL.revokeObjectURL(l)}}();function G(){const[e,t]=u(L),[r,l]=u(z),[a,n]=u(j),[c,s]=u(H),[o]=u(w),[i]=u(S),[,d]=u(P),[,p]=u(O);function f(e){p(e)}function v(e){d(e.renderParams)}return m.createElement("div",{className:"py-2 bg-purple-100 border rounded border-gray-400"},m.createElement(T,{min:-20,max:20,value:e,onChange:t,label:"N1"}),m.createElement(T,{min:-20,max:20,value:r,onChange:l,label:"N2"}),m.createElement(T,{min:0,max:200,value:a,onChange:n,label:"Distortion"}),m.createElement(T,{min:0,max:50,value:c,onChange:s,label:"Dot diameter"}),m.createElement("div",{className:"px-2 py-2 flex space-x-2"},m.createElement("div",{className:"px-1 flex items-center justify-center space-x-1 border rounded border-gray-400"},m.createElement(F,null)),m.createElement("div",{className:"w-full h-8 border rounded border-gray-400 flex items-center justify-center text-gray-400\r\n                        transform active:scale-[.97] cursor-pointer",title:"Save preset",onClick:function(){null==o||o.postMessage({type:"get-preview",smallWidth:56,smallHeight:56})}},m.createElement("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.6,d:"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"}))),m.createElement("div",{className:"w-full h-8 border rounded border-gray-400 flex items-center justify-center text-gray-400\r\n                        transform active:scale-[.97] cursor-pointer",title:"Save image",onClick:e=>async function(e){if(o){let e=await o.getImage();Y(e,"noise-gen.png")}}()},m.createElement("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},m.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.6,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})))),m.createElement("div",{className:"px-1 flex flex-wrap"},i.map((e=>m.createElement(X,{key:e.id,item:e,deleteItem:f,selectItem:v})))))}function J(){const[e,t]=u(k);return m.createElement("div",{className:"App h-screen flex flex-col items-center space-y-4 bg-purple-200",style:{background:"radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)"}},m.createElement("div",{className:"w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300"},m.createElement("div",{className:"mx-4 flex-none w-10 h-10"},m.createElement(D,null)),m.createElement("div",{className:"px-4 py-2 text-xl uppercase"},"Noise generator: xp10-525N")),m.createElement("div",{className:"max-w-md w-full flex-1 flex flex-col items-center"},m.createElement("div",{className:"w-full flex flex-col space-y-1"},m.createElement("div",{className:"flex space-x-1"},m.createElement("input",{className:"flex-1 w-full px-2 py-1 text-sm text-purple-900 bg-purple-100 border rounded border-gray-400",placeholder:"Type anything as a seed",value:e,onChange:e=>t(e.target.value)}),m.createElement("button",{className:"h-8 px-3 pb-0.5 text-sm\n                                rounded border border-gray-500 text-gray-100 bg-purple-400 \n                                uppercase transform active:scale-95",onClick:t},"Random Seed"),m.createElement($,{className:"w-8 h-8"})),m.createElement(G,null)),m.createElement("div",{className:"flex-1 mt-1"},m.createElement(W,null))))}x.render(m.createElement(m.StrictMode,null,m.createElement(J,null)),document.getElementById("root"));
