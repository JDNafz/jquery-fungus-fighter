$(document).ready(onReady);

let fungusHP = 100;
let heroAP = 100;

function onReady() {
    $('.arcane-scepter').on('click',{attack:'scepter'},attack);
    $('.entangle').on('click',{attack:'entangle'},attack);
    $('.dragon-blade').on('click',{attack:'blade'},attack);
    $('.star-fire').on('click',{attack:'star'},attack);
}

let arcaneScepter = {
    AP : 12,
    HP : 14
}
let entangle = {
    AP : 23,
    HP : 9
}
let dragonBlade = {
    AP : 38,
    HP : 47
}
let starFire = {
    AP : 33,
    HP : 25
}

let interval = 0; //initialize healing variable
function attack(event){
    let attackString = event.data.attack;
    let currentAttack = {}; // initialize currentAttack outside of the 'if' blocks.
    if (attackString === 'scepter'){
        currentAttack = arcaneScepter;
    }
    if (attackString=== 'entangle'){
        currentAttack = entangle;
    }
    if (attackString=== 'blade'){
        currentAttack = dragonBlade;
    }
    if (attackString === 'star'){
        currentAttack = starFire; 
    }
    //update the state of HP and AP
    fungusHP -= currentAttack.HP;
    heroAP   -= currentAttack.AP;

    
    renderOnDom(currentAttack);
    //if the fungus dies, do not let healing property continue.
    if (fungusHP === 0){
        clearInterval(interval);

    // if Freaky STRONG Fungus heals itself if low on health
    // if interval is already running, do not initialize another instance. 
    } else if (fungusHP < 50 && !interval){
        interval = setInterval(function () {
            fungusHP += 1; //updating state
            renderOnDom(); //rendering on DOM
            if (fungusHP >= 50){
                //if fungus is over 50hp stop healing.
                clearInterval(interval);  
            }
        }, 1000); // 1 second interval.
    }
}

//renders on DOM and updates appropriate CSS classes.
function renderOnDom(){
    if (fungusHP <= 0){
        fungusHP = 0;//don't drop below zero.
        $('.freaky-fungus').removeClass('walk');
        $('.freaky-fungus').addClass('dead');
    }
    if (heroAP <= 0){
        heroAP = 0; //don't drop below zero. (update state)

        //render DOM
        $('.freaky-fungus').removeClass('walk');
        $('.freaky-fungus').addClass('jump');
        
        // disable attack buttons if there is no AP left
        $('.attack-btn').attr("disabled" , "true"); 
    }
    // update progress meters
    $('#ap-meter').val(`${heroAP}`);
    $('#hp-meter').val(`${fungusHP}`);
    
    // update text 
    $('.ap-text').text(`${heroAP} AP`);
    $('.hp-text').text(`${fungusHP} HP`);
    
}








//TODO: STOP healing thing from piling recursivly





// ✅ listensers for attack buttons
//      ✅update state
            //✅update Fungus(HP),
            //  ✅reduce (AP).
        // ✅ render

        // ✅assign attack values
            // ✅HP
            // ✅ AP
//✅ HP and AP may not be negative (set to zero, if they would otherwise be negative)
// ✅ If the Freaky Fungus runs out of HP, the monster is dead and you win! Replace the walk class with a dead class on the freaky-fungus element, to make them fall over and die.

// ✅ If you run out of AP, the monster wins and humanity is doomed 😢 Replace the walk class with a jump class on the freaky-fungus element, to make them jump for the glory of the fungal race.
// ✅ You may no longer attack, if AP is 0. Give all of the attack buttons a disabled attribute, so they may no longer be used.