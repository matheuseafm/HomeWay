import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    hasFavorited: boolean;
    currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, hasFavorited, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;