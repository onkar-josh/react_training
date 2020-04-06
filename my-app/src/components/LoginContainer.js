import React, { useState } from 'react';
import UseFetch from '../hooks/useFetch';

const LoginContainer = (fetchOptions) => {
      
      return UseFetch("http://3.12.196.3:5000/login",fetchOptions
        ).then(response => {
          console.log(response);
          return response;
        });
}

export default LoginContainer;