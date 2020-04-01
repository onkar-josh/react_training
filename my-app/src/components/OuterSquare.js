import React from 'react';
import './form.css'
import InnerSqaure from './InnerSqaure';
import TopSquare from './TopSquare';

const OuterSquare = () => {
    return(
        
        <div className="OuterSquare">
        <TopSquare/>
        <InnerSqaure/>
        </div>
    )
};
export default OuterSquare;