import React from 'react';

function Toast(props) {
  return (
    <div className='col-12' id='toast'>
      {props.toastMsg}
    </div>
  );
}

export default Toast;
