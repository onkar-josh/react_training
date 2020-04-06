import React, { useState } from 'react';
import UseFetch from '../hooks/useFetch';

const ListOfUsers = (fetchOptions) => {
      
      return UseFetch("http://3.12.196.3:5000/users",fetchOptions
        ).then(response => {
          console.log(response);
          return response;
        });

}

export default ListOfUsers;