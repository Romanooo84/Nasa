export interface GalleryData {
    collection: {
        items: {
            links: { href: string }[]; // Linki do obrazów
            data: { title: string; nasa_id: string }[]; // Informacje o obrazie
            href: string; // Bezpośredni href, który jest wymagany
        }[];
    };
}