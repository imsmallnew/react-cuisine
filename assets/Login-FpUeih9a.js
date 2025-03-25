import{a as y,d as k,u as w,r as m,s as p,e as l,p as c,h as g,j as e,L,c as $,N as A}from"./index-d-Y14EwG.js";import{T as R}from"./Toast-DSholv70.js";import{l as D}from"./logo-8gluHM_i.js";import"./bootstrap.esm-CPbp9n-C.js";function B(){const r="https://ec-course-api.hexschool.io",t=y(),d=k(),{isLoading:f,loadingText:j}=w(s=>s.loading),[i,b]=m.useState({username:"",password:""}),v=async s=>{var n,a;s.preventDefault(),t(p("讀取中..."));try{const o=await l.post(`${r}/v2/admin/signin`,i),{token:u,expired:N}=o.data;document.cookie=`reactHWToken=${u}; expires=${new Date(N)}`,l.defaults.headers.common.Authorization=u,t(c({title:"系統提示",text:"驗證登入成功, 歡迎進入商品管理後台",status:"success"})),setTimeout(()=>d("/admin"),300)}catch(o){t(c({title:"系統提示",text:((a=(n=o==null?void 0:o.response)==null?void 0:n.data)==null?void 0:a.message)||`使用者 ${i.username} 登入失敗`,status:"failed"}))}finally{t(g())}},h=m.useCallback(async()=>{var s,n;t(p("讀取中..."));try{await l.post(`${r}/v2/api/user/check`),t(c({title:"系統提示",text:"驗證登入成功, 歡迎進入商品管理後台",status:"success"})),d("/admin")}catch(a){console.error(a),t(c({title:"系統提示",text:((n=(s=a==null?void 0:a.response)==null?void 0:s.data)==null?void 0:n.message)||(a==null?void 0:a.message),status:"failed"}))}finally{t(g())}},[r,t,d]);m.useEffect(()=>{const s=document.cookie.replace(/(?:(?:^|.*;\s*)reactHWToken\s*=\s*([^;]*).*$)|^.*$/,"$1");s.length>0&&(l.defaults.headers.common.Authorization=s,h())},[h]);const x=s=>{const{name:n,value:a}=s.target;b({...i,[n]:a})};return e.jsxs(e.Fragment,{children:[f&&e.jsx(L,{loadingText:j}),e.jsx(R,{}),e.jsx("nav",{className:"navbar navbar-light navbar-expand text-primary navbar-toggleable fixed-top shadow bg-dark","data-bs-theme":"dark",children:e.jsxs("div",{className:"container",children:[e.jsxs($,{className:"navbar-brand site-title",to:"/admin",children:[e.jsx("img",{src:D,style:{width:50,marginRight:"5px"},alt:"Logo"})," Daniel's Burger Admin"]}),e.jsx("div",{className:"d-flex",children:e.jsx(A,{to:"/",className:({isActive:s})=>`btn btn-sm ${s?"btn-secondary":"btn-outline-secondary"} me-2`,children:"返回首頁"})})]})}),e.jsx("div",{className:"container",children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"d-flex flex-column justify-content-center align-items-center vh-100",children:[e.jsx("h1",{className:"mb-5",children:"商品管理系統"}),e.jsxs("form",{onSubmit:v,className:"d-flex flex-column gap-3",children:[e.jsxs("div",{className:"form-floating mb-3",children:[e.jsx("input",{type:"email",name:"username",onChange:x,className:"form-control",id:"username",placeholder:"",value:i.username}),e.jsx("label",{htmlFor:"username",children:"Email address"})]}),e.jsxs("div",{className:"form-floating",children:[e.jsx("input",{type:"password",name:"password",onChange:x,className:"form-control",id:"password",placeholder:"",value:i.password}),e.jsx("label",{htmlFor:"password",children:"Password"})]}),e.jsx("button",{className:"btn btn-primary",children:"登入"})]})]})})}),e.jsx("footer",{className:"footer bg-dark w-100",style:{position:"fixed",bottom:0,left:0,zIndex:100},children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"d-flex align-items-center justify-content-center text-white py-2",children:[e.jsx("p",{className:"mb-0 text-center d-none d-md-block",children:"© 2025 - Daniel's Burger All Rights Reserved."}),e.jsxs("p",{className:"mb-0 text-center d-md-none",children:["© 2025 ",e.jsx("br",{}),"Daniel's Burger All Rights Reserved."]})]})})})]})}export{B as default};
