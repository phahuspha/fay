import { GalleryTemData } from '@/data/gallery';
import React, { useEffect, useState } from 'react';

interface GalleryProps {
    mode: 'edit' | 'view';
    selectTem: number;
    selectedImages: string[]; // Now accepting selectedImages as prop
    updateSelectedImages: (images: string[]) => void;
    updateImageCount: (count: number) => void; // ฟังก์ชัน callback สำหรับการอัปเดตจำนวนรูปภาพ
}

const GalleryIndex: React.FC<GalleryProps> = ({ mode, selectTem, selectedImages, updateSelectedImages, updateImageCount }) => {

    const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileURL = URL.createObjectURL(e.target.files[0]);
            const newImages = [...selectedImages];
            newImages[index] = fileURL;
            updateSelectedImages(newImages);
        }
    };

    const selectedTemplate = GalleryTemData.find(template => template.tem === selectTem);

    useEffect(() => {
        if (selectedTemplate) {
            if (typeof updateImageCount === 'function') {
                updateImageCount(selectedTemplate?.imglist?.length);
            } else {
                console.error('updateImageCount is not a function', updateImageCount);
            }
        }
    }, [selectedTemplate, updateImageCount])

    return (
        <div className="w-full flex-grow flex rounded-lg h-[100px] bg-white">
            <div className={`w-full flex flex-wrap ${selectedTemplate?.classBox} rounded-lg h-full bg-white`}>
                {selectedTemplate?.imglist.map((img, imgIndex) => (
                    <div key={img.id} className="p-1 md:p-2 relative" style={{ width: img.w, height: img.h }}>
                        {mode === 'edit' && (
                            <input id={`photo-${selectedTemplate.tem}-${imgIndex}`} accept="image/*" type="file" onChange={handleFileChange(imgIndex)} style={{ display: 'none' }} />
                        )}
                        <label htmlFor={`photo-${selectedTemplate.tem}-${imgIndex}`} className="block w-full h-full cursor-pointer">
                            <span className={`absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 font-bold z-10 ${selectedImages[imgIndex] !== '' ? 'hidden' : ''}`}>เลือกรูป</span>
                            <img
                                alt="gallery"
                                className={`block w-full h-full rounded-lg object-cover object-center border-2 ${mode === 'edit' ? 'border-indigo-500 hover:border-yellow-700' : ''}`}
                                src={mode === 'edit' ? (selectedImages[imgIndex] || "https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/f701ce08-7ebe-4af2-c4ec-2b3967392900/wsm") : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${selectedImages[imgIndex]}/wsm`}
                            />
                        </label>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default GalleryIndex;