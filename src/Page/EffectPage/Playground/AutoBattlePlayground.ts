import MerlinImg from '../../../Resources/Image/merlin.png';
import PotterImg from '../../../Resources/Image/potter.png';
import VolandemortImg from '../../../Resources/Image/volandemort.png';
import ArthurImg from '../../../Resources/Image/arthur.png';

export abstract class Person{
    public alive: boolean = true;
    public dead: boolean = false;
    constructor(public name: string, public type: string, public health: number, public attack: number, public weapon: string, public image: string){}

    public takeDamage = (damage: number) => {
        this.health -= damage;
        console.log(`${this.name} receives ${damage}`)
        if(this.health <= 0){
            this.alive = false;
            this.dead = true;
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

export class Squad<T extends Person>{
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

export class BattleGround{
    constructor(public background: string, public allySquad: Squad<Ally>, public enemySquad: Squad<Enemy>){}
}

export class BattleRunner{
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

            if(battleGround.enemySquad.squad.length === 0){
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

            if(battleGround.allySquad.squad.length === 0){
                battle = false;
                console.log("Enemy Wins, Flawless Victory!!!")
                break;
            }
        }
    }
}

const selectDefender = (defenders: Array<any>) => {
    for(let defender of defenders){
        if(defender[0].alive){
            return defender
        }
    }
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class ReactBattleRunner{

    static async runBattle(battleGround: ReactBattleGround){
        const sides: Array<MapAlias> = [battleGround.allyMap, battleGround.enemyMap];

        const attackCharacterColor: string = "blue"
        const defenceCharacterColor: string = "red"
        const neutralCharacterColor: string = ""

        let sidePicker = 0; // 0 - ally turn, 1 - eneym turn

        while(true){
            let attackSide: MapAlias = sides[sidePicker]
            sidePicker = 1 - sidePicker
            let defendSide: MapAlias = sides[sidePicker]

            const defendSideKeyArray = Array.from(defendSide.entries());
            let defender = selectDefender(defendSideKeyArray)
            for(let attacker of attackSide){
                if(defender){
                    defender[1].current!.style.backgroundColor = defenceCharacterColor;
                    attacker[1].current!.style.backgroundColor = attackCharacterColor;
                    
                    await delay(500)

                    attacker[1].current!.style.backgroundColor = neutralCharacterColor;
                    defender[1].current!.style.backgroundColor = neutralCharacterColor;

                    defender[0].takeDamage(attacker[0].attack);
                    if(defender[0].dead){
                        defender[1].current!.style.visibility = "hidden";
                        defender = selectDefender(defendSideKeyArray)
                    }
                } else {
                    console.log("Victory")
                    return;
                }
            }
        }
    }
}

type MapAlias = Map<Person, React.RefObject<HTMLImageElement | null>>

export interface ReactBattleGround{
    allyMap: MapAlias,
    enemyMap: MapAlias,
}

export default function playground(){
    let enemySquad = new Squad<Enemy>([new Volandemort()])
    let allySquad = new Squad<Ally>([
        
        new Potter()])

    let battleGround: BattleGround = new BattleGround("fire", allySquad, enemySquad)

    BattleRunner.runBattle(battleGround);
}

export abstract class Enemy extends Person{
    public number: number = 20;
}

export abstract class Ally extends Person{
    public age: number = 20;
    allyRoar(){
        console.log("Aarghh!!!")
    }
}

export abstract class Wizard extends Ally{
    constructor(name: string, health: number, attack: number, image: string){
        super(name, "Wizard" , health, attack, "Stuff", image);
    }
}

export abstract class Knight extends Ally{
    constructor(name: string, health: number, attack: number, image: string){
        super(name, "Knight" , health, attack, "Sword", image);
    }
}

export abstract class  Paladin extends Enemy{
    constructor(name: string, health: number, attack: number, image: string){
        super(name, "Paladin" , health, attack, "Mace", image);
    }
}

export class Merlin extends Wizard{
    constructor(){
        super("Merlin", 100, 20, MerlinImg);
    }
}

export class Potter extends Wizard{
    constructor(){
        super("Potter", 100, 20, PotterImg);
    }
}

export class Arthur extends Knight{
    constructor(){
        super("Arthur", 100, 20, ArthurImg);
    }
}

export class Volandemort extends Paladin{
    constructor(){
        super("Volandemort", 100, 30, VolandemortImg);
    }
}
