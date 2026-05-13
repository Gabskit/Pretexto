//Base
class BaseWidget {
  constructor(tipo) {
    this.tipo = tipo;
    this.datos = { tipo: this.tipo }
  }
  getHTML() {
    return ``;
  }
  getWYSIWYG() {
    return ``; 
  }
  extraerDatos($elementoDOM) {
    return { tipo: this.tipo };
  }
  compilarVista(datos) {
    return ``;
  }
  cargarDatos($elementoDOM, datos) {
  }
}
//Widgets
//Titulo
class TitleWidget extends BaseWidget {
  constructor() {
    super('title');
  }
  getHTML() {
    return `<li pt-type="title">
        <h1 class="setui">Titulo<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <input type="text" name="titlewid" value="" class="txt-nota" placeholder="Título" onkeyup="actualizarCheckboxes(this)" 
   onclick="actualizarCheckboxes(this)" 
   oninput="getfile.compilefile(); actualizarCheckboxes(this)"/>
         <select name="titlestyle" data-native-menu="false" data-mini="true">
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
          <option value="e">e</option>
         </select>
        </span>
       </li>`;
  }
  getWYSIWYG(){
    return `<div class="ui-bar-a p-2" wysiwyg-render><h1
    contenteditable="true" 
    oninput="$(this).closest('li').data('valor', this.innerText)"
    onkeyup="actualizarCheckboxes(this)" 
   onclick="actualizarCheckboxes(this)" 
   oninput="getfile.compilefile(); actualizarCheckboxes(this)" class="wysiwyg-field" data-uid='' data-sync='titlewid' placeholder='Titulo.'></h1></div>`
  }
  extraerDatos($widget) {
    let datos = super.extraerDatos($widget);
    datos.valor = $widget.find('input[name="titlewid"]').val() || "";
    datos.estilo = $widget.find('select[name="titlestyle"]').val() || "a";
    return datos;
  }
  compilarVista(datos) {
    return `<div class="ui-bar-${datos.estilo} p-2"><h1>${parsearSimbolos(datos.valor)}</h1></div>`;
  }
  cargarDatos($widget, datos) {
    $widget.find("input[name='titlewid']").val(datos.valor ? datos.valor : '');
    $widget.find("select[name='titlestyle']").val(datos.estilo ? datos.estilo : 'a');
  }
}
//Etiqueta 
class BadgeWidget extends BaseWidget {
  constructor() {
    super('badge');
  }
  getHTML(){
    return `<li pt-type="badge">
        <h1 class="setui">Etiqueta<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <input type="text" name="badwid" value="" class="txt-nota" placeholder="Texto de la etiqueta" onkeyup="actualizarCheckboxes(this)" 
   onclick="actualizarCheckboxes(this)" 
   oninput="getfile.compilefile(); actualizarCheckboxes(this)"/>
         
        <span class="setui">
         <select name="badcol" data-native-menu="false" data-mini="true">
          <option value="red">Rojo</option>
          <option value="orange">Naranja</option>
          <option value="olive">Olivo</option>
          <option value="green">Verde</option>
          <option value="teal">Agua</option>
          <option value="blue">Azul</option>
          <option value="violet">Violeta</option>
          <option value="pink">Rosa</option>
          <option value="brown">Cafe</option>
          <option value="grey">Gris</option>
          <option value="black">Negro</option>
         </select>
         <select name="badtype" data-native-menu="false" data-mini="true">
          <option value=" ">Simple</option>
          <option value="tag">Etiqueta</option>
          <optgroup label="Apuntando">
           <option value="pointing">Arriba</option>
           <option value="pointing below">Abajo</option>
           <option value="left pointing">Izquierda</option>
           <option value="right pointing">Derecha</option>
          </optgroup>
         </select>
         <select name="badsim" data-role="slider" data-mini="true">
           <option value="false">Normal</option>
           <option value="true">Simple</option>
          </select>
        </span>
       </li>`
  }
  getWYSIWYG(datos){
    return `<div class="ui red simple label p-2 wysiwyg-field wysiwyg-render" contenteditable="true" 
    oninput="$(this).closest('li').data('valor', this.innerText)"
    onkeyup="actualizarCheckboxes(this)" 
   onclick="actualizarCheckboxes(this)" 
   oninput="getfile.compilefile(); actualizarCheckboxes(this)" data-uid='' data-sync='badwid'></div>`
  }
  extraerDatos($widget) {
    let datos = super.extraerDatos($widget);
    datos.valor = $widget.find('input[name="badwid"]').val() || "";
    datos.color = $widget.find('select[name="badcol"]').val() || "red";
    datos.tipo = $widget.find('select[name="badtype"]').val() || "simple";
    datos.simple = $widget.find('select[name="badsim"]').val() || "false"
    return datos;
  }
  compilarVista(datos) {
    let prev = ''
    if (datos.simple === 'true'){
      prev = `<div class="ui ${datos.color} ${datos.tipo} basic label p-2">${parsearSimbolos(datos.valor)}</div>`
    } else {
      prev = `<div class="ui ${datos.color} ${datos.tipo} label p-2">${parsearSimbolos(datos.valor)}</div>`
    }
    return prev;
  }
  cargarDatos($widget, datos) {
    $widget.find("input[name='badwid']").val(datos.valor ? datos.valor : '');
    $widget.find("select[name='badcol']").val(datos.color ? datos.color : 'red');
    $widget.find("select[name='badtype']").val(datos.tipo ? datos.tipo : 'simple');
    $widget.find("select[name='badsim']").val(datos.simple ? datos.simple : 'false')
  }
}
//Contenedor 
class FlowWidget extends BaseWidget {
  constructor() {
    super('flow');
  }
  getHTML() {
    let uid = Math.floor(Math.random() * 1000000)
      return `<li pt-type="flow" data-uid>
        <h1 class="setui">Contenedor<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext" data-mini="true"></button></h1>
         <span class="setui">
          <button popovertarget="popminiadd-${uid}" name="addwid" style="anchor-name:--addminiwid-${uid}" data-icon="plus">Widget</button>
          <ul class="dropdown menu rounded-xl bg-base-300 squircle" popover id="popminiadd-${uid}" style="position-anchor:--addminiwid-${uid}">
        <li><button data-role="none" class="squircle edit-btn" @click="getfile.addtolist('text', $el)">Texto</button></li>
        <li><button data-role="none" class="squircle edit-btn" @click="getfile.addtolist('badge', $el)">Etiqueta</button></li>
        <li><button data-role="none" class="squircle edit-btn" @click="getfile.addtolist('image', $el)">Imagen</button></li>
       </ul>
         </span>
         <div>
          <ul data-role="listview" data-inset="true" name="minilist" class="squircle sortable minilist-sortable">
          </ul>
         </div>
       </li>`;
  }
  getWYSIWYG(){
    return `<div class="flowui-wysiwyg flowui p-2" style="min-height: 40px; border: 1px dashed #ccc; margin-bottom: 5px;">
            </div>`
  }
  extraerDatos($widget) {
    let datos = super.extraerDatos($widget);
    datos.minilista = [];
    const $hijos = $widget.find("ul[name='minilist']").children("li");
    $hijos.each((index, elemento) => {
      const $subWidget = $(elemento);
      const subtipo = $subWidget.attr('pt-type');
      const claseWidget = RegistroWidgets[subtipo];
      if (claseWidget) {
        let datosSubWidget = claseWidget.extraerDatos($subWidget);
        datosSubWidget.subtipo = subtipo
        datos.minilista.push(datosSubWidget);
      }
    });
    return datos;
  }
  compilarVista(datos) {
    let htmlInterno = '';
    if (datos.minilista && datos.minilista.length > 0) {
      datos.minilista.forEach(subDatos => {
        const claseWidget = RegistroWidgets[subDatos.subtipo];
        if (claseWidget) {
          htmlInterno += claseWidget.compilarVista(subDatos);
        }
      });
    }
    return `<div class="flowui">${htmlInterno}</div>`;
  }
  cargarDatos($widget, datos) {
    if (!datos.minilista || datos.minilista.length === 0) return;
    const $listaInterna = $widget.find("ul[name='minilist']");
    const $botonAdd = $widget.find("button[name='addwid']");
    datos.minilista.forEach(subDatos => {
      getfile.addtolist(subDatos.subtipo, $botonAdd);
      const $subWidgetActual = $listaInterna.children("li").last();
      const claseWidget = RegistroWidgets[subDatos.subtipo];
      if (claseWidget) {
        claseWidget.cargarDatos($subWidgetActual, subDatos);
      }
    });
  }
}
//Texto
class TextWidget extends BaseWidget {
  constructor() {
    super('text')
  }
  getHTML(){
    return `<li pt-type="text">
        <h1 class="setui">Texto<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="widui">
         <input type="text" name="textrib" placeholder="Texto del liston" onkeyup="actualizarCheckboxes(this)" 
   onclick="actualizarCheckboxes(this)" 
   oninput="getfile.compilefile(); actualizarCheckboxes(this)">
         <span class="setui">
          <select name="textribon" data-role="slider" data-mini="true">
           <option value="false">No</option>
           <option value="true">Si</option>
          </select>
          <select name="textribpos" data-native-menu="false" data-mini="true">
           <option value=" ">Izquierda</option>
           <option value="right">Derecha</option>
          </select>
          <select name="textribcol" data-native-menu="false" data-mini="true">
           <option value="red">Rojo</option>
           <option value="orange">Naranja</option>
           <option value="olive">Olivo</option>
           <option value="green">Verde</option>
           <option value="teal">Agua</option>
           <option value="blue">Azul</option>
           <option value="violet">Violeta</option>
           <option value="pink">Rosa</option>
           <option value="brown">Cafe</option>
           <option value="grey">Gris</option>
           <option value="black">Negro</option>
          </select>
         </span>
         <span class="setui">
          <textarea name="textwid" rows="8" cols="20" class="squircle txt-nota"  placeholder="Texto principal" onkeyup="actualizarCheckboxes(this)" 
   onclick="actualizarCheckboxes(this)" 
   oninput="getfile.compilefile(); actualizarCheckboxes(this)"></textarea>
         <select name="textpos" data-native-menu="false" data-mini="true">
          <option value="left">◧</option>
          <option value="center">▣</option>
          <option value="right">◨</option>
          <option value="justify">⬛︎</option>
         </select>
         </span>
        </span>
       </li>`
  }
  getWYSIWYG(){
    return ``
  }
  extraerDatos($widget){
    let datos = super.extraerDatos($widget)
    datos.valor = $widget.find('textarea[name="textwid"]').val() || "";
    datos.posicion = $widget.find('select[name="textpos"]').val() || "left";
    datos.liston = $widget.find('select[name="textribon"]').val() || "false"
    datos.valorlis = $widget.find('input[name="textrib"]').val() || ""
    datos.posicionlis = $widget.find('select[name="textribpos"]').val() || " "
    datos.colorlis = $widget.find('select[name="textribcol"]').val() || "red"
    return datos
  }
  compilarVista(datos){
    let prev = ''
    if (datos.liston === 'true'){
      prev = `<div class="ui raised segment" style="margin: 10px;"><span class="ui ${datos.colorlis} ${datos.posicionlis} ribbon label">${parsearSimbolos(datos.valorlis)}</span><p align="${datos.posicion}" style="color: #000;" class="p-1">${parsearSimbolos(datos.valor)}</p></div>`
    } else {
      prev = `<div class="ui raised segment" style="margin: 10px;"><p align="${datos.posicion}" style="color: #000;" class="p-1">${parsearSimbolos(datos.valor)}</p></div>`
    }
    return prev;
  }
  cargarDatos($widget, datos){
    $widget.find("textarea[name='textwid']").val(datos.valor ? datos.valor : '')
    $widget.find("select[name='textpos']").val(datos.posicion ? datos.posicion : 'left')
    $widget.find("input[name='textrib']").val(datos.valorlis ? datos.valorlis : '')
    $widget.find("select[name='textribon']").val(datos.liston ? datos.liston : 'false')
    $widget.find("select[name='textribpos']").val(datos.posicionlis ? datos.posicionlis : ' ')
    $widget.find("select[name='textribcol']").val(datos.colorlis ? datos.colorlis : 'red')
  }
}
class ImageWidget extends BaseWidget{
  constructor() {
    super('image')
  }
  getHTML(){
    return `<li pt-type="image">
        <h1 class="setui">Imagen<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
        <div data-role="controlgroup" data-type="horizontal">
         <button @click="Capacitores.seleccionarImagen($el)" data-icon="plus" data-mini="true">Subir Foto</button>
        </div>
        <input type="hidden" name="imagewid" value=""/>
        <select name="imagepos" data-native-menu="false" data-mini="true">
         <option value="circular">Circular</option>
         <option value="fluid">Ancho completo</option>
         <option value="rounded">Redondeada</option>
        </select>
       </span>
      <div class="img-preview-container" style="text-align:center; margin-top:10px;"></div>
    </li>`
  }
  getWYSIWYG(){
    return `<div class="ui circular image"><img src=""></div>`;
  }
  extraerDatos($widget){
    let datos = super.extraerDatos($widget)
    datos.url = $widget.find('input[name="imagewid"]').val() || ""
    datos.estilo = $widget.find('select[name="imagepos"]').val() || "circular";
    return datos
  }
  compilarVista(datos){
    let prev = ''
    if (datos.url) {
      prev = `<div class="ui ${datos.estilo} image"><img src="${datos.url}"></div>`;
    }
    return prev
  }
  cargarDatos($widget, datos){
    $widget.find("input[name='imagewid']").val(datos.url ? datos.url : '')
    $widget.find("select[name='imagepos']").val(datos.estilo ? datos.estilo : 'circular')
    if(datos.url) {
      $widget.find(".img-preview-container").html(`<img src="${datos.url}" style="max-height:100px;"/>`);
    }
  }
}
class DivWidget extends BaseWidget {
  constructor() {
    super('div')
  }
  getHTML(){
    return `<li pt-type="div">
        <h1 class="setui">Divisor<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
       </li>`
  }
  extraerDatos($widget){
    let datos = super.extraerDatos($widget)
    return datos
  }
  compilarVista(datos) {
    return '<hr/>'
  }
  cargarDatos($widget, datos){
    
  }
}
const RegistroWidgets = {
  'title': new TitleWidget(),
  'badge': new BadgeWidget(),
  'text': new TextWidget(),
  'image': new ImageWidget(),
  'div': new DivWidget(),
  'flow': new FlowWidget()
};
class Filer {
  constructor() {
    setTimeout(() => {
      this.lista = $("#docreate")
      this.lista2 = $("#wysiwyg-content")
      this.docres = ""
    }, 2)
  }
  compilefile() {
  this.lista = $("#docreate");
  if (!this.lista.length) return;
  
  const widgetsDOM = this.lista.children();
  let file = {
    metadato: {
      filetype: "pretexto-note",
      ver: "1.0",
      date: new Date().toLocaleDateString(),
      name: $("#namedoc").val() || "Sin titulo",
    },
    dataWid: []
  };
  
  // ASEGURAMOS QUE SEA STRING VACÍO AL EMPEZAR
  let acumuladorHTML = "";
  
  widgetsDOM.each((index, el) => {
    const $widget = $(el);
    const tipo = $widget.attr('pt-type');
    const claseWidget = RegistroWidgets[tipo];
    
    if (claseWidget) {
      try {
        const datos = claseWidget.extraerDatos($widget);
        file.dataWid.push(datos);
        const htmlGenerado = claseWidget.compilarVista(datos);
        acumuladorHTML += htmlGenerado ? htmlGenerado : "";
      } catch (e) {
        console.error("Error procesando widget tipo: " + tipo, e);
      }
    }
  });
  
  this.docres = acumuladorHTML; // Guardamos el string final
  console.log("Docres compilado con éxito:", this.docres);
  return file;
}
  cargarNotaEnEditor(nota) {
    this.lista = $("#docreate")
    if (!nota || !nota.dataWid) {
      alert("La nota está vacía o el archivo está dañado.");
      return;
    }
    $("#namedoc").val(nota.metadato.name);
    $("h1[name='filename']").text(nota.metadato.name);
    let wid = nota.dataWid
    this.lista.empty();
    for (var i = 0; i < wid.length; i++) {
      let typewid = wid[i].tipo
      let datosWidget = wid[i]
      this.addtodoc(typewid)
      let $widgetActual = this.lista.children().last();
      const widgetClass = RegistroWidgets[typewid]
      if (widgetClass) {
        widgetClass.cargarDatos($widgetActual, datosWidget);
      }
    }
    setTimeout(() => {
      this.compilefile(); 
      $.mobile.changePage("#view");
    }, 50)
    
  }
  addtodoc(type) {
	if (!this.lista.length || !this.lista2.length) return;
    const widgetClass = RegistroWidgets[type];
    if (!widgetClass) return;

    // Generar UID único para el nivel raíz
    const uid = 'wid_' + Math.random().toString(36).substr(2, 9);
    console.log(uid)
// AQUÍ: Se añade al widget del editor
const $nuevowid = $(widgetClass.getHTML()).attr('data-uid', uid);

// AQUÍ: Se añade al bloque del documento
const $nuevoblock = $(widgetClass.getWYSIWYG()).attr('data-uid', uid);
    this.lista.append($nuevowid);
    this.lista2.append($nuevoblock);

    setTimeout(() => {
      this.lista.listview("refresh").trigger('create');
      $nuevowid.trigger('create');
    }, 2);
	this.initSortables()
	this.delwidg()
}
  addtolist(type, element) {
  const target = element || this;
  const $container = $(target).closest('li[pt-type="flow"]');
  const $list = $container.find("ul[name='minilist']");
  
  // Buscar el contenedor gemelo en el WYSIWYG usando el UID del padre
  const parentUid = $container.attr('data-uid');
  const $wysiwygContainer = $(`#wysiwyg-content [data-uid="${parentUid}"] .flowui-wysiwyg`);

  if (!$list.length) return;

  const widgetClass = RegistroWidgets[type];
  if (!widgetClass) return;

  // Generar UID único para el hijo
  const uid = 'sub_' + Math.random().toString(36).substr(2, 9);

  const $nuevoItem = $(widgetClass.getHTML()).attr('data-uid', uid);
  const $nuevoblock = $(widgetClass.getWYSIWYG()).attr('data-uid', uid);

  // Inyectar en ambos lados
  $list.append($nuevoItem);
  if ($wysiwygContainer.length) {
    $wysiwygContainer.append($nuevoblock);
  }

  setTimeout(() => {
    $list.listview().listview("refresh");
    $nuevoItem.trigger('create');
  }, 2);
}
  delwidg() {
  $(document).on("click", "button[name='delwid']", (e) => {
      const $li = $(e.target).closest("li");
      const uid = $li.attr("data-uid")
      const $parentUl = $li.parent();
      $li.remove();
      $(`[data-uid="${uid}"]`).remove();
      if ($parentUl.hasClass('ui-listview') || $parentUl.attr('data-role') === 'listview' || $parentUl.attr('name') === 'minilist') {
  try {
    $parentUl.listview('refresh');
  } catch (err) {
    // Si por alguna razón no estaba inicializada como listview, la forzamos
    $parentUl.listview().listview('refresh');
  }
}

// 4. Sincronizar cambios en el JSON
this.compilefile();
    });
}
  initSortables() {
    const self = this
  const sortOptions = {
    handle: ".move-handle",
    placeholder: "ui-state-highlight",
    connectWith: ".minilist-sortable, #docreate",
    axis: "y",
    cancel: "input, textarea, button, select, option",
    start: function(event, ui) {
      ui.placeholder.height(ui.item.height());
    },
    stop: function(event, ui) {
      $(this).listview('refresh');

// Sincronizar orden en WYSIWYG
const $container = $("#wysiwyg-content");
$("#docreate > li").each(function() {
  const uid = $(this).attr('data-uid');
  const $block = $container.find(`[data-uid="${uid}"]`);
  $container.append($block); // Mueve el elemento al final en el nuevo orden
});

getfile.compilefile();
    },
    receive: function(event, ui) {
      const type = ui.item.attr('pt-type');
      const allowed = ['text', 'badge', 'image'];
      if ($(this).hasClass('minilist-sortable') && allowed.indexOf(type) === -1) {
        $(ui.sender).sortable('cancel');
      }
    }
  };
  
  this.lista.sortable(sortOptions);
  $(".minilist-sortable").sortable(sortOptions);
}
}
class capacitorfuncs {
  constructor() {
    setTimeout(() => {
      this.isCapacitor = window.hasOwnProperty('Capacitor')
    }, 5)
  }
  async savefile(data) {
  if (!data) return;
  if (this.isCapacitor) {
    try {
      const { Share, Filesystem, FilePicker } = Capacitor.Plugins
      await Filesystem.writeFile({
        path: `Pretexto/${data.metadato.name.trim()}.nev`,
        data: JSON.stringify(data),
        directory: 'DATA',
        encoding: 'utf8',
        recursive: true
      });
      alert("Guardado")
    } catch (e) {
      alert("Error: " + e)
    }
  } 
}
async compartirNota() {
  let nombreArchivo = $("#namedoc").val() + '.nev'
  if (this.isCapacitor){
    try {
      const { Share, Filesystem, FilePicker } = Capacitor.Plugins
    let datosActuales = getfile.compilefile();
    let contenidoJSON = JSON.stringify(datosActuales);
    await Filesystem.writeFile({
      path: nombreArchivo,
      data: contenidoJSON,
      directory: 'CACHE',
      encoding: 'utf8'
    });
    const uriResult = await Filesystem.getUri({
      path: `${nombreArchivo}`,
      directory: 'CACHE'
    });
    await Share.share({
      title: 'Enviar Nota',
      files: [uriResult.uri],
      dialogTitle: 'Compartir nota con...'
    });
  } catch (e) {
    if (e.message !== "Share canceled") {
      alert("Error: " + e)
} 
  }
  }
}
async importarNota() {
  if (this.isCapacitor) {
    try {
      const { Share, Filesystem, FilePicker } = Capacitor.Plugins
    const result = await FilePicker.pickFiles({
      limit: 0,
      readData: true
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
      alert("Importacion Exitosa")
      this.listarDesdeDisco();
    } else {
      alert("Importacion cancelada")
    }
  } catch (e) {
    alert("Error: " + e)
  }
  }
  }
async listarDesdeDisco() {
  const $lista = $('#lista-notas-locales');
  $lista.empty();
  if (this.isCapacitor) {
    try {
      const { Share, Filesystem, FilePicker } = Capacitor.Plugins
    const result = await Filesystem.readdir({
      path: 'Pretexto',
      directory: 'DATA'
    });
    if (result.files.length === 0) {
      $lista.append('<li>No se encontraron notas</li>');
    } else {
      for (var i = 0; i < result.files.length; i++) {
        let file = result.files[i]
        if (file.name.endsWith('.nev')) {
          const nombreVisible = file.name.replace('.nev', '');
          const li = `<li>
                        <a href="#" @click="Capacitores.cargarNotaLocal('${file.name}')">
                           <h2> ${nombreVisible}</h2>
                        </a>
                        
                    </li>`;
          $lista.append(li);
        }
      }
    }
  } catch (e) {
    $lista.append('<li>Crea tu primera nota para empezar</li>');
  }
  }
  $lista.listview("refresh");
}
async cargarNotaLocal(fileName) {
  if (this.isCapacitor) {
    try {
      const { Share, Filesystem, FilePicker } = Capacitor.Plugins
    const contenido = await Filesystem.readFile({
      path: `Pretexto/${fileName}`,
      directory: 'DATA',
      encoding: 'utf8'
    });

    const nota = JSON.parse(contenido.data);
    getfile.cargarNotaEnEditor(nota);
    } catch (e) {
      alert('Error: ' + e)
      
    }
  }
}
async seleccionarImagen(btn) {
  if (this.isCapacitor) {
    try {
      const { Share, Filesystem, FilePicker } = Capacitor.Plugins
    const result = await FilePicker.pickFiles({
      types: ['image/*'],
      readData: true
    });
    if (result.files && result.files.length > 0) {
      const file = result.files[0];
      const base64Image = `data:${file.mimeType || 'image/jpeg'};base64,${file.data}`;
      const $li = $(btn).closest('li');
      const $inputHidden = $li.find('input[name="imagewid"]');
      const $previewDiv = $li.find('.img-preview-container');
      $inputHidden.val(base64Image);
      $previewDiv.html(`<img src="${base64Image}" style="width:100%; max-height:150px; object-fit:cover; border-radius:8px; margin-top:10px;">`);
    }
  } catch (e) {
    alert("Error: " + e)
  }
  }
}
}
const nav = `<div data-role="navbar" data-iconpos="left">
				<ul>
					<li><a @click="navi(0)" :class="hili[0]" href="#main" data-icon="home">Inicio</a></li>
					<li><a @click="navi(1)" :class="hili[1]" href="#notas" data-icon="nota">Notas</a></li>
					<li><a @click="navi(2)" :class="hili[2]" href="#calen" data-icon="calen">Calendario</a></li>
					<!--li><a @click="navi(3)" :class="hili[3]" href="#busca" data-icon="search">Buscar</a></li-->
				</ul>
			</div>`
const editnav = `<div data-role="navbar" data-iconpos="left">
       <ul>
        <li><a @click="naved(0)" :class="hiedit[0]" href="#wysiwyg" data-icon="nota" data-transition='none'>Documento</a></li>
        <li><a @click="naved(1)" :class="hiedit[1]" href="#edit" data-icon="bars" data-transition='none'>Widgets</a></li>
       </ul>
      </div>`
const keys = ["theme"]
let preferences = {
	theme: 'a'
}
let getfile = new Filer()
let Capacitores = new capacitorfuncs()
document.addEventListener('alpine:init', () => {
	Alpine.data('inicio', () => ({
		hili: ["ui-btn-active ui-state-persist","","","",""],
		hiedit: ["", "ui-btn-active ui-state-persist"],
		navbar: nav,
		editbar: editnav,
		navi(index){
		 this.hili = ["","","","",""]
		 this.hili[index] = "ui-btn-active ui-state-persist"
		},
		naved(index){
		  this.hiedit = ["",""]
		  this.hiedit[index] = "ui-btn-active ui-state-persist"
		},
		jqmtheme: preferences.theme,
		logo: "assets/ptlogo.svg",
		logocol() {
			this.logo = ["c", "d", "e"].includes(this.jqmtheme) ? "assets/ptlogoblack.svg" : "assets/ptlogo.svg"
		},
		makefile() {
		  $.mobile.loading('show')
		  let datafile = getfile.compilefile()
		  $.mobile.loading('hide')
		  Capacitores.savefile(datafile)
		  this.doc = getfile.docres
		},
		setheme(theme){
			preferences.theme = theme
			ajusdatasave(keys[0], preferences.theme)
			location.reload()
		},
		doc: getfile.docres,
	}))
})

function parsearSimbolos(texto) {
    if (!texto) return "";
    let procecedfile = texto
        .replace(/</g, '(')
        .replace(/>/g, ')')
        .replace(/&/g, '&amp')
        .replace(/"/g, '&quot')
        .replace(/'/g, '&#039')
        
        .replace(/\*([^*]+)\*/g, '<b>$1</b>')// *negrita*
        .replace(/•([^*]+)•/g, '<i>$1</i>')// •italica• (según tu símbolo)
        .replace(/_([^*]+)_/g, '<u>$1</u>')// _subrayado_
        .replace(/~([^*]+)~/g, '<s>$1</s>')// ~tachado~
  return procecedfile
}
$(document).on('ready', function() {
  
});
$(document).on("pageshow", "#notas", function() {
  Capacitores.listarDesdeDisco();
});
// 1. Variable global para no perder el norte
let lastFocusedElement = null;
let start = ''
let end = ''
let elwt
// 2. Capturamos el foco en cualquier editor
$(document).on('focusin', 'textarea, input.txt-nota, [contenteditable="true"]', function() {
  lastFocusedElement = this;
  actualizarCheckboxes(this);
});

// 3. La función maestra de formato
function aplicarFormato(tipo) {
  // 1. Buscamos el textarea que tiene el foco o el último activo
  const el = document.activeElement;
  if (!el || (el.tagName !== 'TEXTAREA' && el.tagName !== 'INPUT')) {
    console.warn("No hay un campo de texto activo");
    return;
  }
  
  const s = { 'stng': '*', 'ital': '•', 'unde': '_', 'stri': '~' } [tipo];
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const texto = el.value;
  
  // 2. Lógica de inserción/eliminación de símbolos
  const seleccionado = texto.substring(start, end);
  
  // Si ya tiene los símbolos, los quitamos (Toggle)
  if (texto.substring(start - 1, start) === s && texto.substring(end, end + 1) === s) {
    const nuevoTexto = texto.substring(0, start - 1) + seleccionado + texto.substring(end + 1);
    $(el).val(nuevoTexto);
    el.setSelectionRange(start - 1, end - 1);
  } else {
    // Si no los tiene, los ponemos
    const nuevoTexto = texto.substring(0, start) + s + seleccionado + s + texto.substring(end);
    $(el).val(nuevoTexto);
    el.setSelectionRange(start + 1, end + 1);
  }
  
  // 3. Forzar actualización y mantener teclado abierto
  $(el).trigger('input'); // Para que compile la vista previa
  setTimeout(() => el.focus(), 10);
  actualizarCheckboxes(el);
}
function actualizarCheckboxes(el) {
  if (!el) return;
  
  let bold, ital, unde, stri;
  
  if (el.isContentEditable ||  $(el).prop('contenteditable') === 'true') {
    bold = document.queryCommandState("bold");
    ital = document.queryCommandState("italic");
    unde = document.queryCommandState("underline");
    stri = document.queryCommandState("strikeThrough");
  } else {
  const start = el.selectionStart;
  const texto = el.value;
  const comprobar = (s) => {
    const antes = texto.substring(0, start);
    const despues = texto.substring(start);
    return antes.lastIndexOf(s) !== -1 && despues.indexOf(s) !== -1;
  }
  bold = comprobar('*');
    ital = comprobar('•');
    unde = comprobar('_');
    stri = comprobar('~');
  }
  $('#stng').prop('checked', bold).checkboxradio("refresh");
  $('#ital').prop('checked', ital).checkboxradio("refresh");
  $('#unde').prop('checked', unde).checkboxradio("refresh");
  $('#stri').prop('checked', stri).checkboxradio("refresh");
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
