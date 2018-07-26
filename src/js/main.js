ScrollPosStyler.init();

/***** Smooth Scroll ******/
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

/***** Magnific Popup ******/
$('.glry-div').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image',
    preloader: true,
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,2]
    },
    removalDelay: 500,
    callbacks: {
    beforeOpen: function() {
      // just a hack that adds mfp-anim class to markup 
       this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
       this.st.mainClass = 'mfp-zoom-out';
    }
  }
});


/***** Tooltip ***/
$(function () {
  $('[data-toggle="tooltip"]').tooltip({
      trigger: 'manual'
  })
});

/***** Youtube LazyLoad *****/
var youtube = document.querySelectorAll(".youtube");

for (var i = 0; i < youtube.length; i++) {
 
    // thumbnail image source.
    var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/maxresdefault.jpg"; 
    
    // Load the image asynchronously
    var image = new Image();
        image.src = source;
        image.addEventListener("load", function(){ youtube[i].appendChild(image); }(i) );
    
    youtube[i].addEventListener("click", function() {
 
        var iframe = document.createElement("iframe");
 
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1");

        this.innerHTML = "";
        this.appendChild(iframe);
        
    } );
 
}