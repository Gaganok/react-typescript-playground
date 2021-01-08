import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three'
import { Object3D } from 'three';
import './style.scss';


export default () => {
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5);
    
    camera.position.set(300, 800, 600)
    camera.lookAt(0, 0, 0)

    const objects: Array<THREE.Object3D> = []

    const planeGeometry: THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
    const planeMaterial: THREE.Material = new THREE.MeshBasicMaterial( {visible: false} );
    const plane: THREE.Mesh<THREE.PlaneBufferGeometry, THREE.Material> = new THREE.Mesh(planeGeometry, planeMaterial);
    planeGeometry.rotateX( - Math.PI / 2 );
    
    scene.add(plane);



    objects.push(plane)

    const rollOverGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    const rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 1, transparent: false, wireframe: true } );
    const rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
    rollOverMesh.position.set(0, 0, 0)
    scene.add( rollOverMesh );

    const gridHelper = new THREE.GridHelper( 1000, 20 );
    scene.add( gridHelper );

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // const ambientLight = new THREE.AmbientLight( 0x606060 );
    // scene.add( ambientLight );


    function onDocumentMouseMove( event: MouseEvent) {

        event.preventDefault();

        mouse.set( ( event.offsetX / (window.innerWidth / 1.5)) * 2 - 1, - ( event.offsetY / (window.innerHeight / 1.5 )) * 2 + 1 );

        raycaster.setFromCamera( mouse, camera );

        const intersects = raycaster.intersectObjects( objects );

        if ( intersects.length > 0 ) {

            const intersect = intersects[ 0 ];
            const a = intersect.face?.normal
            
            if(a){
                rollOverMesh.position.copy( intersect.point ).add(a);
                rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
            }

        }

        renderer.render( scene, camera );

    }

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

        plane.rotateX(0.05)
        console.log(plane.rotation.x)
    }
    // animate()

    renderer.render( scene, camera );

    const ref: React.RefObject<HTMLDivElement> = React.createRef()

    useEffect(() => {
        ref.current?.appendChild(renderer.domElement);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false );
    })

    return(
        <Container>
            <div ref={ref}/>
            <div className="scss-test">
                <div>
                    
                </div>
            </div>
        </Container>
    );
}