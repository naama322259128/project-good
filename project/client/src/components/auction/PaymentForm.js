import './Cart.scss';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentForm = (props) => {
    return (<><PayPalButton
        amount="0.01"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                    orderId: data.orderID
                })
            });
        }}
        options={{
            clientId: "PRODUCTION_CLIENT_ID"
        }}
    /></>
    );

}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction
    }
}
export default connect(mapStateToProps, {})(PaymentForm);

