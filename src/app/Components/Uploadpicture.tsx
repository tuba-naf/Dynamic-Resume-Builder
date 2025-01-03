import React, { useState } from "react";
import Image from "next/image";

interface UploadPictureProps {
  onImageChange: (image: string | null) => void; // Add the onImageChange prop
}

const UploadPicture: React.FC<UploadPictureProps> = ({ onImageChange }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string); // Set the uploaded image as the source
          onImageChange(reader.result as string); // Pass the image to the parent component
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="input-field"
      />
      {image && (
        <div className="mt-4 w-32 h-32 rounded-full relative overflow-hidden">
          <Image
            src={image}
            alt="Profile Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default UploadPicture;
