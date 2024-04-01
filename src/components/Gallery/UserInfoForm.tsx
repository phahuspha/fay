import React from 'react';

interface UserInfoFormProps {
  userInfo: { [key: string]: string }; // Assuming userInfo is an object with string keys and values
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userInfo, handleInputChange, handleSubmit }) => {
  return (
    <>
      {Object.keys(userInfo).map((key) => (
        <div className='mb-2' key={key}>
          <span className="block text-lg font-medium text-slate-700">{key}</span>
          <input
            type="text"
            id={key}
            value={userInfo[key]}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder={`Enter value ${key}`}
            required
          />
        </div>
      ))}
      <div className='text-center'>
        <button
          onClick={handleSubmit}
          className='w-full text-lg mt-4 p-3 relative inline-flex items-center justify-center mb-2 me-2 overflow-hidden font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
        >
          Post
        </button>
      </div>
    </>
  );
};

export default UserInfoForm;
