import React, { useState } from 'react';
import UseFetch from '../hooks/useFetch';

const RegisterContainer = (fetchOptions) => {
      
      return UseFetch("http://3.12.196.3:5000/user",fetchOptions
        ).then(response => {
          console.log(response);
          return response;
        });

}

export default RegisterContainer;