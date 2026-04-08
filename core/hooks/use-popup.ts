import { Dimensions, LayoutChangeEvent, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TriggerLayout = {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
};

const MAX_DROPDOWN_HEIGHT = 320;
const GAP = 8;

export const usePopup = () => {
  const triggerRef = useRef<View>(null);
  const [isVisible, setIsVisible] = useState(false);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = useCallback(() => setIsVisible(false), []);

  return {
    triggerRef,
    isVisible,
    open,
    close,
    toggle: () => (isVisible ? close() : open()),
  };
};

export const useDropdown = () => {
  const triggerRef = useRef<View>(null);
  const { bottom } = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const open = useCallback(() => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const screenHeight = Dimensions.get("window").height;
      const dropdownHeight = 250;

      const showUpward = pageY + height + dropdownHeight > screenHeight;

      setCoords({
        top: showUpward ? pageY - dropdownHeight - 8 : pageY + height + 8,
        left: pageX,
        width: width,
      });
      setIsVisible(true);
    });
  }, []);

  const close = useCallback(() => setIsVisible(false), []);

  return {
    triggerRef,
    isVisible,
    coords: {
      ...coords,
      bottom: bottom + 10,
    },
    open,
    close,
    toggle: () => (isVisible ? close() : open()),
  };
};

export const useEnhancedDropdown = () => {
  const triggerRef = useRef<View>(null);
  const { bottom: safeBottom } = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState(false);
  // isPositioned = false means we're in the invisible measuring phase
  const [isPositioned, setIsPositioned] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout>({
    pageY: 0,
    pageX: 0,
    width: 0,
    height: 0,
  });
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const open = useCallback(() => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerLayout({ pageY, pageX, width, height });
      setDropdownHeight(0); // reset from previous open
      setIsPositioned(false); // enter measuring phase
      setIsVisible(true);
    });
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
    setIsPositioned(false);
  }, []);

  // Called once the popup View has rendered and we know its real height
  const onDropdownLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (isPositioned) return; // already positioned, ignore subsequent layout events

      const measuredHeight = e.nativeEvent.layout.height;
      setDropdownHeight(measuredHeight);
      setIsPositioned(true); // reveal the popup
    },
    [isPositioned],
  );

  // Derive position every render — cheap and always in sync
  const screenHeight = Dimensions.get("window").height;
  const spaceBelow =
    screenHeight - (triggerLayout.pageY + triggerLayout.height) - GAP;
  const spaceAbove = triggerLayout.pageY - GAP;
  const showUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

  const coords = {
    left: triggerLayout.pageX,
    width: triggerLayout.width,
    maxHeight: MAX_DROPDOWN_HEIGHT,
    // Opacity hides the popup during the measuring phase to avoid a flash
    opacity: isPositioned ? 1 : 0,
    ...(showUpward
      ? {
          // Anchor the *bottom* of the popup to just above the trigger
          bottom: screenHeight - triggerLayout.pageY + GAP + safeBottom,
        }
      : {
          top: triggerLayout.pageY + triggerLayout.height + GAP,
        }),
  };

  return {
    triggerRef,
    isVisible,
    coords,
    onDropdownLayout,
    open,
    close,
    toggle: () => (isVisible ? close() : open()),
  };
};
