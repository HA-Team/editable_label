isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function editable_label(label_class, input_class, options){
    $("."+label_class).click(function(){
        $("."+label_class).unbind('click');
        var label = $(this);
        var old_text = label.text()
        $(this).replaceWith(
            '<input id="temp_edit_input" type="text" value="'+label.text()+'" class="'+input_class+'">'
        );
        if('mask' in options){
            $("#temp_edit_input").inputmask(options['mask'], {
                placeholder:" ",
                clearMaskOnLostFocus: true
            });
        };
        $("#temp_edit_input").select();
        $("#temp_edit_input").focusout(function(){
            if($("#temp_edit_input").val() != ""){
                label.text($("#temp_edit_input").val());
            }
            else{
                label.text(old_text)
            }
            $("#temp_edit_input").replaceWith(label)
            editable_label(label_class, input_class, options)
        });
    });
}
