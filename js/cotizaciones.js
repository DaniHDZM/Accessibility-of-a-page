$(document).ready(function(){

    var itemArray = [];
    var nuevoValor = [];
    var itemsExitentes = [];

    if(localStorage.getItem("items") == null || localStorage.getItem("items") == undefined || localStorage.getItem("items") == "" || localStorage.getItem("items") == false){
        itemArray[0];
        localStorage.setItem("items", JSON.stringify(itemArray));
    }

     //localStorage.clear();

    // Replica informacion del campo de comentario de cotizaciones
    $(':input[name="comentarioSolicitud"]').change(function(){
        var valor = $(this).val();
        console.log("cambio valor"+valor);
        //var atributo = $(this).attr("name");
        //console.log(atributo);
        $(':input[name="comentarioSolicitud"]').val(valor);
    });

    $(".producto-cotizado").click(function() {
        var item = $(this).children('.item_id').html();
        agregarItem(item);
        console.log('el final del script '+localStorage.getItem("items"));
    });

    $('.producto-cotizacion').on('click', '.eliminar-item', function(){
        eliminarItem($(this).attr("data-val"));
    });

    var agregarItem = function(itemId)
    {
        var dataLocal = localStorage.getItem("items");

        // Verifica si el elemento "items" cuenta con datos
        if(JSON.parse(localStorage.getItem("items")).length > 0){
            // Se elimina la serializacion que se tiene sobre el localStorage y se deja en un array
            itemsExitentes = JSON.parse(dataLocal);

            // Se valida que el item a agregar no exita en "items"
            if($.inArray(itemId, itemsExitentes) < 0){
                $.each(itemsExitentes, function(index, value){
                    cont = index;
                    nuevoValor[index] = value;
                });

                cont = cont+1;
                nuevoValor[cont] = itemId;

                localStorage.setItem("items", JSON.stringify(nuevoValor));
                crearItem(itemId,'nuevo');
            }else{
                alert('El producto ya existe en el carrito de cotizaciones.');
            }
        }
        else{
            itemArray[0] = itemId;
            itemsExitentes = JSON.parse(dataLocal);
            if($.inArray(itemId, itemsExitentes) < 0) {
                localStorage.setItem("items", JSON.stringify(itemArray));
                crearItem(itemId, 'nuevo');
            }
        }
    }

    var crearItem = function (itemId, tipoItem)
    {
        // Trae informacion del producto para imprimirlo en pantalla
        $.ajax({
            url: "/producto-info",
            method: "GET",
            data: {item: itemId},
            dataType: 'json',
            success: function (res) {
                if (res.prdImage) {

                    mesajeCarritoVacio(0);


                    $('.producto-cotizacion.divProductos').append('' +
                        '<div id="div-producto-cotizacion" class="divi-producto-cotizacion '+itemId+'">' +
                        '   <div class="div-producto-columna">' +
                        '       <a href="/producto/'+res.slug+'"><img src="https://13657d6550b38e99c02d-008ddcec1c290f12fc40f53894ee5c6b.ssl.cf2.rackcdn.com/' + res.prdImage + '" width="100"></a>' +
                        '   </div>' +
                        '   <div class="div-producto-columna">' +
                        '       <div>' + res.description + '</div>' +
                        '   </div>' +
                        '   <div class="div-producto-columna quitar">' +
                        '       <a class="quitar-item w-inline-block" data-ix="quita-articulo-a-cotizar" href="#">' +
                        '           <div class="eliminar-item" data-val="'+itemId+'">x</div>' +
                        '       </a>' +
                        '   </div>' +
                        '</div>');

                    $('#cotizar_productos').val(JSON.parse(localStorage.getItem("items")));

                    if(tipoItem == 'nuevo')
                        temblar();
                    else
                        numeroItems();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR) {
                    alert('Se ha presentado un error cargando los items a cotizar. \n Por favor informar al administrador del sistema.');
                }
            }
        })
    }

    var eliminarItem = function (itemId)
    {
        itemsExitentes = JSON.parse(localStorage.getItem("items"));

        nuevoValor = [];
        contNuevo = 0;

        $.each(itemsExitentes, function(index, value){
           if(value != itemId){
               nuevoValor[contNuevo] = value;
               contNuevo = contNuevo+1;
           }
        });

        localStorage.setItem('items', JSON.stringify(nuevoValor));

        console.log(localStorage.getItem('items'));

        $("."+itemId).remove();

        numeroItems();
    }

    var numeroItems = function()
    {
        if(JSON.parse(localStorage.getItem("items")).length > 0){
            $("#contador-items").css("display", "block");
            $("#numero-items").html(JSON.parse(localStorage.getItem("items")).length);
            $("#totalCotizaciones").text("Mis Cotizaciones: ("+JSON.parse(localStorage.getItem("items")).length+")");
        }
        else{
            $("#contador-items").css("display", "none");
            $("#numero-items").html('0');
            $("#totalCotizaciones").text("Mis Cotizaciones:");
            mesajeCarritoVacio(1);
        }

    }

    var temblar = function()
    {
        for(var i = 0; i<4; i++){
            $("#cotizacion-label").animate({right: "5"}, 60);
            $("#cotizacion-label").animate({right: "-5"}, 60);

            numeroItems();

        }
    }

    var mesajeCarritoVacio = function(ver)
    {
        if(ver == 1){
            x= $('.producto-cotizacion.divProductos').append('' +
                '<div id="div-mensaje" class="divi-mensaje-cotizacion">' +
                '   <div class="div-producto-columna padding-txt-cot">' +
                '       Agrega productos para cotizar visitando las páginas de los productos o simplemente escríbelos en la sección de comentarios y envíanos tu solicitud.' +
                '   </div>' +
                '</div>');
            return x;
        }
        else {
            x = $("#div-mensaje").css("display", "none");
            return x;
        }
    }

    if(JSON.parse(localStorage.getItem('items')).length > 0){
        var carga = JSON.parse(localStorage.getItem('items'));
        $.each(JSON.parse(localStorage.getItem("items")), function(index,value){
            crearItem(value, 'antiguo');
        });
    }
    else{
        mesajeCarritoVacio(1);
    }

    /*// Valida antes de mostrar opcion de cotizar en carrito de cotizaciones
    if($.inArray($("#productoPrincipal").html(), JSON.parse(localStorage.getItem("items"))) < 0){
        console.log($("#productoPrincipal").html())
    }
    else
        console.log("No vale la pena mostrar")
    */


});