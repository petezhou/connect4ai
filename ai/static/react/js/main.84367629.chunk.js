(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(e,r,a){},14:function(e,r,a){},15:function(e,r,a){"use strict";a.r(r);var t=a(0),n=a.n(t),s=a(2),i=a.n(s),u=(a(13),a(3)),d=a(4),l=a(6),o=a(5),c=a(7);a(14);function h(e){return"red"===e.value?n.a.createElement("button",{className:"square redPiece",onClick:e.onClick}," "):"yellow"===e.value?n.a.createElement("button",{className:"square yellowPiece",onClick:e.onClick}," "):n.a.createElement("button",{className:"square",onClick:e.onClick}," ")}var q=function(e){function r(e){var a;return Object(u.a)(this,r),(a=Object(l.a)(this,Object(o.a)(r).call(this,e))).state={squares:Array(6).fill(Array(7).fill(null)),redIsNext:!0},a}return Object(c.a)(r,e),Object(d.a)(r,[{key:"renderSquare",value:function(e,r){var a=this;return n.a.createElement(h,{value:this.state.squares[e][r],onClick:function(){return a.handleClick(e,r)}})}},{key:"handleClick",value:function(e,r){for(var a=this.state.squares.map((function(e){return e.slice()})),t=5;t>=0;t--)if(null==a[t][r])return a[t][r]=this.state.redIsNext?"red":"yellow",void this.setState({squares:a,redIsNext:!this.state.redIsNext})}},{key:"render",value:function(){var e=(this.state.squares,"Player 1");return e?e+" wins!":"",n.a.createElement("div",{className:"board"},n.a.createElement("div",{className:"board-row"},this.renderSquare(0,0),this.renderSquare(0,1),this.renderSquare(0,2),this.renderSquare(0,3),this.renderSquare(0,4),this.renderSquare(0,5),this.renderSquare(0,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(1,0),this.renderSquare(1,1),this.renderSquare(1,2),this.renderSquare(1,3),this.renderSquare(1,4),this.renderSquare(1,5),this.renderSquare(1,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(2,0),this.renderSquare(2,1),this.renderSquare(2,2),this.renderSquare(2,3),this.renderSquare(2,4),this.renderSquare(2,5),this.renderSquare(2,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(3,0),this.renderSquare(3,1),this.renderSquare(3,2),this.renderSquare(3,3),this.renderSquare(3,4),this.renderSquare(3,5),this.renderSquare(3,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(4,0),this.renderSquare(4,1),this.renderSquare(4,2),this.renderSquare(4,3),this.renderSquare(4,4),this.renderSquare(4,5),this.renderSquare(4,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(5,0),this.renderSquare(5,1),this.renderSquare(5,2),this.renderSquare(5,3),this.renderSquare(5,4),this.renderSquare(5,5),this.renderSquare(5,6)))}}]),r}(n.a.Component);var S=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("h1",null,"Connect 4"),n.a.createElement(q,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,r,a){e.exports=a(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.84367629.chunk.js.map