	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	var winScr;

	$(window).scroll(function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
	});

	$(document).ready(function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
	});

	$(window).load(function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
	});

	$(window).on('resize orientationchange', function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
	});


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

/*
	$('.search-popout-block input').focusout(function(){
		$('.search-popout-block').parent().find('.close-search').trigger('click');
	});*/

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

/*	$('.carousel').carousel({
	  interval: 3000
	})*/

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
		var image = 'images/pin.png';

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

    $(function() {
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
	}); 

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

				cssmenu.addClass('dropdown');
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
		   		return $(window).on('resize', resizeFix);
		 	});
		};
	})(jQuery);

	(function($){
		$(document).ready(function(){
			$("#cssmenu").menumaker({
	   			format: "multitoggle"
			});
		});
	})(jQuery);

/******************************************************************************************************/
/* ----------------------------------- SCROLL MENU NAVIGATION --------------------------------------- */
/******************************************************************************************************/
$(document).ready(function(){
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
});

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
	    $(this).find(".grayscale#svgroot").css("opacity", 0);
	    }, function(){
	        // change to any color that was previously used.
	        $(this).find(".work-title-hover").stop(true).fadeTo(350, 0)
	        $(this).removeClass("openp");
	        $(this).find(".grayscale#svgroot").css("opacity", 1);
	    });
	});


/*********************************************************************************************************/
/* ------------------------------------------ LOAD BARS ------------------------------------------------ */
/*********************************************************************************************************/

	var i = 0;
	$( window ).scroll(function() {
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
	});

	var i = 0;
	$( window ).load(function() {
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
	});

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
/* -------------------------------------- BLOG CENTERED TITLE ------------------------------------------ */
/*********************************************************************************************************/
$(".date-singlep").height($(".post-data-single").height()-44);

$(".post-data").each(function(){
	$(this).find(".post-arch-title").height($(".post-data").height());
	$(this).find(".date-posted").height(($(this).outerHeight())/2+2);
});







