function checkWindowWidth() {
    var isTablet = $(window).width() <= 768;

    if (!isTablet) {
        $('#collapsibleNavbar').collapse('hide');
    } else {
        $('#dropdownMenu').dropdown('hide');
    }

    // console.log(isTablet);
};

(function(){
    checkWindowWidth();

    $( window ).resize(checkWindowWidth);
}());