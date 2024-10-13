import { useEffect, useState } from "react";
import { Image, Button, Text } from "@chakra-ui/react";

interface GalleryRenderProps {
    gallery: {
        collection: {
            items: {
                links: { href: string }[]; // Linki do obrazów
                data: { title: string; nasa_id: string }[]; // Informacje o obrazie
                href: string; // Bezpośredni href
            }[];
        };
    } | null; 
    onButtonClick: (nasaId: string) => void; // Nasa ID do przekazania w onClick
}

export const GalleryRender = ({ gallery, onButtonClick }: GalleryRenderProps) => {
    const [render, setRender] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (gallery?.collection) {
            const galleryMarkup = gallery.collection.items.map((item) => {
                // Sprawdź, czy są dostępne linki i dane
                if (item.links && item.links.length > 0 && item.data && item.data.length > 0) {
                    return (
                        <Button
                            onClick={() => onButtonClick(item.href)} // Użyj href z item
                            key={item.href} // Użyj item.href jako klucz
                            height='400px'
                            width='400px'
                            flexWrap='wrap'>
                            <Image 
                                alt={item.data[0].title} 
                                src={item.links[0].href} // Link do obrazu
                                width='350px' 
                            />
                            <Text>{item.data[0].title}</Text>
                        </Button>
                    );
                }
                return null; // Unikaj błędów, gdy brak danych
            });
            setRender(galleryMarkup.filter((item): item is JSX.Element => item !== null));
        }
    }, [gallery]);

    return (
        <>{render}</> // Zwróć JSX
    );
};
