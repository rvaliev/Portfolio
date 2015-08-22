$(document).ready(function(){

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
        links   = $("#menuLinks"),
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
        showOnScroll(fromTop, aboutH1, aboutH3, aboutArticle, arrAllBlocksPositions);


    }); // end window scroll



    /**
     * When menu icon is clicked
     */
    var toggles = document.querySelectorAll(".c-hamburger");

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    } //end for


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
function showOnScroll(fromTop, aboutH1, aboutH3, aboutArticle, arrAllBlocksPositions){
    if (fromTop >= (arrAllBlocksPositions[1][1] - 400) && fromTop < (arrAllBlocksPositions[2][1] - 200)){
        aboutH1.addClass('animated fadeInLeft show');
        aboutH3.addClass('animated fadeInRight show');
        aboutArticle.addClass('animated fadeIn show');
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
                marginLeft: "0px"
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







