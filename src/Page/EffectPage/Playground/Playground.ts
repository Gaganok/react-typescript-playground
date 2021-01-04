import FalconImg from '../img/falcon.png';
import DoveImg from '../img/dove.png';
import SparrowImg from '../img/sparrow.png';
function Hunting(){}

export abstract class Bird{
    public visible: boolean = true;
    constructor(public name:string, public level: string, public meat: number, public image?: string | undefined) {}
    toString():string{
        return this.name +" "+ this.level
    }
}

export class Falcon extends Bird{
    constructor(name: string){
        super(name, "High", 1, FalconImg);
    }

    static random(){
        console.log("Doing the Do")
    }
}
export class Dove extends Bird{
    constructor(name: string){
        super(name, "Middle", 5, DoveImg);
    }
}
export class Sparrow extends Bird{
    constructor(name: string){
        super(name, "Low", 10, SparrowImg);
    }
}

export class NoobHunter{
    constructor(public name: string) {}
    public summary:HunterSummary = new HunterSummary()
    hunterBirds(hunt: Bird){
        let play : HunterSummaryItem = {
            data: Date.now().toString(), 
            event: this.name + hunt.toString()
        }
        this.summary.log(play) 
        this.butcher(hunt)     
    }
    butcher (hunt: Bird){
        console.log("Hunter " + this.name + " starting hunter " + hunt.name + " with level " + hunt.level )
        console.log("Hunter " + this.name + " hunted " + hunt.toString() + " and butched " + hunt.meat + " units ")
    }
}

export class ExperiencedHunter extends NoobHunter{    
    butcher (hunt: Bird){
        console.log("ExperiencedHunter " + this.name + " starting hunter " + hunt.name + " with level " + hunt.level )
        console.log("ExperiencedHunter " + this.name + " hunted " + hunt.toString() + " and butched " + (hunt.meat + 5)+ " units ")
    }
}

type HunterSummaryItem = {data:string, event: string}

export class HunterSummary{
    public storage: Array<HunterSummaryItem> = [] 
    log(item: HunterSummaryItem){
        this.storage.push(item)
    }
    display(){
        for(let item of this.storage){
            let text: string = item.data + " " + item.event
            console.log(text)
        }
    }
}



