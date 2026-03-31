const nav = `<div data-role="navbar" data-iconpos="top">
				<ul>
					<li><a @click="navi(0)" :class="hili[0]" href="#main" data-icon="home">Inicio</a></li>
					<li><a @click="navi(1)" :class="hili[1]" href="#notas" data-icon="nota">Notas</a></li>
					<li><a @click="navi(2)" :class="hili[2]" href="#calen" data-icon="calen">Calendario</a></li>
					<!--li><a @click="navi(3)" :class="hili[3]" href="#busca" data-icon="search">Buscar</a></li-->
				</ul>
			</div>`

let widlist
let doci = -1
let docres
const keys = ["theme"]
let preferences = {
	theme: 'a'
}
document.addEventListener('alpine:init', () => {
	Alpine.data('inicio', () => ({
		hili: ["ui-btn-active ui-state-persist","","","",""],
		datadoc: [],
		navbar: nav,
		navi(index){
		 this.hili = ["","","","",""]
		 this.hili[index] = "ui-btn-active ui-state-persist"
		},
		docu: docres,
		jqmtheme: preferences.theme,
		logo: "assets/ptlogo.svg",
		dataget(index){
			
		},
		logocol() {
			this.logo = ["c", "d", "e"].includes(this.jqmtheme) ? "assets/ptlogoblack.svg" : "assets/ptlogo.svg"
		},
		setheme(theme){
			preferences.theme = theme
			ajusdatasave(keys[0], preferences.theme)
		},
	}))
})
function compilefile() {
	widlist = document.getElementById('docreate').children
	for (var i = 0; i < widlist.length; i++) {
		console.log(i)
		let widgetype = widlist[i].getAttribute('pt-type')
		console.log(widgetype)
		let widchild = widlist[i].children
		switch (widgetype) {
			case 'title':
				let subchild = widchild[1].children
				let titletext = subchild[0].getAttribute('value')
				console.log(titletext)
				break;
			
			default:
				// Tab to edit
		}
	}
}
function addtodoc(type) {
	const types = []
	doci++
	switch (type) {
		case 'title':
			
			break;
		
		default:
			// Tab to edit
	}
}
function ajusdatasave(key, data) {
	localStorage.setItem(key, data)
}
function ajusdataload(key) {
	let data = localStorage.getItem(key)
	if (data) {
		return data
	}
}
preferences.theme = localStorage.getItem(keys[0])