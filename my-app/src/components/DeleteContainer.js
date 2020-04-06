import React, { useState } from 'react';
import UseFetch from '../hooks/useFetch';

const DeleteContainer = (userName,fetchOptions) => {
      
      return UseFetch("http://3.12.196.3:5000/user/"+userName,fetchOptions
        ).then(response => {
          console.log(response.status);
          return response;
        });
}

export default DeleteContainer;