import { useState } from "react";

export default function useScanQRCode() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setIsCameraOpen(false);

    return data;
  };

  return { isCameraOpen, scanned, handleBarCodeScanned };
}
