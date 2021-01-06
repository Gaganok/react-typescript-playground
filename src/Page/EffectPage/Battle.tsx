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

    return(
        <div className="BattleGround">
            <div className="BattleAlly">
                {battleGround.allySquad.squad.map(ally => <img src={ally.image} alt="Some Ally Hero" height="300px" width= "300px"/>)}
            </div>
            <div className="BattleEnemy">
                {battleGround.enemySquad.squad.map(Enemy => <img src={Enemy.image} alt="Some Enemy Here" height="300px" width= "300px"/>)}
            </div>
            
        </div>
    );
}