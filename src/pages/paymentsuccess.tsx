import Image from "next/image";
import React from "react";

const PaymentSuccess: React.FC = () => {

    return (
        <div className="min-h-screen px-5 py-14 md:p-24">
            <div className="m-auto p-5 w-full md:w-96 ">
                <div className="text-xl text-pink-500 bg-white p-5 rounded-lg shadow-lg text-center">Payment Success</div>
                <div className="bg-white/50 p-5 mt-5 rounded-lg shadow-lg">
                    <p className="text-gray-600 mb-3">ข้อมูลลูกค้า</p>
                    <p className="text-gray-400">ชื่อ : &nbsp; <span className="text-pink-500">Name</span></p>
                    <p className="text-gray-400">ชื่อ IG: &nbsp; <span className="text-pink-500">IG Name</span></p>
                    <p className="text-gray-400">Hashtag : &nbsp; <span className="text-gray-800">#hashtag</span></p>
                </div>
            </div>
        </div>
    );
}
export default PaymentSuccess;