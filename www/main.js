class Filer {
  constructor() {
    setTimeout(() => {
      this.lista = $("#docreate")
      this.docres = ""
    }, 2)
  }
  compilefile() {
    this.lista = $("#docreate")
    if (!this.lista.length) return;
    const widgets = this.lista.children();
    let file = {
      metadato: {
        filetype: "pretexto-note",
        ver: "1.0",
        date: new Date().toDateString(),
        time: new Date().toTimeString(),
        name: $("#namedoc").val() || "Sin titulo",
      },
      dataWid: []
    };
    this.docres = ''
    for (let i = 0; i < widgets.length; i++) {
      const widget = $(widgets[i]); // Envolvemos en jQuery
      const tipo = widget.attr('pt-type');
      let datosWidget = { tipo: tipo };
      switch (tipo) {
        case 'title':
          datosWidget.valor = widget.find('input[name="titlewid"]').val() || "";
          datosWidget.estilo = widget.find('select[name="titlestyle"]').val() || "a";
          this.docres += `<div class="ui-bar-${datosWidget.estilo} p-2"><h1>${parsearSimbolos(datosWidget.valor)}</h1></div>`
          break;
        case 'text':
         datosWidget.valor = widget.find('textarea[name="textwid"]').val() || "";
          datosWidget.posicion = widget.find('select[name="textpos"]').val() || "left";
          datosWidget.liston = widget.find('select[name="textribon"]').val() || "false"
          datosWidget.valorlis = widget.find('input[name="textrib"]').val() || ""
          datosWidget.posicionlis = widget.find('select[name="textribpos"]').val() || " "
          datosWidget.colorlis = widget.find('select[name="textribcol"]').val() || "red"
          if (datosWidget.liston == "true") {
            this.docres += `<div class="ui raised segment" style="margin: 10px;"><span class="ui ${datosWidget.colorlis} ${datosWidget.posicionlis} ribbon label">${parsearSimbolos(datosWidget.valorlis)}</span><p align="${datosWidget.posicion}" style="color: #000;" class="p-1">${parsearSimbolos(datosWidget.valor)}</p></div>`
          } else {
            this.docres += `<div class="ui raised segment" style="margin: 10px;"><p align="${datosWidget.posicion}" style="color: #000;" class="p-1">${parsearSimbolos(datosWidget.valor)}</p></div>`;
          }
          break;
        case 'badge':
          datosWidget.valor = widget.find('input[name="badwid"]').val() || "";
          datosWidget.semantica = widget.find('select[name="badcol"]').val() || "primary";
          datosWidget.tema = widget.find('select[name="badtheme"]').val() || "light";
          this.docres += `<div class="badge badge-${datosWidget.semantica}" data-theme="${datosWidget.tema}">${parsearSimbolos(datosWidget.valor)}</div>`;
          break;
        case 'div':
          this.docres += `<hr/>`;
          break;
        case 'flow':
          const listFlow = widget.find("ul[name='minilist']");
          const innerWid = listFlow.children();
          let flowHtml = `<div class="flowui p-2">`;
          datosWidget.minilista = [];
          for (let j = 0; j < innerWid.length; j++) {
            const miniwidget = $(innerWid[j]); // Envolvemos en jQuery
            const innerType = miniwidget.attr("pt-type");
            let innerDatosWidget = { subtipo: innerType };
            switch (innerType) {
              case 'text':
                innerDatosWidget.valor = miniwidget.find('textarea[name="textwid"]').val() || "";
                innerDatosWidget.posicion = miniwidget.find('select[name="textpos"]').val() || "left";
                innerDatosWidget.liston = miniwidget.find('select[name="textribon"]').val() || "false"
                innerDatosWidget.valorlis = miniwidget.find('input[name="textrib"]').val() || ""
                innerDatosWidget.posicionlis = miniwidget.find('select[name="textribpos"]').val() || " "
                innerDatosWidget.colorlis = miniwidget.find('select[name="textribcol"]').val() || "red"
                if (innerDatosWidget.liston == "true") {
                flowHtml += `<div class="ui raised segment" style="margin: 10px;"><span class="ui ${innerDatosWidget.colorlis} ${innerDatosWidget.posicionlis} ribbon label">${parsearSimbolos(innerDatosWidget.valorlis)}</span><p align="${innerDatosWidget.posicion}" style="color: #000;" class="p-1">${parsearSimbolos(innerDatosWidget.valor)}</p></div>`
                } else {
                flowHtml += `<div class="ui raised segment" style="margin: 10px;"><p align="${innerDatosWidget.posicion}" style="color: #000;" class="p-1">${parsearSimbolos(innerDatosWidget.valor)}</p></div>`;
                }
                break;
              case 'badge':
                innerDatosWidget.valor = miniwidget.find('input[name="badwid"]').val() || "";
                innerDatosWidget.semantica = miniwidget.find('select[name="badcol"]').val() || "primary";
                innerDatosWidget.tema = miniwidget.find('select[name="badtheme"]').val() || "light";
                flowHtml += `<div class="badge badge-${innerDatosWidget.semantica}" data-theme="${innerDatosWidget.tema}">${parsearSimbolos(innerDatosWidget.valor)}</div>`;
                break;
              case 'image':
                innerDatosWidget.url = miniwidget.find('input[name="imagewid"]').val() || ""
                innerDatosWidget.estilo = miniwidget.find('select[name="imagepos"]').val() || "circular"
                if (innerDatosWidget.url) {
                flowHtml += `<div class="ui ${innerDatosWidget.estilo} image"><img src="${innerDatosWidget.url}"></div>`;
                }
                break;
            }
            datosWidget.minilista.push(innerDatosWidget);
          }
          flowHtml += "</div>";
          this.docres += flowHtml;
          break;
        case 'image':
          datosWidget.url = widget.find('input[name="imagewid"]').val() || ""
          datosWidget.estilo = widget.find('select[name="imagepos"]').val() || "circular";
          if (datosWidget.url) {
            this.docres += `<div class="ui ${datosWidget.estilo} image"><img src="${datosWidget.url}"></div>`;
          }
          break;
        default:
          console.warn("Tipo de widget no reconocido:", tipo);
      }
      file.dataWid.push(datosWidget);
    }
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
      this.addtodoc(typewid)
      let actwid = this.lista.children().last()
        switch (typewid) {
          case 'title':
            actwid.find("input[name='titlewid']").val(wid[i].valor || '')
            actwid.find("select[name='titlestyle']").val(wid[i].estilo || 'a')
            break;
          case 'text':
            actwid.find("textarea[name='textwid']").val(wid[i].valor || '')
            actwid.find("select[name='textpos']").val(wid[i].posicion || 'left')
            actwid.find("input[name='textrib']").val(wid[i].valorlis || '')
            actwid.find("select[name='textribon']").val(wid[i].liston || 'false')
            actwid.find("select[name='textribpos']").val(wid[i].posicionlis || ' ')
            actwid.find("select[name='textribcol']").val(wid[i].colorlis || 'red')
            break;
          case 'badge':
            actwid.find("input[name='badwid']").val(wid[i].valor || '')
            actwid.find("select[name='badcol']").val(wid[i].semantica || 'primary')
            actwid.find("select[name='badtheme']").val(wid[i].tema || 'light')
            break;
          case 'div':
            // omitible
            break;
          case 'flow':
            let miniwid = wid[i].minilista
            for (var j = 0; j < miniwid.length; j++) {
              let minitypewid = miniwid[j].subtipo
              let addbtn = actwid.find("button[name='addwid']")
              this.addtolist(minitypewid, addbtn)
              let miniactwid = actwid.children().last()
              switch (minitypewid) {
                case 'text':
                  miniactwid.find("textarea[name='textwid']").val(miniwid[j].valor || '')
                  miniactwid.find("select[name='textpos']").val(miniwid[j].posicion || 'left')
                  miniactwid.find("input[name='textrib']").val(miniwid[j].valorlis || '')
                  miniactwid.find("select[name='textribon']").val(miniwid[j].liston || 'false')
                  miniactwid.find("select[name='textribpos']").val(miniwid[j].posicionlis || ' ')
                  miniactwid.find("select[name='textribcol']").val(miniwid[j].colorlis || 'red')
                  break;
                case 'badge':
                  miniactwid.find("input[name='badwid']").val(miniwid[j].valor || '')
                  miniactwid.find("select[name='badcol']").val(miniwid[j].semantica || 'primary')
                  miniactwid.find("select[name='badtheme']").val(miniwid[j].tema || 'light')
                  break;
                case 'image':
                  miniactwid.find("input[name='imagewid']").val(miniwid[j].url || '')
                  miniactwid.find("select[name='imagepos']").val(miniwid[j].estilo || 'circular')
                  // Mostrar la miniatura si ya tiene datos
                  if(miniwid[j].url) {
                    miniactwid.find(".img-preview-container").html(`<img src="${miniwid[j].url}" style="max-height:100px;"/>`);
                    
                  }
                  break;
                default:
                  // Tab to edit
              }
            }
            break;
          case 'image':
            actwid.find("input[name='imagewid']").val(wid[i].url || '')
            actwid.find("select[name='imagepos']").val(wid[i].estilo || 'circular')
            // Mostrar la miniatura si ya tiene datos
            if(wid[i].url) {
              actwid.find(".img-preview-container").html(`<img src="${wid[i].url}" style="max-height:100px;"/>`);
            }
            break;
          default:
            // Tab to edit
        }
    }
    setTimeout(() => {
      this.compilefile(); 
      $.mobile.changePage("#view");
    }, 5)
    
  }
  addtodoc(type) {
	if (!this.lista.length) return;
	let html
	let uid = Math.random()
	switch (type) {
		case 'title':
			html = `<li pt-type="title">
        <h1 class="setui">Titulo<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <input type="text" name="titlewid" value="" class="squircle" placeholder="Título"/>
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
        <h1 class="setui">Texto<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="widui">
         <input type="text" name="textrib" placeholder="Texto del liston">
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
         <hr />
         <span class="setui">
          <textarea name="textwid" rows="8" cols="20" class="squircle txt-nota"  placeholder="Texto principal"></textarea>
         <select name="textpos" data-native-menu="false" data-mini="true">
          <option value="left">◧</option>
          <option value="center">▣</option>
          <option value="right">◨</option>
          <option value="justify">⬛︎</option>
         </select>
         </span>
        </span>
       </li>`
      break;
      case "badge":
      	html = `<li pt-type="badge">
        <h1 class="setui">Etiqueta<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <input type="text" name="badwid" value="" class="squircle" placeholder="Texto de la etiqueta"/>
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
        <h1 class="setui">Divisor<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
       </li>`
      break;
      case "flow":
      	html = `<li pt-type="flow">
        <h1 class="setui">Contenedor<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext" data-mini="true"></button></h1>
         <span class="setui">
          <button popovertarget="popminiadd-${uid}" name="addwid" style="anchor-name:--addminiwid-${uid}" data-icon="plus">Widget</button>
          <ul class="dropdown menu rounded-box bg-base-300 squircle" popover id="popminiadd-${uid}" style="position-anchor:--addminiwid-${uid}">
        <li><button data-role="none" class="squircle edit-btn" @click="getfile.addtolist('text', $el)">Texto</button></li>
        <li><button data-role="none" class="squircle edit-btn" @click="getfile.addtolist('badge', $el)">Etiqueta</button></li>
        <li><button data-role="none" class="squircle edit-btn" @click="getfile.addtolist('image', $el)">Imagen</button></li>
       </ul>
         </span>
         <div>
          <ul data-role="listview" data-inset="true" name="minilist" class="squircle sortable minilist-sortable">
          </ul>
         </div>
       </li>`
      break;
    case "image":
      html = `<li pt-type="image">
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
      break;
		default:
			// Tab to edit
	}
	const $nuevoItem = $(html);
	this.lista.append($nuevoItem);
	setTimeout(() => {
  this.lista.listview("refresh").trigger('create');
  $nuevoItem.trigger('create');
}, 2);
	this.initSortables()
	this.delwidg()
}
  addtolist(type, element) {
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
        <h1 class="setui">Texto<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="widui">
         <input type="text" name="textrib" placeholder="Texto del liston">
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
         <hr />
         <span class="setui">
          <textarea name="textwid" rows="8" cols="20" class="squircle txt-nota"  placeholder="Texto principal"></textarea>
         <select name="textpos" data-native-menu="false" data-mini="true">
          <option value="left">◧</option>
          <option value="center">▣</option>
          <option value="right">◨</option>
          <option value="justify">⬛︎</option>
         </select>
         </span>
        </span>
       </li>`
      break;
      case "badge":
      	html = `<li pt-type="badge">
        <h1 class="setui">Etiqueta<div class="move-handle ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all ui-mini"></div><button name="delwid" data-icon="delete" data-iconpos="notext"></button></h1>
        <span class="setui">
         <input type="text" name="badwid" value="" class="squircle" placeholder="Texto de la etiqueta"/>
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
    case "image":
      html = `<li pt-type="image">
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
      break;
		default:
	}
	const $nuevoItem = $(html)
	$list.append($nuevoItem);
	setTimeout(() => {
	  $list.listview().listview("refresh");
	  $nuevoItem.trigger('create')
	},2)
}
  delwidg() {
  const self = this;
  this.lista = $("#docreate");
  this.lista.off("click.borrar").on("click.borrar", "button[name='delwid']", function(e) {
    const $itemAEliminar = $(this).closest("li");
    const $listaPadre = $itemAEliminar.parent();
    $itemAEliminar.remove();
    if (self.lista.length) {
      self.lista.listview("refresh");
    }
    if ($listaPadre.attr('name') === 'minilist') {
      $listaPadre.listview("refresh");
    }
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
      $(this).listview('refresh')
      ui.item.parent().listview("refresh");
      setTimeout(function() {
        if (typeof showres === "function") showres();
      }, 5);
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
const nav = `<div data-role="navbar" data-iconpos="top">
				<ul>
					<li><a @click="navi(0)" :class="hili[0]" href="#main" data-icon="home">Inicio</a></li>
					<li><a @click="navi(1)" :class="hili[1]" href="#notas" data-icon="nota">Notas</a></li>
					<li><a @click="navi(2)" :class="hili[2]" href="#calen" data-icon="calen">Calendario</a></li>
					<!--li><a @click="navi(3)" :class="hili[3]" href="#busca" data-icon="search">Buscar</a></li-->
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
$(document).on("pageshow", "#notas", function() {
  Capacitores.listarDesdeDisco();
});
let ultimoTextarea = null;
$(document).on('focus click keyup', '.txt-nota', function() {
  ultimoTextarea = this;
  actualizarCheckboxes(this);
});
$(document).on('change', '#stng, #ital, #unde, #stri', function(e) {
  if (!ultimoTextarea) {
    $(this).prop('checked', false).checkboxradio("refresh");
    return;
  }
  const el = ultimoTextarea;
  let start = el.selectionStart;
  let end = el.selectionEnd;
  let texto = $(el).val();
  const simbolos = { 'stng': '*', 'ital': '•', 'unde': '_', 'stri': '~' };
  let s = simbolos[this.id];
  const yaTiene = texto.substring(start - 1, start) === s && texto.substring(end, end + 1) === s;
  if (yaTiene) {
    const nuevoTexto = texto.substring(0, start - 1) + texto.substring(start, end) + texto.substring(end + 1);
    $(el).val(nuevoTexto);
    el.setSelectionRange(start - 1, end - 1);
  } else {
    const seleccionado = texto.substring(start, end);
    const nuevoTexto = texto.substring(0, start) + s + seleccionado + s + texto.substring(end);
    $(el).val(nuevoTexto);
    el.setSelectionRange(start + 1, end + 1);
  }
  el.focus();
  actualizarCheckboxes(el);
});
function actualizarCheckboxes(el) {
  if (!el) return;
  const start = el.selectionStart;
  const texto = el.value;
  const comprobar = (s) => {
    const antes = texto.substring(0, start);
    const despues = texto.substring(start);
    return antes.lastIndexOf(s) !== -1 && despues.indexOf(s) !== -1;
  };
  $('#stng').prop('checked', comprobar('*')).checkboxradio("refresh");
  $('#ital').prop('checked', comprobar('•')).checkboxradio("refresh");
  $('#unde').prop('checked', comprobar('_')).checkboxradio("refresh");
  $('#stri').prop('checked', comprobar('~')).checkboxradio("refresh");
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
