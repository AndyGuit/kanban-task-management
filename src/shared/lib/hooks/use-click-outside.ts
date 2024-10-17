import { useEffect, useState } from 'react';

export function useClickOutside(triggerClass: string, contentClass: string) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible((prevState) => !prevState);
  };

  const hideContent = () => {
    setIsContentVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickedOnTrigger = target.closest(`.${triggerClass}`);
      const isClickedOutside = !target.classList.contains(contentClass);

      if (isClickedOutside && !isClickedOnTrigger) {
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

  return { toggleContent, isContentVisible, hideContent };
}
