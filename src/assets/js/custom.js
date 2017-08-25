$(document).ready(function(){
    
    $(".range-slider").each(function(){
        var slider = $(this),
            value = slider.val(),
            kms = Math.round(parseInt(value) / 1000),
            result = slider.parent().find('.current-range-slider');
            result.text(kms+" K. M.");

    });

    $(".range-slider").on('change',function(){
        var slider = $(this),
            value = slider.val(),
            kms = Math.round(parseInt(value) / 1000),
            result = slider.parent().find('.current-range-slider');
            result.text(kms+" K. M.");
    });

});