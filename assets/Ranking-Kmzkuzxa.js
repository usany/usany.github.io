import{r as t,j as e,a3 as R,b8 as U,a4 as N,a5 as T,a2 as b,X as j,a6 as C,ax as F,au as H,av as I,W as A,Y as B,S as P,ak as $}from"./index-yUjTlKSs.js";import{P as q}from"./PageTitle-CHrjJ66b.js";import{L as f}from"./Lists-DboSSJgM.js";import{T as M}from"./TextField-DRFWKX2D.js";function Q({userObj:n,userSearch:l}){const[s,c]=t.useState([]),[u,k]=t.useState([]),[v,w]=t.useState([]),[m,E]=t.useState(null),[r,h]=t.useState(!1);t.useState(!1);const L=20;t.useEffect(()=>{const y=async()=>{const D=R(b(j,"members"),T("points","desc"),N(L),U(m||"")),p=await C(D),d=p.docs.map((o,g)=>{var i;if(console.log(s.indexOf(o)),s.indexOf(o)===-1)return F(H(I,`${(i=o.data())==null?void 0:i.uid}`)).then(a=>{w([...v,{url:a,index:g}])}).catch(a=>{console.log(a)}),g+1===p.docs.length&&E(o),{...o.data()}});if(c([...s,...d]),u.length===0){const o=A(j,`members/${n.uid}`),i=(await B(o)).data();console.log(i),d.map((a,S)=>{a.uid===n.uid&&(console.log(a==null?void 0:a.ranking),d[S].rank=S+1)}),k([i])}h(!1)};(r||s.length===0)&&y()},[r]);const x=()=>{if(window.innerHeight+Math.round(document.documentElement.scrollTop)!==document.documentElement.offsetHeight||r){console.log(document.documentElement.offsetHeight);return}else console.log("scroll"),h(!0)};return t.useEffect(()=>(window.addEventListener("scroll",x),()=>window.removeEventListener("scroll",x)),[r]),e.jsx(e.Fragment,{children:l?e.jsx("div",{children:e.jsx(f,{userObj:n,elements:s,multiple:!0,userSearch:l,ranking:!0,handleUser:null})}):e.jsxs("div",{children:[e.jsx(f,{userObj:n,elements:u,multiple:!1,userSearch:null,ranking:!0,handleUser:null}),e.jsx(f,{userObj:n,elements:s,multiple:!0,userSearch:null,ranking:!0,handleUser:null}),!r&&e.jsx("div",{className:"p-28"}),r&&e.jsx("div",{className:"flex justify-center text-2xl p-28",children:"loading"})]})})}function W({changeUserSearch:n}){const l=s=>{const{target:{value:c}}=s;n(c)};return e.jsx("div",{className:"px-5 flex flex-col",children:e.jsx(M,{label:"유저 이름",onChange:l})})}function J({userObj:n}){const[l,s]=t.useState(""),c=P();return t.useEffect(()=>{c($(5))}),e.jsxs(e.Fragment,{children:[e.jsx(q,{title:"유저 랭킹"}),e.jsx(W,{changeUserSearch:u=>s(u)}),e.jsx(Q,{userObj:n,userSearch:l})]})}export{J as default};
