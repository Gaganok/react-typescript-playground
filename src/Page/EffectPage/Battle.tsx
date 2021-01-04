import React, { useEffect, useState} from 'react';
import './Effect.css';
import {BattleGround, Ally, Enemy} from './Playground/AutoBattlePlayground'

type BattleInput = {
    battleGround: BattleGround;
}

export default ({battleGround}: BattleInput) => {

    let toShow: Array<JSX.Element> = []

    let squad1: Array<Ally> = battleGround.allySquad.squad;
    let squad2: Array<Enemy> = battleGround.enemySquad.squad;

    for(let i = 0; i < squad1.length; ++i){
        let allyPerson: Ally = squad1[i];
        let allyImageElement: JSX.Element = <img src={allyPerson.image} alt="Some Ally Hero" height="100px" width= "100px"/>
        toShow.push(allyImageElement);
    }

    for(let i = 0; i < squad2.length; ++i){
        let enemyPerson: Enemy = squad2[i];
        let enemyImageElement: JSX.Element = <img src={enemyPerson.image} alt="Some Enemy Hero" height="100px" width= "100px"/>
        toShow.push(enemyImageElement);
    }

    return(
        <div className="">
            {battleGround.allySquad.squad.map(ally => <img src={ally.image} alt="Some Ally Hero" height="100px" width= "100px"/>)}
            {toShow}
        </div>
    );
}