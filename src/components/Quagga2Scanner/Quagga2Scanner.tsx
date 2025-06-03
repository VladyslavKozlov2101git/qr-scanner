import React, { FC, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import Quagga from '@ericblade/quagga2';

import styles from './Quagga2Scanner.module.scss';

interface Quagga2ScannerProps {
  className?: string;
}

const Quagga2Scanner: FC<Quagga2ScannerProps> = ({ className = '' }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const lastCode = useRef<string | null>(null);
  const sameCodeCount = useRef(0);

  const onDetected = (data: any) => {
    const code = data.codeResult?.code;
    if (!code) return;

    if (code === lastCode.current) {
      sameCodeCount.current += 1;
    } else {
      lastCode.current = code;
      sameCodeCount.current = 1;
    }

    if (sameCodeCount.current >= 3) {
      setResult(code);
      setScanning(false);
    }
  };

  useEffect(() => {
    if (scanning && scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              facingMode: 'environment',
            },
          },
          decoder: {
            readers: [
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'upc_reader',
              'upc_e_reader',
            ],
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error('Quagga init error:', err);
            return;
          }
          Quagga.start();
        },
      );

      Quagga.onDetected(onDetected);
    }

    return () => {
      if (scanning) {
        Quagga.offDetected(onDetected);
        Quagga.stop();
      }
    };
  }, [scanning]);

  const handleScanClick = () => {
    setResult(null);
    setScanning(true);
  };

  const handleScanAgainClick = () => {
    setResult(null);
    setScanning(true);
  };

  return (
    <div className={clsx(styles.root, className)} data-testid="Quagga2Scanner">
      {scanning && <div ref={scannerRef} className={styles.scanner} />}

      {!scanning && !result && (
        <button onClick={handleScanClick} className={styles.button}>
          Сканувати
        </button>
      )}

      {result && (
        <>
          <div className={styles.result}>Результат: {result}</div>
          <button onClick={handleScanAgainClick} className={styles.button}>
            Сканувати знову
          </button>
        </>
      )}
    </div>
  );
};

export default Quagga2Scanner;
