import{j as s,M as k,N as w,O as b,Q as y,aI as I,r,a5 as S,a6 as L,a1 as R,a3 as A,a0 as C,aP as E,X as U,Y as D,Z as P,V as T}from"./index-DFLENtAm.js";import{P as $}from"./PageTitle-Caqok-WC.js";import{T as B}from"./TextField-D3hVKGdw.js";function u({elements:f,multiple:e,userSearch:o}){return s.jsxs("div",{children:[s.jsxs("div",{className:"flex justify-between w-screen pt-5",children:[s.jsxs("div",{className:"flex flex-col justify-center px-5",children:[e?"유저":"내"," 랭킹"]}),s.jsxs("div",{className:"flex flex-col overflow-hidden",children:[s.jsxs("div",{children:[e?"유저":"내"," 이름"]}),s.jsx("div",{children:"포인트"})]}),s.jsx("div",{className:"flex flex-col justify-center px-5",children:"프로필"})]}),s.jsx("div",{className:"bg-light-3 dark:bg-dark-3",children:f.map((a,t)=>{const i=a==null?void 0:a.profileColor;let n=!0;if(o)for(let l=0;l<o.length;l++)(a==null?void 0:a.displayName[l])!==o[l]&&(n=!1);if(n)return s.jsxs("div",{className:"px-3 pt-3",children:[s.jsx(k,{to:"/profile",state:{element:a},children:s.jsx("div",{className:`flex w-full justify-between p-3 ranking-${e?t+1:a.rank}`,children:s.jsxs("div",{className:"flex",children:[e?s.jsx("div",{className:"flex flex-col justify-center px-5 w-20",children:t+1}):s.jsx("div",{className:"flex flex-col justify-center px-5 w-20",children:a.rank}),s.jsxs(w,{className:`bg-${(i==null?void 0:i.indexOf("#"))===-1?a==null?void 0:a.profileColor:"profile-blue"}`,children:[s.jsx(b,{src:a==null?void 0:a.profileImageUrl}),s.jsx(y,{className:"text-xl border-none",children:a==null?void 0:a.displayName[0]})]}),s.jsxs("div",{className:"flex flex-col overflow-hidden px-10 w-48",children:[s.jsx("div",{className:"overflow-hidden",children:a.displayName}),s.jsx("div",{className:"overflow-hidden",children:a.points})]})]})})}),s.jsx(I,{variant:"inset"})]},t)})})]})}function Q({userObj:f}){const[e,o]=r.useState([]),[a,t]=r.useState([]),[i,n]=r.useState(""),[l,v]=r.useState([]),[F,N]=r.useState(null),g=S(),m=h=>{const{target:{value:c}}=h;n(c)};return r.useEffect(()=>{L(R(C(T,"members"),A("points","desc")),h=>{const c=h.docs.map((x,d)=>{var p;return U(D(P,`${(p=x.data())==null?void 0:p.uid}`)).then(j=>{v([...l,{url:j,index:d}])}).catch(j=>{console.log(j)}),{...x.data()}});o(c),c.map((x,d)=>{x.uid===f.uid&&(c[d].rank=d+1,t([c[d]]),N(d))})})},[]),r.useEffect(()=>{g(E(5))}),s.jsxs("div",{className:"flex flex-col",children:[s.jsx($,{title:"유저 랭킹"}),s.jsx("div",{className:"px-5 flex flex-col",children:s.jsx(B,{label:"유저 이름",onChange:m})}),i?s.jsx(u,{elements:e,multiple:!0,userSearch:i}):s.jsxs("div",{children:[s.jsx(u,{elements:a,multiple:!1,userSearch:null}),s.jsx(u,{elements:e,multiple:!0,userSearch:null})]})]})}export{Q as default};