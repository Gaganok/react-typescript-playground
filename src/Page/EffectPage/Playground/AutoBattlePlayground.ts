

abstract class Person{
    public alive: boolean = true;
    constructor(public name: string, public type: string, public health: number, public attack: number, public weapon: string){}

    public takeDamage = (damage: number) => {
        this.health -= damage;
        console.log(`${this.name} receives ${damage}`)
        if(this.health <= 0){
            this.alive = false;
            console.log(`${this.name} has died`)
        }

        return this;
    }

    public damage(person: Person){
        
        if(person.alive){
            person.takeDamage(this.attack);
        }
    }
}

class Squad<T extends Person>{
    public squad: Array<T>
    public maxPerson: number = 6;

    constructor (squad? : Array<T>){ //maxPerson?: number, 
        // if(maxPerson) this.maxPerson = maxPerson;
        this.squad = squad ? squad : new Array<T>();
    }

    public add(character: T){
        if(this.squad.length < this.maxPerson){
            this.squad.push(character);
        }
    }

    public getTarget(): T & {index: number} | undefined{
        for(let i: number = 0; i < this.squad.length; ++i){
            if(this.squad[i] !== undefined){
                let char: T = this.squad[i];
                return {...char, index: i};
            }
        }
        return undefined;
    }
}

class BattleGround{
    constructor(public background: string, public allySquad: Squad<Ally>, public enemySquad: Squad<Enemy>){}
}

class BattleRunner{
    static runBattle(battleGround: BattleGround){
        let battle = true;
        while(battle){
            battleGround.allySquad.squad.forEach(ally => {
                let target = battleGround.enemySquad.getTarget();
                if(target){
                    console.log(`${ally.name} attacks ${target.name}`)
                    target.takeDamage(ally.attack)
                    if(!target.alive){
                        battleGround.enemySquad.squad.splice(target.index, 1);
                    }
                }
            })

            if(battleGround.enemySquad.squad.length == 0){
                battle = false;
                console.log("Ally Wins, Flawless Victory!!!")
                break;
            }

            battleGround.enemySquad.squad.forEach(enemy => {
                let target = battleGround.allySquad.getTarget();
                if(target){
                    console.log(`${enemy.name} attacks ${target.name}`)
                    target = target.takeDamage(enemy.attack)
                    if(!target.alive){
                        battleGround.allySquad.squad.splice(target.index, 1);
                    }
                }
            })

            if(battleGround.allySquad.squad.length == 0){
                battle = false;
                console.log("Enemy Wins, Flawless Victory!!!")
                break;
            }
        }
    }
}

export default function playground(){
    let enemySquad = new Squad<Enemy>([new Volandemort()])
    let allySquad = new Squad<Ally>([new Potter()])

    let battleGround: BattleGround = new BattleGround("fire", allySquad, enemySquad)

    BattleRunner.runBattle(battleGround);
}

abstract class Enemy extends Person{
    public number: number = 20;
}

abstract class Ally extends Person{
    public age: number = 20;
    allyRoar(){
        console.log("Aarghh!!!")
    }
}

abstract class Wizard extends Ally{
    constructor(name: string, health: number, attack: number){
        super(name, "Wizard" , health, attack, "Stuff");
    }
}

abstract class Knight extends Ally{
    constructor(name: string, health: number, attack: number){
        super(name, "Knight" , health, attack, "Sword");
    }
}

abstract class  Paladin extends Enemy{
    constructor(name: string, health: number, attack: number){
        super(name, "Paladin" , health, attack, "Mace");
    }
}

class Merlin extends Wizard{
    constructor(){
        super("Merlin", 100, 20);
    }
}

class Potter extends Wizard{
    constructor(){
        super("Potter", 100, 20);
    }
}

class Arthur extends Knight{
    constructor(){
        super("Arthur", 100, 20);
    }
}
class Volandemort extends Paladin{
    constructor(){
        super("Volandemort", 100, 30);
    }
}
