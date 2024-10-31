import { useEffect } from 'react';

const useCarouselEffect = (picturesData: any[], Class: string) => {
  useEffect(() => {
    let i = 0;
    if (picturesData.length > 0) {
      const intervalId = setInterval(() => {
        const carouselContent = document.querySelector(
          `.${Class}`
        ) as HTMLElement;

        if (carouselContent && carouselContent.children.length > 0) {
          Array.from(carouselContent.children).forEach((child, index) => {
            (child as HTMLElement).style.opacity = index === i ? '1' : '0';
            (child as HTMLElement).style.transition = 'opacity 1.5s ease';
          });
          i = (i + 1) % carouselContent.children.length;
        }
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [picturesData, Class]);
};

export default useCarouselEffect
