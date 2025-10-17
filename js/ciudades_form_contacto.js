$(function()
{
    $(".tab-paises").click(function(){
        //alert($(this).attr("data-w-tab"));
        $(".tabsxxx").val($(this).attr("data-w-tab"));
    });

    $( ".ciudad_nombre" ).keypress(function() {
        $(".loading").show();

        $( ".ciudad_nombre" ).autocomplete({
            minLength: 2,
            delay: 20,
            close: function(){$(".loading").hide()},
            source: "/search/autocomplete",
            select: function(event, ui) {
                if(ui.item.id == 0){
                    $('.ciudad_ID').val(ui.item.id);
                    $('.ciudad_nombre').val('');
                    event.preventDefault(event);
                }
                else{
                    $('.ciudad_nombre').val(ui.item.value);
                    $('.ciudad_ID').val(ui.item.id);
                    $('.ciudad_indicativo').val(ui.item.indicativo);
                }
            }
        });
    });
});