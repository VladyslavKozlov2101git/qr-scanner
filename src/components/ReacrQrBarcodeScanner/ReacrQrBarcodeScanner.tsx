import { FC, useState } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';

import clsx from 'clsx';

import styles from './ReacrQrBarcodeScanner.module.scss';

interface ReacrQrBarcodeScannerProps {
  className?: string;
}

const ReacrQrBarcodeScanner: FC<ReacrQrBarcodeScannerProps> = ({ className = '' }) => {
  const [data, setData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (err: any, result: any) => {
    if (result?.text) {
      setData(result.text);
      setIsScanning(false);
    }
  };

  const handleStartScanning = () => {
    setData(null);
    setIsScanning(true);
  };

  return (
    <div className={clsx(styles.root, className)} data-testid="ReacrQrBarcodeScanner">
      {!isScanning && !data && (
        <button className={styles.button} onClick={handleStartScanning}>
          Сканувати
        </button>
      )}

      {isScanning && (
        <div className={styles.scannerWrapper}>
          <BarcodeScanner width={500} height={500} onUpdate={handleScan} />
          <div className={styles.overlay}></div>
        </div>
      )}

      {data && (
        <div className={styles.resultContainer}>
          <button className={styles.button} onClick={handleStartScanning}>
            Сканувати знову
          </button>

          <p className={styles.result}>Результат: {data}</p>
        </div>
      )}
    </div>
  );
};

export default ReacrQrBarcodeScanner;
