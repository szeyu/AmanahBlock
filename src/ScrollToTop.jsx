import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const smoothScrollToTop = () => {
      const scrollStep = -window.scrollY / 15; // Adjust speed
      
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15); // Adjust smoothness
    };

    smoothScrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;