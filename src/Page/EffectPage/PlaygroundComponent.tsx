import React, { useEffect, useState} from 'react';
import HunterImg from './img/hunter.png';

import {Falcon, Dove, Sparrow, Bird} from './Playground/Playground'
import './Effect.css';


export default () => {

    // const hunter: NoobHunter = new NoobHunter("Bob");

    const [count, setCount] = useState<number>(0);

    //1. Используем классы созданные в том тс файле
    const [birdsArray, setBirdsArray] = useState<Array<Bird>>([   ])

    //2. Initialize Array<Bird>
    if(birdsArray.length === 0){
        for(let i=0; i<=10; i++){
            let randomBird = Math.floor(Math.random()*3);
            if(randomBird===0){
                birdsArray.push(new Falcon("Bob"))
            } else if(randomBird===1) {
                birdsArray.push(new Dove("Golub"))
            } else {
                birdsArray.push(new Sparrow("Vorobushek"))
            }
        }
    }

    // After step 2. => [Bird, Bird, Bird ...]
    

    //3. Logic to handle Bird Click
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

    let birdImgs: Array<JSX.Element> = birdsArray.map(bird => 
        <img src={bird.image} alt="Bird here" width = "100px" height = "100px" />);

    return(
        <div className="hunterGameContainer">
            <div className="birdContainer">
                {/* {birdsArray.map((bird, index) => 
                    bird.visible ? 
                    <img key={index} src={bird.image} alt="Bird here" width = "100px" height = "100px" 
                        onClick={(event: React.MouseEvent<HTMLImageElement>) => {handleBirdClick(index)}} /> :
                    
                    <img key={index} style={{visibility: "hidden"}} alt="Falcon here" width = "100px" height = "100px" />)
                        
                    
                    } */}

                    {birdImgs}
            </div>
            <div className="hunterContainer">
                <img src={HunterImg} alt="Hunter here" width = "200px" height = "300px"/>
                <div className="counter">
                    <label>Meat: </label>
                    <label>{count}</label>
                </div>
            </div>
        </div>
    );
}