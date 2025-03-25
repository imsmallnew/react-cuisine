import{R as z,a as bs,d as _s,u as ws,r as oe,b as ps,g as We,j as f,c as je,s as Fs,e as As,p as Ze,h as Ns}from"./index-d-Y14EwG.js";var me=e=>e.type==="checkbox",ae=e=>e instanceof Date,R=e=>e==null;const is=e=>typeof e=="object";var V=e=>!R(e)&&!Array.isArray(e)&&is(e)&&!ae(e),Vs=e=>V(e)&&e.target?me(e.target)?e.target.checked:e.target.value:e,js=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,Ds=(e,r)=>e.has(js(r)),ks=e=>{const r=e.constructor&&e.constructor.prototype;return V(r)&&r.hasOwnProperty("isPrototypeOf")},Te=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function H(e){let r;const t=Array.isArray(e),l=typeof FileList<"u"?e instanceof FileList:!1;if(e instanceof Date)r=new Date(e);else if(e instanceof Set)r=new Set(e);else if(!(Te&&(e instanceof Blob||l))&&(t||V(e)))if(r=t?[]:{},!t&&!ks(e))r=e;else for(const n in e)e.hasOwnProperty(n)&&(r[n]=H(e[n]));else return e;return r}var pe=e=>Array.isArray(e)?e.filter(Boolean):[],j=e=>e===void 0,h=(e,r,t)=>{if(!r||!V(e))return t;const l=pe(r.split(/[,[\].]+?/)).reduce((n,o)=>R(n)?n:n[o],e);return j(l)||l===e?j(e[r])?t:e[r]:l},J=e=>typeof e=="boolean",Ce=e=>/^\w*$/.test(e),as=e=>pe(e.replace(/["|']|\]/g,"").split(/\.|\[/)),F=(e,r,t)=>{let l=-1;const n=Ce(r)?[r]:as(r),o=n.length,y=o-1;for(;++l<o;){const g=n[l];let C=t;if(l!==y){const P=e[g];C=V(P)||Array.isArray(P)?P:isNaN(+n[l+1])?{}:[]}if(g==="__proto__"||g==="constructor"||g==="prototype")return;e[g]=C,e=e[g]}return e};const Ke={BLUR:"blur",FOCUS_OUT:"focusout"},G={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},se={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};z.createContext(null);var Es=(e,r,t,l=!0)=>{const n={defaultValues:r._defaultValues};for(const o in e)Object.defineProperty(n,o,{get:()=>{const y=o;return r._proxyFormState[y]!==G.all&&(r._proxyFormState[y]=!l||G.all),e[y]}});return n},B=e=>V(e)&&!Object.keys(e).length,Ss=(e,r,t,l)=>{t(e);const{name:n,...o}=e;return B(o)||Object.keys(o).length>=Object.keys(r).length||Object.keys(o).find(y=>r[y]===G.all)},xe=e=>Array.isArray(e)?e:[e];function Ts(e){const r=z.useRef(e);r.current=e,z.useEffect(()=>{const t=!e.disabled&&r.current.subject&&r.current.subject.subscribe({next:r.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}var X=e=>typeof e=="string",Cs=(e,r,t,l,n)=>X(e)?(l&&r.watch.add(e),h(t,e,n)):Array.isArray(e)?e.map(o=>(l&&r.watch.add(o),h(t,o))):(l&&(r.watchAll=!0),t),Os=(e,r,t,l,n)=>r?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[l]:n||!0}}:{},Ye=e=>({isOnSubmit:!e||e===G.onSubmit,isOnBlur:e===G.onBlur,isOnChange:e===G.onChange,isOnAll:e===G.all,isOnTouch:e===G.onTouched}),Ge=(e,r,t)=>!t&&(r.watchAll||r.watch.has(e)||[...r.watch].some(l=>e.startsWith(l)&&/^\.\w+/.test(e.slice(l.length))));const ge=(e,r,t,l)=>{for(const n of t||Object.keys(e)){const o=h(e,n);if(o){const{_f:y,...g}=o;if(y){if(y.refs&&y.refs[0]&&r(y.refs[0],n)&&!l)return!0;if(y.ref&&r(y.ref,y.name)&&!l)return!0;if(ge(g,r))break}else if(V(g)&&ge(g,r))break}}};var Us=(e,r,t)=>{const l=xe(h(e,t));return F(l,"root",r[t]),F(e,t,l),e},Oe=e=>e.type==="file",Q=e=>typeof e=="function",be=e=>{if(!Te)return!1;const r=e?e.ownerDocument:0;return e instanceof(r&&r.defaultView?r.defaultView.HTMLElement:HTMLElement)},ve=e=>X(e),Ue=e=>e.type==="radio",_e=e=>e instanceof RegExp;const Je={value:!1,isValid:!1},Qe={value:!0,isValid:!0};var ls=e=>{if(Array.isArray(e)){if(e.length>1){const r=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:r,isValid:!!r.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!j(e[0].attributes.value)?j(e[0].value)||e[0].value===""?Qe:{value:e[0].value,isValid:!0}:Qe:Je}return Je};const Xe={isValid:!1,value:null};var ns=e=>Array.isArray(e)?e.reduce((r,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:r,Xe):Xe;function es(e,r,t="validate"){if(ve(e)||Array.isArray(e)&&e.every(ve)||J(e)&&!e)return{type:t,message:ve(e)?e:"",ref:r}}var ue=e=>V(e)&&!_e(e)?e:{value:e,message:""},ss=async(e,r,t,l,n,o)=>{const{ref:y,refs:g,required:C,maxLength:P,minLength:p,min:v,max:E,pattern:le,validate:W,name:O,valueAsNumber:Z,mount:K}=e._f,_=h(t,O);if(!K||r.has(O))return{};const I=g?g[0]:y,q=b=>{n&&I.reportValidity&&(I.setCustomValidity(J(b)?"":b||""),I.reportValidity())},N={},ee=Ue(y),ie=me(y),A=ee||ie,M=(Z||Oe(y))&&j(y.value)&&j(_)||be(y)&&y.value===""||_===""||Array.isArray(_)&&!_.length,L=Os.bind(null,O,l,N),ne=(b,w,D,U=se.maxLength,Y=se.minLength)=>{const $=b?w:D;N[O]={type:b?U:Y,message:$,ref:y,...L(b?U:Y,$)}};if(o?!Array.isArray(_)||!_.length:C&&(!A&&(M||R(_))||J(_)&&!_||ie&&!ls(g).isValid||ee&&!ns(g).isValid)){const{value:b,message:w}=ve(C)?{value:!!C,message:C}:ue(C);if(b&&(N[O]={type:se.required,message:w,ref:I,...L(se.required,w)},!l))return q(w),N}if(!M&&(!R(v)||!R(E))){let b,w;const D=ue(E),U=ue(v);if(!R(_)&&!isNaN(_)){const Y=y.valueAsNumber||_&&+_;R(D.value)||(b=Y>D.value),R(U.value)||(w=Y<U.value)}else{const Y=y.valueAsDate||new Date(_),$=fe=>new Date(new Date().toDateString()+" "+fe),ce=y.type=="time",de=y.type=="week";X(D.value)&&_&&(b=ce?$(_)>$(D.value):de?_>D.value:Y>new Date(D.value)),X(U.value)&&_&&(w=ce?$(_)<$(U.value):de?_<U.value:Y<new Date(U.value))}if((b||w)&&(ne(!!b,D.message,U.message,se.max,se.min),!l))return q(N[O].message),N}if((P||p)&&!M&&(X(_)||o&&Array.isArray(_))){const b=ue(P),w=ue(p),D=!R(b.value)&&_.length>+b.value,U=!R(w.value)&&_.length<+w.value;if((D||U)&&(ne(D,b.message,w.message),!l))return q(N[O].message),N}if(le&&!M&&X(_)){const{value:b,message:w}=ue(le);if(_e(b)&&!_.match(b)&&(N[O]={type:se.pattern,message:w,ref:y,...L(se.pattern,w)},!l))return q(w),N}if(W){if(Q(W)){const b=await W(_,t),w=es(b,I);if(w&&(N[O]={...w,...L(se.validate,w.message)},!l))return q(w.message),N}else if(V(W)){let b={};for(const w in W){if(!B(b)&&!l)break;const D=es(await W[w](_,t),I,w);D&&(b={...D,...L(w,D.message)},q(D.message),l&&(N[O]=b))}if(!B(b)&&(N[O]={ref:I,...b},!l))return N}}return q(!0),N};function Rs(e,r){const t=r.slice(0,-1).length;let l=0;for(;l<t;)e=j(e)?l++:e[r[l++]];return e}function Ms(e){for(const r in e)if(e.hasOwnProperty(r)&&!j(e[r]))return!1;return!0}function k(e,r){const t=Array.isArray(r)?r:Ce(r)?[r]:as(r),l=t.length===1?e:Rs(e,t),n=t.length-1,o=t[n];return l&&delete l[o],n!==0&&(V(l)&&B(l)||Array.isArray(l)&&Ms(l))&&k(e,t.slice(0,-1)),e}var De=()=>{let e=[];return{get observers(){return e},next:n=>{for(const o of e)o.next&&o.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(o=>o!==n)}}),unsubscribe:()=>{e=[]}}},Se=e=>R(e)||!is(e);function re(e,r){if(Se(e)||Se(r))return e===r;if(ae(e)&&ae(r))return e.getTime()===r.getTime();const t=Object.keys(e),l=Object.keys(r);if(t.length!==l.length)return!1;for(const n of t){const o=e[n];if(!l.includes(n))return!1;if(n!=="ref"){const y=r[n];if(ae(o)&&ae(y)||V(o)&&V(y)||Array.isArray(o)&&Array.isArray(y)?!re(o,y):o!==y)return!1}}return!0}var os=e=>e.type==="select-multiple",Ls=e=>Ue(e)||me(e),ke=e=>be(e)&&e.isConnected,us=e=>{for(const r in e)if(Q(e[r]))return!0;return!1};function we(e,r={}){const t=Array.isArray(e);if(V(e)||t)for(const l in e)Array.isArray(e[l])||V(e[l])&&!us(e[l])?(r[l]=Array.isArray(e[l])?[]:{},we(e[l],r[l])):R(e[l])||(r[l]=!0);return r}function cs(e,r,t){const l=Array.isArray(e);if(V(e)||l)for(const n in e)Array.isArray(e[n])||V(e[n])&&!us(e[n])?j(r)||Se(t[n])?t[n]=Array.isArray(e[n])?we(e[n],[]):{...we(e[n])}:cs(e[n],R(r)?{}:r[n],t[n]):t[n]=!re(e[n],r[n]);return t}var ye=(e,r)=>cs(e,r,we(r)),ds=(e,{valueAsNumber:r,valueAsDate:t,setValueAs:l})=>j(e)?e:r?e===""?NaN:e&&+e:t&&X(e)?new Date(e):l?l(e):e;function Ee(e){const r=e.ref;return Oe(r)?r.files:Ue(r)?ns(e.refs).value:os(r)?[...r.selectedOptions].map(({value:t})=>t):me(r)?ls(e.refs).value:ds(j(r.value)?e.ref.value:r.value,e)}var Bs=(e,r,t,l)=>{const n={};for(const o of e){const y=h(r,o);y&&F(n,o,y._f)}return{criteriaMode:t,names:[...e],fields:n,shouldUseNativeValidation:l}},he=e=>j(e)?e:_e(e)?e.source:V(e)?_e(e.value)?e.value.source:e.value:e;const ts="AsyncFunction";var Ps=e=>!!e&&!!e.validate&&!!(Q(e.validate)&&e.validate.constructor.name===ts||V(e.validate)&&Object.values(e.validate).find(r=>r.constructor.name===ts)),Is=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function rs(e,r,t){const l=h(e,t);if(l||Ce(t))return{error:l,name:t};const n=t.split(".");for(;n.length;){const o=n.join("."),y=h(r,o),g=h(e,o);if(y&&!Array.isArray(y)&&t!==o)return{name:t};if(g&&g.type)return{name:o,error:g};n.pop()}return{name:t}}var qs=(e,r,t,l,n)=>n.isOnAll?!1:!t&&n.isOnTouch?!(r||e):(t?l.isOnBlur:n.isOnBlur)?!e:(t?l.isOnChange:n.isOnChange)?e:!0,$s=(e,r)=>!pe(h(e,r)).length&&k(e,r);const Hs={mode:G.onSubmit,reValidateMode:G.onChange,shouldFocusError:!0};function zs(e={}){let r={...Hs,...e},t={submitCount:0,isDirty:!1,isLoading:Q(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:r.errors||{},disabled:r.disabled||!1},l={},n=V(r.defaultValues)||V(r.values)?H(r.defaultValues||r.values)||{}:{},o=r.shouldUnregister?{}:H(n),y={action:!1,mount:!1,watch:!1},g={mount:new Set,disabled:new Set,unMount:new Set,array:new Set,watch:new Set},C,P=0;const p={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={values:De(),array:De(),state:De()},E=Ye(r.mode),le=Ye(r.reValidateMode),W=r.criteriaMode===G.all,O=s=>i=>{clearTimeout(P),P=setTimeout(s,i)},Z=async s=>{if(!r.disabled&&(p.isValid||s)){const i=r.resolver?B((await A()).errors):await L(l,!0);i!==t.isValid&&v.state.next({isValid:i})}},K=(s,i)=>{!r.disabled&&(p.isValidating||p.validatingFields)&&((s||Array.from(g.mount)).forEach(a=>{a&&(i?F(t.validatingFields,a,i):k(t.validatingFields,a))}),v.state.next({validatingFields:t.validatingFields,isValidating:!B(t.validatingFields)}))},_=(s,i=[],a,d,c=!0,u=!0)=>{if(d&&a&&!r.disabled){if(y.action=!0,u&&Array.isArray(h(l,s))){const m=a(h(l,s),d.argA,d.argB);c&&F(l,s,m)}if(u&&Array.isArray(h(t.errors,s))){const m=a(h(t.errors,s),d.argA,d.argB);c&&F(t.errors,s,m),$s(t.errors,s)}if(p.touchedFields&&u&&Array.isArray(h(t.touchedFields,s))){const m=a(h(t.touchedFields,s),d.argA,d.argB);c&&F(t.touchedFields,s,m)}p.dirtyFields&&(t.dirtyFields=ye(n,o)),v.state.next({name:s,isDirty:b(s,i),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else F(o,s,i)},I=(s,i)=>{F(t.errors,s,i),v.state.next({errors:t.errors})},q=s=>{t.errors=s,v.state.next({errors:t.errors,isValid:!1})},N=(s,i,a,d)=>{const c=h(l,s);if(c){const u=h(o,s,j(a)?h(n,s):a);j(u)||d&&d.defaultChecked||i?F(o,s,i?u:Ee(c._f)):U(s,u),y.mount&&Z()}},ee=(s,i,a,d,c)=>{let u=!1,m=!1;const x={name:s};if(!r.disabled){const S=!!(h(l,s)&&h(l,s)._f&&h(l,s)._f.disabled);if(!a||d){p.isDirty&&(m=t.isDirty,t.isDirty=x.isDirty=b(),u=m!==x.isDirty);const T=S||re(h(n,s),i);m=!!(!S&&h(t.dirtyFields,s)),T||S?k(t.dirtyFields,s):F(t.dirtyFields,s,!0),x.dirtyFields=t.dirtyFields,u=u||p.dirtyFields&&m!==!T}if(a){const T=h(t.touchedFields,s);T||(F(t.touchedFields,s,a),x.touchedFields=t.touchedFields,u=u||p.touchedFields&&T!==a)}u&&c&&v.state.next(x)}return u?x:{}},ie=(s,i,a,d)=>{const c=h(t.errors,s),u=p.isValid&&J(i)&&t.isValid!==i;if(r.delayError&&a?(C=O(()=>I(s,a)),C(r.delayError)):(clearTimeout(P),C=null,a?F(t.errors,s,a):k(t.errors,s)),(a?!re(c,a):c)||!B(d)||u){const m={...d,...u&&J(i)?{isValid:i}:{},errors:t.errors,name:s};t={...t,...m},v.state.next(m)}},A=async s=>{K(s,!0);const i=await r.resolver(o,r.context,Bs(s||g.mount,l,r.criteriaMode,r.shouldUseNativeValidation));return K(s),i},M=async s=>{const{errors:i}=await A(s);if(s)for(const a of s){const d=h(i,a);d?F(t.errors,a,d):k(t.errors,a)}else t.errors=i;return i},L=async(s,i,a={valid:!0})=>{for(const d in s){const c=s[d];if(c){const{_f:u,...m}=c;if(u){const x=g.array.has(u.name),S=c._f&&Ps(c._f);S&&p.validatingFields&&K([d],!0);const T=await ss(c,g.disabled,o,W,r.shouldUseNativeValidation&&!i,x);if(S&&p.validatingFields&&K([d]),T[u.name]&&(a.valid=!1,i))break;!i&&(h(T,u.name)?x?Us(t.errors,T,u.name):F(t.errors,u.name,T[u.name]):k(t.errors,u.name))}!B(m)&&await L(m,i,a)}}return a.valid},ne=()=>{for(const s of g.unMount){const i=h(l,s);i&&(i._f.refs?i._f.refs.every(a=>!ke(a)):!ke(i._f.ref))&&Fe(s)}g.unMount=new Set},b=(s,i)=>!r.disabled&&(s&&i&&F(o,s,i),!re(Re(),n)),w=(s,i,a)=>Cs(s,g,{...y.mount?o:j(i)?n:X(s)?{[s]:i}:i},a,i),D=s=>pe(h(y.mount?o:n,s,r.shouldUnregister?h(n,s,[]):[])),U=(s,i,a={})=>{const d=h(l,s);let c=i;if(d){const u=d._f;u&&(!u.disabled&&F(o,s,ds(i,u)),c=be(u.ref)&&R(i)?"":i,os(u.ref)?[...u.ref.options].forEach(m=>m.selected=c.includes(m.value)):u.refs?me(u.ref)?u.refs.length>1?u.refs.forEach(m=>(!m.defaultChecked||!m.disabled)&&(m.checked=Array.isArray(c)?!!c.find(x=>x===m.value):c===m.value)):u.refs[0]&&(u.refs[0].checked=!!c):u.refs.forEach(m=>m.checked=m.value===c):Oe(u.ref)?u.ref.value="":(u.ref.value=c,u.ref.type||v.values.next({name:s,values:{...o}})))}(a.shouldDirty||a.shouldTouch)&&ee(s,c,a.shouldTouch,a.shouldDirty,!0),a.shouldValidate&&fe(s)},Y=(s,i,a)=>{for(const d in i){const c=i[d],u=`${s}.${d}`,m=h(l,u);(g.array.has(s)||V(c)||m&&!m._f)&&!ae(c)?Y(u,c,a):U(u,c,a)}},$=(s,i,a={})=>{const d=h(l,s),c=g.array.has(s),u=H(i);F(o,s,u),c?(v.array.next({name:s,values:{...o}}),(p.isDirty||p.dirtyFields)&&a.shouldDirty&&v.state.next({name:s,dirtyFields:ye(n,o),isDirty:b(s,u)})):d&&!d._f&&!R(u)?Y(s,u,a):U(s,u,a),Ge(s,g)&&v.state.next({...t}),v.values.next({name:y.mount?s:void 0,values:{...o}})},ce=async s=>{y.mount=!0;const i=s.target;let a=i.name,d=!0;const c=h(l,a),u=()=>i.type?Ee(c._f):Vs(s),m=x=>{d=Number.isNaN(x)||ae(x)&&isNaN(x.getTime())||re(x,h(o,a,x))};if(c){let x,S;const T=u(),te=s.type===Ke.BLUR||s.type===Ke.FOCUS_OUT,ms=!Is(c._f)&&!r.resolver&&!h(t.errors,a)&&!c._f.deps||qs(te,h(t.touchedFields,a),t.isSubmitted,le,E),Ne=Ge(a,g,te);F(o,a,T),te?(c._f.onBlur&&c._f.onBlur(s),C&&C(0)):c._f.onChange&&c._f.onChange(s);const Ve=ee(a,T,te,!1),xs=!B(Ve)||Ne;if(!te&&v.values.next({name:a,type:s.type,values:{...o}}),ms)return p.isValid&&(r.mode==="onBlur"&&te?Z():te||Z()),xs&&v.state.next({name:a,...Ne?{}:Ve});if(!te&&Ne&&v.state.next({...t}),r.resolver){const{errors:He}=await A([a]);if(m(T),d){const vs=rs(t.errors,l,a),ze=rs(He,l,vs.name||a);x=ze.error,a=ze.name,S=B(He)}}else K([a],!0),x=(await ss(c,g.disabled,o,W,r.shouldUseNativeValidation))[a],K([a]),m(T),d&&(x?S=!1:p.isValid&&(S=await L(l,!0)));d&&(c._f.deps&&fe(c._f.deps),ie(a,S,x,Ve))}},de=(s,i)=>{if(h(t.errors,i)&&s.focus)return s.focus(),1},fe=async(s,i={})=>{let a,d;const c=xe(s);if(r.resolver){const u=await M(j(s)?s:c);a=B(u),d=s?!c.some(m=>h(u,m)):a}else s?(d=(await Promise.all(c.map(async u=>{const m=h(l,u);return await L(m&&m._f?{[u]:m}:m)}))).every(Boolean),!(!d&&!t.isValid)&&Z()):d=a=await L(l);return v.state.next({...!X(s)||p.isValid&&a!==t.isValid?{}:{name:s},...r.resolver||!s?{isValid:a}:{},errors:t.errors}),i.shouldFocus&&!d&&ge(l,de,s?c:g.mount),d},Re=s=>{const i={...y.mount?o:n};return j(s)?i:X(s)?h(i,s):s.map(a=>h(i,a))},Me=(s,i)=>({invalid:!!h((i||t).errors,s),isDirty:!!h((i||t).dirtyFields,s),error:h((i||t).errors,s),isValidating:!!h(t.validatingFields,s),isTouched:!!h((i||t).touchedFields,s)}),fs=s=>{s&&xe(s).forEach(i=>k(t.errors,i)),v.state.next({errors:s?t.errors:{}})},Le=(s,i,a)=>{const d=(h(l,s,{_f:{}})._f||{}).ref,c=h(t.errors,s)||{},{ref:u,message:m,type:x,...S}=c;F(t.errors,s,{...S,...i,ref:d}),v.state.next({name:s,errors:t.errors,isValid:!1}),a&&a.shouldFocus&&d&&d.focus&&d.focus()},ys=(s,i)=>Q(s)?v.values.subscribe({next:a=>s(w(void 0,i),a)}):w(s,i,!0),Fe=(s,i={})=>{for(const a of s?xe(s):g.mount)g.mount.delete(a),g.array.delete(a),i.keepValue||(k(l,a),k(o,a)),!i.keepError&&k(t.errors,a),!i.keepDirty&&k(t.dirtyFields,a),!i.keepTouched&&k(t.touchedFields,a),!i.keepIsValidating&&k(t.validatingFields,a),!r.shouldUnregister&&!i.keepDefaultValue&&k(n,a);v.values.next({values:{...o}}),v.state.next({...t,...i.keepDirty?{isDirty:b()}:{}}),!i.keepIsValid&&Z()},Be=({disabled:s,name:i,field:a,fields:d})=>{(J(s)&&y.mount||s||g.disabled.has(i))&&(s?g.disabled.add(i):g.disabled.delete(i),ee(i,Ee(a?a._f:h(d,i)._f),!1,!1,!0))},Ae=(s,i={})=>{let a=h(l,s);const d=J(i.disabled)||J(r.disabled);return F(l,s,{...a||{},_f:{...a&&a._f?a._f:{ref:{name:s}},name:s,mount:!0,...i}}),g.mount.add(s),a?Be({field:a,disabled:J(i.disabled)?i.disabled:r.disabled,name:s}):N(s,!0,i.value),{...d?{disabled:i.disabled||r.disabled}:{},...r.progressive?{required:!!i.required,min:he(i.min),max:he(i.max),minLength:he(i.minLength),maxLength:he(i.maxLength),pattern:he(i.pattern)}:{},name:s,onChange:ce,onBlur:ce,ref:c=>{if(c){Ae(s,i),a=h(l,s);const u=j(c.value)&&c.querySelectorAll&&c.querySelectorAll("input,select,textarea")[0]||c,m=Ls(u),x=a._f.refs||[];if(m?x.find(S=>S===u):u===a._f.ref)return;F(l,s,{_f:{...a._f,...m?{refs:[...x.filter(ke),u,...Array.isArray(h(n,s))?[{}]:[]],ref:{type:u.type,name:s}}:{ref:u}}}),N(s,!1,void 0,u)}else a=h(l,s,{}),a._f&&(a._f.mount=!1),(r.shouldUnregister||i.shouldUnregister)&&!(Ds(g.array,s)&&y.action)&&g.unMount.add(s)}}},Pe=()=>r.shouldFocusError&&ge(l,de,g.mount),hs=s=>{J(s)&&(v.state.next({disabled:s}),ge(l,(i,a)=>{const d=h(l,a);d&&(i.disabled=d._f.disabled||s,Array.isArray(d._f.refs)&&d._f.refs.forEach(c=>{c.disabled=d._f.disabled||s}))},0,!1))},Ie=(s,i)=>async a=>{let d;a&&(a.preventDefault&&a.preventDefault(),a.persist&&a.persist());let c=H(o);if(g.disabled.size)for(const u of g.disabled)F(c,u,void 0);if(v.state.next({isSubmitting:!0}),r.resolver){const{errors:u,values:m}=await A();t.errors=u,c=m}else await L(l);if(k(t.errors,"root"),B(t.errors)){v.state.next({errors:{}});try{await s(c,a)}catch(u){d=u}}else i&&await i({...t.errors},a),Pe(),setTimeout(Pe);if(v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:B(t.errors)&&!d,submitCount:t.submitCount+1,errors:t.errors}),d)throw d},gs=(s,i={})=>{h(l,s)&&(j(i.defaultValue)?$(s,H(h(n,s))):($(s,i.defaultValue),F(n,s,H(i.defaultValue))),i.keepTouched||k(t.touchedFields,s),i.keepDirty||(k(t.dirtyFields,s),t.isDirty=i.defaultValue?b(s,H(h(n,s))):b()),i.keepError||(k(t.errors,s),p.isValid&&Z()),v.state.next({...t}))},qe=(s,i={})=>{const a=s?H(s):n,d=H(a),c=B(s),u=c?n:d;if(i.keepDefaultValues||(n=a),!i.keepValues){if(i.keepDirtyValues){const m=new Set([...g.mount,...Object.keys(ye(n,o))]);for(const x of Array.from(m))h(t.dirtyFields,x)?F(u,x,h(o,x)):$(x,h(u,x))}else{if(Te&&j(s))for(const m of g.mount){const x=h(l,m);if(x&&x._f){const S=Array.isArray(x._f.refs)?x._f.refs[0]:x._f.ref;if(be(S)){const T=S.closest("form");if(T){T.reset();break}}}}l={}}o=r.shouldUnregister?i.keepDefaultValues?H(n):{}:H(u),v.array.next({values:{...u}}),v.values.next({values:{...u}})}g={mount:i.keepDirtyValues?g.mount:new Set,unMount:new Set,array:new Set,disabled:new Set,watch:new Set,watchAll:!1,focus:""},y.mount=!p.isValid||!!i.keepIsValid||!!i.keepDirtyValues,y.watch=!!r.shouldUnregister,v.state.next({submitCount:i.keepSubmitCount?t.submitCount:0,isDirty:c?!1:i.keepDirty?t.isDirty:!!(i.keepDefaultValues&&!re(s,n)),isSubmitted:i.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:c?{}:i.keepDirtyValues?i.keepDefaultValues&&o?ye(n,o):t.dirtyFields:i.keepDefaultValues&&s?ye(n,s):i.keepDirty?t.dirtyFields:{},touchedFields:i.keepTouched?t.touchedFields:{},errors:i.keepErrors?t.errors:{},isSubmitSuccessful:i.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},$e=(s,i)=>qe(Q(s)?s(o):s,i);return{control:{register:Ae,unregister:Fe,getFieldState:Me,handleSubmit:Ie,setError:Le,_executeSchema:A,_getWatch:w,_getDirty:b,_updateValid:Z,_removeUnmounted:ne,_updateFieldArray:_,_updateDisabledField:Be,_getFieldArray:D,_reset:qe,_resetDefaultValues:()=>Q(r.defaultValues)&&r.defaultValues().then(s=>{$e(s,r.resetOptions),v.state.next({isLoading:!1})}),_updateFormState:s=>{t={...t,...s}},_disableForm:hs,_subjects:v,_proxyFormState:p,_setErrors:q,get _fields(){return l},get _formValues(){return o},get _state(){return y},set _state(s){y=s},get _defaultValues(){return n},get _names(){return g},set _names(s){g=s},get _formState(){return t},set _formState(s){t=s},get _options(){return r},set _options(s){r={...r,...s}}},trigger:fe,register:Ae,handleSubmit:Ie,watch:ys,setValue:$,getValues:Re,reset:$e,resetField:gs,clearErrors:fs,unregister:Fe,setError:Le,setFocus:(s,i={})=>{const a=h(l,s),d=a&&a._f;if(d){const c=d.refs?d.refs[0]:d.ref;c.focus&&(c.focus(),i.shouldSelect&&Q(c.select)&&c.select())}},getFieldState:Me}}function Ws(e={}){const r=z.useRef(void 0),t=z.useRef(void 0),[l,n]=z.useState({isDirty:!1,isValidating:!1,isLoading:Q(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:Q(e.defaultValues)?void 0:e.defaultValues});r.current||(r.current={...zs(e),formState:l});const o=r.current.control;return o._options=e,Ts({subject:o._subjects.state,next:y=>{Ss(y,o._proxyFormState,o._updateFormState)&&n({...o._formState})}}),z.useEffect(()=>o._disableForm(e.disabled),[o,e.disabled]),z.useEffect(()=>{if(o._proxyFormState.isDirty){const y=o._getDirty();y!==l.isDirty&&o._subjects.state.next({isDirty:y})}},[o,l.isDirty]),z.useEffect(()=>{e.values&&!re(e.values,t.current)?(o._reset(e.values,o._options.resetOptions),t.current=e.values,n(y=>({...y}))):o._resetDefaultValues()},[e.values,o]),z.useEffect(()=>{e.errors&&o._setErrors(e.errors)},[e.errors,o]),z.useEffect(()=>{o._state.mount||(o._updateValid(),o._state.mount=!0),o._state.watch&&(o._state.watch=!1,o._subjects.state.next({...o._formState})),o._removeUnmounted()}),z.useEffect(()=>{e.shouldUnregister&&o._subjects.values.next({values:o._getWatch()})},[e.shouldUnregister,o]),r.current.formState=Es(l,o),r.current}function Js(){var K,_,I,q,N,ee,ie;const e="https://ec-course-api.hexschool.io",r="imsmallnew",t=bs(),l=_s(),{cartList:n}=ws(A=>A.cart),[o,y]=oe.useState(!1),[g,C]=oe.useState(!1),P=ps(),{register:p,handleSubmit:v,formState:{errors:E},reset:le}=Ws(),W=A=>{const{message:M,...L}=A,ne={data:{user:L,message:M}};Object.keys(E).length===0&&Z(ne)},O=oe.useCallback(()=>{const A=setTimeout(()=>{g||l("/")},1e4);return()=>clearTimeout(A)},[l,g]),Z=async A=>{t(Fs("表單傳送中..."));try{await As.post(`${e}/v2/api/${r}/order`,A),le(),t(We()),t(Ze({title:"系統提示",text:"購物表單已傳送成功, 請回商品列表繼續購物",status:"success"})),y(!0)}catch{t(Ze({title:"系統提示",text:"結帳失敗",status:"failed"}))}finally{t(Ns())}};return oe.useEffect(()=>{t(We())},[t]),oe.useEffect(()=>{C(!0)},[P.pathname]),oe.useEffect(()=>{var M;((M=n==null?void 0:n.carts)==null?void 0:M.length)===0&&O()},[(K=n==null?void 0:n.carts)==null?void 0:K.length,O]),f.jsx(f.Fragment,{children:f.jsxs("div",{className:"container-fluid",style:{backgroundImage:"url('https://images.unsplash.com/photo-1491960693564-421771d727d6?q=80&w=2863&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",backgroundSize:"cover",backgroundPosition:"center",minHeight:"100vh",paddingTop:"60px",position:"relative"},children:[f.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:`rgba(0, 0, 0, ${o?0:.5})`,zIndex:1}}),o?f.jsx(f.Fragment,{children:f.jsxs("div",{className:"position-relative d-flex flex-column align-items-center justify-content-center vh-100 text-center px-4 text-white",style:{zIndex:"20"},children:[f.jsx("h1",{className:"display-3 fw-bold text-shadow",children:" 訂單已送出 "}),f.jsxs("p",{className:"mt-3 fs-4 w-50 text-shadow",children:["感謝您的購買",f.jsx("br",{})," 是否意猶未盡? 歡迎再繼續選購商品！"]}),f.jsxs("div",{className:"row d-flex",children:[f.jsx("div",{className:"arrow-container col-6",children:f.jsxs(je,{to:"/",className:"arrow-btn text-shadow",children:["返回首頁 ",f.jsx("i",{className:"fa fa-cutlery"})]})}),f.jsx("div",{className:"arrow-container col-6",children:f.jsxs(je,{to:"/products",className:"arrow-btn2 text-shadow",children:["繼續點餐 ",f.jsx("i",{className:"fa fa-cutlery"})]})})]})]})}):f.jsx(f.Fragment,{children:f.jsx("div",{className:"container position-relative pb-5 pt-4",style:{zIndex:2},children:f.jsxs("div",{className:"row justify-content-center",children:[f.jsxs("div",{className:"col-md-7 mb-3 mt-1",children:[f.jsx("h4",{className:"text-warning mb-3 text-center",children:"填寫訂單資訊"}),f.jsx("div",{className:"p-4 rounded",style:{backgroundColor:"rgba(255, 255, 255, 0.85)"},children:f.jsxs("form",{onSubmit:v(W),children:[f.jsxs("div",{className:"mb-3",children:[f.jsxs("label",{htmlFor:"name",className:"form-label fw-bold",children:["收件人姓名",f.jsx("span",{className:"text-danger",children:"*"})]}),f.jsx("input",{id:"name",type:"text",className:`form-control ${E.name&&"is-invalid"}`,placeholder:"請輸入姓名",...p("name",{required:"收件人姓名必填"})}),E.name&&f.jsx("p",{className:"text-danger",children:E.name.message})]}),f.jsxs("div",{className:"mb-3",children:[f.jsxs("label",{htmlFor:"email",className:"form-label fw-bold",children:["Email",f.jsx("span",{className:"text-danger",children:"*"})]}),f.jsx("input",{id:"email",type:"email",className:`form-control ${E.email&&"is-invalid"}`,placeholder:"請輸入 Email",...p("email",{required:"Email必填",pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Email 格式不正確。"}})}),E.email&&f.jsx("p",{className:"text-danger",children:E.email.message})]}),f.jsxs("div",{className:"mb-3",children:[f.jsxs("label",{htmlFor:"tel",className:"form-label fw-bold",children:["收件人電話",f.jsx("span",{className:"text-danger",children:"*"})]}),f.jsx("input",{id:"tel",type:"tel",className:`form-control ${E.tel&&"is-invalid"}`,placeholder:"請輸入電話",...p("tel",{required:"收件人電話必填",minLength:{value:8,message:"電話號碼至少需要8碼"},pattern:{value:/^\d+$/,message:"電話號碼格式不正確，僅限數字。"}})}),E.tel&&f.jsx("p",{className:"text-danger",children:E.tel.message})]}),f.jsxs("div",{className:"mb-3",children:[f.jsxs("label",{htmlFor:"address",className:"form-label fw-bold",children:["收件人地址",f.jsx("span",{className:"text-danger",children:"*"})]}),f.jsx("input",{id:"address",type:"text",className:`form-control ${E.address&&"is-invalid"}`,placeholder:"請輸入地址",...p("address",{required:"收件人地址必填"})}),E.address&&f.jsx("p",{className:"text-danger",children:E.address.message})]}),f.jsxs("div",{className:"mb-3",children:[f.jsx("label",{htmlFor:"message",className:"form-label fw-bold",children:"留言"}),f.jsx("textarea",{id:"message",className:"form-control",placeholder:"請輸入留言",rows:"3",...p("message")})]}),f.jsxs("div",{className:`${((_=n==null?void 0:n.carts)==null?void 0:_.length)>0?"text-center":"text-center text-danger"}`,children:[f.jsx(je,{className:"btn btn-dark btn-sm px-4 py-2 me-3",to:"/cart",children:"返回購物車"}),f.jsx("button",{type:"submit",className:"btn btn-gold px-4 py-2",disabled:((I=n==null?void 0:n.carts)==null?void 0:I.length)===0,children:((q=n==null?void 0:n.carts)==null?void 0:q.length)>0?"送出訂單":"[溫馨提示]: 購物車需有商品才可結帳唷 ( *´ސު｀*)"})]})]})})]}),f.jsxs("div",{className:"col-md-5 mb-2 mt-1",children:[f.jsx("h4",{className:"text-warning mb-3 text-center",children:"您的購物清單"}),f.jsxs("div",{className:"p-3 rounded",style:{backgroundColor:"rgba(255, 255, 255, 0.2)",backdropFilter:"blur(8px)"},children:[((N=n==null?void 0:n.carts)==null?void 0:N.length)===0?f.jsx("div",{className:"text-center",children:f.jsx("span",{className:"badge bg-warning p-2 pe-3 ps-3 text-dark fs-6",children:"購物車目前為空"})}):(ee=n==null?void 0:n.carts)==null?void 0:ee.map(A=>{var M;return f.jsxs("div",{className:"d-flex align-items-center border-bottom py-2",children:[f.jsx("img",{src:(M=A==null?void 0:A.product)==null?void 0:M.imageUrl,className:"rounded border border-gold",alt:"商品圖片",width:"100"}),f.jsxs("div",{className:"ms-3 flex-grow-1",children:[f.jsx("h6",{className:"text-white",children:A.product.title}),f.jsx("small",{className:"text-warning mt-3",children:f.jsxs("div",{className:"row",children:[f.jsxs("div",{className:"col-12 col-md-6",children:["數量: ",A.qty," "]}),f.jsxs("div",{className:"col-12 col-md-6 count text-end",children:["小計: ",A.total," 元"]})]})})]})]},A.id)}),((ie=n==null?void 0:n.carts)==null?void 0:ie.length)>0&&f.jsxs("div",{className:"mt-3 text-end",children:[f.jsxs("h5",{className:"text-white",children:["總計: ",f.jsxs("span",{className:"text-white",children:[n.total," 元"]})]}),f.jsxs("h5",{className:"text-warning",children:["折扣價: ",f.jsxs("span",{className:"text-warning",children:[n.final_total," 元"]})]})]})]})]})]})})})]})})}export{Js as default};
