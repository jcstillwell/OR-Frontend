import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Invoice = () => {

    const { invoiceID } = useParams();
    const [invoices, setInvoices] = useState([]);


    let data;
    try {
        data = JSON.parse(Cookies.get('data'));
    } catch (e) {
        console.log("error parsing cookie: ", e);
        data = {};
    }

    const editReceipt = (action, invoiceID, recipientID, sharedWith='', itemName='', returner='') => {
        const token = Cookies.get('token');
        console.log(sharedWith);
        axios
        .post(
            'http://localhost:8000/edit/',
            {
              action: action,
              invoiceID: invoiceID,
              recipientID: recipientID,
              sharedWith: sharedWith,
              itemName: itemName,
              returner: returner
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            fetchData();
            console.log("current version updated")
          })
          .catch((error) => {
            console.error('error: ', error);
          });
      };


    const fetchData = () => {
        const token = Cookies.get('token');
        axios.get('http://localhost:8000/get/', {
            params: {
                type: 'SINGLE',
                query: invoiceID
            },
            headers: {
                'Authorization': "Token " + token
            }
        })
        .then((response) => {
            console.log(response);
            setInvoices(response.data.invoices)
        })
        .catch((error) => {
            console.error('error: ', error);
        });
    }

    useEffect(() => {
        fetchData();
     }, []);
      
     return (
        <div className="invoice-container">
          {invoices.map((invoice, index) => (
                <div key={index}>
                    <h2 className="invoice-id-label">{invoice.invoice.invoiceID}</h2>
                    <h3>{invoice.invoice.merchantID}</h3>
                    <h3>{invoice.invoice.merchantLocNumber}</h3>
                    <h3>{invoice.invoice.merchantAddress}</h3>
                    <h3>{invoice.invoice.recipientID}</h3>
                <div className="item-list-container-expanded">
                    <div className="item-list-expanded">
                        <h2>Items:</h2>
                        {invoice.items.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                <i class="fa-solid fa-arrow-left fa-2xl" 
                                onClick={() => editReceipt('RETURN', invoice.invoice.invoiceID, invoice.invoice.recipientID, '', item.name, data.uuid)}></i>
                                <h3>{item.name}</h3>
                                {item.returned && (
                                <div>
                                    <p className="returned-label">RETURNED</p>
                                    <p className="returned-funds">-{item.price}</p>
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
              </div>
              <div className="transaction-history-container">
                    <h2>History:</h2>
                    {invoice.invoice.transactionHistory.map((i, iIndex) => (
                            <div key={iIndex}>
                                <h3>{i}</h3>
                            </div>
                    ))}
              </div>
            </div>
          ))}
        </div>
    );
}

export default Invoice;