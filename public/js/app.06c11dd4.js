(function(){"use strict";var e={1924:function(e,t,a){var l=a(9242),o=a(3396);const n={id:"app"};function r(e,t,a,l,r,u){const s=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",n,[(0,o.Wm)(s)])}var u={name:"app"},s=a(89);const i=(0,s.Z)(u,[["render",r]]);var d=i,c=a(2483),m=a(7139);const p=e=>((0,o.dD)("data-v-7b374e56"),e=e(),(0,o.Cn)(),e),f={class:"common-layout"},w={key:0,class:"centered-content"},g=p((()=>(0,o._)("h1",null,"尚未登录微信o(╥﹏╥)o",-1))),h={key:1,class:"centered-content"},y=p((()=>(0,o._)("br",null,null,-1))),v=p((()=>(0,o._)("br",null,null,-1))),_=p((()=>(0,o._)("br",null,null,-1))),W=p((()=>(0,o._)("br",null,null,-1)));function b(e,t,a,l,n,r){const u=(0,o.up)("Comment"),s=(0,o.up)("el-icon"),i=(0,o.up)("el-menu-item"),d=(0,o.up)("CameraFilled"),c=(0,o.up)("Promotion"),p=(0,o.up)("Tools"),b=(0,o.up)("CircleCloseFilled"),x=(0,o.up)("el-menu"),k=(0,o.up)("el-row"),V=(0,o.up)("el-aside"),z=(0,o.up)("el-button"),C=(0,o.up)("el-avatar"),F=(0,o.up)("el-main"),U=(0,o.up)("el-container");return(0,o.wg)(),(0,o.iD)("div",f,[(0,o.Wm)(U,null,{default:(0,o.w5)((()=>[(0,o.Wm)(V,{width:"80px"},{default:(0,o.w5)((()=>[(0,o.Wm)(k,{class:"tac",style:{height:"100vh"}},{default:(0,o.w5)((()=>[(0,o.Wm)(x,{class:"el-menu",style:{"background-color":"skyblue"},collapse:""},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{index:"1",onClick:t[0]||(t[0]=e=>r.handleRouter("/aichat"))},{default:(0,o.w5)((()=>[(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(u)])),_:1})])),_:1}),(0,o.Wm)(i,{index:"2",onClick:t[1]||(t[1]=e=>r.handleRouter("/wxlogin"))},{default:(0,o.w5)((()=>[(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(d)])),_:1})])),_:1}),(0,o.Wm)(i,{index:"3",onClick:t[2]||(t[2]=e=>r.handleRouter("/history"))},{default:(0,o.w5)((()=>[(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(c)])),_:1})])),_:1}),(0,o.Wm)(i,{index:"4",onClick:t[3]||(t[3]=e=>r.handleRouter("/config"))},{default:(0,o.w5)((()=>[(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(p)])),_:1})])),_:1}),(0,o.Wm)(i,{index:"5",onClick:r.logout},{default:(0,o.w5)((()=>[(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(b)])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1}),(0,o.Wm)(F,{class:"main-container"},{default:(0,o.w5)((()=>[l.isLogin?((0,o.wg)(),(0,o.iD)("div",h,[(0,o._)("h1",null,(0,m.zw)(l.wxname)+"，欢迎你！(*^▽^*)",1),(0,o.Wm)(C,{shape:"square",size:100,fit:e.fit,src:"/getavatar"},null,8,["fit"]),y,v,(0,o.Wm)(z,{type:"primary",round:"",class:"loginbutton",onClick:t[6]||(t[6]=e=>r.handleRouter("/history"))},{default:(0,o.w5)((()=>[(0,o.Uk)("发送历史")])),_:1}),(0,o.Wm)(z,{type:"primary",round:"",class:"loginbutton",onClick:t[7]||(t[7]=e=>r.handleRouter("/config"))},{default:(0,o.w5)((()=>[(0,o.Uk)("系统设置")])),_:1}),_,W,(0,o.Wm)(z,{type:"primary",round:"",class:"loginbutton",onClick:t[8]||(t[8]=e=>r.handleRouter("/aichat"))},{default:(0,o.w5)((()=>[(0,o.Uk)("对话测试")])),_:1}),(0,o.Wm)(z,{type:"primary",round:"",class:"loginbutton",onClick:r.wxlogout},{default:(0,o.w5)((()=>[(0,o.Uk)("退出微信")])),_:1},8,["onClick"])])):((0,o.wg)(),(0,o.iD)("div",w,[g,(0,o.Wm)(z,{type:"primary",round:"",class:"loginbutton",onClick:t[4]||(t[4]=e=>r.handleRouter("/wxlogin"))},{default:(0,o.w5)((()=>[(0,o.Uk)("点我登录")])),_:1}),(0,o.Wm)(z,{type:"primary",round:"",class:"loginbutton",onClick:t[5]||(t[5]=e=>r.handleRouter("/config"))},{default:(0,o.w5)((()=>[(0,o.Uk)("系统设置")])),_:1})]))])),_:1})])),_:1})])}a(560);var x=a(4870),k=a(7178),V=a(6e3),z=a(1076),C={setup(){const e=(0,x.iH)(!1),t=(0,x.iH)("");return(0,o.bv)((async function(){try{const a=await z.Z.get("/getstatus");if(200===a.data.status){e.value=!0;const a=await z.Z.get("/getwxname");t.value=a.data.wxname}else 401===a.data.status&&k.z8.error("登录已过期，请重新登录！")}catch(a){k.z8.error("获取登录状态失败！")}})),{isLogin:e,wxname:t}},methods:{wxlogout(){V.T.confirm("是否退出微信登录？","警告",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then((async()=>{try{const e=await z.Z.get("/stop"),t=e.status;200===t?(k.z8.success("退出微信成功！"),window.location.reload()):k.z8.error("退出微信失败！")}catch(e){k.z8.error("退出微信失败！"+e.message)}})).catch((()=>{(0,k.z8)({type:"info",message:"操作已取消"})}))},logout(){V.T.confirm("是否退出登录？","警告",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then((()=>{window.localStorage.removeItem("token"),k.z8.success("退出登录成功！"),this.$router.push("/login")})).catch((()=>{(0,k.z8)({type:"info",message:"操作已取消"})}))},handleRouter(e){this.$router.push(e)}}};const F=(0,s.Z)(C,[["render",b],["__scopeId","data-v-7b374e56"]]);var U=F;const S=e=>((0,o.dD)("data-v-9237273c"),e=e(),(0,o.Cn)(),e),H={class:"login-container"},Z={class:"text item"},R=S((()=>(0,o._)("h2",null,"用户登录",-1)));function I(e,t,a,l,n,r){const u=(0,o.up)("el-input"),s=(0,o.up)("el-button"),i=(0,o.up)("el-card");return(0,o.wg)(),(0,o.iD)("div",H,[(0,o.Wm)(i,{class:"box-card"},{default:(0,o.w5)((()=>[(0,o._)("div",Z,[R,(0,o.Wm)(u,{modelValue:l.usernameinput,"onUpdate:modelValue":t[0]||(t[0]=e=>l.usernameinput=e),placeholder:"用户名",class:"usernameinput"},null,8,["modelValue"]),(0,o.Wm)(u,{modelValue:l.passwordinput,"onUpdate:modelValue":t[1]||(t[1]=e=>l.passwordinput=e),class:"passwordinput",type:"password",placeholder:"密码","show-password":""},null,8,["modelValue"]),(0,o.Wm)(s,{type:"primary",round:"",class:"loginbutton",onClick:r.userlogin},{default:(0,o.w5)((()=>[(0,o.Uk)("登录")])),_:1},8,["onClick"])])])),_:1})])}var P={setup(){const e=(0,x.iH)(""),t=(0,x.iH)("");return{usernameinput:t,passwordinput:e}},methods:{async userlogin(){try{const e=this.usernameinput,t=this.passwordinput;if(0===e.length||0===t.length)return void k.z8.error("用户名和密码不能为空！");const a=await z.Z.post("/userlogin",{username:e,password:t});if(a){const e=a.data.status,t=a.data.msg;if(500===e)k.z8.error("登录失败！"+t);else if(200===e){const e=a.data.token;localStorage.setItem("token",e),k.z8.success("登录成功！"),this.$router.push("/")}else k.z8.error("登录失败！请稍后再试")}else k.z8.error("登录失败！服务器无响应")}catch(e){k.z8.error("登录失败！请稍后再试")}}}};const T=(0,s.Z)(P,[["render",I],["__scopeId","data-v-9237273c"]]);var D=T;const N={id:"chat-container"},j={id:"chat-messages",style:{"overflow-y":"scroll"}},A={id:"user-input",style:{display:"flex","justify-content":"space-between","align-items":"center",position:"fixed",bottom:"0",width:"100%",padding:"10px","box-sizing":"border-box","background-color":"white"}};function O(e,t,a,l,n,r){const u=(0,o.up)("Header"),s=(0,o.up)("el-avatar"),i=(0,o.up)("el-card"),d=(0,o.up)("el-input"),c=(0,o.up)("el-button");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(u),(0,o._)("div",N,[(0,o._)("div",j,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.messages,((e,t)=>((0,o.wg)(),(0,o.iD)("div",{key:t,class:(0,m.C_)(e.type+"-message-container")},["bot"===e.type&&0==l.isLogin?((0,o.wg)(),(0,o.j4)(s,{key:0},{default:(0,o.w5)((()=>[(0,o.Uk)("Bot")])),_:1})):(0,o.kq)("",!0),"bot"===e.type&&1==l.isLogin?((0,o.wg)(),(0,o.j4)(s,{key:1,src:"/getavatar"})):(0,o.kq)("",!0),(0,o.Wm)(i,{class:(0,m.C_)(e.type+"-message-card")},{default:(0,o.w5)((()=>[(0,o.Uk)((0,m.zw)(e.content),1)])),_:2},1032,["class"]),"you"===e.type?((0,o.wg)(),(0,o.j4)(s,{key:2},{default:(0,o.w5)((()=>[(0,o.Uk)("You")])),_:1})):(0,o.kq)("",!0)],2)))),128))]),(0,o._)("div",A,[(0,o.Wm)(d,{modelValue:l.textarea,"onUpdate:modelValue":t[0]||(t[0]=e=>l.textarea=e),clear:"",autosize:{minRows:1,maxRows:4},type:"textarea",placeholder:"在此输入消息...",style:{"flex-grow":"1","margin-right":"10px"}},null,8,["modelValue"]),(0,o.Wm)(c,{type:"primary",round:"",class:"loginbutton",onClick:t[1]||(t[1]=e=>l.sendMessage())},{default:(0,o.w5)((()=>[(0,o.Uk)("发送")])),_:1})])])],64)}const B=(0,o._)("div",{class:"flex-grow"},null,-1),q=(0,o._)("span",null,"首页",-1),K=(0,o._)("span",null,"对话测试",-1),L=(0,o._)("span",null,"登录微信",-1),$=(0,o._)("span",null,"发送历史",-1),E=(0,o._)("span",null,"设置",-1),M=(0,o._)("span",null,"退出登录",-1);function Y(e,t,a,l,n,r){const u=(0,o.up)("ChatLineRound"),s=(0,o.up)("HomeFilled"),i=(0,o.up)("el-icon"),d=(0,o.up)("el-menu-item"),c=(0,o.up)("Comment"),m=(0,o.up)("CameraFilled"),p=(0,o.up)("Promotion"),f=(0,o.up)("Tools"),w=(0,o.up)("CircleCloseFilled"),g=(0,o.up)("el-sub-menu"),h=(0,o.up)("el-menu");return(0,o.wg)(),(0,o.j4)(h,{class:"el-menu-demo",mode:"horizontal",ellipsis:!1,onSelect:e.handleSelect,style:{"background-color":"skyblue"}},{default:(0,o.w5)((()=>[B,(0,o.Wm)(g,{index:"1"},{title:(0,o.w5)((()=>[(0,o.Wm)(u,{style:{width:"35px","margin-left":"8px"}})])),default:(0,o.w5)((()=>[(0,o.Wm)(d,{index:"1",onClick:t[0]||(t[0]=e=>r.handleRouter("/"))},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(s)])),_:1}),q])),_:1}),(0,o.Wm)(d,{index:"2",onClick:t[1]||(t[1]=e=>r.handleRouter("/aichat"))},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(c)])),_:1}),K])),_:1}),(0,o.Wm)(d,{index:"3",onClick:t[2]||(t[2]=e=>r.handleRouter("/wxlogin"))},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(m)])),_:1}),L])),_:1}),(0,o.Wm)(d,{index:"4",onClick:t[3]||(t[3]=e=>r.handleRouter("/history"))},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(p)])),_:1}),$])),_:1}),(0,o.Wm)(d,{index:"5",onClick:t[4]||(t[4]=e=>r.handleRouter("/config"))},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(f)])),_:1}),E])),_:1}),(0,o.Wm)(d,{index:"6",onClick:r.logout},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(w)])),_:1}),M])),_:1},8,["onClick"])])),_:1})])),_:1},8,["onSelect"])}var G={methods:{handleRouter(e){this.$router.push(e)},logout(){V.T.confirm("是否退出登录？","警告",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then((()=>{window.localStorage.removeItem("token"),k.z8.success("退出登录成功！"),this.$router.push("/login")})).catch((()=>{(0,k.z8)({type:"info",message:"操作已取消"})}))}}};const J=(0,s.Z)(G,[["render",Y]]);var Q=J,X={components:{Header:Q},setup(){const e=(0,x.iH)(""),t=(0,x.iH)([]),a=(0,x.iH)(!1);(0,o.bv)((async function(){try{const e=await z.Z.get("/getstatus");200===e.data.status?a.value=!0:401===e.data.status&&k.z8.error("登录已过期，请重新登录！")}catch(e){k.z8.error("获取登录状态失败！")}}));const l=async()=>{if(""!==e.value)try{t.value.push({content:e.value,type:"you"});const a=await z.Z.post("/chat",{msg:e.value});e.value="",a&&a.data.msg?t.value.push({content:a.data.msg,type:"bot"}):k.z8.error("无法从服务器获取消息！")}catch(a){k.z8.error("发送消息时出错，请稍后重试！")}else k.z8.error("不能发送空白消息！")};return{textarea:e,messages:t,sendMessage:l,isLogin:a}}};const ee=(0,s.Z)(X,[["render",O],["__scopeId","data-v-0313560c"]]);var te=ee;const ae=e=>((0,o.dD)("data-v-67d67305"),e=e(),(0,o.Cn)(),e),le={class:"app-container"},oe={class:"login-container"},ne={class:"text item"},re={key:0},ue={key:1},se={key:2},ie=["src"],de={class:"bottom"},ce=ae((()=>(0,o._)("br",null,null,-1)));function me(e,t,a,l,n,r){const u=(0,o.up)("Header"),s=(0,o.up)("CircleCheckFilled"),i=(0,o.up)("el-icon"),d=(0,o.up)("el-button"),c=(0,o.up)("el-card");return(0,o.wg)(),(0,o.iD)("div",le,[(0,o.Wm)(u),(0,o._)("div",oe,[(0,o.Wm)(c,{class:"box-card"},{default:(0,o.w5)((()=>[(0,o._)("div",ne,[l.scanSuccessNotified?!l.loginSuccessNotified||l.scanSuccessNotified?((0,o.wg)(),(0,o.iD)("h2",ue,"请在手机上确认登录")):l.loginSuccessNotified?((0,o.wg)(),(0,o.iD)("h2",se,"微信登录成功")):(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("h2",re,"请扫描二维码登录微信")),l.scanSuccessNotified?((0,o.wg)(),(0,o.j4)(i,{key:4,class:"image",style:{height:"100px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(s)])),_:1})):((0,o.wg)(),(0,o.iD)("img",{key:3,src:l.qrcodeUrl,class:"image"},null,8,ie)),(0,o._)("div",de,[(0,o.Wm)(d,{type:"primary",round:"",class:"loginbutton",onClick:l.refresh},{default:(0,o.w5)((()=>[(0,o.Uk)("刷新二维码")])),_:1},8,["onClick"]),ce,(0,o.Wm)(d,{type:"primary",round:"",class:"loginbutton",onClick:t[0]||(t[0]=e=>r.handleRouter("/"))},{default:(0,o.w5)((()=>[(0,o.Uk)("返回首页")])),_:1})])])])),_:1})])])}var pe={setup(){const e=(0,x.iH)(""),t=(0,x.iH)(!1),a=(0,x.iH)(!1);(0,o.bv)((async()=>{V.T.confirm("若已有微信登录，继续获取二维码会使当前登录微信下线，是否继续？","警告",{confirmButtonText:"继续",cancelButtonText:"取消",type:"warning"}).then(l).catch((()=>{(0,k.z8)({type:"info",message:"操作已取消"})}))}));const l=async()=>{try{r();const t=await z.Z.get("/getqrcode");e.value=t.data.qrcode}catch(t){k.z8.error("获取二维码失败！")}r(),setInterval((()=>{r()}),500)},n=async()=>{try{const e=await z.Z.get("/stop"),t=e.data.Status;200===t?window.location.reload():k.z8.error("刷新二维码失败！")}catch(e){k.z8.error("刷新二维码失败！"+e.message)}},r=async()=>{try{const e=await z.Z.get("/getstatus"),l=e.data.status;if(3===l)return void(t.value||(k.z8.success("扫描成功，请在手机上确认登录"),t.value=!0));if(200===l)return void(a.value||(k.z8.success("微信登录成功！"),a.value=!0))}catch(e){return}};return{qrcodeUrl:e,scanSuccessNotified:t,loginSuccessNotified:a,refresh:n}},methods:{handleRouter(e){this.$router.push(e)}},components:{Header:Q}};const fe=(0,s.Z)(pe,[["render",me],["__scopeId","data-v-67d67305"]]);var we=fe;const ge={class:"app-container"};function he(e,t,a,l,n,r){const u=(0,o.up)("Header"),s=(0,o.up)("apiConfig"),i=(0,o.up)("el-tab-pane"),d=(0,o.up)("wxConfig"),c=(0,o.up)("accountConfig"),m=(0,o.up)("el-tabs");return(0,o.wg)(),(0,o.iD)("div",ge,[(0,o.Wm)(u),(0,o.Wm)(m,{modelValue:l.activeName,"onUpdate:modelValue":t[0]||(t[0]=e=>l.activeName=e),type:"card",style:{"margin-top":"15px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{label:"API接口设置",name:"first"},{default:(0,o.w5)((()=>[(0,o.Wm)(s)])),_:1}),(0,o.Wm)(i,{label:"WechatBot设置",name:"second"},{default:(0,o.w5)((()=>[(0,o.Wm)(d)])),_:1}),(0,o.Wm)(i,{label:"账号设置",name:"third"},{default:(0,o.w5)((()=>[(0,o.Wm)(c)])),_:1})])),_:1},8,["modelValue"])])}const ye={class:"centered-card"},ve={class:"text item"};function _e(e,t,a,l,n,r){const u=(0,o.up)("el-option"),s=(0,o.up)("el-select"),i=(0,o.up)("el-form-item"),d=(0,o.up)("el-input"),c=(0,o.up)("el-divider"),m=(0,o.up)("el-switch"),p=(0,o.up)("el-button"),f=(0,o.up)("el-form"),w=(0,o.up)("el-card");return(0,o.wg)(),(0,o.iD)("div",ye,[(0,o.Wm)(w,{class:"box-card"},{default:(0,o.w5)((()=>[(0,o._)("div",ve,[(0,o.Wm)(f,{"label-position":"top",model:e.apiForm,size:l.formSize,"label-width":"auto","status-icon":""},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{label:"选择模型"},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{modelValue:l.wxForm.usemodel,"onUpdate:modelValue":t[0]||(t[0]=e=>l.wxForm.usemodel=e),placeholder:"请选择使用模型",clearable:""},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{label:"讯飞星火",value:"xunfei"}),(0,o.Wm)(u,{label:"ChatGPT",value:"chatgpt"})])),_:1},8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"自动回复前缀"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{modelValue:l.wxForm.prefix,"onUpdate:modelValue":t[1]||(t[1]=e=>l.wxForm.prefix=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"自动回复后缀(\\n换行)"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{modelValue:l.wxForm.suffix,"onUpdate:modelValue":t[2]||(t[2]=e=>l.wxForm.suffix=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(c),(0,o.Wm)(i,{label:"是否开启私聊自动回复"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{modelValue:l.wxForm.autoReplySingle,"onUpdate:modelValue":t[3]||(t[3]=e=>l.wxForm.autoReplySingle=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"私聊黑名单(用英文逗号分隔)"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{modelValue:l.wxForm.blackName,"onUpdate:modelValue":t[4]||(t[4]=e=>l.wxForm.blackName=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(c),(0,o.Wm)(i,{label:"群聊关键字回复(用英文逗号分隔)"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{modelValue:l.wxForm.keyWords,"onUpdate:modelValue":t[5]||(t[5]=e=>l.wxForm.keyWords=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"群聊白名单(用英文逗号分隔,不填会在所有群聊回复)"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{modelValue:l.wxForm.whiteRoom,"onUpdate:modelValue":t[6]||(t[6]=e=>l.wxForm.whiteRoom=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"是否在被@时回复"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{modelValue:l.wxForm.atReply,"onUpdate:modelValue":t[7]||(t[7]=e=>l.wxForm.atReply=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(c),(0,o.Wm)(p,{type:"primary",onClick:l.savewx},{default:(0,o.w5)((()=>[(0,o.Uk)(" 保存 ")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model","size"])])])),_:1})])}var We={setup(){const e=(0,x.iH)("default"),t=(0,x.iH)("first"),a=(0,x.iH)({usemodel:"",autoReplySingle:"",prefix:"",suffix:"",atReply:"",keyWords:"",whiteRoom:"",blackName:""}),l=async()=>{try{const e={...a.value};for(const a in e)"boolean"===typeof e[a]&&(e[a]=e[a].toString());const t=await z.Z.post("/wxconfig",e),l=t.data.status,o=t.data.msg;200===l?k.z8.success(o):k.z8.error("修改失败！"+o)}catch(e){k.z8.error("修改失败！",e.message)}};return(0,o.bv)((async()=>{try{const e=await z.Z.post("/getwxconfig"),t=e.data.msg;t.forEach((e=>{"true"===e.value||"false"===e.value?a.value[e.config]=JSON.parse(e.value):a.value[e.config]=e.value}))}catch(e){k.z8.error("查询失败！",e.message)}})),{formSize:e,wxForm:a,activeName:t,savewx:l}}};const be=(0,s.Z)(We,[["render",_e],["__scopeId","data-v-4db7529b"]]);var xe=be;const ke={class:"centered-card"},Ve={class:"text item"},ze={class:"centered-card"},Ce={class:"text item"};function Fe(e,t,a,l,n,r){const u=(0,o.up)("el-input"),s=(0,o.up)("el-form-item"),i=(0,o.up)("el-button"),d=(0,o.up)("el-form"),c=(0,o.up)("el-card"),m=(0,o.up)("el-tab-pane"),p=(0,o.up)("el-tabs");return(0,o.wg)(),(0,o.j4)(p,{modelValue:l.activeName,"onUpdate:modelValue":t[11]||(t[11]=e=>l.activeName=e),class:"demo-tabs",style:{"margin-left":"20px","margin-right":"20px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{label:"讯飞星火",name:"xunfei"},{default:(0,o.w5)((()=>[(0,o._)("div",ke,[(0,o.Wm)(c,{class:"box-card"},{default:(0,o.w5)((()=>[(0,o._)("div",Ve,[(0,o.Wm)(d,{"label-position":"top",model:l.gptForm,size:l.formSize,"label-width":"auto","status-icon":""},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{label:"API接口地址"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.xfForm.APIUrl,"onUpdate:modelValue":t[0]||(t[0]=e=>l.xfForm.APIUrl=e),placeholder:"如ws://spark-api.xf-yun.com/v3.1/chat"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"APIKey"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.xfForm.APIKey,"onUpdate:modelValue":t[1]||(t[1]=e=>l.xfForm.APIKey=e),placeholder:"在控制台获取"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"APISecret"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.xfForm.APISecret,"onUpdate:modelValue":t[2]||(t[2]=e=>l.xfForm.APISecret=e),placeholder:"在控制台获取"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"app_id"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.xfForm.app_id,"onUpdate:modelValue":t[3]||(t[3]=e=>l.xfForm.app_id=e),placeholder:"在控制台获取"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"模型版本(请与接口地址保持一致)"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.xfForm.domain,"onUpdate:modelValue":t[4]||(t[4]=e=>l.xfForm.domain=e),placeholder:"如generalv2,generalv3,generalv3.5"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"最大token"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.xfForm.max_tokens,"onUpdate:modelValue":t[5]||(t[5]=e=>l.xfForm.max_tokens=e),placeholder:"模型回答的tokens的最大长度"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"温度(决定结果随机性)"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.xfForm.temperature,"onUpdate:modelValue":t[6]||(t[6]=e=>l.xfForm.temperature=e),placeholder:"取值范围 (0,1] ,默认值0.5"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(i,{type:"primary",onClick:l.savexf},{default:(0,o.w5)((()=>[(0,o.Uk)(" 保存 ")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model","size"])])])),_:1})])])),_:1}),(0,o.Wm)(m,{label:"ChatGPT",name:"chatgpt"},{default:(0,o.w5)((()=>[(0,o._)("div",ze,[(0,o.Wm)(c,{class:"box-card"},{default:(0,o.w5)((()=>[(0,o._)("div",Ce,[(0,o.Wm)(d,{"label-position":"top",model:l.gptForm,size:l.formSize,"label-width":"auto","status-icon":""},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{label:"API接口地址"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.gptForm.apiUrl,"onUpdate:modelValue":t[7]||(t[7]=e=>l.gptForm.apiUrl=e),placeholder:"如https://api.openai.com/v1/chat/completions"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"APIKey"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.gptForm.apiKey,"onUpdate:modelValue":t[8]||(t[8]=e=>l.gptForm.apiKey=e),placeholder:"在控制台获取"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"app_code"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.gptForm.app_code,"onUpdate:modelValue":t[9]||(t[9]=e=>l.gptForm.app_code=e),placeholder:"为部分中转平台设置,可不填"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"模型名称"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.gptForm.model,"onUpdate:modelValue":t[10]||(t[10]=e=>l.gptForm.model=e),placeholder:"如gpt-3.5-turbo"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(i,{type:"primary",onClick:l.savegpt},{default:(0,o.w5)((()=>[(0,o.Uk)(" 保存 ")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model","size"])])])),_:1})])])),_:1})])),_:1},8,["modelValue"])}var Ue={setup(){const e=(0,x.iH)("default"),t=(0,x.iH)("xunfei"),a=(0,x.iH)({APIUrl:"",APIKey:"",app_id:"",model:"",APISecret:"",max_tokens:"",temperature:""}),l=(0,x.iH)({apiUrl:"",apiKey:"",app_code:"",model:""}),n=async()=>{try{const e=await z.Z.post("/xfconfig",a.value),t=e.data.status,l=e.data.msg;200===t?k.z8.success(l):k.z8.error("修改失败！"+l)}catch(e){k.z8.error("修改失败！",e.message)}},r=async()=>{try{const e=await z.Z.post("/gptconfig",l.value),t=e.data.status,a=e.data.msg;200===t?k.z8.success(a):k.z8.error("修改失败！"+a)}catch(e){k.z8.error("修改失败！",e.message)}};return(0,o.bv)((async()=>{try{const e=await z.Z.post("/getxfconfig"),t=await z.Z.post("/getgptconfig"),o=e.data.msg,n=t.data.msg;o.forEach((e=>{a.value[e.config]=e.value})),n.forEach((e=>{l.value[e.config]=e.value}))}catch(e){k.z8.error("查询失败！",e.message)}})),{formSize:e,gptForm:l,activeName:t,savegpt:r,xfForm:a,savexf:n}}};const Se=(0,s.Z)(Ue,[["render",Fe],["__scopeId","data-v-3f4ab64a"]]);var He=Se;const Ze={class:"centered-card"},Re={class:"text item"};function Ie(e,t,a,l,n,r){const u=(0,o.up)("el-input"),s=(0,o.up)("el-form-item"),i=(0,o.up)("el-button"),d=(0,o.up)("el-form"),c=(0,o.up)("el-card");return(0,o.wg)(),(0,o.iD)("div",Ze,[(0,o.Wm)(c,{class:"box-card"},{default:(0,o.w5)((()=>[(0,o._)("div",Re,[(0,o.Wm)(d,{"label-position":"top",model:l.userForm,size:l.formSize,"label-width":"auto","status-icon":""},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{label:"更改用户名"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{modelValue:l.userForm.newusername,"onUpdate:modelValue":t[0]||(t[0]=e=>l.userForm.newusername=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"旧密码"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{type:"password",modelValue:l.userForm.oldpassword,"onUpdate:modelValue":t[1]||(t[1]=e=>l.userForm.oldpassword=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"新密码"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{type:"password",modelValue:l.userForm.newpassword1,"onUpdate:modelValue":t[2]||(t[2]=e=>l.userForm.newpassword1=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,{label:"再次输入新密码"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,{type:"password",modelValue:l.userForm.newpassword2,"onUpdate:modelValue":t[3]||(t[3]=e=>l.userForm.newpassword2=e)},null,8,["modelValue"])])),_:1}),(0,o.Wm)(s,null,{default:(0,o.w5)((()=>[(0,o.Wm)(i,{type:"primary",onClick:l.saveuser},{default:(0,o.w5)((()=>[(0,o.Uk)(" 保存 ")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model","size"])])])),_:1})])}var Pe={setup(){const e=(0,x.iH)("default"),t=(0,x.iH)("first"),a=(0,x.iH)({newusername:"",oldpassword:"",newpassword1:"",newpassword2:"",newpassword:""}),l=async()=>{if(a.value.newpassword1===a.value.newpassword2){a.value.newpassword=a.value.newpassword1;try{const e=await z.Z.post("/changeaccount",a.value),t=e.data.status,l=e.data.msg;200===t?k.z8.success(l):k.z8.error("修改失败！"+l)}catch(e){k.z8.error("修改失败！",e.message)}}else k.z8.error("两次输入的密码不匹配！")};return(0,o.bv)((async()=>{try{const e=await z.Z.post("/getusername");a.value.newusername=e.data.msg}catch(e){k.z8.error("查询失败！",e.message)}})),{formSize:e,userForm:a,activeName:t,saveuser:l}}};const Te=(0,s.Z)(Pe,[["render",Ie],["__scopeId","data-v-1da6d1cd"]]);var De=Te,Ne={setup(){const e=(0,x.iH)("first");return{activeName:e}},components:{Header:Q,wxConfig:xe,apiConfig:He,accountConfig:De}};const je=(0,s.Z)(Ne,[["render",he]]);var Ae=je;function Oe(e,t,a,l,n,r){const u=(0,o.up)("Header"),s=(0,o.up)("el-button"),i=(0,o.up)("el-table-column"),d=(0,o.up)("el-table");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(u),(0,o.Wm)(s,{type:"primary",onClick:l.open},{default:(0,o.w5)((()=>[(0,o.Uk)("清空数据")])),_:1},8,["onClick"]),(0,o.Wm)(d,{data:l.tableData,style:{width:"100%"},"table-layout":"auto",stripe:"",border:""},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{prop:"time",label:"时间"}),(0,o.Wm)(i,{prop:"type",label:"类型"}),(0,o.Wm)(i,{prop:"roomname",label:"群聊名称"}),(0,o.Wm)(i,{prop:"name",label:"发送人"}),(0,o.Wm)(i,{prop:"recmsg",label:"收到消息"}),(0,o.Wm)(i,{prop:"senmsg",label:"发送消息"})])),_:1},8,["data"])])}var Be={components:{Header:Q},setup(){const e=(0,x.iH)([]),t=()=>{V.T.confirm("此操作会清除所有记录，是否继续？","警告",{confirmButtonText:"继续",cancelButtonText:"取消",type:"warning"}).then(a).catch((()=>{(0,k.z8)({type:"info",message:"操作已取消"})}))},a=async()=>{try{const e=await z.Z.post("/clearmessage"),t=e.data.status,a=e.data.msg;200===t?(k.z8.success(a),window.location.reload()):k.z8.error("清除失败！"+a)}catch(e){k.z8.error("清除失败！",e.message)}};return(0,o.bv)((async()=>{try{const t=await z.Z.post("/messagehistory");e.value=t.data.msg}catch(t){k.z8.error("获取数据失败！")}})),{tableData:e,clear:a,open:t}}};const qe=(0,s.Z)(Be,[["render",Oe]]);var Ke=qe;const Le=(0,c.p7)({history:(0,c.r5)(),routes:[{path:"/",component:U,name:"Home"},{path:"/login",component:D,name:"Login"},{path:"/aichat",component:te,name:"Chat"},{path:"/wxlogin",component:we,name:"Wxlogin"},{path:"/config",component:Ae,name:"Config"},{path:"/history",component:Ke,name:"History"}]});Le.beforeEach(((e,t,a)=>{if("/login"===e.path)return a();const l=window.localStorage.getItem("token");if(!l)return a("/login");a()}));var $e=Le,Ee=a(3812),Me=(a(4415),a(2748));const Ye=(0,l.ri)(d);z.Z.interceptors.request.use((e=>(e.headers.Authorization=window.localStorage.getItem("token"),e)));for(const[Ge,Je]of Object.entries(Me))Ye.component(Ge,Je);Ye.use($e).use(Ee.Z).mount("#app")}},t={};function a(l){var o=t[l];if(void 0!==o)return o.exports;var n=t[l]={exports:{}};return e[l].call(n.exports,n,n.exports,a),n.exports}a.m=e,function(){var e=[];a.O=function(t,l,o,n){if(!l){var r=1/0;for(d=0;d<e.length;d++){l=e[d][0],o=e[d][1],n=e[d][2];for(var u=!0,s=0;s<l.length;s++)(!1&n||r>=n)&&Object.keys(a.O).every((function(e){return a.O[e](l[s])}))?l.splice(s--,1):(u=!1,n<r&&(r=n));if(u){e.splice(d--,1);var i=o();void 0!==i&&(t=i)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[l,o,n]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var l in t)a.o(t,l)&&!a.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,l){var o,n,r=l[0],u=l[1],s=l[2],i=0;if(r.some((function(t){return 0!==e[t]}))){for(o in u)a.o(u,o)&&(a.m[o]=u[o]);if(s)var d=s(a)}for(t&&t(l);i<r.length;i++)n=r[i],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(d)},l=self["webpackChunkwebbot"]=self["webpackChunkwebbot"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=a.O(void 0,[998],(function(){return a(1924)}));l=a.O(l)})();
//# sourceMappingURL=app.06c11dd4.js.map