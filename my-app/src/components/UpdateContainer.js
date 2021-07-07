import React, { useState } from 'react';
import UseFetch from '../hooks/useFetch';
import ValidationForm from '../components/ValidationForm';

const UpdateContainer = (userName,fetchOptions) => {
      
      return UseFetch("http://3.12.196.3:5000/user/"+userName,fetchOptions
        ).then(response => {
          console.log(response);
          console.log(ValidationForm.newToken);
          return response;
        });

}

export default UpdateContainer;