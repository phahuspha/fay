import Link from "next/link";
import { IoPower } from "react-icons/io5";

const LogoutButton: React.FC = () => {
    return (
        <>
            <div className="absolute top-3 right-3 md:right-12 md:top-12">
                <button className="text-2xl text-white hover:text-red-600 hover:scale-90 bg-purple-500 rounded-full hover:bg-red-200 p-0.5">
                    <Link href='./loginForm'> <IoPower /></Link>
                </button>
            </div>
        </>
    )
}
export default LogoutButton;