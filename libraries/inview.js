"use strict";!function(){function e(e){for(var t=0,n=e.length;t<n;t++){var i=e[t].toLowerCase();this[i]=new Number(t),this[i].string=i}}var a={index:0,check:function(e){e[$.expando]||(e[$.expando]=++a.index)},make:function(e,t){return a.check(e),t.guid+"-"+e[$.expando]}},l={TYPE:new e(["onscreen","inview"]),INVIEW_STATES:new e(["none","top","bottom","left","right","both"]),registered:[],shouldReProcess:!0,register:function(e,t,n){var i=o.isLocked(),r=$(e);l.registered.push({id:a.make(e,t),data:t,$element:r,type:n,_onscreen:i?null:R.get(r).uniqueMeasurementId,_hasTriggered:!1}),l.shouldReProcess=!0},unregister:function(e,t,n){for(var i=l.registered,r=a.make(e,t),o=i.length-1;-1<o;o--){var s=i[o];s.id==r&&s.type==n&&(i.splice(o,1),l.shouldReProcess=!0)}},process:function(){var e,t=l.registered;for(l.shouldReProcess=!0;l.shouldReProcess;){if(l.shouldReProcess=!1,0==(e=t.length))return;for(var n=0;n<e;n++){var i=t[n],r=R.get(i.$element);if(void 0!==i._onscreen&&i._hasTriggered)if(!(i._onscreen!=r.uniqueMeasurementId))continue;switch(i._onscreen=r.uniqueMeasurementId,i._hasTriggered=!0,i.type){case l.TYPE.onscreen:l.processOnScreen(i,r);break;case l.TYPE.inview:l.processInView(i,r)}if(l.shouldReProcess)break}}},processOnScreen:function(e,t){e.$element.trigger("onscreen",t)},processInView:function(e,t){var n,i,r=0<=t.percentFromTop&&t.percentFromTop<=100,o=0<=t.percentFromBottom&&t.percentFromBottom<=100,s=0<=t.percentFromLeft&&t.percentFromLeft<=100,a=0<=t.percentFromRight&&t.percentFromRight<=100;n=r&&o?l.INVIEW_STATES.both.string:r?l.INVIEW_STATES.top.string:o?l.INVIEW_STATES.bottom.string:l.INVIEW_STATES.none.string,i=s&&a?l.INVIEW_STATES.both.string:s?l.INVIEW_STATES.left.string:a?l.INVIEW_STATES.right.string:l.INVIEW_STATES.none.string;var u=[t.onscreen,i,n];if(void 0!==e._inviewPreviousState&&h.options.allowScrollOver){var c=e._measurePreviousState.percentFromBottom<=100&&100<=t.percentFromBottom;if(e._inviewPreviousState[0]==u[0]&&e._inviewPreviousState[1]==u[1]&&e._inviewPreviousState[2]==u[2]&&!c)return;c&&(u[0]=!0,u[1]="both",u[2]="both")}e._inviewPreviousState=u,e._measurePreviousState=t,e.$element.trigger("inview",u)}},i={lastStartEvent:0,timeoutHandle:null,intervalDuration:100,hasRaf:!1,start:function(){i.lastStartEvent=(new Date).getTime(),i.repeat()},repeat:function(){i.stop(),i.hasRaf?i.timeoutHandle=requestAnimationFrame(i.main):i.timeoutHandle=setTimeout(i.main,i.intervalDuration)},hasExpired:function(){if(!((new Date).getTime()-i.lastStartEvent<1500))return i.stop(),!0},isThrottled:function(){return!((new Date).getTime()-i.lastMain>i.intervalDuration)},lastMain:(new Date).getTime(),main:function(){i.isThrottled()?i.repeat():(i.lastMain=(new Date).getTime(),i.hasExpired()||(0==l.registered.length?(i.stop(),i.intervalDuration=200):(i.stop(),i.intervalDuration=100),i.repeat(),o.isLocked()||l.process()))},stop:function(){null!==i.timeoutHandle&&(i.hasRaf?cancelAnimationFrame(i.timeoutHandle):clearTimeout(i.timeoutHandle),i.timeoutHandle=null)}};$.extend($.event.special,{onscreen:{noBubble:!0,add:function(e){l.register(this,e,l.TYPE.onscreen)},remove:function(e){l.unregister(this,e,l.TYPE.onscreen)}},inview:{noBubble:!0,add:function(e){l.register(this,e,l.TYPE.inview)},remove:function(e){l.unregister(this,e,l.TYPE.inview)}}}),$.extend($.fn,{onscreen:function(e){return e?(this.on("onscreen",e),this):R.get(this)},inview:function(e){return e?(this.on("inview",e),this):R.get(this)}});var o={locks:[],lock:function(e){o.isLocked(e)||o.locks.push(e)},unlock:function(e){if(o.isLocked(e)){for(var t=0,n=o.locks.length;t<n;t++){if(o.locks[t]==e){o.locks.splice(t,1);break}}i.start()}},isLocked:function(e){if(!e)return 0<o.locks.length;for(var t=0,n=o.locks.length;t<n;t++){if(o.locks[t]==e)return!0}return!1}},h={options:{allowScrollOver:!0},config:function(e){"object"==typeof e&&$.extend(h.options,e)}};$.inview=$.onscreen=function(){i.start()},$.extend($.inview,o,h);var P={$el:$(window),height:null,width:null,heightRatio:null,widthRatio:null,resize:function(){P.height=window.innerHeight||P.$el.height(),P.width=window.innerWidth||P.$el.width(),P.heightRatio=100/P.height,P.widthRatio=100/P.width,i.start()}},R={featureDetect:function(){i.hasRaf=window.requestAnimationFrame&&window.cancelAnimationFrame},get:function(e){if(0!=e.length){var t,n=e[0];try{t=n.getBoundingClientRect()}catch(e){t={top:0,right:0,bottom:0,left:0,width:0,height:0}}var i=t.height,r=t.width,o=t.top,s=t.left,a=P.height-(o+i),u=P.width-(s+r),c=Math.round(P.heightRatio*o),l=Math.round(P.widthRatio*s),h=Math.round(P.heightRatio*a),d=Math.round(P.widthRatio*u),f=null;f=0<s+r&&u<0&&s<0?r:s<0?r+s:s+r>P.width?P.width-s:r;var g=null;(g=0<o+i&&a<0&&o<0?i:o<0?i+o:o+i>P.height?P.height-o:i)<0&&(g=0),f<0&&(f=0);var m=Math.round(100/i*g),v=Math.round(100/r*f),p=i*r,w=g*f,T=Math.round(100/p*w),E=!0;(100<d||100<l||100<h||100<c)&&(E=!1),i<=0&&r<=0&&(E=!1);var S=R.isElementHidden(n);if(S&&(E=!1),E)for(var I=R.getParents(n),k=0,$=I.length-1;k<$;k++){var b=I[k];if(S=R.isElementHidden(b)){E=!1;break}if(R.isOutOfBounds(n,b)){E=!1;break}}return{top:o,left:s,bottom:a,right:u,percentFromTop:c,percentFromLeft:l,percentFromBottom:h,percentFromRight:d,percentInview:T,percentInviewHorizontal:v,percentInviewVertical:m,onscreen:E,uniqueMeasurementId:""+o+s+a+u+i+r+P.height+P.width+E,timestamp:(new Date).getTime()}}},getParents:function(e){for(var t,n=[];t=e.parentElement;)n.push(t),e=t;return n},isElementHidden:function(e){var t="none"==e.style.display||"hidden"==e.style.visibility;if(t)return!0;var n=window.getComputedStyle(e,null);return t="none"==n.display||"hidden"==n.visibility},isOutOfBounds:function(e,t){var n=t.clientWidth<t.scrollWidth,i=t.clientHeight<t.scrollHeight,r=n||i,o=$(t);if(!r||"visible"===o.css("overflow"))return!1;var s=$(e).offset(),a=o.offset(),u=s.top-a.top,c=s.left-a.left,l=u+e.clientHeight,h=c+e.clientWidth;return u>=t.clientHeight||c>=t.clientWidth||l<=0||h<=0}};$(window).on({"touchmove scroll mousedown keydown":i.start,resize:P.resize}),$(R.featureDetect),P.resize()}();