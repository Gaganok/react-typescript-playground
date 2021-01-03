import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import CardComponentGroup, {CardInput} from './CardComponentGroup'
import './Effect.css';
import NeonLoading, {ColorSchema, Options} from './EffectComponent/NeonLoader/NeonLoading';
import MenuForNeonCircle, {Params} from '../../Components/MenuForNeonCircle';
import PlaygroundComponent from './PlaygroundComponent';
import playgroundFunc from './Playground/AutoBattlePlayground'

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

    return(
        <Container>
            <PlaygroundComponent></PlaygroundComponent>       
            <CardComponentGroup items={a}/>

            {/* <div className="menu">
                <NeonLoading {...{options}}/>
                <MenuForNeonCircle {...neonParams} />
            </div> */}
            
        </Container>
    );
}