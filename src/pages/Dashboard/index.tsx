import React from "react";
import TabsMenu from "../../components/TabsMenu";
import Layout from "../../components/layout";
import PaymentList from "../../components/management/PaymentList";
import TableCustomerList from "../../components/management/TableCustomerList";


const Home: React.FC = () => {
  const tabs = [
    { label: 'รายการชำระเงิน', content: <div><PaymentList/></div> },
    { label: 'ลูกค้า', content: <div><TableCustomerList/></div> },
    // { label: 'สร้าง QR Code', content: <div><CreateQRCode/></div> },
  ];


  return (
    <Layout>
      <div className="mt-10 container mx-auto">
        <div className="">
        <TabsMenu tabs={tabs}/>
        </div>
      </div>
    </Layout>
  );
}
export default Home;