import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three'

export default () => {
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    const minimize: number = 1.5
    renderer.setSize( window.innerWidth / minimize, window.innerHeight  / minimize);
    // document.body.appendChild( renderer.domElement );

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cubes: Array<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>> = [];

    let delta = 2;
    for(let i = 0; i < 3; ++i){
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );

        const deltaI = delta * i;
        cube.translateX(deltaI);
        cube.translateZ(deltaI);
        cube.translateY(deltaI);
        
        cubes.push(cube)
        scene.add(cube)
    }
    
    camera.position.z = 10;

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

        cubes.forEach(cube => {
            cube.rotation.x += 0.03;
            cube.rotation.y += 0.01;
        })
    }
    animate();

    const ref: React.RefObject<HTMLDivElement> = React.createRef()

    useEffect(() => {
        ref.current?.appendChild(renderer.domElement);
    })

    return(
        <Container>
            <div ref={ref}/>
        </Container>
    );
}