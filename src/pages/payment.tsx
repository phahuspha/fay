import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import GalleryIndex from "@/components/Gallery";
import Layout from "@/components/layout";
import { GalleryTemData } from "@/data/gallery";
import BoxText from "@/components/Gallery/BoxText";

interface ImageData {
  id: string;
  number: string;
  src: string;
  createdAt: string;
  updatedAt: string;
  postProfileID: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  postProfileID: string;
}

interface Profile {
  id: string;
  name: string;
  caption: string;
  facebook: string;
  instagram: string;
  line: string;
  galleryTemplate: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  deletedBy: null | string;
  ImageData: ImageData[];
  Payment: Payment[];
}

const Payment: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const [galleryTemplate, setGalleryTemplate] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>(Array(GalleryTemData[0].imglist.length).fill(""));

  const updateImageCount = (count: number) => {
    setImageCount(count);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      // const profileId = localStorage.getItem('profileId');
      // console.log('Profile ID:', profileId);
      const profileId = "6604e708267c6cd728534a5e";
      // const { profileId } = router.query;

      if (typeof profileId !== 'string') return; // Ensure profileId is a string

      try {
        const response = await fetch(`/api/profiledata/poststory/${profileId}`);
        const data: Profile = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('An error occurred while fetching the profile:', error);
      }
    };

    if (router.isReady) {
      fetchProfile();
    }
  }, [router.isReady, router.query]);
  useEffect(() => {
    console.log("profile : ", profile);

  }, [profile]);




  return (
    <Layout>
      <div className='container m-auto flex h-full flex-wrap'>
        {profile && (
          <div className="h-[60%] flex flex-col w-full md:h-[100%] lg:w-[60%] py-2 px-1">
            <GalleryIndex
              mode={'view'}
              selectTem={profile.galleryTemplate}
              selectedImages={profile?.ImageData?.map(image => image.src)}
              updateSelectedImages={setSelectedImages}
              updateImageCount={updateImageCount}
            />
            <BoxText data={profile} />
          </div>
        )}
        <div className="flex flex-col w-full z-50 lg:w-[40%] py-2 px-1 rounded-lg p-4 ">
          <div className="w-full flex-grow bg-white rounded-lg p-4">
            <span className="block text-lg font-medium text-slate-700 ">สรุปรายการ Post</span>

            <div className='hidden md:block '>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
}
export default Payment;

// Pending
// Processing
// Completed
// Failed
// Cancelled
// Refunded
// Charged Back
// Authorized
// Voidedกร