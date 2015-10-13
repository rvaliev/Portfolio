$(document).ready(function(){




    //var isMobile = false; //initiate as false
    // device detection
  /*  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
        //isMobile = true;
        //$('#intro').css("height", "100vh");
    }*/


    //console.log(isMobile);


    if (navigator.userAgent.match(/(iPad)/i)) {
        $('#intro').css("height", $(window).height());
    }


    /**
     * Cache selectors
     * circles, links are anchors on the page
     * menuItems contains only elements with tag 'i'
     * linksItems contains only 'a' elements
     * topMenuHeight is a offset from top of the div CONTAINER
     * scrollItems gets name of the anchors with attribute 'data-link'
     */
    var lastId,
        circles = $(".circles"),
        links   = $("#menuLinks, #topMenuItems"),
    // All list items
        menuItems = circles.find("i"),
        linksItems = links.find("a"),
        topMenuHeight = 0,
    // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $("#"+$(this).attr("data-link"));
            if (item.length) { return item; }
        });

    // Variables for animation in block ABOUT
    var aboutH1                 = $('#aboutH1'),
        aboutH3                 = $('#aboutH3'),
        aboutArticle            = $('#aboutArticle');

    skillsShowed = false; // global variable
    aboutShowed  = false; // global variable

    /**
     * Caching all div blocks and their positions into arrAllBlocksPositions array
     * arrAllBlocksPositions[0] => intro
     * arrAllBlocksPositions[1] => about
     * arrAllBlocksPositions[2] => knowledge
     * arrAllBlocksPositions[3] => portfolio
     * arrAllBlocksPositions[4] => contact
     */
    var arrAllBlocks = $('.tile');
    var arrAllBlocksPositions = [];
    var block = [];
    for (var i = 0; i < arrAllBlocks.length; i++) {
        block = [ arrAllBlocks[i].id, $(arrAllBlocks[i]).offset().top ];
        arrAllBlocksPositions.push(block);
    }




    /**
     * Page scroll animation
     * Bind click handler to menu items and linksItems
     * so we can get a fancy scroll animation
     */
    menuItems.click(function(e){
        var href        = $(this).parent().attr("href");
        scrollOnClick(href, topMenuHeight, e);         // sending href and e to scrollOnClick function
    });

    linksItems.click(function(e){
        var href        = $(this).attr("href");
        scrollOnClick(href, topMenuHeight,  e);         // sending href and e to scrollOnClick function
    });


    /**
     * Activating/deactivating anchors while page scrolling
     */
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = Math.abs($(this).scrollTop());

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top <= fromTop)
                return this;
        });

        // calling anchorsHandling function
        anchorsHandling(cur, lastId, menuItems, linksItems, aboutH1, aboutH3, aboutArticle);


        // show and animate block on scroll
        showOnScrollIntro(fromTop, aboutH1, aboutH3, aboutArticle, arrAllBlocksPositions);

        showOnScrollSkills(fromTop, arrAllBlocksPositions);





    }); // end window scroll



    /**
     * When menu icon is clicked
     */
    var toggles = document.querySelectorAll(".c-hamburger");

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    } //end for


    $('#topMenuBtn').click(function (e) {
        e.preventDefault();
        var topMenuItems = $("#topMenuItems");
        if (topMenuItems.is(":visible") == false){
            topMenuItems.slideDown(100);
        }
        else{
            topMenuItems.slideUp(100);
        }
    });

});
/*****************************************************************************************
 * ********************************** END READY ******************************************
 * ****************************************************************************************
 */






/**
 * show and animate blocks on scroll
 * arrAllBlocksPositions[0] => intro
 * arrAllBlocksPositions[1] => about
 * arrAllBlocksPositions[2] => knowledge
 * arrAllBlocksPositions[3] => portfolio
 * arrAllBlocksPositions[4] => contact
 */
function showOnScrollIntro(fromTop, aboutH1, aboutH3, aboutArticle, arrAllBlocksPositions){
    if (fromTop >= (arrAllBlocksPositions[1][1] - 400) && (fromTop < (arrAllBlocksPositions[2][1] - 200)) && (aboutShowed == false)){
        aboutH1.addClass('animated fadeInLeft show');
        aboutH3.addClass('animated fadeInRight show');
        aboutArticle.addClass('animated fadeIn show');
        aboutShowed = true; // changing global variable
    }
}

function showOnScrollSkills(fromTop, arrAllBlocksPositions){
    if (fromTop >= (arrAllBlocksPositions[2][1] - 400) && (fromTop < (arrAllBlocksPositions[3][1] - 200)) && (skillsShowed == false)){
        $('.chart').horizBarChart({
            selector: '.bar',
            speed: 3000
        });
        skillsShowed = true;   // changing global variable
    }
}



/**
 * Page scroll function
 * @param href
 * @param e
 */
function scrollOnClick(href, topMenuHeight, e){
    var offsetTop   = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;

    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
} // end scrollOnClick






/**
 * Handling anchors behavior
 * @param cur
 * @param lastId
 * @param menuItems
 * @param linksItems
 */
function anchorsHandling(cur, lastId, menuItems, linksItems){
    // Get the id of the current element


    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    //console.log(cur.offset().top);

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .removeClass("selectedCircle")
            .removeClass("fa-circle")
            .addClass("fa-circle-thin")
            .filter("[data-link="+id+"]")
            .addClass("selectedCircle")
            .removeClass("fa-circle-thin")
            .addClass("fa-circle");

        linksItems
            .removeClass("selectedLink")
            .filter("[data-link="+id+"]")
            .addClass("selectedLink");
    }


} // end anchorsHandling





/**
 * Translates menu icon and shows up the menu
 * Inspired by http://callmenick.com/post/animating-css-only-hamburger-menu-icons
 */
function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
        e.preventDefault();

        /**
         * Show up menuBlock
         */
        var eMenuBlock = $("#menuBlock");
        if (eMenuBlock.width() === 0){
            eMenuBlock.animate({
                width: "18.125rem",
                marginLeft: "0px",
                zIndex: 333343
            }, 300, "easeInQuad");
        }
        else{
            eMenuBlock.animate({
                width: "0",
                marginLeft: "-100px"
            }, 300, "easeOutQuad");
        }

        /**
         * Translate hamburger icon into arrow and vice versa
         */
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
} // end toggleHandler






