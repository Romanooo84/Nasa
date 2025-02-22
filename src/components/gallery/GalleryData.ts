export interface GalleryData {
    collection: {
        items: {
            links: { href: string }[]; 
            data: { title: string; nasa_id: string; media_type: string }[]; 
            href: string; 
        }[];
    };
}

export interface GalleryItems {
    item: string;
    itemType: 'movie' | 'jpg' | null;
}