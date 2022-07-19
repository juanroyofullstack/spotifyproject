import React, { useState,useRef } from 'react';
import './View.scss';

function View({children}) {
    return <div>     
               {children}
            </div>
        }
  export default View;