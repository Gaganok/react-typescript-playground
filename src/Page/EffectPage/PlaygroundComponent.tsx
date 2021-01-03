import React, { useState, useEffect } from 'react';
import HunterImg from './img/hunter.png';

import {Falcon, Dove, Sparrow, NoobHunter, Bird} from './Playground/Playground'
import './Effect.css';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';


export default () => {

    const hunter: NoobHunter = new NoobHunter("Bob");

    const [count, setCount] = useState<number>(0);

    const [birdsArray, setBirdsArray] = useState<Array<Bird>>([
        // new Falcon("Woodie"),
        // new Falcon("Wood Pecker"),
        // new Dove("Golub"),
        // new Sparrow("Vorobushek"),
        
    ])

    if(birdsArray.length == 0){
        for(let i=0; i<=10; i++){
            let randomBird = Math.floor(Math.random()*3);
            if(randomBird==0){
                birdsArray.push(new Falcon("Bob"))
            } else if(randomBird==1) {
                birdsArray.push(new Dove("Golub"))
            } else {
                birdsArray.push(new Sparrow("Vorobushek"))
            }
        }
    }
    
    function handleBirdClick(id: number){
        const bird: Bird = birdsArray[id];
        bird.visible = false;
        // birdsArray.splice(id, 1)
        setBirdsArray(birdsArray);
        setCount(count + bird.meat);
        
        /*
            1. Bird disappears
            2. Update Meat Counter /// No meat counter :)
            3. ...
        */
        console.log(bird);
    }

    return(
        <div className="hunterGameContainer">
            <div className="birdContainer">
                {birdsArray.map((bird, index) => 
                    bird.visible ? 
                    <img key={index} src={bird.image} alt="Bird image here" width = "100px" height = "100px" 
                        onClick={(event: React.MouseEvent<HTMLImageElement>) => {handleBirdClick(index)}} /> :
                    
                    <img key={index} style={{visibility: "hidden"}} alt="Falcon image here" width = "100px" height = "100px" />)
                        
                    
                    }
            </div>

            <div className="hunterContainer">
                <img src={HunterImg} alt="Hunter image here" width = "200px" height = "300px"/>
                <div className="counter">
                    <label>Meat: </label>
                    <label>{count}</label>
                </div>
            </div>
        </div>
    );
}