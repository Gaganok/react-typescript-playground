import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three'
import { Object3D } from 'three';
import * as dat from 'dat.gui';
import './style.scss';
import CubeWave from './CubeWave'
import CubeTracer from './CubeTracer'
import CubePathFinder from './CubePathFinder'


export default () => {
    return(
        <Container>
            {/* <CubeWave/> */}
            {/* <CubeTracer/> */}
            <CubePathFinder/>
        </Container>
    );
}