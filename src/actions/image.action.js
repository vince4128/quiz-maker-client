import axios from 'axios';
import {
    FETCH_IMAGES,
    FETCH_IMAGE,
    CREATE_IMAGE,
    DELETE_IMAGE,
    EDIT_IMAGE  
} from './types';

const server = 'http://localhost:3000';

export function fetchImages(){
    const response = axios.get(`${server}/image`);

    return {
        type:FETCH_IMAGES,
        payload:response
    }
}

export function fetchImage(id){
    const response = axios.get(`${server}/image/${id}`);

    return {
        type:FETCH_IMAGE,
        payload:response
    }
}

export function createImage(values, token, callback){

    console.log("values in action ", values);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${server}/upload`, true);

    xhr.setRequestHeader("Content-Type", "multipart/form-data");

    xhr.onreadystatechange = () => {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            alert('requete effectuee');
        }
    }

    xhr.send(values);

    callback();

    return {
        type:CREATE_IMAGE,
        payload: {"ok":"ok"}
    }

}

export function editImage(id, values, token, callback){
    const request = axios.put(`${server}/image/${id}`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: EDIT_IMAGE,
        payload: request
    }
}

export function deleteImage(id, token){
    
    axios.delete(`${server}/image/${id}`, {
        headers: {authorization:token}
    });

    return {
        type: DELETE_IMAGE,
        payload: id
    }
}