import Image from "next/image";

const CreateQRCode: React.FC = () => {
    return (
        <>
            <div className="min-h-screen px-5 py-14 md:p-24">
                <div className="container text-center mx-auto">
                    <h2 className="text-xl font-bold py-10">Please Scan Me</h2>
                    <Image src="/images/qrcode.png" width={300} height={300} alt="QR Code"
                        className="mx-auto" />

                </div>
            </div>
        </>
    )
}
export default CreateQRCode;