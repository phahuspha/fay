import GalleryIndex from "@/components/Gallery";
import BoxText from "@/components/Gallery/BoxText";
import Layout from "@/components/layout";
import SliderIndex from "@/components/Slider";
import { GalleryTemData } from "@/data/gallery";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const Home: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>(Array(GalleryTemData[0].imglist.length).fill(""));
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [imageCount, setImageCount] = useState(0); // State สำหรับจำนวนรูปภาพ

  const updateImageCount = (count: number) => {
    setImageCount(count);
  };
  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/profiledata/poststory');
      const data = await response.json();
      setProfiles(data);
    };

    fetchProfiles();
  }, []);

  return (
    <Layout>
      <SliderIndex>
        <div className="h-[60%] flex flex-col w-full md:h-[100%] lg:w-[60%] py-2 px-1">
          <img src="https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/0fb05fae-8f4f-4edd-6c20-c188867ec900/700" className="w-full h-full bg-white rounded-lg" alt="" />
        </div>
        {profiles.map((profile) => (
          <div key={profile.id} className="h-[60%] flex flex-col w-full md:h-[100%] lg:w-[60%] py-2 px-1">
            <GalleryIndex
              mode={'view'}
              selectTem={profile.galleryTemplate}
              selectedImages={profile.ImageData.map(image => image.src)}
              updateSelectedImages={setSelectedImages}
              updateImageCount={updateImageCount}
            />
            <BoxText data={profile} />
          </div>
        ))}
      </SliderIndex>
      <div className="absolute bg-white p-2 bottom-0 m-4 text-center">
        <p className="text-2xl font-bold text-pink-600 drop-shadow-lg">Scan Me</p>
        <Image src='/images/qrcode.png' width={100} height={100} alt="" className="mx-auto w-44" />
      </div>
    </Layout>
  );
}
export default Home;