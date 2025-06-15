'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const fallbackImage = '/images/placeholder.jpg';
        const img = e.currentTarget;
        
        if (img.src !== fallbackImage) {
            console.log('Imagem falhou ao carregar:', imageSrc);
            img.src = fallbackImage;
        }
    };

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
            >
                <Image
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    alt="Image"
                    onError={handleImageError}
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority
                />
                <div
                    className="
            absolute
            top-5
            right-5
          "
                >
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}

export default ListingHead;