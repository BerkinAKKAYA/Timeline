(function(t){function e(e){for(var o,c,r=e[0],d=e[1],s=e[2],l=0,p=[];l<r.length;l++)c=r[l],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&p.push(a[c][0]),a[c]=0;for(o in d)Object.prototype.hasOwnProperty.call(d,o)&&(t[o]=d[o]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,r=1;r<n.length;r++){var d=n[r];0!==a[d]&&(o=!1)}o&&(i.splice(e--,1),t=c(c.s=n[0]))}return t}var o={},a={app:0},i=[];function c(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=o,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)c.d(n,o,function(e){return t[e]}.bind(null,o));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],d=r.push.bind(r);r.push=e,r=r.slice();for(var s=0;s<r.length;s++)e(r[s]);var u=d;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"168f":function(t,e,n){"use strict";n("fa75")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),a={id:"app"},i={key:0},c={class:"year"},r={key:0,class:"remaining"},d={key:1},s={key:1,style:{"margin-top":"100px"}};function u(t,e,n,u,l,p){var f=Object(o["j"])("Header"),b=Object(o["j"])("AddTimestamp");return Object(o["f"])(),Object(o["c"])("div",a,[Object(o["e"])(f,{doc:l.doc},null,8,["doc"]),l.doc?(Object(o["f"])(),Object(o["c"])("div",i,[(Object(o["f"])(!0),Object(o["c"])(o["a"],null,Object(o["i"])(p.sortedTimestamps,(function(t,n){return Object(o["f"])(),Object(o["c"])("div",{id:"timestamps",key:n},[Object(o["e"])("h2",c,Object(o["k"])(n),1),(Object(o["f"])(!0),Object(o["c"])(o["a"],null,Object(o["i"])(t,(function(t,a){return Object(o["f"])(),Object(o["c"])("p",{class:"timestamp",key:a},[Object(o["n"])(Object(o["e"])("input",{class:"title","onUpdate:modelValue":function(t){return l.timestamps[n][a].title=t},onChange:e[1]||(e[1]=function(){return p.save&&p.save.apply(p,arguments)})},null,40,["onUpdate:modelValue"]),[[o["m"],l.timestamps[n][a].title]]),"Uncertain"!=t.day?(Object(o["f"])(),Object(o["c"])("span",r,Object(o["k"])(p.remainingDays(t.day,t.month,n))+" days left ",1)):(Object(o["f"])(),Object(o["c"])("span",d)),Object(o["e"])("span",{class:"delete",onClick:function(e){return p.removeTimestamp(n,t)}},"x",8,["onClick"])])})),128))])})),128)),Object(o["e"])(b,{doc:l.doc,addToYear:p.addToYear},null,8,["doc","addToYear"])])):(Object(o["f"])(),Object(o["c"])("div",s,"Most Minimalistic Calendar Ever"))])}n("4de4"),n("99af"),n("b64b");var l=n("2591"),p=(n("ea7b"),n("e71f"),{apiKey:"AIzaSyC897DjvwWrXblABe7BwB9hZzPEWP62zxE",authDomain:"timeline-vue.firebaseapp.com",projectId:"timeline-vue",storageBucket:"timeline-vue.appspot.com",messagingSenderId:"537844020921",appId:"1:537844020921:web:ad7f7002fcccf68d9e8d68",measurementId:"G-PJ2CNHDJTS"});l["a"].initializeApp(p);var f=l["a"].firestore(),b=l["a"].auth(),m=f.collection("users"),O=Object(o["o"])("data-v-5c73d580");Object(o["h"])("data-v-5c73d580");var j=Object(o["e"])("h1",null,"Timeline",-1);Object(o["g"])();var h=O((function(t,e,n,a,i,c){return Object(o["f"])(),Object(o["c"])("header",null,[j,n.doc?(Object(o["f"])(),Object(o["c"])("button",{key:0,onClick:e[1]||(e[1]=function(t){return c.logout()})},"Logout")):(Object(o["f"])(),Object(o["c"])("button",{key:1,onClick:e[2]||(e[2]=function(t){return c.login()})},"Login"))])})),v={props:["doc"],methods:{login:function(){b.signInAnonymously()},logout:function(){b.signOut()}}};n("f64d");v.render=h,v.__scopeId="data-v-5c73d580";var y=v,g=Object(o["o"])("data-v-ab8f21d2");Object(o["h"])("data-v-ab8f21d2");var k={key:0,id:"container"},T=Object(o["d"])("<option data-v-ab8f21d2>Uncertain</option><option data-v-ab8f21d2>January</option><option data-v-ab8f21d2>February</option><option data-v-ab8f21d2>March</option><option data-v-ab8f21d2>April</option><option data-v-ab8f21d2>May</option><option data-v-ab8f21d2>June</option><option data-v-ab8f21d2>July</option><option data-v-ab8f21d2>August</option><option data-v-ab8f21d2>September</option><option data-v-ab8f21d2>October</option><option data-v-ab8f21d2>November</option><option data-v-ab8f21d2>December</option>",13),w=Object(o["e"])("option",null,"Uncertain",-1),A={key:1};Object(o["g"])();var S=g((function(t,e,n,a,i,c){return i.shown?(Object(o["f"])(),Object(o["c"])("div",k,[Object(o["n"])(Object(o["e"])("input",{type:"text",placeholder:"Title","onUpdate:modelValue":e[1]||(e[1]=function(t){return i.timestampToAdd.title=t})},null,512),[[o["m"],i.timestampToAdd.title]]),Object(o["n"])(Object(o["e"])("select",{"onUpdate:modelValue":e[2]||(e[2]=function(t){return i.timestampToAdd.month=t})},[T],512),[[o["l"],i.timestampToAdd.month]]),Object(o["n"])(Object(o["e"])("select",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return i.timestampToAdd.day=t}),disabled:!i.timestampToAdd.month},[w,(Object(o["f"])(),Object(o["c"])(o["a"],null,Object(o["i"])(30,(function(t){return Object(o["e"])("option",{key:t},Object(o["k"])(t),1)})),64))],8,["disabled"]),[[o["l"],i.timestampToAdd.day]]),Object(o["n"])(Object(o["e"])("select",{"onUpdate:modelValue":e[4]||(e[4]=function(t){return i.timestampToAdd.year=t})},[(Object(o["f"])(),Object(o["c"])(o["a"],null,Object(o["i"])(30,(function(t){return Object(o["e"])("option",{key:t},Object(o["k"])(i.currentYear+t-1),1)})),64))],512),[[o["l"],i.timestampToAdd.year]]),Object(o["e"])("button",{onClick:e[5]||(e[5]=function(t){return c.addTimestamp()}),disabled:!i.timestampToAdd.title},"Add",8,["disabled"])])):(Object(o["f"])(),Object(o["c"])("div",A,[Object(o["e"])("button",{id:"show",onClick:e[6]||(e[6]=function(t){return i.shown=!0})},"Add New")]))})),C={props:["doc","addToYear"],data:function(){return{currentYear:0,timestampToAdd:{month:"Uncertain",day:"Uncertain"},shown:!1}},methods:{addTimestamp:function(){var t=this.timestampToAdd,e=t.year,n=t.month,o=t.day,a=t.title;this.addToYear(e,{month:n,day:o,title:a}),this.shown=!1}},created:function(){var t=new Date;this.currentYear=t.getFullYear(),this.timestampToAdd.year=this.currentYear}};n("168f");C.render=S,C.__scopeId="data-v-ab8f21d2";var U=C,Y={name:"App",components:{Header:y,AddTimestamp:U},data:function(){return{doc:null,timestamps:{}}},methods:{addToYear:function(t,e){this.timestamps[t]=this.timestamps[t]||[],this.timestamps[t].push(e),this.save()},removeTimestamp:function(t,e){var n=e.title,o=e.month,a=e.day;this.timestamps[t]=this.timestamps[t].filter((function(t){return!(t.title==n&&t.month==o&&t.day==a)})),0==this.timestamps[t].length&&delete this.timestamps[t],this.save()},save:function(){this.doc.set(this.timestamps)},remainingSeconds:function(t,e,n){var o="Uncertain"==t?1:t,a="Uncertain"==e?"January":e,i="".concat(a," ").concat(o,", ").concat(n),c=new Date(i)-Date.now();return c},remainingDays:function(t,e,n){var o=this.remainingSeconds(t,e,n)/864e5;return Math.ceil(o)}},computed:{sortedTimestamps:function(){for(var t=this,e=JSON.parse(JSON.stringify(this.timestamps)),n=function(){var n=a[o],i=function(e){return t.remainingSeconds(e.day,e.month,n)};e[n].sort((function(t,e){return i(t)-i(e)}))},o=0,a=Object.keys(e);o<a.length;o++)n();return e}},created:function(){var t=this;b.onAuthStateChanged((function(e){t.doc=e&&m.doc(e.uid),t.doc&&t.doc.get().then((function(e){t.timestamps=e.data()||{}}))}))}};n("b42e");Y.render=u;var x,J=Y,P=n("9483");Object(P["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),b.onAuthStateChanged((function(){x||(x=Object(o["b"])(J).mount("#app"))}))},"8e34":function(t,e,n){},b42e:function(t,e,n){"use strict";n("8e34")},befc:function(t,e,n){},f64d:function(t,e,n){"use strict";n("befc")},fa75:function(t,e,n){}});
//# sourceMappingURL=app.c5195d4f.js.map