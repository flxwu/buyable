import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const CheckoutRoute = () => {
  const [elementFontSize, setElementFontSize] = useState(
    window.innerWidth < 450 ? '14px' : '18px'
  );

  window.addEventListener('resize', () => {
    if (window.innerWidth < 450 && elementFontSize !== '14px') {
      setElementFontSize('14px');
    } else if (window.innerWidth >= 450 && elementFontSize !== '18px') {
      setElementFontSize('18px');
    }
  });

  return (
    <StripeProvider apiKey="pk_test_QwmQOyzYXsW6k7sLGaILPtJ5">
      <div className="example">
        <h1>
          Checkout from{' '}
          <span style={{ fontWeight: 500, fontSize: 42, fontFamily: 'Caveat' }}>
            Buyable
          </span>
        </h1>
        <Elements>
          <CheckoutForm fontSize={elementFontSize} />
        </Elements>
      </div>
    </StripeProvider>
  );
};

export default CheckoutRoute;
