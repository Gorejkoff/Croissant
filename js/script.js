"use strict"

let product = document.forms.product;
let yeast = document.forms.product.elements.yeast;
let sugary = document.forms.product.elements.sugary;
let filling = document.forms.product.elements.filling;
let decor = document.forms.product.elements.decor;
let quantity = document.forms.product.elements.quantity;
let stepButton = document.querySelectorAll('.step__button');
let stepBlock = document.querySelectorAll('.step__block');
let stepItem = document.querySelectorAll('.step__item');
let stepBody = document.querySelector('.step__body');
let pageButton = document.querySelectorAll('.page-button');
let pageTab = document.querySelectorAll('.page-tab');
let showYeast = document.getElementById('show-yeast');
let showSugary = document.getElementById('show-sugary');
let showFilling = document.getElementById('show-filling');
let showDecor = document.getElementById('show-decor');
let price = document.getElementById('price');
let sum = document.getElementById('sum');
let lettersJumpingList = document.querySelectorAll('.letters-jumping');
let pricingSum = 0;

product.addEventListener('change', (event) => {
   if ((event.target.name == 'yeast' || event.target.name == 'sugary') &&
      yeast.value.length > 0 && sugary.value.length > 0) {
      stepItem[1].classList.remove('no-event');
   }
   if (event.target.name == 'filling' && filling.value.length > 0) {
      stepItem[2].classList.remove('no-event');
      changeImg(event, getNamberButton(event, 'step__input-block'));
   }
   if (event.target.name == 'decor' && decor.value.length > 0) {
      stepItem[3].classList.remove('no-event');
      changeImg(event, getNamberButton(event, 'step__input-block'));
   }
});


quantity.addEventListener('input', (event) => {
   if (Number(quantity.value) < quantity.min) { quantity.value = quantity.min };
   if (Number(quantity.value) > quantity.max) { quantity.value = quantity.max };
   countSum();
})

document.addEventListener('click', (event) => {
   if (event.target.closest('.step__button')) {
      switchingStep(event);

   }
   if (event.target.closest('.page-button')) {
      changePage(getNamberButton(event, 'page-button'))
   }
   if (event.target.closest('.step__choice-quantity-increment')) {
      quantityIncrement(quantity);
      countSum();
   }
   if (event.target.closest('.step__choice-quantity-dicrement')) {
      quantityDicrement(quantity);
      countSum();
   }
   if (stepItem[stepItem.length - 1].classList.contains('active')) {
      showFormData();
      countSum();
   }
   setPrice();
})

function setPrice() {
   pricingSum = 0;
   for (let e of product.elements) {
      if (e.checked) {
         pricingSum = (pricingSum + Number(e.dataset.pricing));
      }
   }
   price.innerHTML = pricingSum.toFixed(2) + '$';
}

function quantityIncrement(element) {
   if (Number(element.value) < Number(element.max)) { element.value++ }
}

function quantityDicrement(element) {
   if (Number(element.value) > Number(element.min)) { element.value-- }
}

function changeImg(event, number) {
   let listImg = event.target.closest('.step__block').querySelectorAll('.step__img');
   listImg.forEach((e) => {
      e.classList.toggle('active', e.dataset.img == number)
   })
}

function switchingStep(event) {
   stateStepButton(getNamberButton(event, 'step__button'));
   stateStepBlock(getNamberButton(event, 'step__button'));
}

function getNamberButton(event, selector) {
   return event.target.closest(`.${selector}`).dataset.button;
}

function stateStepButton(number) {
   let state = 1;
   stepButton.forEach((e) => {
      e.closest('.step__item').classList.toggle('active', e.dataset.button == number);
      if (state && !e.closest('.step__item').classList.contains('active')) {
         e.closest('.step__item').classList.add('done');
      } else {
         state = 0;
         e.closest('.step__item').classList.remove('done');
      }
   })
}

function stateStepBlock(number) {
   let state = 1;
   stepBlock.forEach((e) => {
      e.classList.toggle('active', e.dataset.tab == number);
      if (state && !e.classList.contains('active')) {
         e.classList.add('done');
      } else {
         state = 0;
         e.classList.remove('done');
      }
   })
}

function changePage(number) {
   pageTab.forEach((e) => { e.classList.toggle('active', e.dataset.tab == number) })
   if (number == 1) { removeCheked(number) }
}

function removeCheked(number) {
   for (let element of product.elements) { element.checked = false }
   stepItem.forEach((e, index) => {
      if (index > 0) { e.classList.add('no-event') }
   })
   stepButton[0].click();
}

function showFormData() {
   let f = new FormData(product);
   showYeast.innerHTML = f.get('yeast');
   showSugary.innerHTML = f.get('sugary');
   showFilling.innerHTML = f.get('filling');
   showDecor.innerHTML = f.get('decor');
}

function countSum() {
   sum.innerHTML = (pricingSum * quantity.value).toFixed(2) + '$';
}

preparationLettersJumping()
function preparationLettersJumping() {
   lettersJumpingList.forEach((e) => {
      e.innerHTML = `<span>${e.innerHTML.split('').join('</span><span>')}</span>`;
      let list = e.querySelectorAll('span');
      for (let i = 0; i < list.length; i++) {
         list[i].style.setProperty('--i', '0.' + i + 's');
      }
   })
}

addFlashEffect();
var mouseover = false;
function addFlashEffect() {
   document.querySelectorAll('.flash_effect').forEach((e) => {
      e.addEventListener('mouseover', (event) => addflash(event));
      e.addEventListener('mouseout', (event) => removeFlash(event));
   })
}

function addflash(event) {
   mouseover = true;
   event.target.insertAdjacentHTML(
      'beforeend',
      `<div class="flash" style="--x:${random()}%; --y:${random()}%">
      <div class="flash__body">
      </div></div>`
   )
   setTimeout(() => {
      event.target.querySelector('.flash').remove();
   }, 1500)
   setTimeout(() => {
      mouseover && addflash(event)
   }, 300)
}

function removeFlash() {
   mouseover = false;
}

function random() {
   return (Math.random() * 100).toFixed(2);
}

