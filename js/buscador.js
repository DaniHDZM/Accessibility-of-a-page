$(function()
{
    $( ".textoBuscador" ).autocomplete({
        minLength: 2,
        delay: 20,
        source: "/search/searchAutocomplete",
        select: function(event, ui) {
            location.href = ui.item.id;
        }
    });
});