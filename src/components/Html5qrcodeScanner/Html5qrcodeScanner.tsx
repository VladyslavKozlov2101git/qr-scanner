import { FC, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { Html5Qrcode } from 'html5-qrcode';

import styles from './Html5qrcodeScanner.module.scss';

interface Html5qrcodeScannerProps {
  className?: string;
}

const Html5qrcodeScanner: FC<Html5qrcodeScannerProps> = ({ className = '' }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);
  const [shouldStartScanner, setShouldStartScanner] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldStartScanner) return;

    const start = async () => {
      const config = { fps: 10, qrbox: 250 };
      const html5QrCode = new Html5Qrcode('reader');
      scannerRef.current = html5QrCode;

      try {
        await html5QrCode.start(
          { facingMode: 'environment' },
          config,
          (decodedText) => {
            setResult(decodedText);
            stopScanner();
          },
          (errorMessage) => {
            console.warn('QR scan error:', errorMessage);
          },
        );
      } catch (err) {
        console.error('Failed to start scanning', err);
        setScanning(false);
      }
    };

    start();

    return () => {
      // Cleanup when unmounting
      scannerRef.current?.stop().then(() => scannerRef.current?.clear());
    };
  }, [shouldStartScanner]);

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
      scannerRef.current = null;
    }
    setScanning(false);
    setShouldStartScanner(false);
  };

  const handleStartClick = () => {
    setResult(null);
    setScanning(true);
    setShouldStartScanner(true);
  };

  return (
    <div className={clsx(styles.root, className)} data-testid="Html5qrcodeScanner">
      {result ? (
        <div>
          <p>
            <strong>Результат: </strong> {result}
          </p>
          <button className={styles.button} onClick={handleStartClick}>
            Сканувати знову
          </button>
        </div>
      ) : (
        <>
          {!scanning ? (
            <button className={styles.button} onClick={handleStartClick}>
              Сканувати
            </button>
          ) : (
            <div id="reader" style={{ width: '300px', maxWidth: '100%' }} />
          )}
        </>
      )}
    </div>
  );
};

export default Html5qrcodeScanner;
