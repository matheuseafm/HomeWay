'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any
}

const uploadPreset = "nlvuxwdh";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const fallbackImage = '/images/placeholder.jpg';
        const img = e.currentTarget;
        
        if (img.src !== fallbackImage) {
            console.log('Imagem falhou ao carregar:', value);
            img.src = fallbackImage;
        }
    };

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
                    >
                        <TbPhotoPlus
                            size={50}
                        />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="
              absolute inset-0 w-full h-full">
                                <Image
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    src={value}
                                    alt="House"
                                    onError={handleImageError}
                                    sizes="(max-width: 768px) 100vw"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;