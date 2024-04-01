import React, { useState } from 'react';
// import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageUploadAndCrop = () => {
    const [file, setFile] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [imageSrc, setImageSrc] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // const handleFileChange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const reader = new FileReader();
    //         reader.addEventListener('load', () => setImageSrc(reader.result.toString() || ''));
    //         reader.readAsDataURL(e.target.files[0]);
    //         setShowModal(true);
    //     }
    // };

    // const onImageLoaded = (image) => {
    //     // You can also store the image ref if you need to access the image size
    // };

    // const onCropChange = (crop) => {
    //     setCrop(crop);
    // };

    // const onCropComplete = (crop) => {
    //     // Here, you could generate the cropped image data
    // };

    return (
        <div>
            {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: 20 }}>
                        {/* <ReactCrop src={imageSrc} crop={crop} onImageLoaded={onImageLoaded} onComplete={onCropComplete} onChange={onCropChange} /> */}
                        <button onClick={() => setShowModal(false)}>Done</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploadAndCrop;