import React, { useEffect, useState} from 'react';
import './Effect.scss';
import {BattleGround, Ally, Enemy, BattleRunner, Person, ReactBattleRunner} from './Playground/AutoBattlePlayground'
import {Button} from '@material-ui/core';
import { isJsxElement } from 'typescript';

interface BattleInput{
    battleGround: BattleGround;
}

type BattleElementType = {[key: string]: JSX.Element}

export default ({battleGround}: BattleInput) => {

    const allyMap: Map<Ally, React.RefObject<HTMLImageElement>> = new Map;
    battleGround.allySquad.squad.forEach(character => allyMap.set(character, React.useRef<HTMLImageElement>(null)));

    const enemyMap: Map<Enemy, React.RefObject<HTMLImageElement>> = new Map;
    battleGround.enemySquad.squad.forEach(character => enemyMap.set(character, React.useRef<HTMLImageElement>(null)));

    const allyJSXElements: Array<JSX.Element> = []
    for (let [key, value] of allyMap) {
        allyJSXElements.push(<img src={key.image} ref={value} alt="Some Ally Hero" height="200px" width= "200px"/>)
    }

    const enemyJSXElements: Array<JSX.Element> = []
    for (let [key, value] of enemyMap) {
        enemyJSXElements.push(<img src={key.image} ref={value} alt="Some Enemy Hero" height="200px" width= "200px"/>)
    }


    return(
        <div className="BattleGround">
            <div className="BattleAlly">
                {allyJSXElements}
            </div>

            <div className="BattleEnemy">
                {enemyJSXElements}
            </div>

            <Button 
                className="BattleButton" 
                variant="contained" 
                color="primary"
                onClick={() => ReactBattleRunner.runBattle({allyMap, enemyMap})}
            >
                Start Games
            </Button>
        </div>
    );
}