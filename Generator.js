var expanded = false;

$(".elem").click(function () {
    var elem = $(this);
    if(!elem.hasClass("expand_more")){
        elem.toggleClass("expand");
        elem.parent().toggleClass("WithLarge");
        elem.children(".bar").toggleClass("visible");
        elem.children(".expand_button").toggleClass("visible");
        if($(this).parent().hasClass("right")){
            $(".left").toggleClass("shift_left");
        } else if($(this).parent().hasClass("left")){
            $(".right").toggleClass("shift_right");
        }
    }
});

$(".expand_button").click(function(e){
    $(this).parent().children(".bar").toggleClass("visible");
    $(this).parent().toggleClass("expand_more");
    $(this).parent().toggleClass("expand");
    $(this).parent().children(".expand_button").toggleClass("visible");
    $(this).parent().children(".close_button").toggleClass("visible");
    $(".left").toggleClass("shift_more_left");
    $(".right").toggleClass("shift_more_right");
    $(".fully_expanded_information").show();
    if($(this).parent().parent().hasClass("right")){
        $(this).parent().toggleClass("expand_more_shift_left");
        $(".left").toggleClass("shift_left");
    } else if($(this).parent().parent().hasClass("left")){
        $(this).parent().toggleClass("expand_more_shift_right");
        $(".right").toggleClass("shift_right");
    }
    expanded = true;
});

$(".close_button").click(function(e){
    $(this).parent().children(".bar").toggleClass("visible");
    $(".fully_expanded_information").hide();
    $(this).parent().toggleClass("expand_more");
    $(".right").toggleClass("shift_more_right");
    $(".left").toggleClass("shift_more_left");
    $(this).parent().toggleClass("expand");
    $(this).parent().children(".expand_button").toggleClass("visible");
    $(this).parent().children(".close_button").toggleClass("visible");
    if($(this).parent().parent().hasClass("right")){
        $(this).parent().toggleClass("expand_more_shift_left");
        $(".left").toggleClass("shift_left");
    } else if($(this).parent().parent().hasClass("left")){
        $(this).parent().toggleClass("expand_more_shift_right");
        $(".right").toggleClass("shift_right");
    }
    $(".ready_for_selection").removeClass("ready_for_selection");
    expanded = false;
});

$(".menu").click(function () {
    console.log("---------");
    if(expanded){
        $(this).children(0).hide();
        $(".third_button_set").show();
    } else {
        $(this).children(0).hide();
        $(".first_button_set").show();
    }
    $(this).toggleClass("expanded_menu");
    $("button").toggleClass("visible");
    $(".menu_indicator").toggle(150);

});

$(".first_button_set > .left_scroll_button").click(function (click_event) {
    click_event.stopPropagation();
    $(this).parent().hide();
    $(".second_button_set").show();
});
$(".second_button_set > .left_scroll_button").click(function (click_event) {
    click_event.stopPropagation();
    $(this).parent().hide();
    $(".first_button_set").show();
});
$(".first_button_set > .right_scroll_button").click(function (click_event) {
    click_event.stopPropagation();
    $(this).parent().hide();
    $(".second_button_set").show();
});
$(".second_button_set > .right_scroll_button").click(function (click_event) {
    click_event.stopPropagation();
    $(this).parent().hide();
    $(".first_button_set").show();
});

$("button").click(function(event){
    event.stopPropagation();
});

$(".menu_button_small_edit").click(function(){
    $(".menu").trigger("click");
    $(".edit_container").toggle();
});

$(".menu_button_mark").click(function(){
    $(".menu_button_mark").toggleClass("mark_clicked");
    $(".menu").trigger("click");
    $(".expand_more").children().each(function(){
        if($(this).hasClass("fully_expanded_information")){
            $(this).children().each(function(){
                $(this).toggleClass("ready_for_selection");
            });
        } else if(!$(this).hasClass("close_button")) {
            $(this).toggleClass("ready_for_selection");
        }
    });
});

$(".info_element").click(function(){
    if($(this).hasClass("ready_for_selection")) {
        $(this).toggleClass("ready_for_selection");
        $(this).toggleClass("selected");
    }
});

$(".menu_button_send").click(function(){
    $(".menu_button_mark").toggleClass("mark_clicked");
    var send_box = $("<div />", {
       class: "send_box"
    });
        var send_to_container = $("<div />", {
            class: "adaptive_placeholder_input_container"
        });
            var send_to_input = $("<input />", {
                class: "adaptive_input",
                type: "text",
                required: "required"
            });
            var send_to_label = $("<label />", {
                class: "adaptive_placeholder",
                placeholder: "Send To",
                alt: "Sent To"
            });
        var note_container = $("<div />", {
            class: "adaptive_placeholder_input_container"
        });
            var note_input = $("<textarea />", {
                class: "adaptive_input note_input",
                required: "required"
            });
            var note_label = $("<label />", {
                class: "adaptive_placeholder note_label",
                placeholder: "Notes",
                alt: "Notes"
            });
        var send_button = $("<button />", {
            class: "send_button",
            text: "Send",
            click: function(){
                $(this).parent().remove();
                append_sent_notification();
            }
        });
            send_to_container.append(send_to_input);
            send_to_container.append(send_to_label);
        send_box.append(send_to_container);
            note_container.append(note_input);
            note_container.append(note_label);
        send_box.append(note_container);
        send_box.append(send_button);
    $(".container").append(send_box);
});

function append_sent_notification(){
    var send_box = $("<div />", {
        class: "send_box"
    });
        var sent_notification = $("<div />", {
            class: "notification",
            text: "Sent"
        });
        var send_button = $("<button />", {
            class: "sent_button",
            text: "ok",
            click: function(){
                $(this).parent().remove();
                $(".ready_for_selection").removeClass("ready_for_selection");
                $(".selected").removeClass("selected");
                $(".menu").trigger("click");
            }
        });
    send_box.append(sent_notification);
    send_box.append(send_button);
    $(".container").append(send_box);
}

$(".selection").click(function () {
    var currently_expanded = $(".expanded");
    $(this).toggleClass("header");
    $(this).toggleClass("expanded");
    //$(this).children(0).toggleClass("invisible"); $(this).children(0).toggleClass("visible");
    //$(this).children(1).toggleClass("visible"); $(this).children(1).toggleClass("invisible");
    if ($(this).hasClass("edit-left")) {
        $(this).toggleClass("edit-left");
        currently_expanded.toggleClass("edit-left");
    } else {
        $(this).toggleClass("edit-right");
        currently_expanded.toggleClass("edit-right");
    }
    currently_expanded.toggleClass("expanded");
    currently_expanded.toggleClass("header");
    $(currently_expanded).children(0).toggleClass("invisible");
    $(this).children(0).toggleClass("visible");
    $(currently_expanded).children(1).toggleClass("visible");
    $(this).children(1).toggleClass("invisible");
});
$(".status_option").click(function () {
    $(".status_option").toggleClass("selected_status");
    //    $(this).toggleClass("selected");
});
$(".footer").click(function(){
    $(this).parent().remove();
});