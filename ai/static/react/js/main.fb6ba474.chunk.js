(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{10:function(e,r,t){e.exports=t(17)},15:function(e,r,t){},16:function(e,r,t){},17:function(e,r,t){"use strict";t.r(r);var a=t(0),n=t.n(a),i=t(8),s=t.n(i),o=(t(15),t(1)),l=t(2),u=t(3),h=t(5),d=t(4),c=t(6),v=(t(16),t(9)),p=t.n(v);function f(e){return"red"===e.value?n.a.createElement("button",{className:"square redPiece",onClick:e.onClick,onMouseOver:e.onMouseOver}," "):"yellow"===e.value?n.a.createElement("button",{className:"square yellowPiece",onClick:e.onClick,onMouseOver:e.onMouseOver}," "):"blue"===e.value?n.a.createElement("button",{className:"square bluePiece",onClick:e.onClick,onMouseOver:e.onMouseOver}," "):n.a.createElement("button",{className:"square",onClick:e.onClick,onMouseOver:e.onMouseOver}," ")}var m=function(e){function r(e){var t;return Object(l.a)(this,r),(t=Object(h.a)(this,Object(d.a)(r).call(this,e))).state={squares:Array(6).fill(Array(7).fill(null)),redIsNext:!0,hovers:Array(7).fill("blue"),doneDrop:!0,isAiThinking:!1},e.isAi1&&t.runAi(t.state.squares),t}return Object(c.a)(r,e),Object(u.a)(r,[{key:"renderSquare",value:function(e,r){var t=this;return n.a.createElement(f,{value:this.state.squares[e][r],onClick:function(){return t.handleClick(r)},onMouseOver:function(){return t.handleHover(r)}})}},{key:"handleClick",value:function(e){var r=this.state.squares.map((function(e){return e.slice()}));if(!S(r)&&null==r[0][e]&&this.state.doneDrop){var t=Array(7).fill("blue");this.setState({hovers:t,doneDrop:!1}),this.handleTrickle(r,0,e)}}},{key:"handleTrickle",value:function(e,r,t){if(r<6&&null==e[r][t])0!==r&&(e[r-1][t]=null),e[r][t]=this.state.redIsNext?"red":"yellow",this.setState({squares:e,doneDrop:!1}),setTimeout(this.handleTrickle.bind(this),50,e,r+1,t);else{this.setState({isAiThinking:!1});var a=Array(7).fill("blue");this.props.isPvp&&(a[t]=this.state.redIsNext?"yellow":"red"),this.setState({doneDrop:!0,hovers:a,redIsNext:!this.state.redIsNext}),this.props.isPvp||(this.props.isAi1&&this.state.redIsNext||!this.props.isAi1&&!this.state.redIsNext)&&this.runAi(e)}}},{key:"renderHover",value:function(e){var r=this;return n.a.createElement(f,{value:this.state.hovers[e],onClick:function(){return r.handleClick(e)},onMouseOver:function(){return r.handleHover(e)}})}},{key:"handleHover",value:function(e){var r=Array(7).fill("blue");S(this.state.squares)||this.state.isAiThinking?this.setState({hovers:r}):(r[e]=this.state.redIsNext?"red":"yellow",this.setState({hovers:r}))}},{key:"resetGame",value:function(){if(this.setState({squares:Array(6).fill(Array(7).fill(null)),redIsNext:!0,hovers:Array(7).fill("blue"),doneDrop:!0,isAiThinking:!1}),this.props.isAi1){var e=this.state.squares.map((function(e){return e.slice()}));this.runAi(e)}}},{key:"runAi",value:function(e){this.setState({isAiThinking:!0});var r={turn:this.state.redIsNext?"red":"yellow",board:e};p.a.post("/ai",JSON.stringify(r),function(e){this.handleClick(Number(e))}.bind(this))}},{key:"componentDidUpdate",value:function(e,r,t){if((this.props.isPvp!==e.isPvp||this.props.isAi1!==e.isAi1)&&(this.setState({squares:Array(6).fill(Array(7).fill(null)),redIsNext:!0,hovers:Array(7).fill("blue"),doneDrop:!0,isAiThinking:!1}),this.props.isAi1)){var a=this.state.squares.map((function(e){return e.slice()}));this.runAi(a)}}},{key:"render",value:function(){var e,r=this;if(!0===this.state.doneDrop){var t=S(this.state.squares);e="red"===t?"Player 1 wins!":"yellow"===t?"Player 2 wins!":"draw"===t?"It's a draw.":""}return n.a.createElement("div",{className:"board"},n.a.createElement("div",{className:"board-row"},this.renderHover(0),this.renderHover(1),this.renderHover(2),this.renderHover(3),this.renderHover(4),this.renderHover(5),this.renderHover(6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(0,0),this.renderSquare(0,1),this.renderSquare(0,2),this.renderSquare(0,3),this.renderSquare(0,4),this.renderSquare(0,5),this.renderSquare(0,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(1,0),this.renderSquare(1,1),this.renderSquare(1,2),this.renderSquare(1,3),this.renderSquare(1,4),this.renderSquare(1,5),this.renderSquare(1,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(2,0),this.renderSquare(2,1),this.renderSquare(2,2),this.renderSquare(2,3),this.renderSquare(2,4),this.renderSquare(2,5),this.renderSquare(2,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(3,0),this.renderSquare(3,1),this.renderSquare(3,2),this.renderSquare(3,3),this.renderSquare(3,4),this.renderSquare(3,5),this.renderSquare(3,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(4,0),this.renderSquare(4,1),this.renderSquare(4,2),this.renderSquare(4,3),this.renderSquare(4,4),this.renderSquare(4,5),this.renderSquare(4,6)),n.a.createElement("div",{className:"board-row"},this.renderSquare(5,0),this.renderSquare(5,1),this.renderSquare(5,2),this.renderSquare(5,3),this.renderSquare(5,4),this.renderSquare(5,5),this.renderSquare(5,6)),n.a.createElement("button",{id:"restart",onClick:function(){return r.resetGame()}},"Restart"),n.a.createElement("h3",null,e))}}]),r}(n.a.Component),q=function(e){function r(e){var t;return Object(l.a)(this,r),(t=Object(h.a)(this,Object(d.a)(r).call(this,e))).handleChange=t.handleChange.bind(Object(o.a)(t)),t}return Object(c.a)(r,e),Object(u.a)(r,[{key:"handleChange",value:function(e){this.props.onTypeChange(e.target.value)}},{key:"render",value:function(){return n.a.createElement("form",null,n.a.createElement("label",null,"Game Mode: \xa0",n.a.createElement("select",{value:this.props.option,onChange:this.handleChange},n.a.createElement("option",{value:"pvp"},"Player vs. Player"),n.a.createElement("option",{value:"aip1"},"AI as Player 1"),n.a.createElement("option",{value:"aip2"},"AI as Player 2"))))}}]),r}(n.a.Component);function S(e){for(var r=3;r<6;r++)for(var t=0;t<7;t++)if(e[r][t]&&e[r][t]===e[r-1][t]&&e[r][t]===e[r-2][t]&&e[r][t]===e[r-3][t])return e[r][t];for(var a=0;a<6;a++)for(var n=0;n<4;n++)if(e[a][n]&&e[a][n]===e[a][n+1]&&e[a][n]===e[a][n+2]&&e[a][n]===e[a][n+3])return e[a][n];for(var i=3;i<6;i++)for(var s=0;s<4;s++)if(e[i][s]&&e[i][s]===e[i-1][s+1]&&e[i][s]===e[i-2][s+2]&&e[i][s]===e[i-3][s+3])return e[i][s];for(var o=3;o<6;o++)for(var l=3;l<7;l++)if(e[o][l]&&e[o][l]===e[o-1][l-1]&&e[o][l]===e[o-2][l-2]&&e[o][l]===e[o-3][l-3])return e[o][l];for(var u=0;u<6;u++)for(var h=0;h<7;h++)if(!e[u][h])return null;return"draw"}var y=function(e){function r(e){var t;return Object(l.a)(this,r),(t=Object(h.a)(this,Object(d.a)(r).call(this,e))).state={mode:"pvp",isPvp:!0,isAi1:!1},t.handleTypeChange=t.handleTypeChange.bind(Object(o.a)(t)),t}return Object(c.a)(r,e),Object(u.a)(r,[{key:"handleTypeChange",value:function(e){var r,t;"pvp"===e?(r=!0,t=!1):"aip1"===e?(r=!1,t=!0):"aip1"===e&&(r=!1,t=!1),this.setState({mode:e,isPvp:r,isAi1:t})}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("h1",null,"Connect 4"),n.a.createElement(q,{option:this.state.mode,onTypeChange:this.handleTypeChange}),n.a.createElement(m,{isPvp:this.state.isPvp,isAi1:this.state.isAi1}))}}]),r}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[10,1,2]]]);
//# sourceMappingURL=main.fb6ba474.chunk.js.map