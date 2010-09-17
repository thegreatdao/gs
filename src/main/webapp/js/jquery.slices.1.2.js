/* 
*  Sliced Image Slider
*  Date - 8/23/2009
*  http://calyan.co.cc/
*
*  Make sure that number of slices should be a number which divides image/wrapper width excatly for 'topDown' and 'bottomUp' directions.
*  For 'leftRight' and 'rightLeft' directions number of slices should divide image/wrapper height excatly.
*
*  Markup
*  <div id="wrapper">
*      <ul>
*         <li><img src="images/1.gif" alt="" /></li>
*         <li><img src="images/2.gif" alt="" /></li>
*         <li><img src="images/3.gif" alt="" /></li>
*         <li><img src="images/4.gif" alt="" /></li>
*         <li><img src="images/5.gif" alt="" /></li>
*      </ul>
*   </div>
*
*/

(function($) {

    $.fn.slicer = function(options) {
        var defaults = {
            direction: 'bottomUp',
            duration: 1500,
            sliceDelay: 100,
            numberOfSlices: 5,
            auto: true,
            delay: 5000,
            nextID: 'next',
            prevID: 'prev'
        };

        var options = $.extend(defaults, options);
        var element = $(this).attr("id");
        var elementWidth = $(this).width();
        var elementHeight = $(this).height();

        var slice = new Object();
        slice.Name = element + "_slice";
        slice.Height = null;
        slice.Width = null;
        slice.InitialLeft = null;
        slice.InitialTop = null;
        slice.LeftLimit = null;
        slice.TopLimit = null;
        slice.nextSliceDirection = null;
        slice.prevSliceDirection = null;
        slice.nextNumber = 1;


        var currentImage = 0;
        var no_of_images = $("#" + element + " ul").children().size();
        var slicesGenerated = null;
        var nextImgSrc = null;

        switch (options.direction) {
            case "bottomUp":
                slice.Width = elementWidth / options.numberOfSlices;
                slice.Height = elementHeight;
                slice.InitialLeft = 0;
                slice.InitialTop = elementHeight;
                slice.TopLimit = 0;
                slice.LeftLimit = null;
                slice.nextSliceDirection = "bottomUp";
                slice.prevSliceDirection = "topDown";
                break;
            case "topDown":
                slice.Width = elementWidth / options.numberOfSlices;
                slice.Height = elementHeight;
                slice.InitialLeft = 0;
                slice.InitialTop = -(elementHeight);
                slice.TopLimit = 0;
                slice.LeftLimit = null;
                slice.nextSliceDirection = "topDown";
                slice.prevSliceDirection = "bottomUp";
                break;
            case "leftRight":
                slice.Height = elementHeight / options.numberOfSlices;
                slice.Width = elementWidth;
                slice.InitialLeft = -(elementWidth);
                slice.InitialTop = 0;
                slice.LeftLimit = 0;
                slice.nextSliceDirection = "leftRight";
                slice.prevSliceDirection = "rightLeft";
                slice.TopLimit = null;
                break;
            case "rightLeft":
                slice.Height = elementHeight / options.numberOfSlices;
                slice.Width = elementWidth;
                slice.InitialLeft = elementWidth;
                slice.InitialTop = 0;
                slice.LeftLimit = 0;
                slice.TopLimit = null;
                slice.nextSliceDirection = "rightLeft";
                slice.prevSliceDirection = "leftRight";
                break;
        }

        /*creating next and previous buttons*/
        var navigation = '<div><span id="' + options.prevID + '"><a href=\"javascript:void(0);\">Prev</a></span>';
        navigation += '<span id="' + options.nextID + '"><a href=\"javascript:void(0);\">Next</a></span></div>';
        $("#" + element).after(navigation);

        /*init() section*/
        $("#" + element + " ul").css("display", "none");
        nextImgSrc = $("#" + element + " ul").children().eq(currentImage).children().eq(0).attr("src");
        slicesGenerated = createSlices(element, options.numberOfSlices, slice, nextImgSrc, true);
        animateSlices(slicesGenerated, slice.LeftLimit, slice.TopLimit, options.duration, options.sliceDelay, false);

 var timer = null;
        if(options.auto){
              timer = setInterval(function(){   autoNext();   }, options.delay);
        }

        function autoNext(){
            currentImage = (currentImage + 1) % no_of_images;
            nextImgSrc = $("#" + element + " ul").children().eq(currentImage).children().eq(0).attr("src");

            garbageCollectGeneratedSlices(slicesGenerated, slice, options, true);
            slicesGenerated = createSlices(element, options.numberOfSlices, slice, nextImgSrc, true);
            animateSlices(slicesGenerated, slice.LeftLimit, slice.TopLimit, options.duration, options.sliceDelay, false);
}

        function autoPrev(){
            currentImage = (currentImage - 1);
            if (currentImage < 0)
                currentImage = no_of_images - 1;
            nextImgSrc = $("#" + element + " ul").children().eq(currentImage).children().eq(0).attr("src");

            garbageCollectGeneratedSlices(slicesGenerated, slice, options, false);
            slicesGenerated = createSlices(element, options.numberOfSlices, slice, nextImgSrc, false);
            animateSlices(slicesGenerated, slice.LeftLimit, slice.TopLimit, options.duration, options.sliceDelay, false);     
}


        /*clicked on next*/
        $("a", "#" + options.nextID).click(function() {
           options.auto = false;
            clearInterval(timer);
            autoNext();
        });

        /*clicked on previous*/
        $("a", "#" + options.prevID).click(function() {
            options.auto = false;
            clearInterval(timer);
            autoPrev();                  
        });

    }; //end of function slicer

    /*Following are the utility functions used to get the effects. You can customize them as per your requirement.*/
    function garbageCollectGeneratedSlices(slices, slice, options, next) {
        var direction = null;
        if (next)
            direction = slice.nextSliceDirection;
        else
            direction = slice.prevSliceDirection;
        if (slices != null) {
            switch (direction) {
                case "bottomUp":
                    animateSlices(slices, null, (-slice.Height), options.duration, options.sliceDelay, true);
                    break;
                case "topDown":
                    animateSlices(slices, null, slice.Height, options.duration, options.sliceDelay, true);
                    break;
                case "leftRight":
                    animateSlices(slices, slice.Width, null, options.duration, options.sliceDelay, true);
                    break;
                case "rightLeft":
                    animateSlices(slices, (-slice.Width), null, options.duration, options.sliceDelay, true);
                    break;
                default:
                    for (var i = 0; i < slices.length; i++) {
                        $("#" + slices[i]).remove();
                    }
                    break;
            }
        }
    } //end of function

    function createSlices(parent, no_of_slices, slice, nextImgSrc, next) {
        var Left = null;
        var Top = null;
        if (next) {
            Left = slice.InitialLeft;
            Top = slice.InitialTop;
        }
        else {
            Left = -slice.InitialLeft;
            Top = -slice.InitialTop;
        }
        var slices = new Array(no_of_slices);

        for (var i = 0; i < slices.length; i++) {
            slices[i] = slice.Name + slice.nextNumber;
            var ele = document.createElement('div');
            ele.setAttribute("id", slices[i]);
            ele.style.position = "absolute";
            ele.style.overflow = "hidden";
            ele.style.width = slice.Width + "px";
            ele.style.height = slice.Height + "px";
            ele.style.left = Left + "px";
            ele.style.top = Top + "px";

            if (slice.InitialLeft == 0) {
                ele.style.backgroundImage = "url(" + nextImgSrc + ")";
                ele.style.backgroundPosition = (-Left) + "px 0px";
                ele.style.backgroundRepeat = "no-repeat";
                Left = Left + slice.Width;
            }
            else {
                ele.style.backgroundImage = "url(" + nextImgSrc + ")";
                ele.style.backgroundPosition = "0px " + (-Top) + "px";
                ele.style.backgroundRepeat = "no-repeat";
                Top = Top + slice.Height;
            };
            document.getElementById(parent).appendChild(ele);
            ++(slice.nextNumber);
        }
        return (slices);
    } //end of function

    function animateSlices(slices, leftLimit, topLimit, duration, delay, removeSlicesAfterAnimation) {
        var timing = 1;
        var currentElement = null;
        for (var i = 0; i < slices.length; i++) {
            currentElement = $("#" + slices[i]);
            animator.move(currentElement, leftLimit, topLimit, duration, timing, removeSlicesAfterAnimation);
            timing = timing + delay;
        }
        return true;
    } //end of function

})(jQuery);


var animator = new Object();
animator.move = function(ele, leftLimit, topLimit, duration, delay, remove) {
    setTimeout(function() {
        if (leftLimit == null) {
            if (remove) { ele.animate({ top: topLimit }, duration, null, function() { $(this).remove(); });  }
            else { ele.animate({ top: topLimit }, duration); }
        }
        else {
            if (remove) { ele.animate({ left: leftLimit }, duration, null, function() { $(this).remove(); }); }
            else { ele.animate({ left: leftLimit }, duration); }
        }
    }, delay);
}