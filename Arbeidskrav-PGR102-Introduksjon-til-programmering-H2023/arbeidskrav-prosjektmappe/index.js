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

let bossDelay = 1500; //Defined to make it easier to balance the timing of attacks¨
let arrowCount = 5; // This variable is to keep count of how many arrows are left.
let maxArrowCount = 5;
let counter = 0; //Counter to be used to output how many arrows have been made by Jack

let gameState = "running"; 




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

    //Checks any of the heroes are dead after an attack. If they are they are replaced by a headstone. 
    function checkIfDead() {
        if (NkAlive === false) {
            output.innerHTML = "Nameles Knight Døde. De andre heltene kan ikke vinne uten han. <br> Big boss dreper de også";
            NknightShamalan.src = "images/headstone.png";
            juliaAlive = false;
            catAlive = false;
            juliaHP.style.width = "0px";
            gameState = "Game Over";
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
            catHP.style.width = "0px";
            catAlive = 0;
        }
        if (currentBossHP <= 0) {
            gameState = "Win"; 
        }
    }


    function bossAtack() {
        let targetFound = false;
        while (targetFound != true) { // While loop so that big boss does not select a target that is already dead. 
            //Boss selects target and attacks back
            let targetArr = Math.floor(Math.random() * characterArray.length);
            let target = characterArray[targetArr];
            //Used array to select target for the attack. Honsestly it would actually be one line less with code if I just used a random number, but I wanted to try.
            let bossDMG = Math.floor(Math.random()*70);
            if (target === "NK" && NkAlive != false) {
                currentNkHP -= bossDMG;
                NkHP.style.width = `${currentNkHP}px`;
                output.innerHTML = `Boss angriper Namles Knight for ${bossDMG}hp`;
                targetFound = true;
                
            }
            if (target === "Julia" && juliaAlive != false){
                currentJuliaHP -= bossDMG;
                juliaHP.style.width = `${currentJuliaHP}px`;
                output.innerHTML = `Boss angriper Julia for ${bossDMG}hp`;
                targetFound = true; 
            }
            if (target === "Cat" && catAlive != false) {
                currentCatHP -= bossDMG;
                catHP.style.width = `${currentCatHP}px`;
                output.innerHTML = `Boss angriper Cat for ${bossDMG}hp`;
                targetFound = true;
                
            }
        }
        setStatusAsDead();
        checkIfDead();
        setTimeout(checkGameState, 1000); //Delay set so that the player gets to see the characters turn into gravestones if Namless knight dies.
    }

    //Code for random apearance of monster
    function randomAparance() {
        chance = Math.floor(Math.random()*100);
        if (chance <= 12.5 && juliaAlive === true) {
            monster.src = 'images/bat.png';
            monster.style.display = 'block';
            monsterAperance = true;
            currentMonster = 'bat'; // To identify what the is monster. Used during hero restrictions.
            output.innerHTML = 'En flaggermus dukket opp!';
            return;
        }
        if (chance <= 25 && catAlive === true) {
            monster.src = 'images/slime.png';
            monster.style.display = 'block'
            monsterAperance = true;
            currentMonster = 'slime';
            output.innerHTML = 'En slime dukket opp!';
        }
    }

    // Functions for the different attacks. So that the actual attack function is easier to read and to avoid nesting
    function heroAttackBoss() {
        currentBossHP -= dmg;
        if (currentBossHP <= 0) {
            BossHP.style.width = "0px";
            gameState = "Win";
        }
        else {
            BossHP.style.width = `${currentBossHP}px`;
        }
    }

    function heroMobAttack() {
        monsterAperance = false;
        monster.style.display = 'none';
        currentMonster = 'none';

    }
    

    // Function that defines what happens when one of the character that can attack are clicked. I used the width in pixels as the hp.
    function knightAttack() {
        dmg = Math.floor(Math.random()*50);

        if (NkAlive != true) {
            output.innerHTML =  "Gravsteiner kan ikke angripe!";
            return;

        }
        if (monsterAperance != true) {
            heroAttackBoss();

            output.innerHTML = `Nameles Knight angrep big boss for ${dmg}hp`;

            setTimeout(bossAtack, bossDelay);

            randomAparance();
            return;
        }
        output.innerHTML = 'Knight nekter å angripe trash mobs';

        
    }


    function juliaAttack() {
        dmg = Math.floor(Math.random()*50);

        if (juliaAlive != true) {
            output.innerHTML =  "Gravsteiner kan ikke angripe!";
            return;

        }
        if (arrowCount === 0) {
            output.innerHTML = "Julia kan ikke angriipe hun er tom for piller";
            return;
        }
        if (monsterAperance != true && dmg < currentBossHP && arrowCount != 0) {
            heroAttackBoss();

            arrowCount -= 1;

            output.innerHTML = `Julia angrep big boss for ${dmg}hp`;


            setTimeout(bossAtack, bossDelay);

            randomAparance();
            return;
        }
        if (currentMonster != 'slime' && currentMonster != 'none' && arrowCount != 0) { // Only posibility is when monster is bat.
            heroMobAttack();
            output.innerHTML = "Julia drepte flaggermusen!";
            setTimeout(bossAtack, bossDelay);
            return;
        }
        if (currentMonster != 'none') {
            output.innerHTML = 'Julia er usikker på om hun vil skyte den. Hva om den smaker godt?';
            return; 
        }
            output.innerHTML = "Julia kan ikke drepe Big Boss";
    }

    function catAttack() {
        dmg = Math.floor(Math.random()*50);
        if (catAlive != true) {
            output.innerHTML =  "Gravsteiner kan ikke angripe!";
            return;

        }
        if (monsterAperance != true && dmg < currentBossHP) {
            heroAttackBoss();

            output.innerHTML = `Cat angrep big boss for ${dmg}hp`;


            setTimeout(bossAtack, bossDelay);

            randomAparance();
            return;
        }
        if (currentMonster != 'bat' && currentMonster != 'none') {
            heroMobAttack();
            output.innerHTML = "Cat drepte Slim Monsteret";
            setTimeout(bossAtack, bossDelay);
            return;
        }
        if (currentMonster != "none") {
        output.innerHTML = 'Cat hopper og hopper, men når ikke opp til flaggermusen.';
        return;
        }
        output.innerHTML = "Cat kan ikke depe Big Boss.";
        
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
            let target = characterArray[targetArr];
            if (target === "NK") {
                currentNkHP += Math.floor(Math.random()*30) + 1;
                console.log("Nk healed");
                NkHP.style.width = `${currentNkHP}px`;
            }
            if (target === "Julia") {
                currentJuliaHP += Math.floor(Math.random()*30) + 1;
                console.log("Julia healed");
                juliaHP.style.width = `${currentJuliaHP}px`;

            }
            if (target === "Cat") {
                currentCatHP += Math.floor(Math.random()*30) + 1;
                console.log("Cat Healed");
                catHP.style.width = `${currentCatHP}px`;
            }
        }
        disableOverHeal()
    }

    function disableOverHeal() { //function to stop healing from going over the HPbar limit.
        if (currentNkHP > 200) {
            currentNkHP = 200;
            NkHP.style.width = "200px";
        }
        if (currentJuliaHP > 200) {
            currentJuliaHP = 200;
            juliaHP.style.width = "200px";
        }
        if (currentCatHP > 200) {
            currentCatHP = 200;
            catHP.style.width = "200px";
        }
    }


    NknightShamalan.onclick = knightAttack;
    CrazyCat.onclick = catAttack;
    julia.onclick = juliaAttack;
    treeMan.onclick = createArrows;
    restartButton.onclick = restartGame; 
    wiliamTheHealer.onclick = healAllies;