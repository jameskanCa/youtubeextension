!function(e){function t(t){for(var a,i,s=t[0],c=t[1],u=t[2],d=0,p=[];d<s.length;d++)i=s[d],o[i]&&p.push(o[i][0]),o[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);for(l&&l(t);p.length;)p.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(a=!1)}a&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},o={2:0},r=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;r.push([367,0,3]),n()}({131:function(e,t,n){},367:function(e,t,n){"use strict";n.r(t);var a=n(75),o=n.n(a),r=n(142),i=n(11),s=n(12),c=n(18),u=n(17),l=n(19),d=n(143),p=n.n(d),h=n(1),f=n.n(h),m=n(4),v=n.n(m),b=n(375),y=n(376),g=n(10),M=n(378),k=n(370),O=n(371),E=n(373),C=n(36),S=n(61),j=(n(131),function(){function e(){Object(i.a)(this,e)}return Object(s.a)(e,null,[{key:"getYoutubeCategoryText",value:function(e){switch(e){case 1:return"Film & Animation";case 2:return"Autos & Vehicles";case 10:return"Music";case 15:return"Pets & Animals";case 17:return"Sports";case 18:return"Short Movies";case 19:return"Travel & Events";case 20:return"Gaming";case 21:return"Videoblogging";case 22:return"People & Blogs";case 23:return"Comedy";case 24:return"Entertainment";case 25:return"News & Politics";case 26:return"Howto & Styles";case 27:return"Education";case 28:return"Science & Technology";case 29:return"Nonprofits & Activism";case 30:return"Movies";case 31:return"Anime / Animation";case 32:return"Action / Adventure";case 33:return"Classics";case 34:return"Comedy";case 35:return"Documentary";case 36:return"Drama";case 37:return"Family";case 38:return"Foreign";case 39:return"Horror";case 40:return"Sci - Fi / Fantasy";case 41:return"Thriller";case 42:return"Shorts";case 43:return"Shows";case 44:return"Trailers";default:return"Unknown"}}},{key:"isProcastinationVideo",value:function(e){return 1===e||2===e||10===e||15===e||17===e||18===e||19===e||20===e||23===e||24===e||25===e||29===e||30===e||31===e||32===e||33===e||34===e||36===e||37===e||39===e||40===e||41===e||42===e||43===e||44===e}}]),e}()),w=n(65),T=function(){function e(){Object(i.a)(this,e)}return Object(s.a)(e,null,[{key:"obtainTotalActualVideoDuration",value:function(e,t){return t-e}},{key:"obtainDifferenceInDurationExpectation",value:function(e,t,n){return this.obtainTotalActualVideoDuration(e,t)-n}},{key:"formatReadableTime",value:function(e){var t=w(e);return null!==t.hour||0!==t?t.format("HH:mm:ss"):t.format("mm:ss")}},{key:"formatReadableDuration",value:function(e){var t=this.obtainDurationSeconds(e);return w().seconds(t).format("H mm:ss")}},{key:"obtainDurationSeconds",value:function(e){return w.duration(e,w.ISO_8601).asSeconds()}},{key:"obtainCurrentTime",value:function(){return w().format("MMM/DD/YYYY HH:mm:ss")}},{key:"formatSecondsToMinutes",value:function(e){var t=this.obtainDurationSeconds(e),n=t%60,a=Math.trunc(t/60);return"".concat(a," Minutes ").concat(n," Seconds")}}]),e}(),D=function e(t,n,a,o,r){Object(i.a)(this,e),this.userId=t,this.videoTitle=n,this.videoURL=a,this.purposeDescription=o,this.startTime=T.obtainCurrentTime(),this.finishedVideo=r},I=b.a.Panel,R=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={videoType:"",purpose:"",initialRating:""},n.onChange=function(e){n.setState({purpose:e})},n.onSave=function(){if(!(null==n.state.purpose||n.state.purpose.length<25)){var e=new D(n.props.userId,n.props.videoMetadata.videoTitle,n.props.videoMetadata.url,n.state.purpose,!1);S.a.storeInitialReview(e),n.props.onClose(),y.a.open({message:"Saved Succesfully",description:"Remember to use your time wisely!",icon:f.a.createElement(g.a,{type:"smile",style:{color:"#108ee9"}}),style:{zIndex:2147483647,marginTop:100}})}},n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"warnProcastination",value:function(){return j.isProcastinationVideo(Number(this.props.videoMetadata.videoCategory))?f.a.createElement(f.a.Fragment,null,f.a.createElement(M.a,{message:"Procastination Warning",description:"Are you sure you want to view this video? You might just be procastinating!",type:"warning",showIcon:!0}),f.a.createElement(k.a,{orientation:"left"},"Content")):null}},{key:"render",value:function(){var e=this;return f.a.createElement("div",null,this.warnProcastination(),this.props.videoMetadata.videoTitle,f.a.createElement(O.a,null,f.a.createElement(O.a.Item,{label:"Purpose of Watching"},f.a.createElement(E.a,{placeholder:"Purpose of watching this video.",value:this.state.purpose,onChange:function(t){return e.onChange(t.target.value)}}))),f.a.createElement(C.a,{onClick:this.onSave},"Log Session"),f.a.createElement(k.a,{orientation:"left"},"Video Info"),f.a.createElement(b.a,{bordered:!1},f.a.createElement(I,{header:"Description",key:"1"},"Description: ".concat(this.props.videoMetadata.videoDescription)),f.a.createElement(I,{header:"Duration",key:"2"},"Duration: ".concat(T.formatSecondsToMinutes(this.props.videoMetadata.videoDuration))),f.a.createElement(I,{header:"Category",key:"3"},"Category: ".concat(j.getYoutubeCategoryText(Number(this.props.videoMetadata.videoCategory)))),f.a.createElement(I,{header:"Link",key:"4"},"From link: ".concat(this.props.videoMetadata.url))))}}]),t}(f.a.Component),V=function e(t,n,a){Object(i.a)(this,e),this.userId=t,this.finishedVideo=n,this.endTime=T.obtainCurrentTime(),this.notes=a},P=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={videoType:"",notes:"",endRating:""},n.onChange=function(e){n.setState({notes:e})},n.onSave=function(){var e=new V(n.props.userId,!0,n.state.notes);S.a.storeEndReview(e,n.props.databaseKey),n.props.onClose()},n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return f.a.createElement("div",null,this.props.videoMetadata.videoTitle,f.a.createElement(O.a,null,f.a.createElement(O.a.Item,{label:"What did you learn?"},f.a.createElement(E.a,{placeholder:"Enter notes",value:this.state.notes,onChange:function(t){return e.onChange(t.target.value)}}))),f.a.createElement(C.a,{onClick:this.onSave},"Log Session"))}}]),t}(f.a.Component),x=n(374),L=function e(t,n,a,o,r){Object(i.a)(this,e),this.url="",this.videoTitle="",this.videoDuration=0,this.videoDescription="",this.videoCategory=0,this.url=t,this.videoTitle=n,this.videoDuration=a,this.videoDescription=o,this.videoCategory=r},A=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,s=new Array(a),l=0;l<a;l++)s[l]=arguments[l];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={userId:"",visibleModal:!1,pauseVideo:!1,url:"",videoMetadata:{},endOfVideo:!1,dataBaseRef:""},n.obtainMetadata=function(e){"updatedLink"===e.type&&n.setState({videoMetadata:e.metadata},Object(r.a)(o.a.mark(function t(){var a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:console.log(e),a=new L(n.state.videoMetadata.snippet.localized.title,n.state.videoMetadata.snippet.title,n.state.videoMetadata.contentDetails.duration,n.state.videoMetadata.snippet.description,n.state.videoMetadata.snippet.categoryId),n.setState({videoMetadata:a,visibleModal:!0});case 3:case"end":return t.stop()}},t)})))},n.obtainUserProfile=function(e){"userProfile"===e.type&&n.setState({userId:e.userId},Object(r.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==n.state.userId&&""!==n.state.userId){e.next=2;break}throw new Error("cannot handle empty userId");case 2:case"end":return e.stop()}},e)})))},n.modalCheck=function(e){"noModal"===e.type&&!0===n.state.visibleModal&&n.setState({visibleModal:!1})},n.pauseVideo=function(){document.getElementsByClassName("ytp-play-button ytp-button")[0].click()},n.setVisible=function(){n.setState({visibleModal:!0})},n.saveDbEntryRef=function(e){n.setState({dataBaseRef:e})},n.handleInitialOk=function(e){n.setState({visibleModal:!1,readyToPause:!1}),document.getElementsByClassName("ytp-play-button ytp-button")[0].click(),document.querySelector("video").addEventListener("ended",function(){n.setState({endOfVideo:!0})})},n.handleEndOk=function(e){n.setState({visibleModal:!1,endOfVideo:!1})},n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){chrome.runtime.onMessage.addListener(this.obtainMetadata),chrome.runtime.onMessage.addListener(this.obtainUserProfile),chrome.runtime.onMessage.addListener(this.modalCheck)}},{key:"componentWillUpdate",value:function(e,t){t.url!==this.state.url&&setTimeout(this.pauseVideo,2e3)}},{key:"componentWillUnmount",value:function(){chrome.runtime.onMessage.removeListener(this.obtainMetadata),chrome.runtime.onMessage.removeListener(this.obtainUserProfile),chrome.runtime.onMessage.removeListener(this.modalCheck)}},{key:"render",value:function(){var e=this;return f.a.createElement(p.a,{head:[f.a.createElement("link",{type:"text/css",rel:"stylesheet",href:chrome.runtime.getURL("/static/css/content.css")}),f.a.createElement("link",{type:"text/css",rel:"stylesheet",href:chrome.runtime.getURL("/static/css/0.chunk.css")}),f.a.createElement("link",{type:"text/css",rel:"stylesheet",href:chrome.runtime.getURL("/static/css/4.chunk.css")})]},f.a.createElement(d.FrameContextConsumer,null,function(t){t.document,t.window;return f.a.createElement("div",null,e.state.visibleModal&&f.a.createElement(x.a,{title:"Youtube Noter",visible:e.state.visibleModal,onOk:e.handleInitialOk,footer:null,maskClosable:!1,closable:!1},f.a.createElement(R,{getDatabaseRef:e.saveDbEntryRef,pauseVideo:e.pauseVideo,readyToPause:e.state.pauseVideo,userId:e.state.userId,videoMetadata:e.state.videoMetadata,onClose:e.handleInitialOk})),e.state.endOfVideo&&f.a.createElement(x.a,{title:"Youtube Noter",visible:e.state.endOfVideo,onOk:e.handleEndOk,footer:null,maskClosable:!1,closable:!1},f.a.createElement(P,{databaseKey:e.state.dataBaseRef,onClose:e.handleEndOk,userId:e.state.userId,videoMetadata:e.state.videoMetadata})))}))}}]),t}(f.a.Component),U=document.createElement("div");U.id="my-extension-root",document.body.appendChild(U),v.a.render(f.a.createElement(A,null),U)},61:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var a=n(11),o=n(12),r=n(99),i=n.n(r),s=function(){function e(){Object(a.a)(this,e)}return Object(o.a)(e,null,[{key:"storeInitialReview",value:function(e){fetch("http://localhost:3001/test",{method:"post",headers:{"Content-Type":"application/json",Accept:"*","Access-Control-Request-Headers":"*","Access-Control-Request-Method":"*"},mode:"cors",body:JSON.stringify({videoURL:e.videoURL,purposeDescription:e.purposeDescription,startTime:e.startTime,finishedVideo:!1})}).then(function(e){console.log(e)}).catch(function(e){console.log(e)});var t=this.database.ref(e.userId).push({videoURL:e.videoURL,purposeDescription:e.purposeDescription,startTime:e.startTime,finishedVideo:!1});return console.log(t),t}},{key:"storeEndReview",value:function(e,t){this.database.ref("".concat(e.userId,"/").concat(t)).update({endTime:e.endTime,notes:e.notes,finishedVideo:e.finishedVideo})}},{key:"retrieveUserData",value:function(e){return console.log("called"),this.database.ref("".concat(e)).on("value",function(e){console.log(e.val())},function(e){console.log(e)})}}]),e}();s.config={apiKey:"AIzaSyD1X94iKdJNlMrjfnVGFneyad0qgMN5NDE",authDomain:"extensionproject.firebaseapp.com",databaseURL:"https://extensionproject.firebaseio.com/",storageBucket:"youtubeextensionproject.appspot.com"},s.app=i.a.initializeApp(s.config),s.database=s.app.database()}});
//# sourceMappingURL=content.js.map