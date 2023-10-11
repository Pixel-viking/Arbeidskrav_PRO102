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

/*
    HP bars
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

let currentMonster = '';

monster.style.display = 'none';









    function bossAtack() {
        //Boss selects target and attacks back
        let target = Math.floor(Math.random()*3) + 1;
        let bossDMG = Math.floor(Math.random()*100)
        if (target === 1) {
            currentNkHP -= bossDMG;
            NkHP.style.width = `${currentNkHP}px`
            output.innerHTML = `Boss angriper Namles Knight for ${bossDMG}hp`
        }
        else if (target === 2){
            currentJuliaHP -= bossDMG;
            juliaHP.style.width = `${currentJuliaHP}px`
            output.innerHTML = `Boss angriper Julia for ${bossDMG}hp`
        }
        else if (target === 3) {
            currentCatHP -= bossDMG;
            catHP.style.width = `${currentCatHP}px`
            output.innerHTML = `Boss angriper Cat for ${bossDMG}hp`
            
        }
        console.log(target)
        console.log(bossDMG)
    }

    //Code for random apearance of monster
    function randomAparance() {
        let chance = Math.floor(Math.random()*100) + 1;
        if (chance <= 12.5) {
            monster.src = 'images/bat.png';
            monster.style.display = 'block'
            console.log("monster");
            monsterAperance = true;
            currentMonster = 'bat'; // To identify what the monster. Used during hero restrictions.
            output.innerHTML = 'En flaggermus dukket opp!'
            return
        }
        if (chance <= 25) {
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
        if (monsterAperance != true) {
            heroAttackBoss();

            output.innerHTML = `Nameles Knight angrep big boss for ${dmg}hp`;

            bossAtack();

            randomAparance();
            return
        }
        output.innerHTML = 'Knight nekter å angripe trash mobs';
        
    }

    function juliaAttack() {
        if (monsterAperance != true && currentBossHP > 50) {
            heroAttackBoss();

            output.innerHTML = `Julia angrep big boss for ${dmg}hp`;


            bossAtack();

            randomAparance();
            return
        }
        if (currentMonster != 'slime' && currentMonster != 'none') {
            heroMobAttack();
            bossAtack();
            return
        }
        output.innerHTML = 'Julia er usikker på om hun vil skyte den. Hva om den smaker godt?';
    }

    function catAttack() {
        if (monsterAperance != true && currentBossHP > 50) {
            heroAttackBoss();

            output.innerHTML = `Cat angrep big boss for ${dmg}hp`;


            bossAtack();

            randomAparance();
            return
        }
        if (currentMonster != 'bat' && currentMonster != 'none') {
            heroMobAttack();
            bossAtack();
            return
        }
        output.innerHTML = 'Katten hopper og hopper, men når ikke opp til flaggermusen.'
        
    }

    function StopDisplay(CreatureName) {
        CreatureName.style.display = "none";
    }

    NknightShamalan.onclick = knightAttack;
    CrazyCat.onclick = catAttack;
    julia.onclick = juliaAttack;