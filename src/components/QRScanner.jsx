import { useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import style from "./scan-gen.module.css";

export default function QRScanner() {
  const [scanResult, setScanResult] = useState("No result");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const fileInputRef = useRef();

  const startCameraScan = async () => {
    if (isScanning) return; // Prevent multiple scans

    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;
    setIsScanning(true);

    try {
      await html5QrCode.start(
        { facingMode: "environment" }, // use back camera
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setScanResult(decodedText);
          stopCamScan();
        },
        (errorMessage) => {
          // handle scan errors silently
        }
      );
    } catch (err) {
      console.error("Camera scan error:", err);
      setIsScanning(false);
    }
  };

  const stopCamScan = async() => {
    if(scannerRef.current){
      await scannerRef.current.stop();
      await scannerRef.current.clear();
      scannerRef.current = null;
      setIsScanning(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader");
    try {
      const result = await html5QrCode.scanFile(file, true);
      setScanResult(result);
    } catch (err) {
      console.error("File scan error:", err);
    }
  };

  return (
    <div className={style.con2}>
      <h2>QR Code Scanner</h2>
      <div className={style.qrBtns}>
        <button onClick={startCameraScan}>Open Camera</button>
        <button className={style.stop} onClick={stopCamScan} disabled={!isScanning}>Stop Camera</button>
        <button onClick={() => fileInputRef.current.click()}>Upload from Gallery</button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </div>
      <div id="reader"></div>
      <p>Scan Result: <strong>{scanResult}</strong></p>
    </div>
  );
}
