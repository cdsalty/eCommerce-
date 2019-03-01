// an action is a js function that returns an object, ALWAYS
// that object MUST have at least 1 property
// a property of type

import axios from 'axios';


export default (formData)=>{
    console.log('Login action is running')
    console.log(formData)
    const axiosPromise = axios({
        url: `${window.apiHost}/login`,
        method: 'POST',
        data: formData
    })
    return{
        type: 'LOGIN_ACTION',
        payload: axiosPromise
    }
}