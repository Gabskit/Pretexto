const nav = `<div data-role="navbar" data-iconpos="top">
				<ul>
					<li><a @click="navi(0)" :class="hili[0]" href="#main" data-icon="home">Inicio</a></li>
					<li><a @click="navi(1)" :class="hili[1]" href="#notas" data-icon="nota">Notas</a></li>
					<li><a @click="navi(2)" :class="hili[2]" href="#calen" data-icon="calen">Calendario</a></li>
					<!--li><a @click="navi(3)" :class="hili[3]" href="#busca" data-icon="search">Buscar</a></li-->
				</ul>
			</div>`
let docres = []
const keys = ["theme"]
let preferences = {
	theme: 'a'
}
let fileHandle = null
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
  $.mobile.loading('show')
	let datafile = compilefile()
	showres()
	$.mobile.loading('hide')
	savefile(datafile)
}
function parsearSimbolos(texto) {
    if (!texto) return "";
    let procecedfile = texto
        .replace(/\*([^*]+)\*/g, '<b>$1</b>')       // *negrita*
        .replace(/•([^*]+)•/g, '<i>$1</i>')   // •italica• (según tu símbolo)
        .replace(/_([^*]+)_/g, '<u>$1</u>')         // _subrayado_
        .replace(/~([^*]+)~/g, '<s>$1</s>');        // ~tachado~
  return procecedfile
}
function compilefile() {
	const lista = document.getElementById('docreate');
	if (!lista) return;
	const namefile = document.querySelector('input[name="namedoc"]')
	const widgets = lista.children;
	docres = []
	let file = {
		metadato: {
			filetype: "pretexto-note",
			ver: "1.0",
			date: new Date().toDateString(),
			time: new Date().toTimeString(),
			name: document.querySelector("#namedoc").value || "Sin titulo",
		},
		dataWid: []
	}
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
				const formatedText = parsearSimbolos(datosWidget.valor)
				docres[i] = `<p align="${datosWidget.posicion}" style="color: #000;" class="p-1">
        ${formatedText}
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
				docres[i] = `<hr/>`
				break;
			case 'flow':
				const listFlow = widget.querySelector("ul[name='minilist']")
				const innerWid = listFlow ? listFlow.children : []
				let flowHtml = `<div class="flowui p-2">`;
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
							flowHtml += `<p align="${innerDatosWidget.posicion}" style="color: #000;" class="p-1">
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
		file.dataWid.push(datosWidget);
	}
	return file;
}
async function savefile(data) {
  if (!data) return;
  
  // Detectar si estamos en Capacitor o en Navegador
  const isCapacitor = window.hasOwnProperty('Capacitor');
  
  if (isCapacitor) {
    // --- LÓGICA PARA CELULAR (Capacitor) ---
    try {
      const { Filesystem } = Capacitor.Plugins;
      /*const status = await Filesystem.checkPermissions();
      if (status.publicStorage != 'granted') {
        status = await Filesystem.requestPermissions()
      }*/
      await Filesystem.writeFile({
        path: `Pretexto/${data.metadato.name.trim()}.nev`,
        data: JSON.stringify(data),
        directory: 'DATA',
        encoding: 'utf8',
        recursive: true // Crea la carpeta si no existe
      });
      alert("Guardado en documentos");
    } catch (e) {
      alert("Error en Capacitor: " + e.message);
    }
  } 
}
async function compartirNota() {
  const { Share, Filesystem } = Capacitor.Plugins;
  let nombreArchivo = $("#namedoc").val() + '.nev'
  makefile()
  try {
    // 1. Leemos el contenido actual de la nota desde nuestra carpeta DATA interna
    const archivoGuardado = await Filesystem.readFile({
      path: `Pretexto/${nombreArchivo}`,
      directory: 'DATA',
      encoding: 'utf8'
    });

    // 2. Escribimos ese mismo contenido en la carpeta CACHE temporal
    await Filesystem.writeFile({
      path: nombreArchivo,
      data: archivoGuardado.data,
      directory: 'CACHE',
      encoding: 'utf8'
    });
    // 1. Obtenemos la ruta interna del archivo
    const uriResult = await Filesystem.getUri({
      path: `Pretexto/${nombreArchivo}`,
      directory: 'CACHE'
    });

    // 2. Usamos el Share nativo
    await Share.share({
      title: 'Enviar Nota',
      url: uriResult.uri,
      dialogTitle: 'Compartir nota con...'
    });
  } catch (e) {
    alert("Error al compartir: " + e.message);
  }
}
async function importarNota() {
  const { FilePicker } = Capacitor.Plugins; // O import { FilePicker } from ...
  const { Filesystem } = Capacitor.Plugins;

  try {
    const result = await FilePicker.pickFiles({
      limit: 0,
      readData: true // Esto nos da el contenido en Base64 directamente
    });
    if (result.files.length > 0) {
      for (let i = 0; i < result.files.length; i++) {
        let archivo = result.files[i]
        if (archivo.name.endsWith('.nev')) {
          await Filesystem.writeFile({
            path: `Pretexto/${archivo.name}`,
            data: archivo.data,
            directory: 'DATA',
            recursive: true
          });
        } 
      }
      alert("Importación exitosa");
      listarDesdeDisco(); // Tu función para refrescar la lista
    } else {
      alert("Importacion cancelada")
    }
  } catch (e) {
    console.error("Error al importar:", e);
  }
}

$(document).on("pageshow", "#notas", function() {
  listarDesdeDisco();
});

async function listarDesdeDisco() {
  const { Filesystem } = Capacitor.Plugins;
  
  const $lista = $('#lista-notas-locales');
  $lista.empty();
  
  try {
    /*const status = await Filesystem.checkPermissions();
      if (status.publicStorage != 'granted') {
        status = await Filesystem.requestPermissions()
        
      }*/
    // 1. Leemos la carpeta real en Documentos
    const result = await Filesystem.readdir({
      path: 'Pretexto',
      directory: 'DATA'
    });
    
    // 2. Si no hay archivos, avisamos
    if (result.files.length == 0) {
      $lista.append('<li>No se encontraron notas</li>');
    } else {
      for (var i = 0; i < result.files.length; i++) {
        //alert(result.files)
        let file = result.files[i]
        if (file.name.endsWith('.nev')) {
          const nombreVisible = file.name.replace('.nev', '');
          const li = `<li>
                        <a href="#" onclick="cargarNotaLocal('${file.name}')">
                           <h2> ${nombreVisible}</h2>
                        </a>
                    </li>`;
          $lista.append(li);
        }
      }
    }
  } catch (e) {
    // Si la carpeta no existe aún (primera vez), la creamos o mostramos vacío
    $lista.append('<li>Crea tu primera nota para empezar</li>');
    console.log("Carpeta PreTexto aún no existe.");
  }
  
  // Muy importante para que JQM aplique los estilos al contenido nuevo
  $lista.listview("refresh");
}
async function cargarNotaLocal(fileName) {
    try {
        const { Filesystem } = Capacitor.Plugins;
        const contenido = await Filesystem.readFile({
            path: `Pretexto/${fileName}`,
            directory: 'DATA',
            encoding: 'utf8'
        });

        const nota = JSON.parse(contenido.data);
        cargarNotaEnEditor(nota); // Reutiliza tu función existente 
    } catch (e) {
        alert("Error al cargar la nota: " + e.message);
    }
}
function cargarNotaEnEditor(nota) {
    $("#namedoc").val(nota.metadato.name);
    $("h1[name='filename']").text(nota.metadato.name);
    const $lista = $('#docreate');
    let wid = nota.dataWid
    $lista.empty();
    for (var i = 0; i < wid.length; i++) {
      let typewid = wid[i].tipo
      addtodoc(typewid)
      let actwid = $lista.children().last()
        switch (typewid) {
          case 'title':
            actwid.find("input[name='titlewid']").val(wid[i].valor)
            actwid.find("select[name='titlestyle']").val(wid[i].estilo)
            break;
          case 'text':
            actwid.find("textarea[name='textwid']").val(wid[i].valor)
            actwid.find("select[name='textpos']").val(wid[i].posicion)
            break;
          case 'badge':
            actwid.find("input[name='badwid']").val(wid[i].valor)
            actwid.find("select[name='badcol']").val(wid[i].semantica)
            actwid.find("select[name='badtheme']").val(wid[i].tema)
            break;
          case 'div':
            // omitible
            break;
          case 'flow':
            let miniwid = wid[i].minilista
            for (var j = 0; j < miniwid.length; j++) {
              let minitypewid = miniwid[j].subtipo
              let addbtn = actwid.find("button[name='addwid']")
              addtolist(minitypewid, addbtn)
              let miniactwid = actwid.children().last()
              switch (minitypewid) {
                case 'text':
                  miniactwid.find("textarea[name='textwid']").val(miniwid[j].valor)
                  miniactwid.find("select[name='textpos']").val(miniwid[j].posicion)
                  break;
                case 'badge':
                  miniactwid.find("input[name='badwid']").val(miniwid[j].valor)
                  miniactwid.find("select[name='badcol']").val(miniwid[j].semantica)
                  miniactwid.find("select[name='badtheme']").val(miniwid[j].tema)
                  break;
                
                default:
                  // Tab to edit
              }
            }
            break;
          
          default:
            // Tab to edit
        }
    }
    compilefile(); 
    showres();
    $.mobile.changePage("#view");
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
         <input type="text" name="titlewid" value="" class="squircle"/>
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
         <textarea name="textwid" rows="8" cols="20" class="squircle txt-nota" ></textarea>
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
         <input type="text" name="badwid" value="" class="squircle"/>
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
          <button data-role="none" class="btn squircle" popovertarget="popminiadd-${uid}" name="addwid" style="anchor-name:--addminiwid-${uid}">+ widget</button>
          <ul class="dropdown menu rounded-box bg-base-300 squircle" popover id="popminiadd-${uid}" style="position-anchor:--addminiwid-${uid}">
        <li><button data-role="none" class="squircle edit-btn" @click="addtolist('text', $el)">Texto</button></li>
        <li><button data-role="none" class="squircle edit-btn" @click="addtolist('badge', $el)">Etiqueta</button></li>
       </ul>
         </span>
         <div>
          <ul data-role="listview" data-inset="true" name="minilist" class="squircle">
          </ul>
         </div>
       </li>`
      break;
		default:
			// Tab to edit
	}
	const $nuevoItem = $(html);
	$lista.append($nuevoItem);
	setTimeout(() => {
	  $lista.listview("refresh");
	  $nuevoItem.trigger('create')
	},5)
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
         <textarea name="textwid" rows="8" cols="20" class="squircle txt-nota" ></textarea>
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
         <input type="text" name="badwid" value="" class="squircle"/>
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
	setTimeout(() => {
	  $list.listview().listview("refresh");
	  $nuevoItem.trigger('create')
	},5)
}
// 1. Variable global para recordar dónde estábamos escribiendo
let ultimoTextarea = null;

// 2. Cada vez que tocas o escribes en un widget de texto, lo guardamos en la memoria
$(document).on('focus click keyup', '.txt-nota', function() {
  ultimoTextarea = this;
  actualizarCheckboxes(this);
});

// 3. El evento al marcar/desmarcar los checkboxes del footer
$(document).on('change', '#stng, #ital, #unde, #stri', function(e) {
  // Si no hemos tocado ningún texto aún, avisamos y abortamos
  if (!ultimoTextarea) {
    $(this).prop('checked', false).checkboxradio("refresh"); // Lo desmarcamos visualmente
    return;
  }
  
  const el = ultimoTextarea;
  let start = el.selectionStart;
  let end = el.selectionEnd;
  let texto = $(el).val();
  
  // Diccionario de símbolos
  const simbolos = { 'stng': '*', 'ital': '•', 'unde': '_', 'stri': '~' };
  let s = simbolos[this.id];
  
  // ¿El texto ya está rodeado por estos símbolos?
  const yaTiene = texto.substring(start - 1, start) === s && texto.substring(end, end + 1) === s;
  
  if (yaTiene) {
    // QUITAR EL FORMATO (Borrar símbolos)
    const nuevoTexto = texto.substring(0, start - 1) + texto.substring(start, end) + texto.substring(end + 1);
    $(el).val(nuevoTexto);
    el.setSelectionRange(start - 1, end - 1);
  } else {
    // PONER EL FORMATO (Añadir símbolos)
    const seleccionado = texto.substring(start, end);
    const nuevoTexto = texto.substring(0, start) + s + seleccionado + s + texto.substring(end);
    $(el).val(nuevoTexto);
    el.setSelectionRange(start + 1, end + 1);
  }
  
  // Le devolvemos el foco al cuadro de texto para seguir escribiendo
  el.focus();
  actualizarCheckboxes(el);
});

// 4. Función para prender o apagar los botones según donde esté el cursor
function actualizarCheckboxes(el) {
  if (!el) return;
  const start = el.selectionStart;
  const texto = el.value;
  
  const comprobar = (s) => {
    const antes = texto.substring(0, start);
    const despues = texto.substring(start);
    return antes.lastIndexOf(s) !== -1 && despues.indexOf(s) !== -1;
  };
  
  // Usamos checkboxradio("refresh") porque es obligatorio en jQuery Mobile
  $('#stng').prop('checked', comprobar('*')).checkboxradio("refresh");
  $('#ital').prop('checked', comprobar('•')).checkboxradio("refresh");
  $('#unde').prop('checked', comprobar('_')).checkboxradio("refresh");
  $('#stri').prop('checked', comprobar('~')).checkboxradio("refresh");
}
function showres() {
	const $res = $("#preview1")
	const $view = $("#preview2")
	$res.empty()
	$view.empty()
	for (var i = 0; i < docres.length; i++) {
		$res.append(docres[i])
		$view.append(docres[i])
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
//listarNotasLocales()



