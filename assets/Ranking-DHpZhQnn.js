import{j as s,O as b,Q as k,S as w,N as y,aE as I,r as e,a8 as S,a9 as L,a2 as E,a4 as R,a1 as A,aL as C,X as U,Y as B,Z as D,V as T}from"./index-CRk_zr9W.js";import{P as $}from"./PageTitle-BFXS07qM.js";import{d as F}from"./Comment-FRL5ekh8.js";import{I as O}from"./IconButton-BOwt7J9h.js";import{T as P}from"./TextField-DGh_26ob.js";function u({elements:f,multiple:r,userSearch:o}){return s.jsxs("div",{children:[s.jsxs("div",{className:"flex justify-between w-screen",children:[s.jsxs("div",{className:"flex flex-col justify-center px-5",children:[r?"유저":"내"," 랭킹"]}),s.jsxs("div",{className:"flex flex-col overflow-hidden",children:[s.jsxs("div",{children:[r?"유저":"내"," 이름"]}),s.jsx("div",{children:"포인트"})]}),s.jsx("div",{className:"flex flex-col justify-center px-5",children:"프로필"})]}),s.jsx("div",{className:"bg-light-3 dark:bg-dark-3",children:f.map((a,t)=>{const i=a==null?void 0:a.profileColor;let n=!0;if(o)for(let l=0;l<o.length;l++)(a==null?void 0:a.displayName[l])!==o[l]&&(n=!1);if(n)return s.jsxs("div",{children:[s.jsxs("div",{className:`flex justify-between w-screen p-3 ranking-${r?t+1:a.rank}`,children:[s.jsxs("div",{className:"flex",children:[r?s.jsx("div",{className:"flex flex-col justify-center px-5 w-20",children:t+1}):s.jsx("div",{className:"flex flex-col justify-center px-5 w-20",children:a.rank}),s.jsxs(b,{className:`bg-${(i==null?void 0:i.indexOf("#"))===-1?a==null?void 0:a.profileColor:"profile-blue"}`,children:[s.jsx(k,{src:a==null?void 0:a.profileImageUrl}),s.jsx(w,{className:"text-xl border-none	",children:a==null?void 0:a.displayName[0]})]}),s.jsxs("div",{className:"flex flex-col overflow-hidden px-10 w-48",children:[s.jsx("div",{className:"overflow-hidden",children:a.displayName}),s.jsx("div",{className:"overflow-hidden",children:a.points})]})]}),s.jsx(O,{"aria-label":"comment",children:s.jsx(y,{to:"/profile",state:{element:a},children:s.jsx(F,{})})})]}),s.jsx(I,{variant:"inset"})]},t)})})]})}function _({userObj:f}){const[r,o]=e.useState([]),[a,t]=e.useState([]),[i,n]=e.useState(""),[l,p]=e.useState([]),[q,g]=e.useState(null),N=S(),m=h=>{const{target:{value:c}}=h;n(c)};return e.useEffect(()=>{L(E(A(T,"members"),R("points","desc")),h=>{const c=h.docs.map((x,d)=>{var v;return U(B(D,`${(v=x.data())==null?void 0:v.uid}`)).then(j=>{p([...l,{url:j,index:d}])}).catch(j=>{console.log(j)}),{...x.data()}});o(c),c.map((x,d)=>{x.uid===f.uid&&(c[d].rank=d+1,t([c[d]]),g(d))})})},[]),e.useEffect(()=>{N(C(5))}),s.jsxs("div",{className:"flex flex-col",children:[s.jsx($,{title:"유저 랭킹"}),s.jsx("div",{className:"px-5 flex flex-col",children:s.jsx(P,{label:"유저 이름",onChange:m})}),i?s.jsx(u,{elements:r,multiple:!0,userSearch:i}):s.jsxs("div",{children:[s.jsx(u,{elements:a,multiple:!1,userSearch:null}),s.jsx(u,{elements:r,multiple:!0,userSearch:null})]})]})}export{_ as default};
