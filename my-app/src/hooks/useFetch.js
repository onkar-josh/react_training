import React, { useState }from 'react';



const useFetch = (url,options) =>{

    return fetch(url,options)
    .then(resp => {
        //zsconsole.log(status);
        return resp.json();
      })
      .catch(error=> {
          console.log("error :", error)
    });
}


  export default useFetch;