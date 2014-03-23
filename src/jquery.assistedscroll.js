(function() {

    function AssistedScroll(el, options) {

        var slides, totalSlides, currentSlide, currentSlideIndex, transitioning;

        function init() {

            // Are we transitioning?
            transitioning = false;

            // Cache Slides
            slides            = el.children();
            totalSlides       = slides.length;
            currentSlide      = slides.first();
            currentSlideIndex = 0;

            // Set Their Z-Index
            for (var i = 0; i < totalSlides; i++) {
                slides[i].style.zIndex = (totalSlides - i) + (options.startingZ || 0);
            }

            // Bind Mousewheel Event
            el.on("mousewheel", function(e) {

                // Prevent Default Browser Functionality
                e.preventDefault();
                e.stopPropagation();

                if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                    if (e.deltaY > 0) {
                        prevSlide();
                    }else{
                        nextSlide();
                    }
                }
            });
        }


        /**
         * Transition to the next slide
         * @return {undefined}
         */
        function nextSlide() {

            // Unable To slide
            if ((currentSlideIndex + 1) >= totalSlides || transitioning) {
                return;
            }

            transitioning = true;

            // Reset Current Slide
            currentSlide.addClass("old").removeClass("active");
            currentSlide      = currentSlide.next().addClass("active");
            currentSlideIndex = currentSlideIndex + 1;

            resetTransitioning();
        }


        /**
         * Transition to previous slide
         * @return {undefined}
         */
        function prevSlide() {

            // Unable To slide
            if ((currentSlideIndex - 1) < 0 || transitioning) {
                return;
            }

            transitioning = true;

            // Reset Current Slide
            currentSlide.removeClass("active");
            currentSlide      = currentSlide.prev().addClass("active").removeClass("old");
            currentSlideIndex = currentSlideIndex - 1;

            resetTransitioning();
        }


        /**
         * Disable the transition lock
         * @return {undefined}
         */
        function resetTransitioning() {
            setTimeout(function() {
                transitioning = false;
            }, (options.delay || 500));
        }


        init();
    }


    // jQuery Public
    $.fn.assistedScroll = function(options) {
        if (!this.data("assistedScroll")) {
            return this.data("assistedScroll", new AssistedScroll(this, options || {}));
        }else if (typeof options === "string") {
            // Slider already instanciated, attempt to run argument as command
            return this.data("assistedScroll")[options]();
        }
    };

}());
