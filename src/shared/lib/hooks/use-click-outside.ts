import { useEffect, useState } from 'react';

export function useClickOutside(triggerClass: string, contentClass: string) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickedOnButton = target.closest(`.${triggerClass}`);
      const isClickedOutside = !target.classList.contains(contentClass);

      if (isClickedOutside && !isClickedOnButton) {
        setIsContentVisible(false);
      }
    };

    if (isContentVisible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isContentVisible, triggerClass, contentClass]);

  return { toggleContent, isContentVisible };
}
