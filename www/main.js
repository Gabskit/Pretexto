const nav = `<div data-role="navbar" data-iconpos="top">
				<ul>
					<li><a @click="navi(0)" :class="hili[0]" href="#main" data-icon="home">Inicio</a></li>
					<li><a @click="navi(1)" :class="hili[1]" href="#notas" data-icon="nota">Notas</a></li>
					<li><a @click="navi(2)" :class="hili[2]" href="#calen" data-icon="calen">Calendario</a></li>
					<!--li><a @click="navi(3)" :class="hili[3]" href="#busca" data-icon="search">Buscar</a></li-->
				</ul>
			</div>`
let eventos
let doc = []
let widlist
let doci = -1
let docres = []
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
		jqmtheme: preferences.theme,
		logo: "assets/ptlogo.svg",
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
	showres()
}
function compilefile() {
	const lista = document.getElementById('docreate');
	if (!lista) return;
	const namefile = document.querySelector('input[name="namedoc"]')
	const widgets = lista.children;
	doc = [];
	docres = []
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
				docres[i] = `<div class="ui-bar-${datosWidget.estilo} p-2">
        <h1>${datosWidget.valor}</h1>
       </div>`
				break;
				
			case 'text':
				const areaText = widget.querySelector('textarea[name="textwid"]')
				const alignText = widget.querySelector('select[name="textpos"]')
				datosWidget.valor = areaText ? areaText.value : ""
				datosWidget.posicion = alignText ? alignText.value : ""
				docres[i] = `<p align="${datosWidget.posicion}">
        ${datosWidget.valor}
       </p>`
				break;
				
			/*case 'image':
				// Si añades un widget de imagen con un input de URL o base64
				const inputImg = widget.querySelector('input[name="imagewid"]');
				datosWidget.url = inputImg ? inputImg.value : "";
				break;*/
				
			case 'badge':
				const inputBadge = widget.querySelector('input[name="badwid"]');
				const semanBadge = widget.querySelector('select[name="badcol"]')
				const themeBadge = widget.querySelector('select[name="badtheme"]')
				datosWidget.valor = inputBadge ? inputBadge.value : "";
				datosWidget.semantica = semanBadge ? semanBadge.value : ""
				datosWidget.tema = themeBadge ? themeBadge.value : ""
				docres[i] = `<div class="badge badge-${datosWidget.semantica}" data-theme="${datosWidget.tema}">
        ${datosWidget.valor}
       </div>`
				break;
				
			case 'div':
				// Los divisores no suelen tener valor, solo existen
				datosWidget.separador = true;
				docres[i] = `<hr/>`
				break;
			case 'flow':
				const listFlow = widget.querySelector("ul[name='minilist']")
				const innerWid = listFlow ? listFlow.children : []
				let flowHtml = `<div class="setui p-2">`;
				datosWidget.minilista = []
				for (var j = 0; j < innerWid.length; j++) {
					const miniwidget = innerWid[j]
					const innerType = innerWid[j].getAttribute("pt-type")
					let innerDatosWidget = { subtipo : innerType}
					switch (innerType) {
						case 'text':
							const areaText = miniwidget.querySelector('textarea[name="textwid"]')
							const alignText = miniwidget.querySelector('select[name="textpos"]')
							innerDatosWidget.valor = areaText ? areaText.value : ""
							innerDatosWidget.posicion = alignText ? alignText.value : ""
							flowHtml += `<p align="${innerDatosWidget.posicion}">
        ${innerDatosWidget.valor}
       </p>`
							break;
						case 'badge':
							const inputBadge = miniwidget.querySelector('input[name="badwid"]');
							const semanBadge = miniwidget.querySelector('select[name="badcol"]')
							const themeBadge = miniwidget.querySelector('select[name="badtheme"]')
							innerDatosWidget.valor = inputBadge ? inputBadge.value : "";
							innerDatosWidget.semantica = semanBadge ? semanBadge.value : ""
							innerDatosWidget.tema = themeBadge ? themeBadge.value : ""
							flowHtml += `<div class="badge badge-${innerDatosWidget.semantica}" data-theme="${innerDatosWidget.tema}">
        ${innerDatosWidget.valor}
       </div>`
							break;
						
						default:
							// Tab to edit
					}
					
					datosWidget.minilista.push(innerDatosWidget)
				}
				flowHtml += "</div>"
				docres[i] = flowHtml
				break;
			default:
				console.warn("Tipo de widget no reconocido:", tipo);
		}
		doc.push(datosWidget);
	}
	
	console.log(doc);
	return doc;
}
function addtodoc(type) {
	const $lista = $('#docreate');
	if (!$lista.length) return;
	let html
	let uid = Math.random()
	switch (type) {
		case 'title':
			html = `<li pt-type="title">
        <h1 class="setui">Titulo<!--div data-role="controlgroup" data-type="horizontal">
         <button data-icon="arrow-u" data-iconpos="notext"></button>
         <button data-icon="arrow-d" data-iconpos="notext"></button>
        </div--><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <input type="text" name="titlewid" value="" />
         <select name="titlestyle" data-native-menu="false" data-mini="true">
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
          <option value="e">e</option>
         </select>
        </span>
       </li>`
			break;
		case 'text':
			html = `<li pt-type="text">
        <h1 class="setui">Texto<!--div data-role="controlgroup" data-type="horizontal">
         <button data-icon="arrow-u" data-iconpos="notext"></button>
         <button data-icon="arrow-d" data-iconpos="notext"></button>
         </div--><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <textarea name="textwid" rows="8" cols="20"></textarea>
         <select name="textpos" data-native-menu="false" data-mini="true">
          <option value="left">◧</option>
          <option value="center">▣</option>
          <option value="right">◨</option>
          <option value="justify">⬛︎</option>
         </select>
        </span>
       </li>`
      break;
      case "badge":
      	html = `<li pt-type="badge">
        <h1 class="setui">Etiqueta<!--div data-role="controlgroup" data-type="horizontal">
         <button data-icon="arrow-u" data-iconpos="notext"></button>
         <button data-icon="arrow-d" data-iconpos="notext"></button>
         </div--><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <input type="text" name="badwid" value="" />
         <select name="badcol" data-native-menu="false" data-mini="true">
          <option value="primary">Primario</option>
          <option value="secondary">Secundario</option>
          <option value="accent">Acento</option>
          <option value="info">Info</option>
          <option value="success">Exito</option>
          <option value="warning">Advertencia</option>
          <option value="error">Error</option>
         </select>
         <select name="badtheme" data-native-menu="false" data-mini="true">
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
          <option value="cupcake">Cupcake</option>
          <option value="bumblebee">Bumblebee</option>
         </select>
        </span>
       </li>`
      break;
      case "div":
      	html = `<li pt-type="div">
        <h1 class="setui">Divisor<!--div data-role="controlgroup" data-type="horizontal">
         <button data-icon="arrow-u" data-iconpos="notext"></button>
         <button data-icon="arrow-d" data-iconpos="notext"></button>
         </div--><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
       </li>`
      break;
      case "flow":
      	html = `<li pt-type="flow">
        <h1 class="setui">Contenedor<!--div data-role="controlgroup" data-type="horizontal">
         <button data-icon="arrow-u" data-iconpos="notext"></button>
         <button data-icon="arrow-d" data-iconpos="notext"></button>
         </div--><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
         <span class="setui">
          <button data-role="none" class="btn squircle" popovertarget="popminiadd-${uid}" style="anchor-name:--addminiwid-${uid}">+ widget</button>
          <ul class="dropdown menu rounded-box bg-base-300 squircle" popover id="popminiadd-${uid}" style="position-anchor:--addminiwid-${uid}">
        <li><button data-role="none" class="squircle edit-btn" @click="addtolist('text', $el)">Texto</button></li>
        <li><button data-role="none" class="squircle edit-btn" @click="addtolist('badge', $el)">Etiqueta</button></li>
       </ul>
         </span>
         <div>
          <ul data-role="listview" data-inset="true" name="minilist">
          
          </ul>
         </div>
       </li>`
      break;
		default:
			// Tab to edit
	}
	const $nuevoItem = $(html);
	$lista.append($nuevoItem);
	$lista.listview("refresh");
	$nuevoItem.trigger('create')
	delwidg()
}
function addtolist(type, element) {
	const target = element || this
	const $container = $(target).closest('li[pt-type="flow"]');
	const $list = $container.find("ul[name='minilist']");
	if (!$list.length) {
		console.error("No se encontró 'minilist'. Revisa la estructura HTML.");
		return;
		
	}
	let html
	switch (type) {
		case 'text':
			html = `<li pt-type="text">
        <h1 class="setui">Texto<!--div data-role="controlgroup" data-type="horizontal">
         <button data-icon="arrow-u" data-iconpos="notext"></button>
         <button data-icon="arrow-d" data-iconpos="notext"></button>
         </div--><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <textarea name="textwid" rows="8" cols="20"></textarea>
         <select name="textpos" data-native-menu="false" data-mini="true">
          <option value="left">◧</option>
          <option value="center">▣</option>
          <option value="right">◨</option>
          <option value="justify">⬛︎</option>
         </select>
        </span>
       </li>`
      break;
      case "badge":
      	html = `<li pt-type="badge">
        <h1 class="setui">Etiqueta<!--div data-role="controlgroup" data-type="horizontal">
         <button data-icon="arrow-u" data-iconpos="notext"></button>
         <button data-icon="arrow-d" data-iconpos="notext"></button>
         </div--><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <input type="text" name="badwid" value="" />
         <select name="badcol" data-native-menu="false" data-mini="true">
          <option value="primary">Primario</option>
          <option value="secondary">Secundario</option>
          <option value="accent">Acento</option>
          <option value="info">Info</option>
          <option value="success">Exito</option>
          <option value="warning">Advertencia</option>
          <option value="error">Error</option>
         </select>
         <select name="badtheme" data-native-menu="false" data-mini="true">
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
          <option value="cupcake">Cupcake</option>
          <option value="bumblebee">Bumblebee</option>
         </select>
        </span>
       </li>`
      break;
    
		default:
			// Tab to edit
	}
	const $nuevoItem = $(html)
	$list.append($nuevoItem);
	$list.listview().listview("refresh");
	$nuevoItem.trigger('create')
}
function showres() {
	const $res = $("#preview")
	$res.empty()
	for (var i = 0; i < docres.length; i++) {
		$res.append(docres[i])
	}
}
function delwidg() {
	const lista = document.getElementById('docreate')
	const widgets = lista.children;
	for (var i = 0; i < widgets.length; i++) {
		widgets[i].addEventListener('click', (e) => {
			let btn = e.target.getAttribute("name")
			if (btn == 'delwid') {
				e.target.closest("li").remove()
				$("#docreate").listview('refresh')
			}
		})
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
preferences.theme = ajusdataload(keys[0]) ||  "a"
