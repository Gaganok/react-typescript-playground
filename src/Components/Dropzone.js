import React, {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
import { wait } from '@testing-library/react';

function MyDropzone({loadHook, imagesHook}) {
  const onDrop = useCallback(acceptedFiles => {
    let formData = new FormData();
    formData.append("image", acceptedFiles[0])

    axios.post("http://localhost:7777/file/image/single", formData)
    .then(() => {
      console.log("Post successful!")
    })
    .catch(() => {
      console.log("Oops, request failed!")
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:7777/file/images')
    .then((response) => {
      imagesHook(response.data)
      loadHook(true)
    })
  }, []);

  const style = {
      dragOn: {
          "backgroundColor": 'grey',
          "color" : 'red'
      },
      dragOff: {
          "backgroundColor": 'white'
      }
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={isDragActive ? 'dropzone dropzoneActive' : 'dropzone'}>
            Drop the files here ...
        </div>
    </div>
  )
}

export default MyDropzone;