import Link from "next/link";
import React from "react";

const DataCusForm: React.FC = () => {

    return (
        <>
            <div className="">
                <div className="bg-white p-10 w-96 my-56 mx-auto rounded-lg shadow-md text-center">
                    <form action="" className="text-left">
                        <div className="mb-3">
                            <label htmlFor="" className="text-pink-600 font-semibold">Name: </label>
                            <input type="text" name="" id="" className="w-full text-base p-1.5 focus:outline-0 border-b focus:border-pink-500" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="text-pink-600 font-semibold">IG: </label>
                            <input type="text" name="" id="" className="w-full text-base p-1.5 focus:outline-0 border-b focus:border-pink-500" />
                        </div>
                        <div>
                            <label htmlFor="" className="text-pink-600 font-semibold">Hashtag: </label>
                            <input type="text" name="" id="" className="w-full text-base p-1.5 focus:outline-0 border-b focus:border-pink-500 placeholder:text-sm" placeholder="#helloworld" />
                        </div>
                    </form>
                    <button className="mt-10 bg-pink-600 text-white py-2 px-5 rounded-full shadow-md hover:bg-pink-400 font-semibold">
                        <Link href='./payment'>Submit</Link>
                    </button>

                </div>
            </div>
        </>
    );
}
export default DataCusForm;