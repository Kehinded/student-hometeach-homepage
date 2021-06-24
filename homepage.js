// display image before content 
window.onload = function(){document.getElementById('before-load-page').style.display = 'none'}




// scroll event javascript start
const scrollOffset = 100;  

const scrollElements = document.querySelectorAll('.js-scroll');

// const scrollElement = scrollElements.forEach((el) => {
//     return el ;
// })

scrollElements.forEach((el) => {
  el.style.opacity = 0 ;
})

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;

    return(
        elementTop <= ((window.innerHeight || document.documentElement.clientHeight) - offset)
    );
};

const displayScrollElement = (el) => {
  el.style.opacity = 1;  
  el.classList.add('scrolled-up');
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 1;  
  //   el.classList.add('scrolled-left');
  // }
}

const displayScrollElementLeft = (el) => {
  el.style.opacity = 1;  
  el.classList.add('scrolled-left');
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 1;  
  //   el.classList.add('scrolled-left');
  // }
}

const displayScrollElementRight = (el) => {
  el.style.opacity = 1;  
  el.classList.add('scrolled-right');
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 1;  
  //   el.classList.add('scrolled-left');
  // }
}

const hideScrollElement = (el) => {
  el.style.opacity = 0;  
  el.classList.remove('scrolled-up');  
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 0;  
  //   el.classList.remove('scrolled-left');
  // }
}

const hideScrollElementLeft = (el) => {
  el.style.opacity = 0;  
  el.classList.remove('scrolled-left');  
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 0;  
  //   el.classList.remove('scrolled-left');
  // }
}

const hideScrollElementRight = (el) => {
  el.style.opacity = 0;  
  el.classList.remove('scrolled-right');  
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 0;  
  //   el.classList.remove('scrolled-left');
  // }
}


const handleScrollAnimation = () => {

  scrollElements.forEach((el) => {
    if(el.classList.contains('slide-left')){
      if(elementInView(el, 0)){displayScrollElementLeft(el);}
      else{
        hideScrollElementLeft(el);
      }
    }

    if(el.classList.contains('slide-right')){
      if(elementInView(el, 0)){displayScrollElementRight(el);}
      else{
        hideScrollElementRight(el);
      }
    }

   if(el.classList.contains('slide-up')){
    if(elementInView(el, 20)){  
      displayScrollElement(el);
    }
    else{
      hideScrollElement(el);
    }
   }
  })
   
}

  let throttleTimer = false;
  const throttle = (callback, time) => {
    if(throttleTimer) return;
    throttleTimer = true;

    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  }

window.addEventListener("scroll", () => {
   throttle( handleScrollAnimation, 250);   
})






// local storage store
class Store {
  static getColor(){
   let colors;
   if(localStorage.getItem('colors') === null){
     colors = [];
   }
   else{colors = JSON.parse(localStorage.getItem('colors'))}

   return colors;
  }
       
  // static addColors(color){
  //   const colors = Store.getColor();
  //   colors.push(color);
  //   localStorage.setItem('colors', JSON.stringify(colors))
  // }

  static clearColors(){
    localStorage.clear();
  }
 
}

// set color for the whole site from storage
  document.addEventListener('DOMContentLoaded', function(){
    let color = Store.getColor();
    let myColor = String(color);          
    document.documentElement.style.setProperty("--home-primary-color", myColor);
    // const picture = document.querySelector('.public-profile-img');
    // if(myColor === "#D2492F" ){picture.src = "./images/public-profile-img-red.png"}    
    // else{picture.src = "./images/puplic-profile-img.jpg"}  
  })


// page action controller
var actionControl = (function(){

})();

// user interface controller
var uiControl = (function(){
    // return all functions
  return{
   translateSidebox: function(){
       document.querySelector('.student-public-profile-sidebar-box').classList.toggle('translateX');
   },
    // remove category box
    removeCategoryBox: function(){
        document.querySelector('.category-box').classList.add('remove-box');
        document.querySelector('.learning-box').classList.remove('show-box');
        document.querySelector('.notification-box').classList.remove('show-box');
        const elements = document.querySelectorAll('.proper-box');
        elements.forEach(function(element){
          element.classList.remove('show-box-proper');
        })
      },
      // show proper category box function
      showProperCategoryBox: function (key){
       const elements = document.querySelectorAll('.proper-box');
        const showElement = document.querySelector('.proper-box-' + "" + key);
        if(showElement.classList.contains('show-box-proper')){
          showElement.classList.remove('show-box-proper')
        }
        else{
          elements.forEach(function(element){
            element.classList.remove('show-box-proper');
          })
          showElement.classList.add('show-box-proper')}  
      },
      // show learning box function
      showLearningBox: function(){
        document.querySelector('.learning-box').classList.toggle('show-box')
      },
      // show Notification box function
      showNotificationBox: function(){
        document.querySelector('.notification-box').classList.toggle('show-box')  
      },
      // remove remove-box class function
      removeRemoveboxClass: function(){
        document.querySelector('.category-box').classList.remove('remove-box'); 
      }

  }    
})();

// global controller

var globalControl = (function(acCrtl, uiCtrl){ 
// eventlistener for sidebar toggle
document.querySelector('.public-profile-sidebar-icon').addEventListener('click', function(){
    uiCtrl.translateSidebox();
})
 //  eventlistener to remove category box
 document.querySelector('.section').addEventListener('click', uiCtrl.removeCategoryBox);
//  remove remove-box class from category box event
document.querySelector('.category-show').addEventListener('mouseover', uiCtrl.removeRemoveboxClass)
  // proper category box event listener
  document.querySelector('.item-game').addEventListener('click', function(e){
    
    uiCtrl.showProperCategoryBox('game');
  });
  document.querySelector('.item-quiz').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('quiz');
  });
  document.querySelector('.item-eLibrary').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('eLibrary');
  });
  document.querySelector('.item-basic-school-subjects').addEventListener('click', function(e){
    
    uiCtrl.showProperCategoryBox('basic-school-subjects');
  });
  document.querySelector('.item-high-school-subjects').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('high-school-subjects');
  });
  document.querySelector('.item-marketing').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('marketing');
  });
  document.querySelector('.item-it-and-software').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('it-and-software');
  });
  document.querySelector('.item-Languages').addEventListener('click', function(e){
    e.preventDefault();  
    uiCtrl.showProperCategoryBox('Languages');
  });
  document.querySelector('.item-Arts-and-culture').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('Arts-and-culture');  
  });    
  // end of category box
  // learning drop down event
  document.querySelector('.learning-drop-down').addEventListener('click', uiCtrl.showLearningBox);
  // notification show event
  document.querySelector('.notification-show').addEventListener('click', uiCtrl.showNotificationBox)
})(actionControl, uiControl);