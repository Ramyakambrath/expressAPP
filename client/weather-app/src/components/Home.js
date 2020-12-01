import React ,{Component} from 'react';
import { FormGroup } from 'reactstrap';
import { useContext, useState , useEffect} from 'react';
import {Container} from '@material-ui/core';

import axios from 'axios';

export default function Home(props){
    const zipcode=useFormInput('');


return(

<div  className='container'>

<div className='header'>
        <h2>Weather Forcast</h2>
    </div>
    <div className='instructions'>
        <p>Enter a US zipcode below to get the current weather conditions for that area.</p>
    </div>
    <div className='zipcodeInput'>
     <FormGroup >
      <form {...zipcode}>
      
      <input {...zipcode}  />
      <button > Enter</button>
      
      
      </form>
      </FormGroup>

    </div>

</div>

 

)
}

function useFormInput(initialValue){

    const [value,setValue]=useState(initialValue)

    function handleChange(e){

        setValue(e.target.value)
    }
    function handleSubmit(e){
        axios.post('/search-location',{zipcode:value})
        .then(res => {
            if (res.data.redirect == '/error') {
                window.location = "/error"
            } else if (res.data.redirect == '/current-weather'){
                window.location = "/current-weather"
            }
          })
        setValue('')
    }
    
    return{
        value,
        onChange:handleChange,
        onSubmit:handleSubmit
    }
   




}

function useSetInput(initialValue,newValue){

    const [value,setValue]=useState(initialValue)


    function setNewValue(newValue){
        if(initialValue !== newValue){
            setValue(newValue)
        }
        
        
    }
    
    return{
        value,
        setNewValue
    }
   




}

