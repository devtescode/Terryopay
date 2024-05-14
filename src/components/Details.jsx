import React, { useState, useEffect } from 'react'
import "./Details.css"
import Data from './Data.json'
import * as Yup from "yup"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Details = () => {
    const [account, setaccount] = useState('')
    const [formDataHistory, setFormDataHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate()
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
            // http://localhost:5000
            // https://candyopay.onrender.com
            const nameit = Data.banks.find((item) => (item.code === values.selectaccount)).name
            axios.post("https://candyopay.onrender.com/userinvest/userDetails", { AccountNumber: values.accountnumber, Bankcode: values.selectaccount, bank: nameit })
                .then((response) => {
                    swal({
                        title: "",
                        text: response.data.message,
                        icon: "warning",
                        button: "Aww yiss!",
                    });
                    // alert(response.data.message)
                    if (response.data.status == true) {
                        setaccount(response.data.accountName)
                        // alert(response.data.message)
                        swal({
                            title: "Good job!",
                            text: response.data.message,
                            icon: "success",
                            button: "Okay",
                        });
                        navigate(`/check?accountName=${response.data.accountName}&amount=${values.Amount}&accountnumber=${values.accountnumber}&Remark=${values.Remark}&bankCode=${values.selectaccount}&nameit=${nameit}`);
                        console.log(response);
                        saveFormDataToLocalStorage(values);
                    }
                })
                .catch((err) => {
                    console.error('Error occurred', err);
                    swal({
                        title: "",
                        text: "Incorrect Details",
                        icon: "warning",
                        button: "Aww yiss!",
                    });
                    // alert(response.data.message)
                });
        }
    })

    useEffect(() => {
        // Load form data history from local storage on component mount
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
        // Populate form fields with data from history item
        formik.setValues(formData);
    };

    const filteredHistory = formDataHistory.filter(formData => formData.accountnumber.includes(searchQuery));

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='col-md-6 mx-auto shadow-lg p-3 border border-2 border-light centerstyle'>
                    {/* <h4 className='fw-bold text-center'>Receipt</h4> */}
                    <h2>Rec</h2>
                    <div class="input-container">
                        <input onChange={formik.handleChange} name='Amount' value={formik.values.Amount} placeholder="Amount" class="input-field" type="text" />
                        <label for="input-field" class="input-label">Amount</label>
                        <span class="input-highlight"></span>
                    </div>
                    <div className='text-end text-danger'>
                        {formik.errors.Amount}
                    </div>
                    <div class="input-container">
                        <input onChange={formik.handleChange} name='accountnumber' value={formik.values.accountnumber} placeholder="Account Number" class="input-field" type="text" />
                        <label for="input-field" class="input-label">Account Number</label>
                        <span class="input-highlight"></span>
                    </div>
                    <div className='text-end text-danger'>
                        {formik.errors.accountnumber}
                    </div>

                    <select name="selectaccount" onChange={formik.handleChange} value={formik.values.selectaccount} class="my-5 form-select form-select-lg" aria-label="Large select example">
                        {Data.banks.map((item, index) => (
                            <option value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    <div className='text-end text-danger'>
                        {formik.errors.selectaccount}
                    </div>

                    <div class="input-container">
                        <input onChange={formik.handleChange} name='Remark' value={formik.values.Remark} placeholder="Remark" class="input-field" type="text" />
                        <label for="input-field" class="input-label">Remark</label>
                        <span class="input-highlight"></span>
                    </div>
                    <div className='text-end text-danger'>
                        {formik.errors.Remark}
                    </div>

                    <div class="input-container my-4">
                        <input disabled placeholder="Account Name" class="input-field text-center fw-bold" type="text" value={account} />
                        <span class="input-highlight"></span>
                    </div>
                    <div className='text-center mt-5'>
                        <button className='btn btn-secondary' type="submit">Click On</button>
                    </div>
                </div>
            </form>

            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                History
            </button>

            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">History</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="mt-3 mb-3 ">
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


                            <div class="card shadow-lg">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <p>{`Account Number: ${formData.accountnumber}`}</p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>{`Select Account: ${formData.selectaccount}`}</p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>{`Amount: ${formData.Amount}`}</p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>{`Remark: ${formData.Remark}`}</p>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Details