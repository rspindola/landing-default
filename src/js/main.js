ScrollPosStyler.init();
var scroll = new SmoothScroll('a[href*="#"]', {
  offset: 50,
  updateURL: true, // Update the URL on scroll
	popstate: true // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)
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