(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b6879af"],{"36a7":function(t,e,i){},"8efc":function(t,e,i){},"90a2":function(t,e,i){"use strict";i("7db0");var n=i("53ca");function r(t,e){var i=e.modifiers||{},r=e.value,a="object"===Object(n["a"])(r)?r:{handler:r,options:{}},c=a.handler,o=a.options,d=new IntersectionObserver((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;if(t._observe){if(c&&(!i.quiet||t._observe.init)){var r=Boolean(e.find((function(t){return t.isIntersecting})));c(e,n,r)}t._observe.init&&i.once?s(t):t._observe.init=!0}}),o);t._observe={init:!1,observer:d},d.observe(t)}function s(t){t._observe&&(t._observe.observer.unobserve(t),delete t._observe)}var a={inserted:r,unbind:s};e["a"]=a},adda:function(t,e,i){"use strict";i("a15b"),i("a9e3");var n=i("53ca"),r=(i("8efc"),i("90a2")),s=(i("36a7"),i("24b2")),a=i("58df"),c=Object(a["a"])(s["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),o=c,d=i("7560"),u=i("d9f7"),h=i("d9bd"),l="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(a["a"])(o,d["a"]).extend({name:"v-img",directives:{intersect:r["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return this.src&&"object"===Object(n["a"])(this.src)?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage:function(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,i){if(!l||i||this.eager){if(this.normalisedSrc.lazySrc){var n=new Image;n.src=this.normalisedSrc.lazySrc,this.pollForSize(n,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError:function(){this.hasError=!0,this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(h["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,this.hasError=!1,e.src=this.normalisedSrc.src,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=function n(){var r=t.naturalHeight,s=t.naturalWidth;r||s?(e.naturalWidth=s,e.calculatedAspectRatio=s/r):null!=i&&!e.hasError&&setTimeout(n,i)};n()},genContent:function(){var t=o.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=o.options.render.call(this,t),i=Object(u["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:l?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},ae8d:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticClass:"card",attrs:{max:""}},[i("v-img",{staticClass:"blue-grey darken-2",attrs:{src:t.pizza.photoUrl}}),i("v-card-title",[t._v(t._s(t.pizza.name))]),i("v-card-text",[t._v(" "+t._s(t.pizza.description)+" ")]),i("v-card-title",{staticClass:"py-0"},[t._v(" "+t._s(t._f("toCurrency")(t.pizza.price[t.currency],t.currency))+" "),t.count>1?[t._v(" * "+t._s(t.count)+" = "+t._s(t._f("toCurrency")(t.pizza.price[t.currency]*t.count,t.currency))+" ")]:t._e()],2),i("v-card-actions",[i("Counter",{staticClass:"rounded elevation-2",attrs:{count:t.count},on:{add:function(e){return t.change(1)},subtract:function(e){return t.change(-1)}}}),i("v-spacer"),i("v-btn",{on:{click:t.add}},[t._v("Add to Cart")])],1)],1)},r=[],s=(i("d3b7"),i("96cf"),i("1da1")),a=i("5530"),c=i("2f62"),o={name:"",description:"",photoUrl:"",price:{usd:0,eur:0}},d={props:{pizza:{type:Object,default:function(){return o}}},data:function(){return{count:1}},computed:Object(a["a"])({},Object(c["c"])(["currency"])),methods:Object(a["a"])(Object(a["a"])({},Object(c["b"])(["addToCart"])),{},{change:function(t){this.count=this.count+t||1},add:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.addToCart(Object(a["a"])(Object(a["a"])({},t.pizza),{},{count:t.count})),t.count=1;case 2:case"end":return e.stop()}}),e)})))()}}),components:{Counter:function(){return i.e("chunk-3290fc50").then(i.bind(null,"7355"))}}},u=d,h=(i("f96c"),i("2877")),l=i("6544"),p=i.n(l),v=i("8336"),m=i("b0af"),g=i("99d9"),f=i("adda"),b=i("2fa4"),_=Object(h["a"])(u,n,r,!1,null,"1e8b46d6",null);e["default"]=_.exports;p()(_,{VBtn:v["a"],VCard:m["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VImg:f["a"],VSpacer:b["a"]})},d3a3:function(t,e,i){},f96c:function(t,e,i){"use strict";var n=i("d3a3"),r=i.n(n);r.a}}]);
//# sourceMappingURL=chunk-0b6879af.715ae7de.js.map