import QRGenerator from "./components/QRGenerator"
import QRScanner from "./components/QRScanner"
import './index.css'

export default function App() {

  return (
    <div className="container">
      <h1>QR Code Generator & Scanner</h1>
      <div className="qrDivide">
        <QRGenerator/>
        <QRScanner/>
      </div>      
    </div>
  )
}
