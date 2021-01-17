import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three'
import { Object3D } from 'three';
import * as dat from 'dat.gui';
import PathFinder, {Cell} from './PathFinder'
import './style.scss';


export default () => {
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );
    const renderer = new THREE.WebGLRenderer();

    const objects: Array<THREE.Object3D> = []
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let pathToGo: Array<Cell> = [];

    let pathTargetPoint: THREE.Vector3 = new THREE.Vector3();

    const windowWidth = window.innerWidth / 1.5
    const windowHeight = window.innerHeight / 1.5
    renderer.setSize(windowWidth , windowHeight);
    
    camera.position.set(300, 800, 600)
    camera.lookAt(0, 0, 0)

    // Plane
    const planeGeometry: THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
    const planeMaterial: THREE.Material = new THREE.MeshBasicMaterial( {visible: false} );
    const plane: THREE.Mesh<THREE.PlaneBufferGeometry, THREE.Material> = new THREE.Mesh(planeGeometry, planeMaterial);
    planeGeometry.rotateX( - Math.PI / 2 );
    scene.add(plane);

    // Red Cube Placeholder
    const rollOverGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    const rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 1, transparent: false, wireframe: true } );
    const rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
    rollOverMesh.position.set(0, 0, 0)
    scene.add( rollOverMesh );

    // Grid
    const gridHelper = new THREE.GridHelper( 1000, 20 );
    scene.add( gridHelper );

    const cubePathFinderGeometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
    const cubePathFinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000} );
    const cubePathFinder = new THREE.Mesh( cubePathFinderGeometry, cubePathFinderMaterial );
    cubePathFinder.position.set(25, 25, 25);
    scene.add(cubePathFinder);

    // const ambientLight = new THREE.AmbientLight( 0x606060 );
    // scene.add( ambientLight );

    function onDocumentMouseMove( event: MouseEvent) {
        event.preventDefault();

        const intersections = getPlaneIntersaction(event);

        if (intersections.length > 0) {
            const intersection = intersections[0]
            rollOverMesh.position.copy( intersection.point ).add(intersection.face!.normal);
            rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
        }

        renderer.render( scene, camera );
    }

    function onMouseClick(event: MouseEvent){
        event.preventDefault();
        const intersections = getPlaneIntersaction(event);
        if (intersections.length > 0) {
            pathTargetPoint.copy(intersections[0].point);
            pathTargetPoint.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
        }

        pathToGo = PathFinder(
            {cord: {x: cubePathFinder.position.x, z: cubePathFinder.position.z}},  
            {cord: {x: pathTargetPoint.x, z: pathTargetPoint.z}}
        )!
    }

    function getPlaneIntersaction(event: MouseEvent): THREE.Intersection[]{
        mouse.set( (event.offsetX / windowWidth) * 2 - 1, - (event.offsetY / windowHeight) * 2 + 1 );
        raycaster.setFromCamera( mouse, camera );
        return raycaster.intersectObject(plane);
    }

    let currentPathStep = 1 
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );   
    }

    function doPathGo(){
        if(pathToGo.length > 0){
            if(currentPathStep < pathToGo.length){
                let curPath: Cell = pathToGo[currentPathStep]
                cubePathFinder.position.x = curPath.cord.x
                cubePathFinder.position.z = curPath.cord.z
                currentPathStep++
            } else {
                currentPathStep = 1
                pathToGo = []
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
        
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false );
        renderer.domElement.addEventListener('click', onMouseClick, false );

        animate()

        setInterval(() => doPathGo(), 100)
    })

    return(
        <Container>
            <div ref={ref}/>
            <div id="datgui" tabIndex={10}/>
        </Container>
    );
}