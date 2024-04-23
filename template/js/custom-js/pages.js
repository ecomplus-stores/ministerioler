let mouseDown = false;
let startX, scrollLeft;
const sliders = document.querySelectorAll('.breakline-false');

sliders.forEach(slider => {
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mousemove', move, false);
});

window.addEventListener('mouseup', stopDragging, false);
window.addEventListener('mouseleave', stopDragging, false);

function startDragging(e) {
  mouseDown = true;
  startX = e.pageX - this.offsetLeft;
  scrollLeft = this.scrollLeft;
}

function stopDragging() {
  mouseDown = false;
}

function move(e) {
  if (!mouseDown) return;
  const x = e.pageX - this.offsetLeft;
  const scroll = x - startX;
  this.scrollLeft = scrollLeft - scroll;
}

window.whatsappRedirect = function(type){
  alert(type)
}

$(document).ready(function(){
  $('.products-carousel__list').addClass('owl-carousel')
  $('.products-carousel__list').owlCarousel({
    loop:true,
    margin:20,
    responsiveClass:true,
    
    responsive:{
        0:{
            items:2,
            nav:false
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            dots:false,
            nav:false,
            loop:true
        }
    }
  });

  $('body').css('--header-vh-main', ($('header#header').innerHeight()) + 'px');
});

