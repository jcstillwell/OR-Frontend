import React, { useEffect } from "react";
import Cookies from "js-cookie";

const AppSettings = () => {

    return (
        <div className="settings-container">
            <div className="settings-box">
                <p>Application Settings</p>
            </div>
        </div>
    );
}

const UserSettings = () => {

    let data;
    try {
        data = JSON.parse(Cookies.get('data'));
    } catch (e) {
        console.log("error parsing cookie: ", e);
        data = {};
    }

    return (
        <div className="settings-container">
            <div className="settings-box">
                <p>User Settings</p>
                <ul>
                    <li><span>Name: {data.firstName}</span></li>
                    <li><span>User ID: {data.uuid}</span></li>
                    <li><span>Email: {data.email}</span></li>
                </ul>
            </div>
        </div>
    );
}

const ReceiptSettings = () => {
    return (
        <div className="settings-container">
            <div className="settings-box">
                <p>Receipt Settings</p>
                <ul>
                    <li>
                        <label>Allow Receipt Sharing</label>
                        <input type="checkbox" id="receipt-sharing"/>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AppSettings;
export {UserSettings, ReceiptSettings};