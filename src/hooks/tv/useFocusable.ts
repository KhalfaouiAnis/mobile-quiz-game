import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useEffect } from 'react';

export function useFocusableElement(focusKey: string, onEnter: () => void) {
  const { ref, focused } = useFocusable({
    onEnterPress: onEnter,
    focusKey,
  });

  useEffect(() => {
    if (focusKey === 'initial-focus') setFocus(focusKey);
  }, []);

  return { ref, focused };
}
