import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three'
import { Object3D } from 'three';
import * as dat from 'dat.gui';
import './style.scss';


export default () => {
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5);
    
    camera.position.set(300, 800, 600)
    camera.lookAt(0, 0, 0)

    const objects: Array<cubeMeshAngle> = []

    const cubeGeometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
    const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000} );

    const gridHelper = new THREE.GridHelper( 1000, 20 );
    gridHelper.position.set(0, 0, 0)
    scene.add( gridHelper );

    initCubes(20, 20, 50)

    function animate() {
        cubeWave()
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }

    function cubeWave(){
        for(let i = 0; i < objects.length; ++i){
            const cube = objects[i];
            cube.cube.position.y = Math.sin(cube.angle) * 100
            cube.angle += 0.01

            if(cube.angle > 360) cube.angle %= 360
        }
    }

    type cubeMeshAngle = {
        cube: THREE.Object3D,
        angle: number;
    }

    function initCubes(horizontalCubes: number, verticalCubes:number, positionOffset: number){
        const offsetX = horizontalCubes * positionOffset / 2;
        const offsetZ = verticalCubes * positionOffset / 2;
        for(let x = 0; x < horizontalCubes; ++x){
            for(let z = 0; z < verticalCubes; ++z){
                const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
                const positionX = x * positionOffset - offsetX;
                const positionZ = z * positionOffset - offsetZ;
                cubeMesh.position.set(positionX, 0, positionZ)
                scene.add(cubeMesh);
                objects.push({cube: cubeMesh, angle: (x+z) / 5});
            }
        }
    }

    const ref: React.RefObject<HTMLDivElement> = React.createRef()

    useEffect(() => {

        let gui = new dat.GUI();
        gui.add(camera.position, 'x').min(0).max(1500).step(1);
        gui.add(camera.position, 'y').min(0).max(1500).step(1);
        gui.add(camera.position, 'z').min(0).max(1500).step(1);
        gui.domElement.id = "datgui"

        ref.current?.appendChild(renderer.domElement);
        ref.current?.focus({preventScroll: true});

        animate()
    })

    return(
        <Container>
            <div ref={ref}/>
            <div id="datgui" tabIndex={10}/>
        </Container>
    );
}