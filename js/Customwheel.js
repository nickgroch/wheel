
let wheelItems = [];
let wheelSegs = [];
let wonSegs = [];

// Segment colours
colours = ['#621450', '#AA0513', '#ee7b0c', '#62b312',  '#44C1B3', '#f3d31d', '#1a755a', '#0c74c5', '#f04e99', '#e88c28', '#B63F14', '#540A0D', '#CC6682', '#A5EB3D', '#20EC1A'];

// Range generator
function range(start, end, step) {
    let len = Math.floor((end - start) / step) + 1
    return Array(len).fill().map((_, idx) => start + (idx * step))
}

// Get text values from textarea input and return as an array
function getText(input, arr) {
    textarea = document.getElementById(input);
    return arr = textarea.value.replace(/\r\n/g,'\n').split('\n');
}

function getMainText() {
    textarea = document.getElementById('itemInput');
    return wheelItems = textarea.value.replace(/\r\n/g,'\n').split('\n');
}

// Convert text input into array of segment options objects
function setSegmentText(itemArr, segArr) {
    let len = itemArr.length;
    // Loop over wheel segments and set text prop to value of textarea input
    for(let i = 0; i < len; i++) {
        let segColour = colours[Math.floor(Math.random() * colours.length)];
        let item = itemArr[i];
        segArr.push({
            'text': item.toString(),
            'description': item.toString(),
            'fillStyle': segColour
        });
    }
    return segArr;
}

// Initialize wheel
function createWheel() {
    // getText("itemInput", wheelItems);
    getMainText();
    setSegmentText(wheelItems, wheelSegs);
    let len = wheelSegs.length; 
    // Removes the first segment, which is added by default and causes segment array to be 1 longer than needed
    return wheelSegs;  
     
}
createWheel();

// Instantiate wheel
let theWheel = new Winwheel({
    'canvasId' : 'canvas',
    'numSegments' : wheelSegs.length,
    'fillStyle' : '#37706f',
    'lineWidth' : 3,
    'segments' : wheelSegs,
    'outerRadius' : 270,
    'centerX' : 310,
    'centerY' : 360,
    'animation' :          
        {
            'type'     : 'spinToStop',  // Type of animation.
            'duration' : 5,             // How long the animation is to take in seconds.
            'spins'    : 8,            // The number of complete 360 degree rotations to complete
            'callbackFinished' : 'alertPrize()'
        }          
}); 

// Alert the user of prize when wheel stops

function alertPrize() {
    let winningSegment = theWheel.getIndicatedSegment();
 
    // Alert user of winning segment using sweetalert2
    Swal.fire({
        icon: 'success',
        title: 'Winner, winner, chicken dinner',
        text: winningSegment.text,
        confirmButtonText: 'Booya!'
    })
    
    // delete winning segment from wheel
    let index = theWheel.segments.indexOf(winningSegment);
    theWheel.deleteSegment(index);
    
    // reset wheel rotation angle to 0 to allow subsequent spins
    theWheel.rotationAngle = 0;
    // redraw wheel to show changes
    theWheel.draw();

    let item = winningSegment.text;
    let log = document.querySelector('.log');
    wonSegs.push(item);
    log.innerHTML = wonSegs.join('<br />');
    return wonSegs;
}

let diceSegs = [];

let diceWheel = new Winwheel({
    'canvasId' : 'diceWheel',
    'fillStyle' : 'red',
    'animation' :          
        {
            'type'     : 'spinToStop',  // Type of animation.
            'duration' : 3,             // How long the animation is to take in seconds.
            'spins'    : 5,            // The number of complete 360 degree rotations to complete
            'callbackFinished' : 'alertDice()'
        } 
})

function setDice() {
    // get input values 
    let start = parseInt(document.getElementById('start').value);
    let end = parseInt(document.getElementById('end').value);
    let step = parseInt(document.getElementById('step').value);
    let sides = range(start, end, step);
    setSegmentText(sides, diceSegs);
    // for(const item of diceSegs) {
    //     diceWheel.addSegment(item);
    // }
    for(let i = 0; i < diceSegs.length; i++) {
        diceWheel.addSegment(diceSegs[i]);
    }
    // Removes the first segment, which is added by default and causes segment array to be 1 longer than needed
    diceWheel.deleteSegment(1);
    // Draw the segments
    diceWheel.draw();
}

// Reset dice on button click
let resetBtn = document.getElementById('reset-dice');
resetBtn.addEventListener('click', function() {
    // diceWheel.clearCanvas();
    for(let i = 0; i < diceSegs.length; i++) {
        diceWheel.deleteSegment(i);
    }
    // diceWheel.draw();
    diceWheel.clearCanvas();
    return diceSegs = [];
});

function alertDice() {
    let winningSegment = diceWheel.getIndicatedSegment();
 
    // Alert user of winning segment using sweetalert2
    Swal.fire({
        icon: 'success',
        text: winningSegment.text,
    })
    
    // reset wheel rotation angle to 0 to allow subsequent spins
    diceWheel.rotationAngle = 0;
    // redraw wheel to show changes
    diceWheel.draw();
}


// Setup Positions wheel
let posSegs = [];
let positions = ["QB", "HB", "FB", "WR", "TE", "C", "G", "T", "DE", "DT", "LB", "CB", "S", "K", "P"];
setSegmentText(positions, posSegs);
// Insantiate new wheel
let posWheel = new Winwheel({
    'canvasId' : 'posWheel',
    'numSegments' : posSegs.length,
    'fillStyle' : 'yellow',
    'segments' : posSegs,
    'animation' :                   // Note animation properties passed in constructor parameters.
    {
        'type'     : 'spinToStop',  // Type of animation.
        'duration' : 3,             // How long the animation is to take in seconds.
        'spins'    : 5,            // The number of complete 360 degree rotations to complete
        'callbackFinished' : 'alertPos()'
    } 
})

function alertPos() {
    let winningSegment = posWheel.getIndicatedSegment();
 
    // Alert user of winning segment using sweetalert2
    Swal.fire({
        icon: 'success',
        text: winningSegment.text,
    })
    
    // reset wheel rotation angle to 0 to allow subsequent spins
    posWheel.rotationAngle = 0;
    // redraw wheel to show changes
    posWheel.draw();
}
