/*
    Defining variables to make life easier
*/
const NknightShamalan = document.getElementById("nameless-knight");
const julia = document.getElementById("julia-the-archer")
const CrazyCat = document.getElementById("the-cat");
const bigWilly = document.getElementById("william-the-healer");
const treeMan = document.getElementById("jack-the-lumberjack");

const BossMan = document.getElementById("big-boss");
var monster = document.getElementById("appearing-monster");

let output = document.getElementById("output-text");
const gameOverScreen = document.getElementById("gameOverScreen")
const gameEndText = document.getElementById("gameOverText")
const restartButton = document.getElementById("restartButton")

const characterArray = ["NK", "Julia", "Cat"];

/*
    HP bars, How much HP is left and if anyone has died
*/

let NkHP = document.getElementById("nameless-knight-hp-div");
let currentNkHP = 200;
let NkAlive = true;

let juliaHP = document.getElementById("julia-the-archer-hp-div");
let currentJuliaHP = 200;
let juliaAlive = true;

let catHP = document.getElementById("the-cat-hp-div");
let currentCatHP = 200;

let BossHP = document.getElementById("big-boss-hp-div");
let currentBossHP = 300;
let catAlive = true;

let dmg = 0;


// Random monster variables
let monsterAperance = false;

let chance = 0;

let currentMonster = '';

monster.style.display = 'none';

// variabels that might change

let bossDelay = 3000; //Defined to make it easier to balance the timing of attacks¨
let arrowCount = 5; // This variable is to keep count of how many arrows are left.
let maxArrowCount = 5;
let counter = 0;

let gameState = "running";




    function restartGame() {
        window.location.reload();
    }

    function checkGameState() {
        if (gameState === "Game Over") {
            gameOverScreen.style.display = "flex"
        }
        if (gamestate === "Win") {
            gameOverScreen.style.background = "rgb(90, 180, 90)";
            gameEndText.innerHTML = "Du vant! <br> Vil du starte på nytt?"
            gameOverScreen.style.display = "flex"
        }
    }

    function setStatusAsDead() {
        if (currentNkHP <= 0 && NkAlive === true) {
            NkAlive = false;
        }
        if (currentJuliaHP <= 0 && juliaAlive === true) {
            juliaAlive = false;
        }
        if (currentCatHP <= 0 && catAlive === true) {
            catAlive = false;
        }
    }

    //Checks any of the heroes are dead when attacked. 
    function checkIfDead() {
        if (NkAlive === false) {
            output.innerHTML = "Nameles Knight Døde. De andre heltene kan ikke vinne uten han. <br> Big boss dreper de også";
            NknightShamalan.src = "images/headstone.png";
            juliaAlive = false;
            catAlive = false;
            juliaHP.style.width = "0px";
            gameState = "Game Over"
            NkAlive = 0;
        }
        if (juliaAlive === false) {
            output.innerHTML = "Julia døde!";
            julia.src = "images/headstone.png";
            juliaHP.style.width = "0px";
            juliaAlive = 0;
        }
        if (catAlive === false) {
            output.innerHTML = "Cat døde!";
            CrazyCat.src = "images/headstone.png";
            CrazyCat.style.width = "0px";
            catAlive = 0;
        }
    }


    function bossAtack() {
        //Boss selects target and attacks back
        let targetArr = Math.floor(Math.random() * characterArray.length);
        let target = characterArray[targetArr];
        //Used array to select target for the attack. Honsestly it would actually be one line less with code if I just used a random number, but I wanted to try.
        let bossDMG = Math.floor(Math.random()*100);
        if (target === "NK") {
            currentNkHP -= bossDMG;
            NkHP.style.width = `${currentNkHP}px`;
            output.innerHTML = `Boss angriper Namles Knight for ${bossDMG}hp`;
        }
        if (target === "Julia"){
            currentJuliaHP -= bossDMG;
            juliaHP.style.width = `${currentJuliaHP}px`;
            output.innerHTML = `Boss angriper Julia for ${bossDMG}hp`;
        }
        if (target === "Cat") {
            currentCatHP -= bossDMG;
            catHP.style.width = `${currentCatHP}px`;
            output.innerHTML = `Boss angriper Cat for ${bossDMG}hp`;
            
        }
        setStatusAsDead();
        checkIfDead();
        checkGameState()
    }

    //Code for random apearance of monster
    function randomAparance() {
        chance = Math.floor(Math.random()*100) + 1;
        if (chance <= 12.5 && juliaAlive === true) {
            monster.src = 'images/bat.png';
            monster.style.display = 'block';
            console.log("monster");
            monsterAperance = true;
            currentMonster = 'bat'; // To identify what the is monster. Used during hero restrictions.
            output.innerHTML = 'En flaggermus dukket opp!';
            return
        }
        if (chance <= 25 && catAlive === true) {
            monster.src = 'images/slime.png';
            monster.style.display = 'block'
            console.log("monster");
            monsterAperance = true;
            currentMonster = 'slime';
            output.innerHTML = 'En slime dukket opp!';
        }
    }

    // Functions for the different attacks. So that the actual attack function is easier to read and to avoid nesting
    function heroAttackBoss() {
        dmg = Math.floor(Math.random()*50);
        currentBossHP -= dmg;
        if (currentBossHP <= 0) {
            BossHP.style.width = "0px";
            gamestate = "Win";
        }
        else {
            BossHP.style.width = `${currentBossHP}px`;
        }
    }

    function heroMobAttack() {
        monsterAperance = false;
        monster.style.display = 'none';
        currentMonster = 'none'

    }
    

    // Function that defines what happens when one of the character that can attack are clicked. I used the width in pixels as the hp.
    function knightAttack() {

        if (NkAlive != true) {
            output.innerHTML =  "Gravsteiner kan ikke angripe!";
            return;

        }
        if (monsterAperance != true) {
            heroAttackBoss();

            output.innerHTML = `Nameles Knight angrep big boss for ${dmg}hp`;

            setTimeout(bossAtack, bossDelay);

            randomAparance();
            return
        }
        output.innerHTML = 'Knight nekter å angripe trash mobs';

        
    }


    function juliaAttack() {

        if (juliaAlive != true) {
            output.innerHTML =  "Gravsteiner kan ikke angripe!";
            return;

        }
        if (arrowCount === 0) {
            output.innerHTML = "Julia kan ikke angriipe hun er tom for piller";
            return;
        }
        if (monsterAperance != true && currentBossHP > 50 && arrowCount != 0) {
            heroAttackBoss();

            arrowCount -= 1;

            output.innerHTML = `Julia angrep big boss for ${dmg}hp`;


            setTimeout(bossAtack, bossDelay);

            randomAparance();
            return
        }
        if (currentMonster != 'slime' && currentMonster != 'none' && arrowCount != 0) {
            heroMobAttack();
            setTimeout(bossAtack, bossDelay);
            return
        }
        if (currentMonster != 'none') {
            output.innerHTML = 'Julia er usikker på om hun vil skyte den. Hva om den smaker godt?';
            return; 
        }
    }

    function catAttack() {
        if (catAlive != true) {
            output.innerHTML =  "Gravsteiner kan ikke angripe!";
            return;

        }
        if (monsterAperance != true && currentBossHP > 50) {
            heroAttackBoss();

            output.innerHTML = `Cat angrep big boss for ${dmg}hp`;


            setTimeout(bossAtack, bossDelay);

            randomAparance();
            return
        }
        if (currentMonster != 'bat' && currentMonster != 'none') {
            heroMobAttack();
            setTimeout(bossAtack, bossDelay);
            return
        }
        output.innerHTML = 'Katten hopper og hopper, men når ikke opp til flaggermusen.'
        
    }


    // Function that creates arrows for julia to use.
    function createArrows() {
        for (i = arrowCount; i < 5; i++) {
            console.log("jack")
            counter += 1;
        }
        arrowCount = i;
        output.innerHTML = `Jack lagde ${counter} piler!`;
        counter = 0;
    }



    NknightShamalan.onclick = knightAttack;
    CrazyCat.onclick = catAttack;
    julia.onclick = juliaAttack;
    treeMan.onclick = createArrows;
    restartButton.onclick = restartGame; 