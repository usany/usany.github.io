import{r as a,j as e,U as L,bf as E,a8 as I,V as D,W as R,O as p,X as U,ay as N,av as b,aw as T,N as $,a5 as B,a2 as M,al as P}from"./index-ByaPHwZ6.js";import{P as Q}from"./PageTitle-CYMFGPmy.js";import{L as S}from"./Lists-_iYO-HYf.js";import{T as q}from"./TextField-BvWm1dU4.js";function O({userObj:o,userSearch:l}){const[s,c]=a.useState([]),[u,A]=a.useState([]),[j,w]=a.useState([]),[m,y]=a.useState(null),[i,h]=a.useState(!1);a.useState(!1);const C=20;a.useEffect(()=>{const F=async()=>{const x=L(R(p,"members"),D("points","desc"),I(C),E(m||"")),f=await U(x),g=f.docs.map((t,d)=>{var r;if(console.log(s.indexOf(t)),s.indexOf(t)===-1)return N(b(T,`${(r=t.data())==null?void 0:r.uid}`)).then(n=>{w([...j,{url:n,index:d}])}).catch(n=>{console.log(n)}),d+1===f.docs.length&&y(t),{...t.data()}});if(c([...s,...g]),u.length===0){const t=$(p,`members/${o.uid}`),r=(await B(t)).data();console.log(r),g.map((n,v)=>{n.uid===o.uid&&(console.log(n==null?void 0:n.ranking),g[v].rank=v+1)}),A([r])}h(!1)},H=async()=>{const x=L(R(p,"members"),D("points","desc"),E(m||"")),f=await U(x),g=f.docs.map((t,d)=>{var r;if(console.log(s.indexOf(t)),s.indexOf(t)===-1)return N(b(T,`${(r=t.data())==null?void 0:r.uid}`)).then(n=>{w([...j,{url:n,index:d}])}).catch(n=>{console.log(n)}),d+1===f.docs.length&&y(t),{...t.data()}});c([...s,...g]),h(!1)};(i||s.length===0)&&F(),l&&(H(),console.log(l))},[i,l]);const k=()=>{if(window.innerHeight+Math.round(document.documentElement.scrollTop)!==document.documentElement.offsetHeight||i){console.log(document.documentElement.offsetHeight);return}else console.log("scroll"),h(!0)};return a.useEffect(()=>(window.addEventListener("scroll",k),()=>window.removeEventListener("scroll",k)),[i]),e.jsx(e.Fragment,{children:l?e.jsx("div",{children:e.jsx(S,{userObj:o,elements:s,multiple:!0,userSearch:l,ranking:!0,handleUser:null})}):e.jsxs("div",{children:[e.jsx(S,{userObj:o,elements:u,multiple:!1,userSearch:null,ranking:!0,handleUser:null}),e.jsx(S,{userObj:o,elements:s,multiple:!0,userSearch:null,ranking:!0,handleUser:null}),!i&&e.jsx("div",{className:"p-28"}),i&&e.jsx("div",{className:"flex justify-center text-2xl p-28",children:"loading"})]})})}function V({changeUserSearch:o}){const l=s=>{const{target:{value:c}}=s;o(c)};return e.jsx("div",{className:"px-5 flex flex-col",children:e.jsx(q,{label:"유저 이름",onChange:l})})}function J({userObj:o}){const[l,s]=a.useState(""),c=M();return a.useEffect(()=>{c(P(5))}),e.jsxs(e.Fragment,{children:[e.jsx(Q,{title:"유저 랭킹"}),e.jsx(V,{changeUserSearch:u=>s(u)}),e.jsx(O,{userObj:o,userSearch:l})]})}export{J as default};
