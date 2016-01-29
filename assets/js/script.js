'use strict';

$(document).ready(function() {
  $(".wrapper").fitVids();

  // Add class current to nav item
  // http://stackoverflow.com/a/33490386/558777
  $('.site-nav a').each(function() {
    if($(this).attr('href') == window.location.href) {
      $(this).addClass('current');
    }
  });
});