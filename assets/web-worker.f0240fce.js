import{g as e}from"./vendor.3b914477.js";class t{constructor(){this._seed=""}get(t){return this._seed===t&&this._noise||(this._noise=new e(t),this._seed=t),this._noise}}const a=self;function n(e,t,a){const n=e.get(a.seed);let s={ctx:t,noiseFn:function(e,t){return n.noise3D(e/10,t/10,1)},params:a.genParams};t.clearRect(0,0,t.canvas.width,t.canvas.height);let o=function(e){const{ctx:t,noiseFn:a,params:{n1:n,n2:s,distortion:o,dotDiameter:i}}=e;let c=-20,r=i/2,l=t.canvas.width,d=t.canvas.height,h=new Path2D;for(let g=c;g<d-c;g++)for(let e=c;e<l-c;e++){let t=e*(i+1)+0+.5+r,c=g*(i+1)+0+.5+r,l=t+o*a(t/n,c/s),d=c+o*a(t/s,c/n);h.rect(l,d,1,1)}return[h]}(s);t.fillStyle=a.color,t.fill(o[0])}!function(){let e,s,o=new t,i={};a.onmessage=t=>{if(console.log("Worker got",t.data),"init"===t.data.type)return e=t.data.canvas,void(s=e.getContext("2d"));if(s)if("run"===t.data.type&&t.data.canvasWidth&&t.data.canvasHeight&&(s.canvas.width=t.data.canvasWidth,s.canvas.height=t.data.canvasHeight),s.canvas.width&&s.canvas.height)switch(t.data.type){case"run":i=t.data.renderParams,n(o,s,i);break;case"get-preview":{let n=t.data.smallWidth,s=t.data.smallHeight;const o=new OffscreenCanvas(n,s),c=o.getContext("2d");if(c){let t=Math.min(e.width,e.height);c.drawImage(e,0,0,t,t,0,0,n,s),o.convertToBlob().then((function(e){a.postMessage({type:"preview-blob",blob:e,renderParams:i})}))}break}case"get-image":{const n=t.data.promiseId;e.convertToBlob({quality:1}).then((function(e){a.postMessage({type:"got-image",blob:e,resolveId:n})}));break}}else console.log("no canvas size yet");else console.log("no ctx yet")}}();
