import{d as T,x as P,v as j,J as Q,r as y,w as g,a as B,b as v,j as o,z as E,n as z,az as V,aB as W,ay as Y,ae as a,O as X,aJ as A,aK as H,Q as D,S as k,U,b3 as Z,Y as s,N}from"./index-5PbHtKqS.js";function b(e){return P("MuiCard",e)}T("MuiCard",["root"]);const O=["className","raised"],ee=e=>{const{classes:t}=e;return z({root:["root"]},b,t)},oe=j(Q,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({overflow:"hidden"})),Ne=y.forwardRef(function(t,r){const n=g({props:t,name:"MuiCard"}),{className:i,raised:x=!1}=n,d=B(n,O),c=v({},n,{raised:x}),p=ee(c);return o.jsx(oe,v({className:E(p.root,i),elevation:x?8:void 0,ref:r,ownerState:c},d))});function te(e){return P("MuiCardContent",e)}T("MuiCardContent",["root"]);const ne=["className","component"],re=e=>{const{classes:t}=e;return z({root:["root"]},te,t)},se=j("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),Me=y.forwardRef(function(t,r){const n=g({props:t,name:"MuiCardContent"}),{className:i,component:x="div"}=n,d=B(n,ne),c=v({},n,{component:x}),p=re(c);return o.jsx(se,v({as:x,className:E(p.root,i),ownerState:c,ref:r},d))});function ae(e){return P("MuiCardMedia",e)}T("MuiCardMedia",["root","media","img"]);const ce=["children","className","component","image","src","style"],ie=e=>{const{classes:t,isMediaComponent:r,isImageComponent:n}=e;return z({root:["root",r&&"media",n&&"img"]},ae,t)},de=j("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e,{isMediaComponent:n,isImageComponent:i}=r;return[t.root,n&&t.media,i&&t.img]}})(({ownerState:e})=>v({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"})),le=["video","audio","picture","iframe","img"],ue=["picture","img"],De=y.forwardRef(function(t,r){const n=g({props:t,name:"MuiCardMedia"}),{children:i,className:x,component:d="div",image:c,src:p,style:l}=n,w=B(n,ce),u=le.indexOf(d)!==-1,C=!u&&c?v({backgroundImage:`url("${c}")`},l):l,M=v({},n,{component:d,isMediaComponent:u,isImageComponent:ue.indexOf(d)!==-1}),L=ie(M);return o.jsx(de,v({className:E(L.root,x),as:d,role:!u&&c?"img":void 0,ref:r,style:C,ownerState:M,src:u?c||p:void 0},w,{children:i}))}),xe=({move:e,handleClose:t})=>o.jsxs(V,{open:e,onClose:t,children:[o.jsx(W,{children:"로그인이 필요합니다"}),o.jsxs(Y,{children:[o.jsx(a,{variant:"outlined",onClick:()=>{t()},children:o.jsx(X,{to:"/",children:"로그인 페이지"})}),o.jsx(a,{variant:"outlined",onClick:t,autoFocus:!0,children:"닫기"})]})]});var F={},pe=H;Object.defineProperty(F,"__esModule",{value:!0});var J=F.default=void 0,Ce=pe(A()),fe=o;J=F.default=(0,Ce.default)((0,fe.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete");var q={},he=H;Object.defineProperty(q,"__esModule",{value:!0});var h=q.default=void 0,ve=he(A()),me=o;h=q.default=(0,ve.default)((0,me.jsx)("path",{d:"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"}),"Send");function ke({msgObj:e,isOwner:t,uid:r,displayName:n,userObj:i,num:x,points:d}){const[c,p]=y.useState(!1),l=async u=>{const C=D(k,`num/${e.id}`),M=D(k,`members/${e.creatorId}`),I=(await U(M)).data().messagingToken;if(u==="delete"){Z(C);const[m,...f]=counter;setCounter([...f])}else if(u==="confirm return"){s(C,{round:5});const m=D(k,`members/${e.creatorId}`),f=D(k,`members/${e.connectedId}`),R=await U(m),_=await U(f),G=R.data().done||[],K=_.data().done||[];if(e.text.choose==1){const S=R.data().borrowDoneCount||[],$=_.data().lendDoneCount||[];s(m,{points:x-e.point}),s(f,{points:d+e.point}),s(m,{borrowDoneCount:[...S,e.id]}),s(f,{lendDoneCount:[...$,e.id]}),N.emit("confirm return",{choose:e.text.choose,sendingToken:I,creatorId:e.creatorId,creatorName:e.displayName,connectedId:r,connectedName:n})}else{const S=R.data().lendDoneCount||[],$=_.data().borrowDoneCount||[];s(m,{points:x+e.point}),s(f,{points:d-e.point}),s(m,{lendDoneCount:[...S,e.id]}),s(f,{borrowDoneCount:[...$,e.id]}),N.emit("confirm return",{choose:e.text.choose,sendingToken:I,creatorId:e.creatorId,creatorName:e.displayName,connectedId:r,connectedName:n})}console.log("practice"),s(m,{done:[...G,e.id]}),s(f,{done:[...K,e.id]})}else u==="confirm"?(s(C,{round:3}),N.emit("confirm",{choose:e.text.choose,sendingToken:I,creatorId:e.creatorId,creatorName:e.displayName,connectedId:r,connectedName:n})):u==="returning"?(s(C,{round:4}),N.emit("returning",{choose:e.text.choose,sendingToken:I,creatorId:e.creatorId,creatorName:e.displayName,connectedId:r,connectedName:n})):u==="supporting"?i?(s(C,{round:2,connectedId:r,connectedName:n}),N.emit("supporting",{choose:e.text.choose,sendingToken:I,creatorId:e.creatorId,creatorName:e.displayName,connectedId:r,connectedName:n})):p(!0):u==="stop supporting"&&i&&(s(C,{round:1,connectedId:null,connectedName:null}),N.emit("stop supporting",{choose:e.text.choose,sendingToken:I,creatorId:e.creatorId,creatorName:e.displayName,connectedId:r,connectedName:n}))},w=()=>{p(!1)};return o.jsx(o.Fragment,{children:t?o.jsxs(o.Fragment,{children:[e.round===1&&o.jsx("div",{className:"flex flex-col justify-center",children:o.jsx(a,{variant:"outlined",onClick:()=>l("delete"),startIcon:o.jsx(J,{}),children:"지우기"})}),e.round===2&&o.jsx(a,{variant:"outlined",onClick:()=>l("confirm"),startIcon:o.jsx(h,{}),children:"승낙 메시지 확인"}),e.round===3&&o.jsxs("div",{className:"flex justify-center",children:[e.text.choose==1&&o.jsx(a,{variant:"outlined",onClick:()=>l("returning"),startIcon:o.jsx(h,{}),children:"반납하기"}),e.text.choose==2&&o.jsxs(a,{variant:"outlined",disabled:!0,children:[e.connectedName," 님이 빌리는 중"]})]}),e.round===4&&o.jsxs("div",{className:"flex justify-center",children:[e.text.choose==1&&o.jsx(a,{variant:"outlined",disabled:!0,children:"주인에게 확인 중"}),e.text.choose==2&&o.jsx(a,{variant:"outlined",onClick:()=>l("confirm return"),startIcon:o.jsx(h,{}),children:"반납 완료 확인"})]})]}):o.jsxs(o.Fragment,{children:[e.round===1&&o.jsxs("div",{className:"flex justify-center",children:[o.jsx(a,{variant:"outlined",onClick:()=>l("supporting"),startIcon:o.jsx(h,{}),children:"승낙하기"}),o.jsx(xe,{move:c,handleClose:w})]}),e.round===2&&o.jsxs("div",{className:"flex flex-col justify-center",children:[o.jsx(a,{variant:"contained",disabled:!0,children:"승낙 메시지 전송 완료"}),o.jsx(a,{variant:"outlined",onClick:()=>l("stop supporting"),startIcon:o.jsx(h,{}),children:"취소"})]}),e.round===3&&o.jsxs("div",{className:"flex justify-center",children:[e.text.choose==1&&o.jsxs(a,{variant:"outlined",disabled:!0,children:[e.displayName," 님이 빌리는 중"]}),e.text.choose==2&&o.jsx(a,{variant:"outlined",onClick:()=>l("returning"),startIcon:o.jsx(h,{}),children:"반납하기"})]}),e.round===4&&o.jsxs("div",{className:"flex justify-center",children:[e.text.choose==1&&o.jsx(a,{variant:"outlined",onClick:()=>l("confirm return"),endIcon:o.jsx(h,{}),children:"반납 완료 확인"}),e.text.choose==2&&o.jsx(a,{variant:"outlined",disabled:!0,children:"주인에게 확인 중"})]})]})})}export{ke as B,Ne as C,De as a,Me as b};
