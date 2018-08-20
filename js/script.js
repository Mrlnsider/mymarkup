// my preloader
var hellopreloader = document.getElementById("preloader");
function fadeOutnojquery(el) {
    el.style.opacity = '1'
    el.style.transition = 'all 0.5s'
    var interhellopreloader = setInterval ( function() {
        el.style.opacity = el.style.opacity - 0.1;
        if (el.style.opacity <=0.1) {
            clearInterval(interhellopreloader);
            hellopreloader.style.opacity = "0";
        }
        setTimeout ( function() {
            if (hellopreloader.style.opacity == 0) {
                hellopreloader.style.display = "none"
            }
        },1000)
    },16);
}
window.onload = function() {
    setTimeout ( function() {
        fadeOutnojquery(hellopreloader);
    },1000);
};

// jquery scroll
$(document).ready(function(){
    $("#menus").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top; 
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

//my burger
var navButton = document.getElementsByClassName('nav-opener') 
var navMenu = document.getElementsByClassName('burger-menu')
navButton[0].onclick = function(event) {
    if(!navMenu[0].classList.contains("nav-active")) 
        navMenu[0].classList.add("nav-active")
    else navMenu[0].classList.remove("nav-active")
}
$(document).ready(function(){
    $('#nav-icon1').click(function(){
        $(this).toggleClass('open');
    });
});

 //my reserve-open
var hidden = document.getElementById("hide")
var show = document.getElementById('showContent')
var open = document.getElementById('open')
var close = document.getElementById('close')
var body = document.body
open.addEventListener("click", () => {
    hidden.style.display = "inline-block"
    body.classList.add('noscroll')
})
 show.addEventListener("click", () => {
    hidden.style.display = "inline-block"
    body.classList.add('noscroll')
})
 close.addEventListener("click", () => {
    hidden.style.display = "none"
    body.classList.remove('noscroll')
})
var hidef = document.getElementById('hide-form')

//my slider
const Slide = function ( imageURL, container ) {
    this.imageURL = imageURL
    let elem = container.appendChild (document.createElement ( 'div' ))
    elem.className = "slide"
    elem.style = `
        position: absolute;
        max-width: 1280px;  
        top: 0px;
        bottom: 0px;
        left: 0;
        right: 0;
        margin: auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        transition: all 0.8s;
        background-image: url(${imageURL});
    `
    this.init = function ( x ) {
      elem.style.left = x + '%'
      elem.style.width = window.innerWidth * 0.8 + 'px'
    }
    this.setPicture = pictureURL => {
            elem.style.backgroundImage = `url(${pictureURL})`
    }
    this.mcFromTo = function ( from, to, finalOpacity ) {
        var slideWidth = window.innerWidth * 1
        elem.style.transition = 'none'
        elem.style.left = from + '%'
        elem.style.opacity = 1 - finalOpacity
        elem.style.width = slideWidth + 'px'
        setTimeout ( function () {
          elem.style.transition = 'all 0.8s'
          elem.style.left = to + '%'
          elem.style.opacity = finalOpacity
        }, 50 )
    }
}
const Slider = function ( sourseData ) {
    this.pictures = []
    var slid = document.getElementById ("slider")
    this.container = this.createElem ( 'figure', slid )
    this.container.style = `
        position: relative;
        top: 0px;
        left: 0px;
        right: 0px;
        overflow: hidden;
        margin: 0px;
    `
    this.loadData ( sourseData )
    let currentIndex = 0
    let currentSlide = 0
    this.getNextIndex = dir => dir === 'left' ?
            ( currentIndex === 0 ?
                this.pictures.length - 1 : currentIndex - 1 ) :
            ( currentIndex === this.pictures.length - 1 ?
                0 : currentIndex + 1 )
    this.changePicture = direction => {
      let to = direction === 'left' ? 100 : -100
      let nextSlide = currentSlide === 0 ? 1 : 0
      var nextIndex = this.getNextIndex ( direction )
      this.slides [ nextSlide ].setPicture ( this.pictures [ nextIndex ] )
      this.slides [ nextSlide ].init ( -to )
      this.slides [ currentSlide ].mcFromTo ( 0, to, 0 )
      this.slides [ nextSlide ].mcFromTo ( -to, 0, 1 )
      setTimeout ( function () {
          currentSlide = nextSlide
          currentIndex = nextIndex
      }, 1000 )
    }
    this.getFirstPicture = ()=> { 
      if (currentIndex === 1) this.changePicture("left")
      if (currentIndex === 2) this.changePicture("right")
     }
    this.getSecondPicture = () => { 
      if (currentIndex === 0) this.changePicture("right")
      if (currentIndex === 2) this.changePicture("left")
     }
     this.getThirdPicture = () => { 
      if (currentIndex === 0) this.changePicture("left")
      if (currentIndex === 1) this.changePicture("right")
     }
    this.btnLeft = this.createElem ( 'button', this.container )
    this.btnLeft.onclick = () => this.changePicture ( "left" )
    this.btnLeft.className = "change-rl"
    this.btnRight = this.createElem ( 'button', this.container )
    this.btnRight.onclick = () => this.changePicture ( "right" )
    this.btnRight.className = "change-rl"
    this.btnLeft.innerHTML = '<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>'
    this.btnRight.innerHTML = '<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>'
    this.btnLeft.style = `
        left: 15%;
    `
    this.btnRight.style = `
        right: 15%;
    `
    this.btnDiv = this.createElem ('div', this.container)
    this.btnDiv.className = "btn-div"
    this.btnFirst = this.createElem ('button', this.btnDiv)
    this.btnFirst.className = "change"
    this.btnFirst.style = `margin-right: 10px`
    this.firtsI = this.createElem ('i', this.btnFirst)
    //this.firtsI.className = "fa"
    this.btnSecond = this.createElem ('button', this.btnDiv)
    this.btnSecond.className = "change"
    this.btnSecond.style = `margin-left: 10px`
    this.secondI = this.createElem ('i', this.btnSecond)
    //this.secondI.className = "fa" 
    this.btnThird = this.createElem ('button', this.btnDiv)
    this.btnThird.className = "change"
    this.btnThird.style = `margin-left: 20px`
    this.thirdI = this.createElem ('i', this.btnThird)
    //this.thirdI.className = "fa"
    this.allBtn = document.getElementsByClassName('change')
    this.btnFirst.innerHTML = '<i class="fa fa-circle-o" aria-hidden="true"></i>'
    this.btnSecond.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
    this.btnThird.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
    this.btnFirst.onclick = () =>  {
      this.getFirstPicture ()
      this.btnFirst.innerHTML = '<i class="fa fa-circle-o" aria-hidden="true"></i>'
      this.btnSecond.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
      this.btnThird.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
    }
    this.btnSecond.onclick = () => {
      this.getSecondPicture  ()
      this.btnFirst.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
      this.btnSecond.innerHTML = '<i class="fa fa-circle-o" aria-hidden="true"></i>'
      this.btnThird.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
    }
    this.btnThird.onclick = () => {
      this.getThirdPicture ()
      this.btnFirst.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
      this.btnSecond.innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i>'
      this.btnThird.innerHTML = '<i class="fa fa-circle-o" aria-hidden="true"></i>'
    }
}
Slider.prototype.createElem = function ( tagName, container ) {
        return  ( !container ? document.body : container )
                .appendChild (
                  document.createElement ( tagName )
                )}
Slider.prototype.loadData = async function ( jsonURL ) {
      let promise = fetch ( jsonURL )
                        .then ( response => response.json()
                    )
        this.pictures = await promise
        this.slides = []
        this.slides [ 0 ] = new Slide (
                        this.pictures [ 0 ],
                        this.container
        )
        this.slides [ 0 ].mcFromTo ( 100, 0 )
        this.slides [ 1 ] = new Slide (
                        this.pictures [ 1 ],
                        this.container
        )
        this.slides [ 1 ].init ( 100 )

}
var slider = new Slider ( 'pictures.json' )

//comments 
var photo = document.getElementsByClassName('photo')
var range = document.getElementsByClassName('range')
var coment = document.getElementsByClassName('coment')
var info = document.getElementsByClassName('info')
photo[0].onclick = function(event) {
    range[0].style = `transform: translateX(-205%);
    transition: 0.8s`
    coment[0].style.display = "inline-block"
    coment[1].style.display = "none"
    coment[2].style.display = "none"
    info[0].style = `opacity: 1;
        visibility: visible;`
    info[1].style = `opacity: 0;
        visibility: hidden;`
    info[2].style = `opacity: 0;
        visibility: hidden;`
    photo[0].classList.add("big")
    photo[1].classList.remove("big")
    photo[2].classList.remove("big")
}
photo[1].onclick = function(event) {
    range[0].style = `transform: translateX(0%);
        transition: 0.8s`
    coment[0].style.display = "none"
    coment[1].style.display = "inline-block"
    coment[2].style.display = "none"
    info[0].style = `opacity: 0;
        visibility: hidden;`
    info[1].style = `opacity: 1;
        visibility: visible;`
    info[2].style = `opacity: 0;
        visibility: hidden;`
    photo[0].classList.remove("big")
    photo[1].classList.add("big")
    photo[2].classList.remove("big")
}
photo[2].onclick = function(event) {
    range[0].style = `transform: translateX(205%);
        transition: 0.8s`
    coment[0].style.display = "none"
    coment[1].style.display = "none"
    coment[2].style.display = "inline-block"
    info[0].style = `opacity: 0;
        visibility: hidden;`
    info[1].style = `opacity: 0;
        visibility: hidden;`
    info[2].style = `opacity: 1;
        visibility: visible;`
    photo[0].classList.remove("big")
    photo[1].classList.remove("big")
    photo[2].classList.add("big")
}