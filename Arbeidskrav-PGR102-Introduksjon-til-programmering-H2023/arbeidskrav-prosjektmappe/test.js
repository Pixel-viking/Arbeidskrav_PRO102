/*
    Defining variables to make life easier
*/
const NknightShamalan = document.getElementById("nameless-knight");
const julia = document.getElementById("julia-the-archer")
const CrazyCat = document.getElementById("the-cat");
const wiliamTheHealer = document.getElementById("william-the-healer");
const treeMan = document.getElementById("jack-the-lumberjack");

const BossMan = document.getElementById("big-boss");
var monster = document.getElementById("appearing-monster");

let output = document.getElementById("output-text");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameEndText = document.getElementById("gameOverText");
const restartButton = document.getElementById("restartButton");
 

/*
    HP bars, How much HP is left and if anyone has died
*/

let NkHP = document.getElementById("nameless-knight-hp-div");
let currentNkHP = 200;

let juliaHP = document.getElementById("julia-the-archer-hp-div");
let currentJuliaHP = 200;

let catHP = document.getElementById("the-cat-hp-div");
let currentCatHP = 200;

let BossHP = document.getElementById("big-boss-hp-div");
let currentBossHP = 300;

let dmg = 0;


// Random monster variables
let monsterAperance = false;

let chance = 0;

let currentMonster = '';

monster.style.display = 'none';

// variabels that might change

let bossDelay = 1500; //Defined to make it easier to balance the timing of attacks¨
let arrowCount = 5; // This variable is to keep count of how many arrows are left.
let maxArrowCount = 5;
let counter = 0; //Counter to be used to output how many arrows have been made by Jack

let gameState = "running"; 

const characterArray = [ 
    /*
    Here whenever this array reffers to 0 it will be Namless-Knight's values
    1 will reffer to Julia
    2 will reffer to Cat  
    */
    {character: "Namless Knight", isAlive: true, currentHP: 200, HPbar: NkHP, image: NknightShamalan},
    {character: "Julia", isAlive: true, currentHP: 200, HPbar: juliaHP, image: julia},
    {character: "Cat", isAlive: true, currentHP: 200, HPbar: catHP, image: CrazyCat},
];
let namelessKnightArrayID = 0;
let JuliaArrID = 1;
let catArrayID = 2; 

const monsterArray = [
    {name: 'bat', source: 'images/bat.png'},
    {name: 'slime', source:'images/slime.png'},
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
] //array form monstre og deres bilde resursrer. Dette brukes også for sjangsen for at et monster dukker opp



    function restartGame() {
        window.location.reload();
    }


    //Checks if the player has won or lost and then displays the apropriate screen. 
    function checkGameState() {
        if (gameState === "Game Over") {
            gameOverScreen.style.display = "flex";
        }
        if (gameState === "Win") {
            gameOverScreen.style.background = "rgb(90, 180, 90)";
            gameEndText.innerHTML = "Du vant! <br> Vil du starte på nytt?";
            gameOverScreen.style.display = "flex";
        }
    }

    function setStatusAsDead() {  
        // Loops through the character array in order to check if any of the heroes are dead and then sets their isAlive value as false.  
        for (let i = 0; i < 3; i++) {
            if (characterArray[i].currentHP <= 0 && characterArray[i].isAlive === true) {
                characterArray[i].isAlive = false;
                console.log(i)
            }
        }
    }

    //Checks any of the heroes are dead after an attack. If they are they are replaced by a headstone. 
    function checkIfDead() {
        if (characterArray[0].isAlive === false) { // I made a special case for Namless-Knight is dead since the game can't continue without him. 
            output.innerHTML = 'Nameless Knigh er død uten han kan ikke de andre heltene vinne! Du taper';
            characterArray[0].HPbar.style.width = '0px'; // This is here to stop the HP-bar from gettiing stuck if it reacehs less than zero
            characterArray[1].HPbar.style.width = '0px'; 
            characterArray[2].HPbar.style.width = '0px';
            characterArray[1].isAlive = false;
            characterArray[2].isAlive = false; 
            gameState = "Game Over";
            return; 
        }
        //Beneath is for  the other two heroes since there is no real difference between their deaths
        for (let i = 1; i < 3; i++) {
            if (characterArray[i].isAlive === false) {
                output.innerHTML = `${characterArray[i].character} er død!!`;
                characterArray[i].image.src = "images/headstone.png"; 
                characterArray[i].HPbar.style.width = '0px';
                console.log("hei");
            }

        }
    }


    function bossAtack() {
        let targetFound = false;
        while (targetFound != true) { // While loop so that big boss does not select a target that is already dead. 
            //Boss selects target and attacks back
            let targetArr = Math.floor(Math.random() * characterArray.length); //Selects one of the values in the array in order to find a target.
            let bossDMG = Math.floor(Math.random()*70);

            if (characterArray[targetArr].isAlive != false) {
                characterArray[targetArr].currentHP -= bossDMG;
                characterArray[targetArr].HPbar.style.width = `${characterArray[targetArr].currentHP}px`
                output.innerHTML = `Boss angriper ${characterArray[targetArr].character} for ${bossDMG}hp`;
                targetFound = true; 
            }
        }
        setStatusAsDead();
        checkIfDead();
        setTimeout(checkGameState, 1000); //Delay set so that the player gets to see the characters turn into gravestones if Namless knight dies.
    }

    //Code for random apearance of monster
    function randomAparance() {
        chance = Math.floor(Math.random()*monsterArray.length);
        if (chance != (0 || 1)) {
            console.log(chance);
            return;
        }
        monster.src = monsterArray[chance].source;
        monster.style.display = 'block'
        monsterAperance = true;
        currentMonster = monsterArray[chance].name;
        console.log(currentMonster)
        output.innerHTML = `En ${monsterArray[chance].name} dukket opp`;
        console.log(chance);
    }

    // Functions for the different attacks. So that the actual attack function is easier to read and to avoid nesting
    function heroAttackBoss(attacker) {
        //Julia arrow check
        if (attacker === JuliaArrID && arrowCount === 0) {
            output.innerHTML = "Julia kan ikke angriipe hun er tom for piller";
            return;
        }
        currentBossHP -= dmg;
        if (currentBossHP <= 0) {
            BossHP.style.width = "0px";
            gameState = "Win";
        }
        else {
            BossHP.style.width = `${currentBossHP}px`;
            output.innerHTML = `${characterArray[attacker].character} angrep big boss for ${dmg}hp`;
        }
        setTimeout(bossAtack, bossDelay);
    }
    
    function heroMobAttack(attacker) {
        // Namless Knight can't attack random monsters
        if (attacker === namelessKnightArrayID) {
            output.innerHTML = 'Knight nekter å angripe trash mobs';
            return
        }
        // Stops cat from attacking bat, or anything that isn't a bat if I ever decide to add more monsters.
        if (attacker === catArrayID && currentMonster != 'slime') {
            output.innerHTML = 'Cat hopper og hopper, men når ikke opp til flaggermusen.';
            return;
        }
        //Stops julia from attacking slime
        if (attacker === JuliaArrID && currentMonster != 'bat') {
            output.innerHTML = 'Julia er usikker på om hun vil skyte den. Hva om den smaker godt?';
            return;
        }
        //If the attack goes thorugh: 
        monsterAperance = false;
        monster.style.display = 'none';
        output.innerHTML = `${characterArray[attacker].character} drepte ${currentMonster}`;
        currentMonster = 'none';
        setTimeout(bossAtack, bossDelay);

    }
    
    function heroesAttack(characterNum) {
        dmg = Math.floor(Math.random()*50)
        if (characterArray[characterNum].isAlive != true) { // Checkes if the attacking character is dead. If it is then it can't attack
            output.innerHTML =  "Gravsteiner kan ikke angripe!";
            return;
        }
        if (characterArray[characterNum].character != "Namless Knight" && dmg > currentBossHP) {
            //Nameless knight is the only one who can kill big boss. This stops it from happening
            output.innerHTML = `${characterArray[characterNum].character} kan ikke drepe big boss!`;
            return;
        }
        if (monsterAperance != true) {
            heroAttackBoss(characterNum);

            randomAparance();
            return;
        }
        heroMobAttack(characterNum); 


    }

    // Function that creates arrows for julia to use.
    function createArrows() {
        for (i = arrowCount; i < 5; i++) {
            console.log("jack");
            counter += 1;
        }
        arrowCount = i;
        output.innerHTML = `Jack lagde ${counter} piler!`;
        counter = 0;
    }

    function healAllies() { //Wiliam skal helbrede to ganger når han klikkes på
        for (i = 0; i < 2; i++) {
            let targetArr = Math.floor(Math.random()* characterArray.length);

            characterArray[targetArr].currentHP += Math.floor(Math.random()*30) + 1;
            console.log(characterArray[targetArr].character);
            characterArray[targetArr].HPbar.style.width = `${characterArray[targetArr].currentHP}px`;
        }
        disableOverHeal()
    }

    function disableOverHeal() { //function to stop healing from going over the HPbar limit.
        for (let i = 0; i < 3; i++) {
            if (characterArray[i].currentHP > 200) {
                characterArray[i].currentHP = 200;
                characterArray[i].HPbar.style.width = '200px';
            }
        }
    }

    function namlessKnightClicked() {
        heroesAttack(namelessKnightArrayID)
    }
    function juliaClicked() {
        heroesAttack(JuliaArrID)
    }
    function catClicked() {
        heroesAttack(catArrayID);
    }

    NknightShamalan.onclick = namlessKnightClicked;
    CrazyCat.onclick = catClicked;
    julia.onclick = juliaClicked;
    treeMan.onclick = createArrows;
    restartButton.onclick = restartGame; 
    wiliamTheHealer.onclick = healAllies;