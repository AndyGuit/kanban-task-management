import { useEffect } from 'react';

type TCallback = () => void;

export function usePreferredColorScheme(callback: TCallback) {
  const darkModeMediaQuery = window.matchMedia?.(
    '(prefers-color-scheme: dark)',
  );

  useEffect(() => {
    const listener = () => {
      callback();
    };

    darkModeMediaQuery.addEventListener('change', listener);

    return () => darkModeMediaQuery.removeEventListener('change', listener);
  }, [callback, darkModeMediaQuery]);

  return {
    isDarkPreferred: !darkModeMediaQuery.matches,
  };
}
