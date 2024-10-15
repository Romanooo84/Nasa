export interface GalleryData {
    collection: {
        items: {
            links: { href: string }[]; 
            data: { title: string; nasa_id: string; media_type: string }[]; 
            href: string; 
        }[];
    };
    galleryItem: GalleryItems;  // Używamy GalleryItems do reprezentacji tego pola
}

export interface GalleryItems {
    item: string;
    itemType: 'movie' | 'jpg' | null;
}