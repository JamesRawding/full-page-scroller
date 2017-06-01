var scroller = {};

scroller.currentHeight = $(window).height();
scroller.fullScreenElement = $('.jsFullScreen');
scroller.totalHeight = scroller.currentHeight * scroller.fullScreenElement.length;
scroller.i = 0;

//this gets current position of window, this variable is set on window load so position isnt set before images are rendered
$(window).load(function () {
    scroller.currentPosition = $(window).scrollTop();
    scroller.hideUp();
    scroller.hideDown();
});



//sets height of div to height of window
scroller.fullScreenElement.css('height', scroller.currentHeight);


//resets height variable on window resize
$(window).resize(function () {
    scroller.currentHeight = $(window).height();
    scroller.fullScreenElement.css('height', scroller.currentHeight);
    scroller.totalHeight = scroller.currentHeight * scroller.fullScreenElement.length;

});



//hides up arrow when page is at top
scroller.hideUp = function () {
    if (scroller.currentPosition === 0) {
        $('.triggerUp').fadeOut("slow", function () {
        });
    } else {
        $('.triggerUp').fadeIn("slow", function () {
        });
    }
};

//hides down arrow when page is at bottom
scroller.hideDown = function () {
    if (scroller.currentPosition + scroller.currentHeight === scroller.totalHeight) {
        $('.triggerDown').fadeOut("slow", function () {
        });
    } else {
        $('.triggerDown').fadeIn("slow", function () {
        });
    }
};



//Scrolls elements up
scroller.scrollUp = function () {
    $("html, body").animate({scrollTop: scroller.currentPosition - scroller.currentHeight}, 1000, function () {
        scroller.currentPosition = $(document).scrollTop();
        scroller.hideUp();
        scroller.hideDown();
    });

    return false;
}


//Scrolls elements down
scroller.scrollDown = function () {
    $("html, body").animate({scrollTop: scroller.currentPosition + scroller.currentHeight}, 1000, function () {
        scroller.currentPosition = $(document).scrollTop();
        scroller.hideUp();
        scroller.hideDown();
    });

    return false;
}


//fires scroll down on trigger click
$('.triggerDown').on('click', function () {
    scroller.scrollDown();
});


//fires scroll up on trigger click
$('.triggerUp').on('click', function () {
    scroller.scrollUp();
});


//fires functions if up/down arrows are pressed
$(document).on("keyup", function (e) {
    var code = e.which;
    if (code == 40) {
        scroller.scrollDown();
    } else if (code == 38) {
        scroller.scrollUp();
    }
});




//Disables default browser scroll behaviour
$(window).bind('mousewheel DOMMouseScroll', function (event) {
    return false
});



//Makes mouse scroll do what we want it to do (god bless javascriptkit.com for the fix for firefox)
function displaywheel(e) {
    var evt = window.event || e //equalize event object
    var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta

    if (delta / 120 > 0) {
        scroller.i--;
        if (scroller.i === -30) {
            scroller.scrollUp();
            scroller.i = 0;
            console.log('here');
        }
        ;
    } else {
        scroller.i++;
        if (scroller.i === 30) {
            scroller.scrollDown();
            scroller.i = 0;
            console.log('there');
        }
        ;
    }
}


var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

if (document.attachEvent) //if IE (and Opera depending on user setting)
    document.attachEvent("on" + mousewheelevt, displaywheel)
else if (document.addEventListener) //WC3 browsers
    document.addEventListener(mousewheelevt, displaywheel, false)




