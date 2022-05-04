import React from 'react'
import styled from 'styled-components'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {  Button, Modal } from "semantic-ui-react";
import { PayementButton } from '../Auth/Buttons/Payement';
import Inputs from '../../Inputs';
import {PaymentElement} from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
function Payement() {
    const stripePromise = loadStripe('pk_test_51KueAAKTa1h49sQ0Qi5ND9GQbZm3iXE80K37aKfKNydSl6oc692kjIV4f5Std18wT2pVL6zInXu7sj787J04anBV00W5B3LFzv');
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
      };
    const amounts=250.99;
    const [modalOpen, SetModalOpen] = React.useState(false);
    const handleClose = (e) => SetModalOpen(false);
    const handleOpen = (e) => SetModalOpen(true);
  const   createOrder=(data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: amounts,
                    },
                },
            ],
        });
}
  return (
    <Records>
        <h1>Amount: {amounts} $</h1>
        <PayementButton text={'payement'} icon={true}  onClick={handleOpen}/>
        <PayPalScriptProvider options={{ "client-id": "AfyaE0j_O_pKxUqK5EEAqdNttZU2XlLmfCZWlwjAx7Bb4kO4nurqiWeU7PxkH9z7xlTU1v269v__AVkm" }}>
            <PayPalButtons createOrder={createOrder} style={{ layout: "horizontal" }}/>
        </PayPalScriptProvider>
        <Elements stripe={stripePromise} options={options}>
            <form>
                <PaymentElement />
            <button>Submit</button>
            </form>
        </Elements>
        <Modal
            className='modal'
          open={modalOpen}
          onClose={handleClose}
          dimmer="inverted"
          size="tiny"
        >
          <Modal.Header>
            <h1>Payement: {amounts} $</h1>
          </Modal.Header>
          <Modal.Content>
          
          </Modal.Content>
          <Modal.Actions>
              <Button onClick={handleClose} color="black">
                Update
              </Button>
              <Button onClick={handleClose} color="black">
                CLose
              </Button>
          </Modal.Actions>
        </Modal>
    </Records>
  )
}

export default Payement

const Records=styled.div`
  h1{
      color:rgb(140,177,192);
  }  
  margin-left:auto;
  margin-right:auto;
  margin:150px auto;
  width: 50%;
  border: 3px solid rgb(140,177,192);
  padding: 10px;
  height:300px;
    
`