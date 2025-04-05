import{j as s,P as e,i as L,d as W,a as H,r as o,s as $,e as M,p as k,h as T}from"./index-mpaofkQ4.js";import{M as B}from"./bootstrap.esm-CPbp9n-C.js";import{P as V}from"./Pagination-q-5W7wDh.js";function S({state:u,orderList:l,targetOrder:d,openOrderModal:b,handleChangeOption:i,setTargetOrder:m}){return s.jsxs(s.Fragment,{children:[s.jsxs("table",{className:"table mt-2 table-hover d-none d-md-table",children:[s.jsx("thead",{children:s.jsxs("tr",{className:"table-success border-2",children:[s.jsx("th",{children:"訂單號碼"}),s.jsx("th",{children:"訂單日期"}),s.jsx("th",{children:"訂購人"}),s.jsx("th",{className:"text-center",children:"付款狀態"}),s.jsx("th",{className:"text-center",children:"訂單金額"}),s.jsx("th",{className:"text-center",children:"訂單內容"})]})}),s.jsx("tbody",{className:"align-middle",children:l==null?void 0:l.map(a=>{var c;return s.jsxs("tr",{children:[s.jsx("td",{className:"text-break",children:a.id}),s.jsx("td",{children:new Date(a.create_at*1e3).toLocaleString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})}),s.jsx("td",{children:(c=a.user)==null?void 0:c.name}),s.jsxs("td",{className:`text-center fw-bold ${a.is_paid?"text-success":"text-danger"}`,children:[a.is_paid?"已付款":"未付款",s.jsxs("select",{value:a.is_paid?"Y":"N",onChange:t=>{window.confirm("確定要變更付款狀態嗎？")&&i(t,a)},className:"ms-2",disabled:a==null?void 0:a.is_paid,children:[s.jsx("option",{value:"Y",children:"Y"}),s.jsx("option",{value:"N",children:"N"})]})]}),s.jsxs("td",{className:"text-center text-primary fw-bold",children:[a.total," 元"]}),s.jsx("td",{className:"text-center",children:s.jsx("div",{className:"btn-group",children:s.jsx("button",{type:"button",className:`btn ${(a==null?void 0:a.id)===(d==null?void 0:d.id)?"btn-secondary btn-sm":"btn-outline-secondary btn-sm"}`,disabled:u,onClick:()=>{m(a),b(a)},children:s.jsx("i",{className:"fas fa-search"})})})})]},a.id)})})]}),s.jsx("div",{className:"d-block d-md-none mt-3",children:l==null?void 0:l.map(a=>{var c;return s.jsx("div",{className:"card mb-3 shadow-sm",children:s.jsxs("div",{className:"card-body",children:[s.jsxs("h5",{className:`card-title mb-1 fw-bold ${a.is_paid?"text-success":"text-danger"}`,children:["訂單號碼: ",a.id]}),s.jsxs("p",{className:"mb-1",children:["訂單日期: ",new Date(a.create_at*1e3).toLocaleString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})]}),s.jsxs("p",{className:"mb-1",children:["訂購人: ",(c=a.user)==null?void 0:c.name]}),s.jsxs("p",{className:"mb-1 text-left",children:["訂單金額: ",s.jsxs("span",{className:"text-primary fw-bold",children:[a.total," 元"]})]}),s.jsxs("div",{className:"d-flex align-items-center",children:[s.jsxs("p",{className:`fw-bold ${a.is_paid?"text-success":"text-danger"}`,children:["付款狀態: ",a.is_paid?"已付款":"未付款"]}),s.jsxs("select",{className:"form-select form-select-sm w-25 mb-2 ms-2",value:a.is_paid?"Y":"N",style:{verticalAlign:"middle",marginTop:"-5px"},onChange:t=>{window.confirm("確定要變更付款狀態嗎？")&&i(t,a)},disabled:a==null?void 0:a.is_paid,children:[s.jsx("option",{value:"Y",children:"Y"}),s.jsx("option",{value:"N",children:"N"})]})]}),s.jsx("div",{className:"btn-group d-flex justify-content-center gap-2",children:s.jsxs("button",{type:"button",className:`btn ${(a==null?void 0:a.id)===(d==null?void 0:d.id),"btn-secondary"} btn-sm`,disabled:u,onClick:()=>{m(a),b(a)},children:["檢視訂單 ",s.jsx("i",{className:"fas fa-search"})]})})]})},a.id)})})]})}S.propTypes={state:e.bool.isRequired,orderList:e.arrayOf(e.shape({id:e.oneOfType([e.string,e.number]).isRequired,create_at:e.number.isRequired,is_paid:e.bool.isRequired,total:e.number.isRequired,user:e.shape({name:e.string})})).isRequired,targetOrder:e.shape({id:e.oneOfType([e.string,e.number])}).isRequired,openOrderModal:e.func.isRequired,handleChangeOption:e.func.isRequired,setTargetOrder:e.func.isRequired};function Y({orderModalRef:u,targetOrder:l,closeOrderModal:d,handleChangeOption:b}){var m,a,c,t;const i=Object.values((l==null?void 0:l.products)||{});return s.jsx("div",{className:"modal fade",ref:u,tabIndex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",style:{backgroundColor:"rgba(0,0,0,0.5)"},children:s.jsx("div",{className:"modal-dialog",style:{maxWidth:"720px"},children:s.jsxs("div",{className:"modal-content",children:[s.jsxs("div",{className:"modal-header bg-success",children:[s.jsxs("h5",{className:"modal-title text-white",id:"exampleModalLabel",children:["訂單內容: ",l.id]}),s.jsx("button",{type:"button",className:"btn-close bg-white","data-bs-dismiss":"modal","aria-label":"Close",onClick:()=>d()})]}),s.jsx("div",{className:"modal-body",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-md-5",children:s.jsxs("div",{className:"p-3 pb-0 rounded",style:{backgroundColor:"rgba(255, 255, 255, 0.9)"},children:[s.jsxs("div",{className:"mb-2",children:[s.jsx("label",{className:"form-label fw-bold text-dark",children:"收件人姓名"}),s.jsx("p",{className:"text-break text-primary",children:(m=l==null?void 0:l.user)==null?void 0:m.name})]}),s.jsxs("div",{className:"mb-2",children:[s.jsx("label",{className:"form-label fw-bold text-dark",children:"收件人信箱"}),s.jsx("p",{className:"text-break text-primary",children:(a=l==null?void 0:l.user)==null?void 0:a.email})]}),s.jsxs("div",{className:"mb-2",children:[s.jsx("label",{className:"form-label fw-bold text-dark",children:"收件人電話"}),s.jsx("p",{className:"text-break text-primary",children:(c=l==null?void 0:l.user)==null?void 0:c.tel})]}),s.jsxs("div",{className:"mb-2",children:[s.jsx("label",{className:"form-label fw-bold text-dark",children:"收件人地址"}),s.jsx("p",{className:"text-break text-primary",style:{wordBreak:"break-word"},children:(t=l==null?void 0:l.user)==null?void 0:t.address})]}),s.jsxs("div",{className:"mb-2",children:[s.jsx("label",{className:"form-label fw-bold text-dark",children:"總金額"}),s.jsxs("p",{className:"text-break text-danger fw-bold fs-4",children:[l==null?void 0:l.total," 元"]})]}),s.jsxs("div",{className:"mb-2",children:[s.jsx("label",{className:"form-label fw-bold text-dark",children:"付款狀態"}),s.jsxs("p",{className:`text-break fw-bold fs-4 ${l.is_paid?"text-success":"text-danger"}`,children:[l!=null&&l.is_paid?"已付款":"未付款",s.jsxs("select",{value:l.is_paid?"Y":"N",className:"ms-2",onChange:n=>{window.confirm("確定要變更付款狀態嗎？")&&b(n,l)},disabled:l==null?void 0:l.is_paid,children:[s.jsx("option",{value:"Y",children:"Y"}),s.jsx("option",{value:"N",children:"N"})]})]})]})]})}),s.jsx("div",{className:"col-md-7 mb-3",children:s.jsx("div",{className:"p-3 rounded",style:{backgroundColor:"rgba(255, 255, 255, 0.2)",backdropFilter:"blur(8px)"},children:i==null?void 0:i.map(n=>{var p,j;return s.jsxs("div",{className:"d-flex align-items-center border-bottom py-2",children:[s.jsx("img",{src:(p=n==null?void 0:n.product)==null?void 0:p.imageUrl,className:"rounded border border-gold",alt:"商品圖片",width:"100"}),s.jsxs("div",{className:"ms-3 flex-grow-1",children:[s.jsx("h6",{className:"text-white",children:(j=n==null?void 0:n.product)==null?void 0:j.title}),s.jsx("small",{className:"text-dark mt-3",children:s.jsxs("div",{className:"row",children:[s.jsxs("div",{className:"col-md-6",children:["數量: ",n==null?void 0:n.qty]}),s.jsxs("div",{className:"col-md-6 text-end",children:["小計: ",n==null?void 0:n.total," 元"]})]})})]})]},n==null?void 0:n.id)})})})]})}),s.jsx("div",{className:"modal-footer",children:s.jsx("button",{type:"button",className:"btn btn-success w-100",onClick:()=>d(),children:"關閉"})})]})})})}Y.propTypes={orderModalRef:e.shape({current:e.any}).isRequired,targetOrder:e.shape({id:e.oneOfType([e.string,e.number]),is_paid:e.bool,total:e.number,user:e.shape({name:e.string,email:e.string,address:e.string,tel:e.string}),products:e.objectOf(e.shape({id:e.oneOfType([e.string,e.number]),qty:e.number.isRequired,total:e.number.isRequired,product:e.shape({title:e.string,imageUrl:e.string})}))}),closeOrderModal:e.func.isRequired,handleChangeOption:e.func.isRequired};function Q(){const u="https://ec-course-api.hexschool.io",l="imsmallnew",{page:d}=L(),b=W(),i=H(),[m,a]=o.useState({}),[c,t]=o.useState(Number(d)),[n,p]=o.useState([]),[j,y]=o.useState({}),[E,P]=o.useState(!1),[z]=o.useState("admin"),[U]=o.useState({}),w=o.useRef(null),f=o.useRef(null),g=o.useCallback(async r=>{var x,v;i($("讀取中..."));try{await M.get(`${u}/v2/api/${l}/orders?page=${r}`).then(h=>{p(h.data.orders),a(h.data.pagination)})}catch(h){console.error(h),i(k({title:"系統提示",text:((v=(x=h==null?void 0:h.response)==null?void 0:x.data)==null?void 0:v.message)||"取得商品資料失敗",status:"failed"}))}finally{i(T())}},[u,l,i]);o.useEffect(()=>{g(c)},[c,g]),o.useEffect(()=>{Number(d)!==c&&t(Number(d))},[d,t,c]);const A=r=>{t(r),b(`/admin/orders/${r}`,{replace:!0})},D=async r=>{i($("更新付款狀態中..."));try{await M.post(`${u}/v2/api/${l}/pay/${r.id}`),g(c)}catch(x){console.error(x)}finally{i(T())}},R=async(r,x)=>{var C,q;const v=r.target.value==="Y"?1:0,h={...x,is_enabled:v};try{await D(h);const N=h.is_enabled===1?"已付款":"未付款";i(k({title:"更新付款狀態成功",text:`訂單號碼: ${x.id}<br />訂購人: ${x.user.email}<br />狀態: ${N}`,status:"success"})),_()}catch(N){i(k({title:"系統提示",text:((q=(C=N==null?void 0:N.response)==null?void 0:C.data)==null?void 0:q.message)||`[訂單號碼]${x.id}: 更新付款狀態失敗`,status:"failed"}))}};o.useEffect(()=>{w.current&&(f.current=new B(w.current,{backdrop:!1}))},[]);const F=r=>{y(r),setTimeout(()=>{P(!1)},500),f.current?f.current.show():console.error("Modal instance is not initialized.")},_=()=>{f.current?(f.current.hide(),setTimeout(()=>{y({})},500)):console.error("Modal instance is not initialized.")};return window.addEventListener("hide.bs.modal",()=>{document.activeElement instanceof HTMLElement&&document.activeElement.blur()}),s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"container main",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"row",children:s.jsxs("div",{className:"col-md-12 mt-4 mb-5",children:[s.jsx(S,{state:E,orderList:n,targetOrder:j,openOrderModal:F,handleChangeOption:R,setTargetOrder:y}),s.jsx(V,{pageInfo:m,handlePageChange:A})]})})})}),s.jsx(Y,{orderModalRef:w,targetOrder:j,navigation:z,cartItem:U,closeOrderModal:_,handleChangeOption:R})]})}export{Q as default};
