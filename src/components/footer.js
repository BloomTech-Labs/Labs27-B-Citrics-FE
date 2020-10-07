import React from 'react';

function Footer() {
  return (
    <div
      className="footer"
      style={{
        width: '100%',
        height: '200px',
        border: '1px solid gray',
        backgroundColor: '#C3CFD9',
        position: 'absolute',
        bottom: '0px',
      }}
    >
      <img style={{ width: '85%', height: '100%' }} src="" />
      <h3
        className="footer-citrics"
        style={{
          position: 'absolute',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          display: 'inline-block',
          marginRight: '0px',
          marginLeft: 'auto',
          float: 'right',
        }}
      >
        Citrics Banner Placeholder
      </h3>
    </div>
  );
}

export default Footer;
