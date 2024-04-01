
const TableCustomerList: React.FC = () => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full my-0 bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-purple-500 text-gray-50">
                            <th className="py-3 px-4 text-left">No.</th>
                            <th className="py-3 px-4 text-left">Customer</th>
                            <th className="py-3 px-4 text-left">IG Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-blue-gray-200 hover:bg-purple-50">
                            <td className="py-3 px-4 ">1</td>
                            <td className="py-3 px-4">Malcolm Lockyer</td>
                            <td className="py-3 px-4">IG</td>
                        </tr>
                        <tr className="border-b border-blue-gray-200 hover:bg-purple-50">
                            <td className="py-3 px-4">2</td>
                            <td className="py-3 px-4">The Eagles</td>
                            <td className="py-3 px-4">IG</td>

                        </tr>
                        <tr className="border-b border-blue-gray-200 hover:bg-purple-50">
                            <td className="py-3 px-4">3</td>
                            <td className="py-3 px-4">Earth, Wind, and Fire</td>
                            <td className="py-3 px-4">IG</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default TableCustomerList;