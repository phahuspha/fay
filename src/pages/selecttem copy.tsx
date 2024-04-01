import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GalleryIndex from "@/components/Gallery";
import { GalleryTemData } from '@/data/gallery';
import BoxText from '@/components/Gallery/BoxText';
import Layout from '@/components/layout';
import UserInfoForm from '@/components/Gallery/UserInfoForm';
import axios from 'axios';

const SelectTem: React.FC = () => {
  const router = useRouter();
  const [galleryTemplate, setGalleryTemplate] = useState(0);
  const [imageCount, setImageCount] = useState(0); // State สำหรับจำนวนรูปภาพ

  const [userInfo, setUserInfo] = useState({
    caption: '',
    name: '',
    facebook: '',
    instagram: '',
    line: '',
  });
  const [selectedImages, setSelectedImages] = useState<string[]>(Array().fill(""));

  const updateImageCount = (count: number) => {
    setImageCount(count);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [id]: value }));
  };

  const navigateTemplate = (direction: 'next' | 'prev') => {
    setGalleryTemplate(prevIndex => {
      const newIndex = direction === 'next' ? prevIndex + 1 : prevIndex - 1;
      return (newIndex + GalleryTemData.length) % GalleryTemData.length;
    });
  };

  const uploadImage = async (imageBlob: Blob): Promise<string | null> => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", imageBlob);
    try {
      const uploadResponse = await axios.post(
        "https://upload-image.me-prompt-technology.com/",
        uploadFormData,
      );

      if (uploadResponse?.status === 200) {
        return uploadResponse?.data?.result?.id;
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
    return null;
  };

  const isUserInfoPopulated = () => {
    return Object.values(userInfo).some(value => value.trim() !== '');
  };

  const handleSubmit = async () => {

    if (selectedImages.length > 0) {
      const imageUploadPromises = selectedImages.slice(0, imageCount).map(async (imageSrc) => {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        return uploadImage(blob); // สมมติว่าฟังก์ชันนี้อัพโหลดรูปภาพและส่งคืน ID หรือ URL
      });

      try {
        const imageIDs = await Promise.all(imageUploadPromises);
        console.log('Uploaded Image IDs:', imageIDs);

        // Now, construct your complete request body with the image IDs and other info
        const requestBody = {
          name: userInfo.name,
          caption: userInfo.caption,
          facebook: userInfo.facebook,
          instagram: userInfo.instagram,
          line: userInfo.line,
          galleryTemplate: galleryTemplate,
          selectedImages: imageIDs.map((id, index) => ({ number: index + 1, src: id })),
          // Assume your payment info is static or gathered from elsewhere
          payment: { amount: 29, status: 'Pending' },
        };

        // Submit the complete form to your API
        const response = await fetch('/api/profiledata/poststory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        localStorage.setItem('profileId', data.id); // บันทึก ID ลงใน localStorage
        router.push('/payment'); // นำทางไปยังหน้า /payment

      } catch (error) {
        console.error('Error uploading images or submitting form:', error);
      }
    } else {
      console.log('No images selected for upload.');
    }
  };

  return (
    <Layout>
      <div className='container m-auto flex h-full flex-wrap'>
        <div className="flex flex-col w-full z-50 lg:w-[40%] py-2 px-1 rounded-lg p-4 ">
          <div className="w-full flex-grow bg-white rounded-lg p-4">
            <span className="block text-lg font-medium text-slate-700 ">เลือกเทมเพลต</span>
            <div id="select_gallery" className='flex w-full h-max justify-center text-3xl'>
              <button onClick={() => navigateTemplate('prev')} className="py-2">
                <FaChevronLeft />
              </button>
              <div className="text-center py-2">
                Tem {galleryTemplate + 1}
              </div>
              <button onClick={() => navigateTemplate('next')} className="py-2">
                <FaChevronRight />
              </button>
            </div>
            <div className='hidden md:block '>
              <UserInfoForm userInfo={userInfo} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
        <div className={`${isUserInfoPopulated() ? `h-[50%]` : `h-[45%]`} flex flex-col w-full md:h-[100%] lg:w-[60%] py-2 px-1`}>
          <GalleryIndex
            mode={'edit'}
            selectTem={galleryTemplate}
            selectedImages={selectedImages}
            updateSelectedImages={setSelectedImages}
            updateImageCount={updateImageCount}
          />
          <BoxText data={userInfo} />
        </div>
        <div className="h-auto flex flex-col w-full z-50 lg:w-[40%] py-2 px-1 rounded-lg p-4 md:hidden">
          <div className="w-full flex-grow bg-white rounded-lg p-4 h-max ">
            <UserInfoForm userInfo={userInfo} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout >
  );
}
export default SelectTem;