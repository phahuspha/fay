import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Tab = {
  label: string;
  content: React.ReactNode;
};


const TabsMenu: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };


  return (
    <div className="w-full">
      <div className="flex mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`${index === activeTab
                ? 'border-b-2 border-purple-800 text-purple-800'
                : ' text-gray-800'
              } px-4 py-2 mr-4 focus:outline-none`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};
export default TabsMenu;