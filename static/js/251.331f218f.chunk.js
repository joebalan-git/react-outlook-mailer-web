(this["webpackJsonpreact-outlook-mailer-web"]=this["webpackJsonpreact-outlook-mailer-web"]||[]).push([[251],{373:function(e,n){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var c=t.tokenStack=[];t.code=t.code.replace(o,(function(e){if("function"==typeof r&&!r(e))return e;for(var o,i=c.length;-1!==t.code.indexOf(o=n(a,i));)++i;return c[i]=e,o})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var o=0,r=Object.keys(t.tokenStack);!function c(i){for(var u=0;u<i.length&&!(o>=r.length);u++){var l=i[u];if("string"==typeof l||l.content&&"string"==typeof l.content){var s=r[o],p=t.tokenStack[s],g="string"==typeof l?l:l.content,f=n(a,s),k=g.indexOf(f);if(-1<k){++o;var h=g.substring(0,k),m=new e.Token(a,e.tokenize(p,t.grammar),"language-"+a,p),b=g.substring(k+f.length),d=[];h&&d.push.apply(d,c([h])),d.push(m),b&&d.push.apply(d,c([b])),"string"==typeof l?i.splice.apply(i,[u,1].concat(d)):l.content=d}}else l.content&&c(l.content)}return i}(t.tokens)}}}})}(Prism)}}]);
//# sourceMappingURL=251.331f218f.chunk.js.map