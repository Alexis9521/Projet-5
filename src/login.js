/*
$('#login_link').click(function() {
    $('#login').toggle();
});


$('#blocPageBase').click(function () {

    $('#login').css('display', 'none');

});
*/
function openLogin() {

   $('#login').toggle();

}

function closeLogin() {

    $('#login').css('display' , 'none');

}

let open = $('#loginLink').click(function () {

    openLogin();

});

let close = $('#blocPageBase').click(function () {

    closeLogin();

});