import { engToRus } from "./rus-keyboard.js";

const mainContent = document.createElement("main");
mainContent.classList.add("interface");
if (localStorage.getItem("lang") === undefined) {
  localStorage.setItem("lang", "eng");
}

let eng = localStorage.getItem("lang") === "eng" ? "true" : "false";
let lang = { ...engToRus };

if (eng === "true") {
  for (let key in lang) {
    lang[key] = key;
  }
}

console.log(localStorage.getItem("lang"));
mainContent.innerHTML = `<section class="interface__monitor">
<div class="interface__screen screen"><span class="screen__input"></span><span
		class="screen__cursor">█</span></div>
<div class="interface__side-panel side-panel">
	<div class="side-panel__note note">
		<div class="note__stick"></div>
		<div class="note__note">press ALT + CTRL<br>if you need to communicate with Mikhail</div>
	</div><img class="side-panel__logo" src="assets/logo.png" alt="dharma logo with swan">
</div>
</section>
<section class="interface__computer">
<div class="interface__keyboard keyboard">
	<div class="keyboard__row--first">
		<div class="keyboard__key key" data-key="49">1</div>
		<div class="keyboard__key key" data-key="50">2</div>
		<div class="keyboard__key key" data-key="51">3</div>
		<div class="keyboard__key key" data-key="52">4</div>
		<div class="keyboard__key key" data-key="53">5</div>
		<div class="keyboard__key key" data-key="54">6</div>
		<div class="keyboard__key key" data-key="55">7</div>
		<div class="keyboard__key key" data-key="56">8</div>
		<div class="keyboard__key key" data-key="57">9</div>
		<div class="keyboard__key key" data-key="48">0</div>
		<div class="keyboard__key key" data-key="189">-</div>
		<div class="keyboard__key key" data-key="187">=</div>
		<div class="keyboard__key--special key" id="del-btn" data-key="46">del</div>
	</div>
	<div class="keyboard__row">
		<div class="keyboard__key--special key" id="alt-btn" data-key="18">alt</div>
		<div class="keyboard__key key" data-key="81">${lang.q}</div>
		<div class="keyboard__key key" data-key="87">${lang.w}</div>
		<div class="keyboard__key key" data-key="69">${lang.e}</div>
		<div class="keyboard__key key" data-key="82">${lang.r}</div>
		<div class="keyboard__key key" data-key="84">${lang.t}</div>
		<div class="keyboard__key key" data-key="89">${lang.y}</div>
		<div class="keyboard__key key" data-key="85">${lang.u}</div>
		<div class="keyboard__key key" data-key="73">${lang.i}</div>
		<div class="keyboard__key key" data-key="79">${lang.o}</div>
		<div class="keyboard__key key" data-key="80">${lang.p}</div>
		<div class="keyboard__key key" data-key="38">${lang["↑"]}</div>
		<div class="keyboard__key--long key" id="backspace-btn" data-key="8">backspace</div>
	</div>
	<div class="keyboard__row">
		<div class="keyboard__key--special key" id="ctrl-btn" data-key="17">ctrl</div>
		<div class="keyboard__key key" data-key="65">${lang.a}</div>
		<div class="keyboard__key key" data-key="83">${lang.s}</div>
		<div class="keyboard__key key" data-key="68">${lang.d}</div>
		<div class="keyboard__key key" data-key="70">${lang.f}</div>
		<div class="keyboard__key key" data-key="71">${lang.g}</div>
		<div class="keyboard__key key" data-key="72">${lang.h}</div>
		<div class="keyboard__key key" data-key="74">${lang.j}</div>
		<div class="keyboard__key key" data-key="75">${lang.k}</div>
		<div class="keyboard__key key" data-key="76">${lang.l}</div>
		<div class="keyboard__key key" id="left-btn" data-key="37">${lang["←"]}</div>
		<div class="keyboard__key key" id="right-btn" data-key="39">${lang["→"]}</div>
		<div class="keyboard__key--special key" id="tab-btn" data-key="9">tab</div>
	</div>
	<div class="keyboard__row">
		<div class="keyboard__key--long key" id="shift-btn" data-key="16">shift</div>
		<div class="keyboard__key key" data-key="90">${lang.z}</div>
		<div class="keyboard__key key" data-key="88">${lang.x}</div>
		<div class="keyboard__key key" data-key="67">${lang.c}</div>
		<div class="keyboard__key key" data-key="86">${lang.v}</div>
		<div class="keyboard__key key" data-key="66">${lang.b}</div>
		<div class="keyboard__key key" data-key="78">${lang.n}</div>
		<div class="keyboard__key key" data-key="77">${lang.m}</div>
		<div class="keyboard__key key" data-key="188">${lang[","]}</div>
		<div class="keyboard__key key" data-key="190">${lang["."]}</div>
		<div class="keyboard__key key" data-key="40">${lang["↓"]}</div>
		<div class="keyboard__key--long key" id="enter-btn" data-key="13">enter</div>
	</div>
	<div class="keyboard__row--last">
		<div class="keyboard__key--special key" id="caps-btn" data-key="20">caps</div>
		<div class="keyboard__key--space key" id="space-btn" data-key="32"></div>
	</div>
</div>
</section>
`;
document.body.appendChild(mainContent);
