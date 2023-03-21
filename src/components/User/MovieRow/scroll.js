let left_btn = document.getElementsByClassName('uil uil-angle-left-b');
let right_btn = document.getElementsByClassName('uil uil-angle-right-b');
let cards = document.getElementsByClassName('cards');

left_btn.addEventListener('click',()=>{

    cards.scrollLeft -= 140;
})
right_btn.addEventListener('click',()=>{

    cards.scrollLeft +=140;
})