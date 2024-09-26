import React from 'react'
import capture from "../assets/Capture.webp"
import Bott from "../assets/bott.webp"
import "./CheckDetails.css"
import { useLocation, useNavigate } from 'react-router-dom';

const CheckDetails = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const accountName = params.get('accountName');
    const nameit = params.get('nameit');
    const amount = params.get('amount');
    const accountnumber = params.get('accountnumber');
    const Remark = params.get('Remark');
    const navigate = useNavigate();
     const ShareBtn=()=>{
        // navigate(`/dashboard?accountName=${accountName}&amount=${amount}&accountnumber=${accountnumber}&Remark=${Remark}&nameit=${nameit}`);

        const queryParams = new URLSearchParams({
            accountName: accountName,
            amount: amount,
            accountnumber: accountnumber,
            Remark: Remark,
            nameit: nameit,
        }).toString();
    
        navigate(`/dashboard?${queryParams}`);
        // $Remark=${Remark}
     }
    return (
        <>
            <div className='checkdetailresp mt-0 mt-sm-5 shadow-lg col-md-4 mx-auto col-sm-12'>
                    <h5 class="text-end donecolor p-2">Done</h5>
                    <div class="text-center" style={{marginTop: "70px"}}>
                        <img src={capture} class="thewith" alt="..." />
                    </div>
                    <div class="mx-auto mt-4">
                        <h4 class="text-center">Transfer Successful</h4>
                        <h2 class="text-center" id="bal">₦{amount}.00</h2>
                    </div>

                    <div class="mymiddle2 mt-5">
                        <div class="one1 p-2" onClick={ShareBtn} style={{cursor: "pointer"}}>
                            <button class="removeborder">
                                <div class="color">
                                    <i class="ri-download-2-line"></i>
                                </div>
                            </button>
                            <p>Share Receipt</p>
                        </div>
                        <div class="two2 p-2" style={{cursor: "pointer"}}>
                            <div class="color">
                                <i class="ri-user-add-line"></i>
                            </div>
                            <p>Add to favourities</p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <img class="w-100" src={Bott} alt=""/>
                    </div>
            </div>


        </>
    )
}

export default CheckDetails;