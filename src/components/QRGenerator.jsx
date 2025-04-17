import { useState, useRef } from "react";
import QRCode from "qrcode";
import style from "./scan-gen.module.css";

export default function QRGenerator() {
  const [qrCode, setQRCode] = useState("");
  const canvasRef = useRef();

  const generateQR = () => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        qrCode,
        { width: 200 },
        function (error) {
          if (error) console.error(error);
        }
      );
      setQRCode(""); // Clear input after generating
    }
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const png = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = png;
    link.download = "qrCode.png";
    link.click();
    setQRCode(""); // Clear input after downloading
  };

  return (
    <div className={style.con}>
      <h2>QR Code Generator</h2>
      <input
        type="text"
        value={qrCode}
        onChange={(e) => setQRCode(e.target.value)}
        placeholder="Enter text or URL"
      />     
      <div className={style.qrBtns}>
        <button onClick={generateQR}>Generate</button>
        <button onClick={downloadQR}>Download</button>
      </div>
      <div className={style.QRdiv}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
