$(document).ready(function(){

    $('#email-form-sdec').on('submit', function(e) {
        $("#loadingCotiza").show();
        $("#confirmacionSdeC").hide();
        e.preventDefault()
        //alert($('#cotizar_productos').val());
        $('#cotizar_productos').val();

        let data = $("#email-form-sdec").serializeArray();
        console.log(data);

        $.ajax({
            method: 'GET',
            url: '/cotizacionAbandonada',
            data: {data},
            dataType: "json",
        }).done(function(trd) {
            $('form').off('submit')
            $('form').submit()
        })
        /*
        $.get( "cotizacionAbandonada", {data:data})
            .done( function(res){
                if(res === true){
                    $('form').off('submit')
                    $('form').submit()
                }

            });
        */
    });

});