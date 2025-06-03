import { useState } from 'react';
import { useZxing } from 'react-zxing';

import styles from './ZXingBrowser.module.scss';

export const ZXingBrowser = () => {
  const [result, setResult] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);

  const handleScanClick = () => {
    setResult('');
    setScanning(true);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Сканер штрих-кодів</h2>

      {scanning && (
        <VideoScanner
          onResult={(res) => {
            setResult(res);
            setScanning(false);
          }}
        />
      )}

      {!scanning ? (
        <button onClick={handleScanClick} className={styles.button}>
          {result ? 'Сканувати знову' : 'Сканувати'}
        </button>
      ) : (
        <p className={styles.message}>Сканування...</p>
      )}

      {result && (
        <div className={styles.result}>
          <span>Результат: </span>
          <strong>{result}</strong>
        </div>
      )}
    </div>
  );
};

type VideoScannerProps = {
  onResult: (result: string) => void;
};

const VideoScanner = ({ onResult }: VideoScannerProps) => {
  const { ref } = useZxing({
    onDecodeResult: (result) => {
      onResult(result.getText());
    },
  });

  return <video ref={ref} className={styles.video} autoPlay muted playsInline />;
};

export default ZXingBrowser;
