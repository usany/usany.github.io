import{j as e,r as n,a3 as v,a2 as y,X as p,ao as M,W as T,b0 as E,a6 as I,a7 as L,ax as B,au as R,av as V,a5 as W,M as $,N as P,Q,aR as q,S as O,b2 as X,ak as z}from"./index-yUjTlKSs.js";import{P as G}from"./PageTitle-CHrjJ66b.js";import{C as H,a as J}from"./index-MrOT6di4.js";import{f as w,g as k,B as m,i as D,l as K}from"./drawer-J49h5GZk.js";import{A as Y,a as Z,b as _,c as U}from"./accordion-DB-dphgu.js";import{L as A}from"./Lists-DboSSJgM.js";import{T as b}from"./TextField-DRFWKX2D.js";function S({action:s,label:a}){return e.jsxs("div",{className:"px-5",children:[e.jsxs("span",{children:[s,": "]}),e.jsx(H,{label:a})]})}const ee=({userObj:s})=>{const[a,r]=n.useState([]);n.useState();const u=v(y(p,"violations")),x=t=>{const c=t.id,d=T(p,`violations/${c}`);E(d);const i=[];a.map((l,o)=>{l.id!==c&&i.push(l),o+1===a.length&&r(i)}),alert("지웠습니다")};return n.useEffect(()=>{(async()=>{const c=[];(await I(u)).forEach(i=>{if(i.data().userUid===s.uid){const l=i.data(),o={id:i.id,...l};c.push(o)}r(c)})})()},[]),console.log(a),e.jsx(e.Fragment,{children:e.jsxs(w,{children:[e.jsx(k,{children:e.jsx(m,{variant:"outlined",form:"auth",children:"신고하기 내역"})}),e.jsxs(D,{className:"bg-light-3 dark:bg-dark-3",children:[e.jsx("div",{className:"flex justify-center",children:e.jsx("div",{className:"bg-light-2 dark:bg-dark-2 h-2 w-[100px] rounded-full bg-muted",children:" "})}),e.jsx("div",{className:"flex justify-center pt-5",children:"신고하기 내역"}),e.jsx("div",{className:"p-5",children:a.length!==0?a.map((t,c)=>e.jsx("div",{children:e.jsx(Y,{type:"single",collapsible:!0,className:"w-full",children:e.jsxs(Z,{value:c.toString(),children:[e.jsx(_,{children:t.messageTitle}),e.jsxs(U,{children:[e.jsx("div",{children:t.message}),t!=null&&t.violationUser?e.jsxs("div",{children:[e.jsx("div",{className:"pt-5",children:"신고 등록 유저"}),e.jsx(A,{elements:[t.violationUser],multiple:!0,userSearch:!0,ranking:!1,handleUser:d=>console.log(d)})]}):e.jsx(M,{variant:"inset"}),e.jsx("div",{className:"flex pt-3 justify-center",children:e.jsx(m,{variant:"outlined",onClick:()=>x(t),children:"지우기"})})]})]})})})):e.jsx("div",{children:"신고하기 내역이 없습니다."})})]})]})})};function se({violationUser:s,changeViolationUser:a}){const[r,u]=n.useState([]),[x,t]=n.useState([]),[c,d]=n.useState(""),i=l=>{const{target:{value:o}}=l;d(o)};return n.useEffect(()=>{L(v(y(p,"members"),W("points","desc")),l=>{const o=l.docs.map((j,N)=>{var g;return B(R(V,`${(g=j.data())==null?void 0:g.uid}`)).then(f=>{t([...x,{url:f,index:N}])}).catch(f=>{console.log(f)}),{...j.data()}});u(o)})},[]),e.jsxs(e.Fragment,{children:[e.jsxs(w,{children:[e.jsx(k,{className:"w-screen",onClick:()=>d(""),children:s?e.jsx(J,{sx:{width:"100%"},children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex flex-col justify-center",children:"신고 유저:"}),e.jsx("div",{className:"px-5",children:e.jsxs($,{className:`bg-${((s==null?void 0:s.profileColor)||[]).indexOf("#")===-1?s==null?void 0:s.profileColor:"profile-blue"}`,children:[e.jsx(P,{src:s==null?void 0:s.profileImageUrl}),e.jsx(Q,{className:"text-xl border-none",children:s==null?void 0:s.displayName[0]})]})}),e.jsx("div",{className:"flex flex-col justify-center",children:s.displayName})]})}):e.jsx(m,{sx:{width:"100%"},variant:"outlined",form:"auth",children:"신고 유저 등록"})}),e.jsx(D,{className:"h-1/2 bg-light-3 dark:bg-dark-3",children:e.jsxs("div",{className:"px-5 flex flex-col",children:[e.jsx(b,{label:"유저 이름",onChange:i}),c&&e.jsx(K,{children:e.jsx(A,{elements:r,multiple:!0,userSearch:c,ranking:!1,handleUser:l=>a(l)})})]})})]}),s&&e.jsx(m,{sx:{width:"25%"},variant:"outlined",onClick:()=>a(null),children:"신고 등록 취소"})]})}function ae({userObj:s,user:a}){const[r,u]=n.useState(""),[x,t]=n.useState(""),[c,d]=n.useState(!1),[i,l]=n.useState(null),[o,j]=n.useState(!0);n.useEffect(()=>{a&&o&&(l(a),j(!1))},[a]),n.useEffect(()=>{d(!!(r&&x))},[r,x]);const N=async()=>{try{await q(y(p,"violations"),{userUid:s.uid,userName:s.displayName,messageTitle:r,message:x,violationUser:i}),alert("등록되었습니다"),u(""),t("")}catch(h){console.log(h)}},g=h=>{const{target:{name:F,value:C}}=h;t(C)},f=h=>{const{target:{name:F,value:C}}=h;u(C)};return e.jsx(e.Fragment,{children:e.jsxs("form",{id:"auth",children:[e.jsx("div",{className:"flex justify-center pt-5 px-5",children:e.jsx(b,{label:"신고하기 제목",multiline:!0,value:r,onChange:f,variant:"outlined",fullWidth:!0})}),e.jsx("div",{className:"flex justify-center pt-5 px-5",children:e.jsx(b,{label:"신고하기 내용",multiline:!0,rows:5,value:x,onChange:g,variant:"outlined",fullWidth:!0})}),e.jsx("div",{className:"flex pt-3 px-5 gap-1",children:e.jsx(se,{violationUser:i,changeViolationUser:h=>l(h)})}),e.jsxs("div",{className:"flex justify-center pt-2.5",children:[e.jsx(ee,{userObj:s}),c?e.jsx(m,{variant:"outlined",form:"auth",onClick:N,children:"전송"}):e.jsx(m,{variant:"outlined",form:"auth",disabled:!0,children:"전송"})]})]})})}function oe({userObj:s}){const a=O(),{state:r}=X();return n.useEffect(()=>{a(z(5))}),e.jsxs("div",{children:[e.jsx(G,{title:"신고하기"}),e.jsx(S,{action:"발신",label:s.displayName}),e.jsx(S,{action:"수신",label:"담당자"}),e.jsx(ae,{userObj:s,user:r==null?void 0:r.user})]})}export{oe as default};
