import { FC, useState } from 'react';

import styles from './Dashboard.module.scss';

import Html5qrcodeScanner from '@components/Html5qrcodeScanner';
import Quagga2Scanner from '@components/Quagga2Scanner';
import ReacrQrBarcodeScanner from '@components/ReacrQrBarcodeScanner';
import ZXingBrowser from '@components/ZXingBrowser';

interface DashboardProps {
  className?: string;
}

const Dashboard: FC<DashboardProps> = ({ className = '' }) => {
  const [activeLibrary, setActiveLibrary] = useState<
    'react-qr-barcode-scanner' | 'html5-qrcode' | 'zxing-browser' | 'quagga2'
  >('react-qr-barcode-scanner');

  return (
    <div className={`${styles.root} ${className}`} data-testid="dashboard">
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeLibrary === 'react-qr-barcode-scanner' ? styles.active : ''
          }`}
          onClick={() => setActiveLibrary('react-qr-barcode-scanner')}
        >
          React QR Scanner
        </button>
        <button
          className={`${styles.tab} ${activeLibrary === 'html5-qrcode' ? styles.active : ''}`}
          onClick={() => setActiveLibrary('html5-qrcode')}
        >
          HTML5 QR Scanner
        </button>
        <button
          className={`${styles.tab} ${activeLibrary === 'zxing-browser' ? styles.active : ''}`}
          onClick={() => setActiveLibrary('zxing-browser')}
        >
          ZXingBrowser QR Scanner
        </button>
        <button
          className={`${styles.tab} ${activeLibrary === 'quagga2' ? styles.active : ''}`}
          onClick={() => setActiveLibrary('quagga2')}
        >
          Quagga2 QR Scanner
        </button>
      </div>

      <div className={styles.content}>
        {activeLibrary === 'react-qr-barcode-scanner' && <ReacrQrBarcodeScanner />}
        {activeLibrary === 'html5-qrcode' && <Html5qrcodeScanner />}
        {activeLibrary === 'zxing-browser' && <ZXingBrowser />}
        {activeLibrary === 'quagga2' && <Quagga2Scanner />}
      </div>
    </div>
  );
};

export default Dashboard;
