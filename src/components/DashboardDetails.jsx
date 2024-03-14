import React, { useEffect, useState } from 'react'
import Opay from '../assets/newopay.webp'
import "./DashboardDetails.css"
import { useLocation } from 'react-router-dom';

const DashboardDetails = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const accountName = params.get('accountName');
    const nameit = params.get('nameit');
    const amount = params.get('amount');
    const accountnumber = params.get('accountnumber')
    const Remark = params.get('Remark')
    const [mydate, setMyDate] = useState('');
    const [status, setStatus] = useState('pending');
    useEffect(() => {
        const updateDate = () => {
            const currentDate = new Date().toLocaleString();
            setMyDate(currentDate);
        };
        updateDate();
    }, []);

    const [randomNumbers, setRandomNumbers] = useState([]);
    const [randomNumberstwo, setRandomNumberstwo] = useState([]);
    useEffect(() => {
        const generateRandomNumbers = () => {
            const numbers = [];
            for (let i = 0; i < 8; i++) {
                const randomNumber = Math.round(Math.random() * 100);
                numbers.push(randomNumber);
            }
            setRandomNumbers(numbers);
        };

        generateRandomNumbers();
    }, []);

    useEffect(() => {
        const generateRandomNumberstwo = () => {
            const numberstwo = [];
            for (let i = 0; i < 13; i++) {
                const randomNumbertwo = Math.round(Math.random() * 100);
                numberstwo.push(randomNumbertwo);
            }
            setRandomNumberstwo(numberstwo);
        };

        generateRandomNumberstwo();
    }, []);

    const TriggerBtn = () => {
        setStatus((prevStatus) => (prevStatus === 'success' ? 'pending' : 'success'));
    };
    return (
        <>
            <div className='border border-2 col-md-5 col-sm-12 mx-auto shadow-lg'>
                <div className='mt-2 d-flex justify-content-between mx-2 ' style={{ alignItems: "center" }}>
                    <div>
                        <img style={{ width: "80px" }} src={Opay} alt="" />
                    </div>
                    <div className='mt-3'>
                        <p>Transaction Receipt</p>
                    </div>
                </div>
                <div className='text-center' style={{ marginTop: "50px" }}>
                    <h2 style={{ color: "green", fontSize: "30px" }}>
                        ₦{amount}.00
                    </h2>
                    {/* <h2 className='mimsize'>Success</h2> */}
                    <h2 className='mimsize'>{status === 'success' ? 'Pending' : 'Success'}</h2>
                </div>
                <div id="showdate" className="text-center" style={{ fontSize: '14px' }}>
                    {mydate}
                </div>
                <div className='mx-2'>

                    <hr />
                </div>
                <div className='d-flex justify-content-between mx-2'>
                    <div>
                        <p className='putOpacity'>Transaction Type</p>
                    </div>
                    <div>
                        <b>Transfer to bank</b>
                    </div>
                </div>
                <div className='d-flex justify-content-between mx-2'>
                    <div>
                        <p className='putOpacity'>Recipient Details</p>
                    </div>
                    <div className='d-flex'>
                    <b>{accountName}</b>
                    </div>
                </div>
                <div className='text-end mx-2' style={{ marginTop: "-15px" }}>
                <p> {nameit} | {accountnumber}</p>
                </div>
                <div className='d-flex justify-content-between mx-2'>
                    <div>
                        <p className='putOpacity'>Sender Details</p>
                    </div>
                    <div>
                        <b>TESLIM AYODELE AGBOOLA</b>
                    </div>
                </div>
                <div className='text-end mx-2' style={{ marginTop: "-15px" }}>
                    <p>Opay | 901****345</p>
                </div>
                <div className='d-flex justify-content-between mx-2'>
                    <div>
                        <p className='putOpacity'>Remark</p>
                    </div>
                    <div>
                        <p>{Remark}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between mx-2'>
                    <div>
                        <p className='putOpacity'>Transaction Reference</p>
                    </div>
                    <div className='d-flex'>
                        {randomNumbers.map((number, index) => (
                            <p key={index}>{number}</p>
                        ))}
                    </div>
                </div>
                <div className='d-flex justify-content-between mx-2'>
                    <div>
                        <p className='putOpacity'>SessionID</p>
                    </div>
                    <div className='d-flex'>
                        {randomNumberstwo.map((numbertwo, index) => (
                            <p key={index}>{numbertwo}</p>
                        ))}
                    </div>
                </div>

                <div class="text-center" style={{ marginTop: "40px" }}>
                    <p>Support</p>
                    <p style={{ color: "green", marginTop: "-15px" }}>customerservice@opayinc.com</p>
                </div>
                <div className='mt-4 mx-4'>
                    <hr />
                </div>
                <div className='text-center'>
                    <p>Enjoy a reliable & stable network service and a welcome bonus of ₦1,200 cashback on Opay.</p>
                </div>
            </div>
            <div className='col-md-5 col-sm-12 mx-auto mt-2'>
                {/* <button className='btn btn-success w-100 p-3' style={{ alignItems: "center" }} onClick={TriggerBtn}>Share Receipt</button> */}

                <button
                    className={`btn ${status === 'success' ? 'btn-success' : 'btn-success'} w-100 p-3`}
                    style={{ alignItems: 'center' }}
                    onClick={TriggerBtn}
                >
                    Share Receipt
                </button>
            </div>
        </>
    )
}

export default DashboardDetails