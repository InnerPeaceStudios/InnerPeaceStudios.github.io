$(function() {
  // set `$.fx.interval` at `-6000`
  $.fx.interval = -4000;
  (function cycleBgImage(elem, bgimg) {
    // `elem`:`#slideshow`
    // set, reset, delay to `1000` after background image reset
    elem.css("backgroundImage", bgimg)
      // fade in background image
      .fadeTo(2000, 1, "linear", function() {
        // fade in background image
        $(this).delay(2000, "fx").fadeTo(2000, 0, "linear", function() {
          // split background image string at comma , creating array
          var img = $(this).css("backgroundImage").split(","),
            // concat first background image to `img` array,
            // remove first background image from `img` array
            bgimg = img.concat(img[0]).splice(1).join(",");
          // recursively call `cycleBgImage`
          cycleBgImage(elem, bgimg);
        });
      });
  }($("#slideshow")));
});