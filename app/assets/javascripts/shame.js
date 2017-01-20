$(document).ready(function() {
  $('.toggle-mobile').click(function(){
    $('.menu-nav-mobile').toggleClass('inactive');
    $('.dark-background-filter').toggleClass('inactive');
  })
});

$(window).resize(function() {
  var windowWidth = $(window).width();
  if (windowWidth > 768) {
    $('.menu-nav-mobile').addClass('inactive');
    $('.dark-background-filter').addClass('inactive');
  }
});
