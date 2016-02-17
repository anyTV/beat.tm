	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	var winScr;

	$(window).scroll(function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
		scrollBars();
	});

	$(document).ready(function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
		scrollMenu();

		$("#cssmenu").menumaker({
	   		format: "multitoggle"
		});
	});

	$(window).load(function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
		centeredTitles();
		loadBars();

		//Menu vertical align
		$('#cssmenu > ul').css("margin-top", ($('#cssmenu > .logo').height() / 2)-14);
	});

	$(window).on('resize orientationchange', function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
		resizeFix();
	});

/*********************************************************************************************************/
/* -------------------------------------- BLOG CENTERED TITLE ------------------------------------------ */
/*********************************************************************************************************/
function centeredTitles(){
	$(".post-data-single").each(function(){
		$(this).find(".date-singlep").css("max-height", $(this).find(".all-single-prop").height());
		$(this).find(".date-singlep").height($(this).outerHeight()-44);
	});

	$(".post-data").each(function(){
		$(this).find(".post-arch-title").height($(this).height());
		$(this).find(".date-posted").css("max-height", $(this).find(".post-arch-title").height());
		$(this).find(".date-posted").height(($(this).outerHeight())/2+30);
	});
};

/******************************************************************************************************/
/* ------------------------------------ SCROLL-TO FUNCTIONS ----------------------------------------- */
/******************************************************************************************************/
	$("a.scroll-to").on("click",function(e){
		e.preventDefault();
		var time = $("body").outerHeight()/2;
		TweenLite.to(window, 1.25, {scrollTo:{y: 0, x:0}, ease:Quint.easeInOut});
	});

	$("a.scroll-to1").on("click",function(e){
		e.preventDefault();
		var footOff = $("#features").offset().top;
		var time = $("body").outerHeight()/2;
		var menuH = $("header").height();
		TweenLite.to(window, 1.25, {scrollTo:{y: footOff-menuH, x:0}, ease:Quint.easeInOut});
	});

	$("a.home-a").on("click",function(e){
		e.preventDefault();
		var time = $("body").outerHeight()/2;
		TweenLite.to(window, 1.25, {scrollTo:{y: 0, x:0}, ease:Quint.easeInOut});
	});

	$("a.logo-a").on("click",function(e){
		e.preventDefault();
		var time = $("body").outerHeight()/2;
		TweenLite.to(window, 1.25, {scrollTo:{y: 0, x:0}, ease:Quint.easeInOut});
	});

/******************************************************************************************************/
/* -------------------------------------- PARALLAX FUNCTION ----------------------------------------- */
/******************************************************************************************************/
	function parallaxFunction(){
		var h = $(window).height();
		if(winScr < $("#home").outerHeight()){
			$(".parallax-bg").css({top : (winScr/0.9)+0});
			$(".parallax-overlay").css({top : (h/2.5)+(winScr/2.5)});
			$(".parallax-bg-overlay").css({top: -(h/4.5)+(winScr/1.2)});
			$(".homeoverlay").css({top : (h/2)-50});
		}				
	};

/******************************************************************************************************/
/* ------------------------------------- SEARCH POP-OUT BLOCK --------------------------------------- */
/******************************************************************************************************/
	$('.search-button-trigger').on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('opened')){
			$('.search-popout-block').animate({bottom : 0}, 300);
			$(this).removeClass('opened');
			
		}
		else{
			var sPop = $('.search-popout-block').innerHeight();
			$('.search-popout-block').stop(true).animate({bottom : -(sPop-5)}, 300,function(){
				$('.search-popout-block').find('input').trigger('focus');
				});
			$(this).addClass('opened');
			
		}
	});

	$('.close-search').click(function(e){
		e.preventDefault();
		$('.search-popout-block').stop(true).animate({bottom : 0}, 300);
		$(this).removeClass('opened');
		$('.search-button-trigger').removeClass('opened');
	});

/******************************************************************************************************/
/* ------------------------------------- THUMBNAIL CAROUSEL ----------------------------------------- */
/******************************************************************************************************/
	$('.carousel .item').each(function(){
		var next = $(this).next();
		if (!next.length) {
			next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));
			  
		for (var i=0;i<4;i++) {
			next=next.next();
			if (!next.length) {
			    next = $(this).siblings(':first');
			} 
		next.children(':first-child').clone().appendTo($(this));
		}
	});

/******************************************************************************************************/
/* ----------------------------------------- GOOGLE MAP --------------------------------------------- */
/******************************************************************************************************/
	// When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
        	// How zoomed in you want the map to start at (always required)
            zoom: 15,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(51.72908, 0.6785), //Essex
            disableDefaultUI: true,
			scrollwheel: false,

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},
                    {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},
                    {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},
                    {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},
                    {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},
                    {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},
                    {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},
                    {"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},
                    {"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},
                    {"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
                    {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},
                    {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},
                    {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}]
                };

        var contentString = document.getElementById('myInfobox');

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        map.panBy(120, 0);

        var image = {
	        url: 'images/pin.png',

	        //scaledSize: new google.maps.Size(50, 50)
	    };

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			boxStyle: {
				border: "none"
				,textAlign: "center"
				,fontSize: "8pt"
				,width: "50px"
			},
			disableAutoPan: true,
			closeBoxURL: "",
			pixelOffset: new google.maps.Size(45, -70)
		});

        var marker = new google.maps.Marker({
			position: map.getCenter(),
			icon: image,
			labelText: 'HERE WE ARE',
			labelVisible: true,
			labelClass: "labels",
			labelZIndex: 99,
			draggable: false,
			map: map
		});

        var ibLabel = new InfoBox(infowindow);
		ibLabel.open(map,marker);

    } 

/******************************************************************************************************/
/* --------------------------------------- ISOTOPE FILTER ------------------------------------------- */
/******************************************************************************************************/
	// Check if IE
    function checkIE() {
        var ms_ie = false;
        var ua = window.navigator.userAgent;
        var old_ie = ua.indexOf('MSIE ');
        var new_ie = ua.indexOf('Trident/');
        if ((old_ie > -1) || (new_ie > -1)) {
            ms_ie = true;
        }
        return ms_ie;
    }

    function isiPad(){
	    return (navigator.platform.indexOf("iPad") != -1);
	}

    $(function() {
    	
	    // bind filter button click
	  	$('#filters').on( 'click', 'button', function() {
	    	var filterValue = $( this ).attr('data-filter');
	    	$container.isotope({ filter: filterValue });
	  	});
	  
	  	// change is-checked class on buttons
	  	$('.button-group').each( function( i, buttonGroup ) {
	    	var $buttonGroup = $( buttonGroup );
	   		$buttonGroup.on( 'click', 'button', function() {
	      		$buttonGroup.find('.is-checked').removeClass('is-checked');
	      		$( this ).addClass('is-checked');
	    	});
	  	});

		// init Isotope
		var $container = $('.isotope').isotope({
		    itemSelector: '.element-item',
		    layoutMode: 'masonry',
		    getSortData: {
		    	name: '.name'
		    },
		    masonry: {
		    	columnWidth: 1,
		    	gutter: 1
		    }
		});

		if(checkIE())
		{
			var $container = $('.isotope').isotope({
			    itemSelector: '.element-item',
			    layoutMode: 'masonry',
			    getSortData: {
			    	name: '.name'
			    },
			    masonry: {
			    	columnWidth: 1,
			    	gutter: 0
			    	
			    }
			});
		}

		if(isiPad())
		{
			var $container = $('.isotope').isotope({
			    itemSelector: '.element-item',
			    layoutMode: 'masonry',
			    getSortData: {
			    	name: '.name'
			    },
			    masonry: {
			    	columnWidth: 1,
			    	gutter: 0	
			    }
			});
		}
	});

	if(isiPad() == 0)
	{
		window.sr = new scrollReveal(); 
	}

/******************************************************************************************************/
/* ---------------------------------------- SWIPER SLIDER ------------------------------------------- */
/******************************************************************************************************/
	var mySwiper = new Swiper('.swiper-container',{
	    pagination: '.pagination',
	    autoplay: 3000,
	    loop:true,
	    grabCursor: true,
	    paginationClickable: true
	});

/******************************************************************************************************/
/* --------------------------------------- CSS MENU STYLE ------------------------------------------- */
/******************************************************************************************************/
	(function($) {
		$.fn.menumaker = function(options) {  
	 		var cssmenu = $(this), settings = $.extend({
	   			format: "dropdown",
	   			sticky: false
	 		}, options);

		 	return this.each(function() {
		   		$(this).find(".btn-menu").on('click', function(){
		     		$(this).toggleClass('menu-opened');
		     		var mainmenu = $(this).next('ul');
		     		if (mainmenu.hasClass('open')) { 
		       			mainmenu.slideToggle().removeClass('open');
		     		}
		     		else {
		       			mainmenu.slideToggle().addClass('open');
		       			if (settings.format === "dropdown") {
		         			mainmenu.find('ul').show();
		       			}
		     		}
		   		});

				cssmenu.find('li ul').parent().addClass('has-sub');

				multiTg = function() {
		     		cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
		     		cssmenu.find('.has-sub').on('click', function() {
		       			$(this).find('.submenu-button').toggleClass('submenu-opened');
		       			if ($(this).find('.submenu-button').siblings('ul').hasClass('open')) {
		          			$(this).find('.submenu-button').siblings('ul').removeClass('open').slideToggle();
		       			}
		       			else {
		          			$(this).find('.submenu-button').siblings('ul').addClass('open').slideToggle();
		       			}
		     		});
		   		};

		   		if (settings.format === 'multitoggle') multiTg();
		   		else cssmenu.addClass('dropdown');
		   		if (settings.sticky === true) cssmenu.css('position', 'fixed');

				resizeFix = function() {
		  			var mediasize = 991;
		     		if ($( window ).width() > mediasize) {
		       			cssmenu.find('ul').show();
		     		}
		     		if ($(window).width() <= mediasize) {
		       			cssmenu.find('ul').hide().removeClass('open');
		     		}
		   		};

		   		resizeFix();
		 	});
		};
	})(jQuery);

/******************************************************************************************************/
/* ----------------------------------- SCROLL MENU NAVIGATION --------------------------------------- */
/******************************************************************************************************/
	function scrollMenu() {

		setTimeout(function() {
			if (location.hash) {
				window.scrollTo(0, 0);
				var menuH = $("header").height();
				var offset = $(location.hash).offset().top-menuH+1;
				var top = $(document).scrollTop();
				var offseted = Math.abs(top-offset)/100;
				var speed = ((1/offseted*100)*(1.25*offseted))/100;
				TweenLite.to(window, speed, {scrollTo:{y: offset, x:0}, ease:Quint.easeInOut});
			}
		}, 1);

		$(document).on('click', '#cssmenu ul li>a[href*=#]:not([href=#])', function() {

				var target = $(this).attr('href');
				var current = $(target);
				var menuH = $("header").height();
				var offset = ( target == '#content' || target == '#' ? 0 : current.offset().top - menuH + 1);
				var top = $(document).scrollTop();
				var offseted = Math.abs(top-offset)/100;
				var speed = ((1/offseted*100)*(1.25*offseted))/100;
				TweenLite.to(window, speed, {scrollTo:{y: offset, x:0}, ease:Quint.easeInOut});
				return false;
		});
	};

/*********************************************************************************************************/
/* --------------------------------------- SHOW PORTFOLIO ---------------------------------------------- */
/*********************************************************************************************************/
	$('.element-item').on( 'click', function() {
		var ptt = $(".portff").offset().top;
		var position= $(window).scrollTop();
		$('html, body').animate({ "scrollTop": 0});
		$(".portf-one").css("display", "block");
		var loadH = -(($(".loader").height())/2);
		$(".loader").css("margin-top", loadH + "px")
		$(".portfolio-content").delay(1500).fadeIn(1000, function(){});
		$(".loader").delay(1000).fadeOut(500, function(){});
		$(".portff").delay(1500).slideDown(1000, function(){});
		$(".navcssmenu-cont").delay(1500).slideUp(500, function(){});
		$('body').css("overflow-y", "hidden");
			$(".close-port").on( 'click', function() {
				$(".loader").css("display", "block");
				$(".portf-one").css("display", "none");
				$(".portfolio-content").slideUp(500, function(){});
				$(".portff").slideUp(500, function(){});
				$(".portf-content").css("overflow-y", "scroll");
				$(".navcssmenu-cont").slideDown(1000, function(){});
				$('body').css("overflow-y", "nesto");
				$(window).scrollTop(position);
				//$('html, body').animate({ scrollTop: $("#filters").offset().top-45
			   // }, 20);
			});
	});

	$(".element-item").each(function(){
	    $(this).hover(function(){
	    $(this).addClass("openp");
	    $(this).find(".work-title-hover").stop(true).fadeTo(400, 1);
	
	    }, function(){
	        // change to any color that was previously used.
	        $(this).find(".work-title-hover").stop(true).fadeTo(350, 0)
	        $(this).removeClass("openp");
	       
	    });
	});


/*********************************************************************************************************/
/* ------------------------------------------ LOAD BARS ------------------------------------------------ */
/*********************************************************************************************************/

	var i = 0;
	function scrollBars() {
		if($('#skills').isOnScreen(0.5,0.5))
		{
			if(i == 0)
			{
        		$('.progress').each(function(index) {
           			var me = $(this).find(".bar");
            		var perc = me.attr("data-percentage");
            		var current_perc = 0;
            		setTimeout(function(){
	                		if (current_perc>=perc) {
	                    		
	                		} else {
	                    		current_perc +=1;
	                    		me.html('<div class="name-bar">' + me.find('.name-bar').html() + '</div>' + me.attr("data-percentage") +'%');
	                    		me.animate({width:perc + '%'}, 600, 'easeInOutQuart');
	                    		
	                		}
	                		$('.progress').find('.name-bar').delay(300*(index+1)*0.1).fadeIn(600);
		            }, 200 * index);
	        	});
			}
			i++;
		}
	};

	var i = 0;
	function loadBars() {
		if($('#skills').isOnScreen(0.5,0.5))
		{
			if(i == 0)
			{
        		$('.progress').each(function(index) {
           			var me = $(this).find(".bar");
            		var perc = me.attr("data-percentage");
            		var current_perc = 0;
            		setTimeout(function(){
	                		if (current_perc>=perc) {
	                    	
	                		} else {
	                    		current_perc +=1;
	                    		me.html('<div class="name-bar">' + me.find('.name-bar').html() + '</div>' + me.attr("data-percentage") +'%');
	                    		me.animate({width:perc + '%'}, 600, 'easeInOutQuart');
	                    		
	                		}
	                		$('.progress').find('.name-bar').delay(300*(index+1)*0.1).fadeIn(600);
		            }, 200 * index);
	        	});
			}
			i++;
		}
	};

/*********************************************************************************************************/
/* --------------------------------- CUSTOM FADE BOOTSTRAP TABS ---------------------------------------- */
/*********************************************************************************************************/	
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  e.target// activated tab
  e.relatedTarget // previous tab
  $(".tab-content > .tab-pane").removeClass("myFade");
  $(".tab-content>.active").addClass("myFade");
})

$('a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
  e.target// activated tab
  e.relatedTarget // previous tab
  $(".tab-content").removeClass("myFade");
})

/*********************************************************************************************************/
/* -------------------------------- SCROLL FOR TEAM MEMBER ADDING -------------------------------------- */
/*********************************************************************************************************/	

$('.hex-plus').on('click', function(e){
    e.preventDefault();
    var hexJump = $('#contact1').offset().top;
    TweenLite.to(window, 1.25, {scrollTo:{y: hexJump, x:0}, ease:Quint.easeInOut});
});

/*********************************************************************************************************/
/* -------------------------------- TESTIMONIALS COVER BACKGROUND -------------------------------------- */
/*********************************************************************************************************/	

$('.testimonials-cover').height($('.testimonials-bg').height());


/*********************************************************************************************************/
/* -------------------------------------- TEAM FOR IE FIXING ------------------------------------------ */
/*********************************************************************************************************/
if(checkIE())
{
	$('.flipper').each( function() {
		$(this).hover(function(){
				$(this).find(".front")
				  .stop(true)
				  .delay(200)
				  .queue( function(){ 
				    $( this ).addClass( "class1" ).dequeue();
				  });
				$(this).find(".back")
				  .stop(true)
				  .delay(200)
				  .queue( function(){ 
				    $( this ).addClass( "class2" ).dequeue();
				  });
		    }, function(){
		    	$(this).find(".front")
		    	  .stop(true)
				  .delay(200)
				  .queue( function(){ 
				    $( this ).removeClass( "class1" ).dequeue();
				  });
				$(this).find(".back")
				  .stop(true)
				  .delay(200)
				  .queue( function(){ 
				    $( this ).removeClass( "class2" ).dequeue();
				  });
		    });
	});
}

if(isiPad())
{
	$('.flipper').each( function() {
		$(".front").on("click",function(e){
				$(this).css("visibility","hidden");
				$(this).parent().find('.back').css("visibility","visible");
		});
		$(".back").on("click",function(e){
				$(this).css("visibility","hidden");
				$(this).parent().find('.front').css("visibility","visible");
		});
	});	
}

/*********************************************************************************************************/
/* -------------------------------------- MENU FIX FOR IE6-11 ------------------------------------------ */
/*********************************************************************************************************/
if(checkIE())
{
if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

var time = 360;
var distance = 220;

function wheel(event) {
    if (event.wheelDelta) delta = event.wheelDelta / 120;
    else if (event.detail) delta = -event.detail / 3;

    handle();
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
}

function handle() {

    $('html, body').stop().animate({
        scrollTop: $(window).scrollTop() - (distance * delta)
    }, time);
}


$(document).keydown(function (e) {

    switch (e.which) {
        //up
        case 38:
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() - distance
            }, time);
            break;

            //down
        case 40:
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() + distance
            }, time);
            break;
    }
});
}