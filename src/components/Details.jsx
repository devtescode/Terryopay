import React, { useState, useEffect } from 'react';
import "./Details.css";
import Data from './Data.json';
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const [account, setAccount] = useState('');
    const [formDataHistory, setFormDataHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false); // New state for processing
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            accountnumber: "",
            selectaccount: "",
            Amount: "",
            Remark: "",
        },
        validationSchema: Yup.object({
            accountnumber: Yup.number().typeError('Must be a number').required('Required'),
            selectaccount: Yup.string().required('Required'),
            Amount: Yup.string().required('Required'),
            Remark: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            setIsProcessing(true); // Set processing state to true when submitting
            const nameit = Data.banks.find((item) => (item.code === values.selectaccount)).name;
            axios.post("https://candyopay.onrender.com/userinvest/userDetails", { 
                AccountNumber: values.accountnumber, 
                Bankcode: values.selectaccount, 
                bank: nameit 
            })
                .then((response) => {
                    if (response.data.status === true) {
                        setAccount(response.data.accountName);
                        navigate(`/check?accountName=${response.data.accountName}&amount=${values.Amount}&accountnumber=${values.accountnumber}&Remark=${values.Remark}&bankCode=${values.selectaccount}&nameit=${nameit}`);
                        saveFormDataToLocalStorage(values);
                    }
                    setIsProcessing(false); // Set processing state to false after processing
                })
                .catch((err) => {
                    console.error('Error occurred', err);
                    setIsProcessing(false); // Set processing state to false even if an error occurs
                });
        }
    });

    useEffect(() => {
        const formDataHistoryFromStorage = JSON.parse(localStorage.getItem('formDataHistory'));
        if (formDataHistoryFromStorage) {
            setFormDataHistory(formDataHistoryFromStorage);
        }
    }, []);

    const saveFormDataToLocalStorage = (formData) => {
        const updatedFormDataHistory = [...formDataHistory, formData];
        localStorage.setItem('formDataHistory', JSON.stringify(updatedFormDataHistory));
        setFormDataHistory(updatedFormDataHistory);
    };

    const handleHistoryItemClick = (formData) => {
        formik.setValues(formData);
        const closeButton = document.querySelector('.offcanvas-header button.btn-close');
        if (closeButton) {
            closeButton.click();
        }
    };

    const handleDelete = (index) => {
        const updatedHistory = [...formDataHistory];
        updatedHistory.splice(index, 1);
        localStorage.setItem('formDataHistory', JSON.stringify(updatedHistory));
        setFormDataHistory(updatedHistory);
    };

    const filteredHistory = formDataHistory.filter(formData => formData.accountnumber.includes(searchQuery));

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='col-md-6 mx-auto shadow-lg p-3 border border-2 border-light centerstyle'>
                    <div className="input-container">
                        <input onChange={formik.handleChange} name='Amount' value={formik.values.Amount} placeholder="Amount" className="input-field" type="text" />
                        <label htmlFor="input-field" className="input-label">Amount</label>
                        <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                        <input onChange={formik.handleChange} name='accountnumber' value={formik.values.accountnumber} placeholder="Account Number" className="input-field" type="text" />
                        <label htmlFor="input-field" className="input-label">Account Number</label>
                        <span className="input-highlight"></span>
                    </div>
                    <select name="selectaccount" onChange={formik.handleChange} value={formik.values.selectaccount} className="my-5 form-select form-select-lg" aria-label="Large select example">
                        {Data.banks.map((item, index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    <div className="input-container">
                        <input onChange={formik.handleChange} name='Remark' value={formik.values.Remark} placeholder="Remark" className="input-field" type="text" />
                        <label htmlFor="input-field" className="input-label">Remark</label>
                        <span className="input-highlight"></span>
                    </div>
                    <div className="input-container my-4">
                        <input disabled placeholder="Account Name" className="input-field text-center fw-bold" type="text" value={account} />
                        <span className="input-highlight"></span>
                    </div>
                    <div className='text-center mt-5'>
                        <button className='btn btn-secondary' type="submit" disabled={isProcessing}>
                            {isProcessing ? 'Processing...' : 'Click On'}
                        </button>
                    </div>
                    <button className="btn btn-light shadow-lg historydiv" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                        History
                    </button>
                </div>
            </form>

            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title fs-3" id="staticBackdropLabel">History</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="mt-3 mb-3">
                        <input
                            type="text"
                            placeholder="Search by account number"
                            className='form-control'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {filteredHistory.map((formData, index) => (
                        <div key={index} onClick={() => handleHistoryItemClick(formData)} style={{ cursor: 'pointer' }}>
                            <div className="card shadow-lg">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <p>{`Account Number: ${formData.accountnumber}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <p>{`Select Account: ${formData.selectaccount}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <p>{`Amount: ${formData.Amount}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <p>{`Remark: ${formData.Remark}`}</p>
                                    </li>
                                    <li className="list-group-item text-center">
                                        <button className="btn btn-danger w-25" onClick={() => handleDelete(index)}>Delete</button>
                                        <hr />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Details;
