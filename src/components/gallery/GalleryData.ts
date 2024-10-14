export interface GalleryData {
    collection: {
        items: {
            links: { href: string }[]; 
            data: { title: string; nasa_id: string; media_type: string }[]; 
            href: string; 
        }[];
    };
    galleryItem:{
        itemType: 'movie' | 'jpg'|null;
        item: string;
    }
}