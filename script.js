$(document).ready(onReady);

// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
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
    // HP : 14
    HP: 90
}
let entangle = {
    AP : 23,
    // HP : 9
    HP : 1

}
let dragonBlade = {
    AP : 38,
    HP : 47
}
let starFire = {
    AP : 33,
    HP : 25
}
let interval = 0;

function attack(event){
    let attackString = event.data.attack;
    let currentAttack = {};
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
    fungusHP -= currentAttack.HP;
    heroAP   -= currentAttack.AP;

    
    updateState(currentAttack);
    if (fungusHP === 0){
        clearInterval(interval);
        return;
    } else if (fungusHP < 50){
        interval = setInterval(function () {
            fungusHP += 1;
            updateState();
            if (fungusHP >= 50){
                clearInterval(interval);
                console.log("SHOULD STOP")    
            }
        }, 1000);
    }
}

function updateState(){
    if (fungusHP <= 0){
        fungusHP = 0;
        $('.freaky-fungus').removeClass('walk');
        $('.freaky-fungus').addClass('dead');
    }
    if (heroAP <= 0){
        heroAP = 0;
        $('.freaky-fungus').removeClass('walk');
        $('.freaky-fungus').addClass('jump');
        
        $('.attack-btn').attr("disabled" , "true");
    }
    $('#ap-meter').val(`${heroAP}`);
    $('#hp-meter').val(`${fungusHP}`);
    
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