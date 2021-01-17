
export default function aStarFinder(start: Cell, end: Cell): Array<Cell> | undefined{

    const open: Array<Cell> = [start]
    const closed: Array<cord> = []
    
    start.distanceFrom = 0
    getDistanceToEnd(end, start);

    while(open.length > 0){

        const current: Cell  = getBestPathIndex(open);

        if(equals(current, end)){
            end.previous = current;
            return buildPath(end)
        }
        
        closed.push(current.cord)
        const neighbors: Array<Cell> = getNeighbors(current)

        for(let neighbor of neighbors){
            if(!closed.find(cord => cord.x === neighbor.cord.x && cord.z === neighbor.cord.z)){
                getDistanceFromStart(start, neighbor);
                getDistanceToEnd(end, neighbor);
                open.push(neighbor);
            }
        }
    }

    return undefined;
}

function buildPath(end: Cell): Array<Cell>{
    const result: Array<Cell> = []
    let current: Cell = end
    while(current){
        current = current.previous!;
        result.push(current)
    }

    return result.reverse();
}

function getNeighbors(cell: Cell): Array<Cell>{
    return [
        {cord: {x: cell.cord.x + 50, z: cell.cord.z}, previous: cell},
        {cord: {x: cell.cord.x - 50, z: cell.cord.z}, previous: cell},
        {cord: {x: cell.cord.x, z: cell.cord.z - 50}, previous: cell},
        {cord: {x: cell.cord.x, z: cell.cord.z + 50}, previous: cell},
    ];
}

function getBestPathIndex(open: Array<Cell>): Cell{
    let result: Cell = open[0]
    let resultIndex:number = 0
    let resultScore = result.distanceFrom! + result.distanceTo!
    for(let i = 1; i < open.length; ++i){
        const next = open[i]
        const nextScore = next.distanceFrom! + next.distanceTo!
        if(nextScore < resultScore ){
            resultScore = nextScore;
            result = next;
            resultIndex = i;
        }
    }

    open.splice(resultIndex, 1)
    return result;
}


function getDistanceFromStart(start: Cell, cell: Cell){
    cell.distanceFrom = Math.abs(start.cord.x - cell.cord.x) + Math.abs(start.cord.z - cell.cord.z)
}

function getDistanceToEnd(end: Cell, cell: Cell){
    cell.distanceTo = Math.abs(end.cord.x - cell.cord.x) + Math.abs(end.cord.z - cell.cord.z)
}

function equals(a: Cell, b: Cell): boolean {
    return a.cord.x === b.cord.x && a.cord.z === b.cord.z
}

type cord = {x: number, z: number}

export class Cell{
    // cord?: cord;

    // constructor(cell: cell){
    //     Object.assign(this, cell);
    // }

    constructor(
        public cord: cord, 
        public distanceFrom?:number, 
        public distanceTo?:number, 
        public next?: Cell, 
        public previous?: Cell)
        {}
}
