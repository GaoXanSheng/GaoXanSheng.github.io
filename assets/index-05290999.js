var G=Object.defineProperty;var j=(e,t,n)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var g=(e,t,n)=>(j(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function l(){}function P(e){return e()}function E(){return Object.create(null)}function p(e){e.forEach(P)}function L(e){return typeof e=="function"}function C(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function q(e){return Object.keys(e).length===0}function A(e,t,n){e.insertBefore(t,n||null)}function N(e){e.parentNode&&e.parentNode.removeChild(e)}function B(e){return document.createElement(e)}function D(e){return Array.from(e.childNodes)}let $;function h(e){$=e}const d=[],O=[];let f=[];const S=[],X=Promise.resolve();let y=!1;function H(){y||(y=!0,X.then(I))}function b(e){f.push(e)}const _=new Set;let u=0;function I(){if(u!==0)return;const e=$;do{try{for(;u<d.length;){const t=d[u];u++,h(t),T(t.$$)}}catch(t){throw d.length=0,u=0,t}for(h(null),d.length=0,u=0;O.length;)O.pop()();for(let t=0;t<f.length;t+=1){const n=f[t];_.has(n)||(_.add(n),n())}f.length=0}while(d.length);for(;S.length;)S.pop()();y=!1,_.clear(),h(e)}function T(e){if(e.fragment!==null){e.update(),p(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(b)}}function U(e){const t=[],n=[];f.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),f=t}const F=new Set;function J(e,t){e&&e.i&&(F.delete(e),e.i(t))}function K(e,t,n){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),b(()=>{const i=e.$$.on_mount.map(P).filter(L);e.$$.on_destroy?e.$$.on_destroy.push(...i):p(i),e.$$.on_mount=[]}),r.forEach(b)}function R(e,t){const n=e.$$;n.fragment!==null&&(U(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function V(e,t){e.$$.dirty[0]===-1&&(d.push(e),H(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function z(e,t,n,o,r,i,a=null,M=[-1]){const m=$;h(e);const s=e.$$={fragment:null,ctx:[],props:i,update:l,not_equal:r,bound:E(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(m?m.$$.context:[])),callbacks:E(),dirty:M,skip_bound:!1,root:t.target||m.$$.root};a&&a(s.root);let v=!1;if(s.ctx=n?n(e,t.props||{},(c,w,...x)=>{const k=x.length?x[0]:w;return s.ctx&&r(s.ctx[c],s.ctx[c]=k)&&(!s.skip_bound&&s.bound[c]&&s.bound[c](k),v&&V(e,c)),w}):[],s.update(),v=!0,p(s.before_update),s.fragment=o?o(s.ctx):!1,t.target){if(t.hydrate){const c=D(t.target);s.fragment&&s.fragment.l(c),c.forEach(N)}else s.fragment&&s.fragment.c();t.intro&&J(e.$$.fragment),K(e,t.target,t.anchor),I()}h(m)}class Q{constructor(){g(this,"$$");g(this,"$$set")}$destroy(){R(this,1),this.$destroy=l}$on(t,n){if(!L(n))return l;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!q(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const W="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(W);function Y(e){let t;return{c(){t=B("main"),t.innerHTML=`<div class="mdui-ripple"><div class="mdui-img-fluid bg-img"><div class="portrait mdui-img-circle"><div class="add"><a href="https://github.com/GaoXanSheng"><button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple" style="background-color: rgb(255, 64, 129);"><i class="mdui-icon material-icons">add</i></button></a></div></div> <h1 class="doc-title mdui-text-color-theme name">GaoXuShenG</h1></div></div> <div class="mdui-container doc-container"><div class="mdui-typo"><hr/></div> <div class="mdui-typo"><h1><a href="https://www.mdui.org/design/"><strong>M</strong>aterial <strong>D</strong>esign</a></h1> <blockquote><p>Thaumaturgy... which giveth certain order to make strange works, of the sense to be perceived
                and of men greatly to be wondered at.MathematicallPraeface.</p> <footer>John Dee(1570) ——《Euclid&#39;s Elements》</footer></blockquote> <div class="bottom"></div></div></div> <div class="icp mdui-bottom-nav mdui-bottom-nav-text-auto"><a class="mdui-ripple" href="https://icp.gov.moe/?keyword=20230436">萌ICP备20230436号</a> <a class="mdui-ripple" href="https://github.com/GaoXanSheng">GitHub</a> <a class="mdui-ripple" href="https://www.mdui.org/">MDUI</a></div>`},m(n,o){A(n,t,o)},p:l,i:l,o:l,d(n){n&&N(t)}}}class Z extends Q{constructor(t){super(),z(this,t,null,Y,C,{})}}new Z({target:document.getElementById("app")});
