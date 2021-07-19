const openModalBtn = document.querySelector('.textarea-modal-btn');
const closeModalBtn = document.querySelector('.modal-close');
const textareaModal = document.querySelector('.textarea-modal');
openModalBtn.addEventListener('click', function() {
    textareaModal.classList.add('is-active');
});

closeModalBtn.addEventListener('click', function() {
    textareaModal.classList.remove('is-active');
});

const spinBtn = document.querySelector('.spin');
spinBtn.addEventListener('click', function() {
    theWheel.startAnimation();
});

const rollBtn = document.querySelector('.roll-dice');
rollBtn.addEventListener('click', function() {
    diceWheel.startAnimation();
});

const posBtn = document.querySelector('.roll-pos');
posBtn.addEventListener('click', function() {
    posWheel.startAnimation();
});

// const logBtn = document.querySelector('.show-log');
// const log = document.querySelector('.log');
// logBtn.addEventListener('click', function() {
//     log.classList.toggle('is-active');
// });