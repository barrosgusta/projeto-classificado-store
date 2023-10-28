import { create } from "zustand";

interface PreviewModalStore {
    isOpen: boolean;
    data?: CarAd;
    onOpen: (data: CarAd) => void;
    onClose: () => void;
};

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: CarAd) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: undefined }),
}));

export default usePreviewModal;