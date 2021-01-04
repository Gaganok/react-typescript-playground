import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import CardComponentGroup, {CardInput} from './CardComponentGroup'
import './Effect.css';
import NeonLoading, {ColorSchema, Options} from './EffectComponent/NeonLoader/NeonLoading';
import MenuForNeonCircle, {Params} from '../../Components/MenuForNeonCircle';
import PlaygroundComponent from './PlaygroundComponent';
import Battle from '../EffectPage/Battle'
import {Merlin, Potter, Arthur, Volandemort, Person, Ally, Enemy, BattleGround, Squad} from './Playground/AutoBattlePlayground'


// playgroundFunc()

export default () => {
    let a: Array<CardInput> = [
        {
            // backgroundText: "1",
            title: "1",
            text: "2"
        },
        {
            // backgroundText: "1",
            title: "1",
            text: "2"
        },
        {
            title: "1",
            text: "2"
        }
    ];

    let [maxCircle, setMax] = useState(20)
    let [options, setOptions] = useState(new Options(500, 500, maxCircle, 10, 200, "black"));
    const neonParams: Params = {options, setOptions}

    const allySquad: Squad<Ally> = new Squad<Ally>([new Potter(), new Merlin(), new Arthur()])
    const enemySquad: Squad<Enemy> = new Squad<Enemy>([new Volandemort()])
    const battleGround: BattleGround = new BattleGround("", allySquad, enemySquad);
    
    return(
        <Container>
            <Battle battleGround={battleGround}/>
            <PlaygroundComponent></PlaygroundComponent>       
            <CardComponentGroup items={a}/>

            <div className="menu">
                <NeonLoading {...{options}}/>
                <MenuForNeonCircle {...neonParams} />
            </div>
            
        </Container>
    );
}