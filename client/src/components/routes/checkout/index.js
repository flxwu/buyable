import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

import { FormPreviousLink } from 'grommet-icons';

const CheckoutRoute = ({ history }) => {
  const [elementFontSize, setElementFontSize] = useState(
    window.innerWidth < 450 ? '14px' : '18px'
  );

  const [backButtonHovered, setHovered] = useState(false);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 450 && elementFontSize !== '14px') {
      setElementFontSize('14px');
    } else if (window.innerWidth >= 450 && elementFontSize !== '18px') {
      setElementFontSize('18px');
    }
  });

  const backButtonStyle = {
    position: 'absolute',
    width: '3rem',
    height: '3rem',
    left: 0,
    marginTop: '2rem'
  };
  const backButtonStyleHover = {
    position: 'absolute',
    width: '3rem',
    height: '3rem',
    left: 0,
    marginTop: '2rem',
    cursor: 'pointer',
    transform: 'translateX(-2px)'
  };

  return (
    <StripeProvider apiKey="pk_test_QwmQOyzYXsW6k7sLGaILPtJ5">
      <div style={{ padding: '0 8rem', position: 'relative' }}>
        <FormPreviousLink
          color="#6772e5"
          style={backButtonHovered ? backButtonStyleHover : backButtonStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => history.push('/')}
        />
        <div>
          <h1>
            Checkout from{' '}
            <span
              style={{ fontWeight: 500, fontSize: 42, fontFamily: 'Caveat' }}>
              Buyable
            </span>
          </h1>
          <Elements>
            <CheckoutForm fontSize={elementFontSize} />
          </Elements>
        </div>
      </div>
    </StripeProvider>
  );
};

export default CheckoutRoute;
