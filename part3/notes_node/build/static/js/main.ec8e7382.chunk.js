(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{41:function(t,n,e){},42:function(t,n,e){"use strict";e.r(n);var c=e(17),o=e.n(c),r=e(8),i=e(4),a=e(2),u=e(3),s=e.n(u),l=e(0),j=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(l.jsxs)("li",{className:"note",children:[n.content,Object(l.jsx)("button",{onClick:e,children:c})]})},f="/api/notes",b=function(){return s.a.get(f).then((function(t){return t.data}))},d=function(t){return s.a.post(f,t).then((function(t){return t.data}))},m=function(t,n){return s.a.put("".concat(f,"/").concat(t),n).then((function(t){return t.data}))},O=function(t){var n=t.message;return null===n?null:Object(l.jsx)("div",{className:"error",children:n})},h=function(){return Object(l.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(l.jsx)("br",{}),Object(l.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},p=function(){var t=Object(a.useState)([]),n=Object(i.a)(t,2),e=n[0],c=n[1],o=Object(a.useState)("a new note..."),u=Object(i.a)(o,2),s=u[0],f=u[1],p=Object(a.useState)(!0),v=Object(i.a)(p,2),g=v[0],x=v[1],S=Object(a.useState)(null),k=Object(i.a)(S,2),w=k[0],y=k[1];Object(a.useEffect)((function(){b().then((function(t){c(t)}))}),[]),console.log("render",e.length,"notes");var N=g?e:e.filter((function(t){return!0===t.important}));return Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Notes"}),Object(l.jsx)(O,{message:w}),Object(l.jsx)("div",{children:Object(l.jsxs)("button",{onClick:function(){return x(!g)},children:["show ",g?"important":"all"]})}),Object(l.jsx)("ul",{children:N.map((function(t){return Object(l.jsx)(j,{note:t,toggleImportance:function(){return function(t){"http://localhost:3001/notes/".concat(t);var n=e.find((function(n){return n.id===t})),o=Object(r.a)(Object(r.a)({},n),{},{important:!n.important});m(t,o).then((function(n){c(e.map((function(e){return e.id!==t?e:n})))})).catch((function(o){y("Note '".concat(n.content,"' was already removed from server")),setTimeout((function(){y(null)}),5e3),c(e.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(l.jsxs)("form",{onSubmit:function(t){t.preventDefault(),console.log("button clicked",t.target);var n={content:s,date:(new Date).toISOString(),important:Math.random()<.5};d(n).then((function(t){c(e.concat(t)),f("")}))},children:[Object(l.jsx)("input",{value:s,onChange:function(t){console.log(t.target.value),f(t.target.value)}}),Object(l.jsx)("button",{type:"submit",children:"save"})]}),Object(l.jsx)(h,{})]})};e(41);o.a.render(Object(l.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.ec8e7382.chunk.js.map