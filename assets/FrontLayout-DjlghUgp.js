import{u as p,a as u,r as h,b as N,g as j,j as a,L as f,c as y,N as w,O as k}from"./index-DSFv4uQF.js";import{T as O}from"./Toast-DJ5vhdZp.js";import{l as R}from"./logo-8gluHM_i.js";import"./bootstrap.esm-CPbp9n-C.js";function $(){const{isLoading:l,loadingText:g}=p(s=>s.loading),{cartList:e}=p(s=>s.cart),r=u(),[n,o]=h.useState(!1),x=N();h.useEffect(()=>{r(j())},[r]);const b=[{path:"/",name:"首頁",navName:"home"},{path:"/products",name:"商品列表",navName:"products"},{path:"/cart",name:"檢視購物車",navName:"cart"},{path:"/form",name:"結帳表單",navName:"form"},{path:"login",name:"後台管理",navName:"admin"}];return a.jsxs(a.Fragment,{children:[l&&a.jsx(f,{loadingText:g}),a.jsx(O,{}),a.jsx("nav",{className:"navbar navbar-light navbar-expand-lg fixed-top shadow",children:a.jsxs("div",{className:"container",children:[a.jsxs(y,{className:"navbar-brand site-title",to:"/",children:[a.jsx("img",{src:R,style:{width:50,marginRight:"5px"}})," Daniel's Burger"]}),a.jsx("button",{className:"navbar-toggler",type:"button",onClick:()=>o(!n),children:a.jsx("span",{className:"navbar-toggler-icon"})}),a.jsx("div",{className:`collapse navbar-collapse ${n?"show":""}`,children:a.jsx("ul",{className:"navbar-nav ms-auto",children:b.map((s,t)=>{var i,c,m,d;return(t!==3||x.pathname==="/form")&&a.jsx("li",{className:"nav-item",children:a.jsxs(w,{to:s.path,className:({isActive:v})=>`btn ${n?"btn-lg":"btn-sm"} ${v?"btn-secondary":"btn-light"} ms-3 position-relative`,onClick:()=>o(!1),children:[s.name,s.navName==="cart"&&((i=e==null?void 0:e.carts)==null?void 0:i.length)>0&&a.jsx("span",{className:"badge rounded-pill bg-danger ms-2 mobileValue",children:(c=e==null?void 0:e.carts)==null?void 0:c.length}),s.navName==="cart"&&((m=e==null?void 0:e.carts)==null?void 0:m.length)>0&&a.jsx("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1 me-1 webValue",children:(d=e==null?void 0:e.carts)==null?void 0:d.length})]},t)},t)})})})]})}),a.jsx(k,{}),!l&&a.jsx("footer",{className:"footer bg-dark w-100",style:{position:"relative",bottom:0,left:0,zIndex:100},children:a.jsx("div",{className:"container",children:a.jsx("div",{className:"d-flex align-items-center justify-content-center text-white py-2",children:a.jsx("p",{className:"mb-0 text-center",children:"© 2024 - Daniel's Burger All Rights Reserved."})})})})]})}export{$ as default};
