const nav = `<div data-role="navbar" data-iconpos="top">
				<ul>
					<li><a @click="navi(0)" :class="hili[0]" href="#main" data-icon="home">Inicio</a></li>
					<li><a @click="navi(1)" :class="hili[1]" href="#notas" data-icon="nota">Notas</a></li>
					<li><a @click="navi(2)" :class="hili[2]" href="#calen" data-icon="calen">Calendario</a></li>
					<!--li><a @click="navi(3)" :class="hili[3]" href="#busca" data-icon="search">Buscar</a></li-->
				</ul>
			</div>`
let doc = []
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
function makefile() {
	let datafile = compilefile()
}
function compilefile() {
	const lista = document.getElementById('docreate');
	if (!lista) return;
	const namefile = document.querySelector('input[name="namedoc"]')
	const widgets = lista.children;
	doc = [];
	
	
	for (let i = 0; i < widgets.length; i++) {
		const widget = widgets[i];
		const tipo = widget.getAttribute('pt-type');
		let datosWidget = { tipo: tipo };
		
		switch (tipo) {
			case 'title':
				const inputTitle = widget.querySelector('input[name="titlewid"]')
				const styleTitle = widget.querySelector('select[name="titlestyle"]')
				datosWidget.valor = inputTitle ? inputTitle.value : ""
				datosWidget.estilo = styleTitle ? styleTitle.value : ""
				break;
				
			case 'text':
				const areaText = widget.querySelector('textarea[name="textwid"]')
				const alignText = widget.querySelector('input[name="textpos"]:checked')
				datosWidget.valor = areaText ? areaText.value : ""
				datosWidget.posicion = alignText ? alignText.value : ""
				break;
				
			case 'image':
				// Si añades un widget de imagen con un input de URL o base64
				const inputImg = widget.querySelector('input[name="imagewid"]');
				datosWidget.url = inputImg ? inputImg.value : "";
				break;
				
			case 'badge':
				const inputBadge = widget.querySelector('input[name="badgewid"]');
				
				datosWidget.etiqueta = inputBadge ? inputBadge.value : "";
				break;
				
			case 'div':
				// Los divisores no suelen tener valor, solo existen
				datosWidget.separador = true;
				break;
				
			default:
				console.warn("Tipo de widget no reconocido:", tipo);
		}
		
		doc.push(datosWidget);
	}
	
	console.log( doc);
	return doc;
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