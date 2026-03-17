const nav = `<div data-role="navbar" data-iconpos="top">
				<ul>
					<li><a @click="navi(0)" :class="hili[0]" href="#main" data-icon="home">Inicio</a></li>
					<li><a @click="navi(1)" :class="hili[1]" href="#notas" data-icon="nota">Notas</a></li>
					<li><a @click="navi(2)" :class="hili[2]" href="#calen" data-icon="calen">Calendario</a></li>
					<!--li><a @click="navi(3)" :class="hili[3]" href="#busca" data-icon="search">Buscar</a></li-->
					<li><a @click="navi(4)" :class="hili[4]" href="#ajustes" data-icon="gear">Ajustes</a></li>
				</ul>
			</div>`
let logosvg = "assets/ptlogo.svg"
let doc = []
let doci = -1
let docres
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
		jqmtheme: "a",
		logo: "assets/ptlogo.svg",
		dataget(index){
			
		},
		logocol() {
			if (["c","e"].includes(this.jqmtheme)) {
				this.logo = "assets/ptlogoblack.svg"
			} else {
				this.logo= "assets/ptlogo.svg"
			}
			console.log(this.jqmtheme)
			$( ".ui-page" ).trigger( "create" )
		},
	}))
	
 })

function addtodoc(type) {
	const types = []
	doci++
	switch (type) {
		case 'titl':
			
			break;
		
		default:
			// Tab to edit
	}
}

