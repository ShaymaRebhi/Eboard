import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {  Button, Modal } from "semantic-ui-react";
import { PayementButton } from '../Auth/Buttons/Payement';
import StripeCheckout from 'react-stripe-checkout';
import {PaymentElement} from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { getUserConnect, payementUrl } from '../../../utils/api';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
function Payement() {

  const [userConnect,setUserConnect]=useState(undefined);
  const [pay,setPay]=useState(false);
  const [idOrganization,setiIdOrganization]=useState(undefined);
  const [email,setEmail]=useState(undefined);
  const history=useHistory();
  useEffect(()=>{
    if(pay){
        history.push("/Organization")
    }
  })
  useEffect(()=>{
    axios.get(getUserConnect,{
      headers: {
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      }
  }).then(res=>{
      console.log(res.data[0])
      setiIdOrganization(res.data[0]._id);
      setUserConnect(res.data[0].Name);
      setEmail(res.data[0].User.email)
      setPay(res.data[0].Payement);
    })
    
    
  },[])
  

    const makePayement= token =>{
      let data={
        idOrganization:idOrganization,
        token:token,
        amount:amounts
      }
      const headers={
        "Content-Type":"application/json"
      }

      return fetch(payementUrl,{
        method:"POST",
        headers,
        body:JSON.stringify(data)

      }).then(response=>{
        console.log("RESPONSE ",response)
        const {status}=response;
        console.log("STATUS",status);
        toast.success("Payement success !!");
        history.push('/Organization');
      })
      .catch(error=>{
        console.log(error);
      })
    }
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
        <StripeCheckout 
          stripeKey={process.env.REACT_APP_KEY}
         token={makePayement} 
         name={`Buy for ${userConnect? userConnect:""}`} 
         amount={amounts * 100}
         email={email ? email:""}
         >
          <PayementButton  icon={true}  />
        </StripeCheckout>

        <PayPalScriptProvider options={{ "client-id": "AfyaE0j_O_pKxUqK5EEAqdNttZU2XlLmfCZWlwjAx7Bb4kO4nurqiWeU7PxkH9z7xlTU1v269v__AVkm" }}>
            <PayPalButtons createOrder={createOrder} style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
        
        
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