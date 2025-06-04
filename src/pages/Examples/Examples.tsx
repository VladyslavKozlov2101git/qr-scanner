import { FC } from 'react';

import styles from './Examples.module.scss';

interface ExamplesProps {
  className?: string;
}

const Examples: FC<ExamplesProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.root} ${className} `}>
      <h2 className="mt16">Custom hooks examples</h2>
    </div>
  );
};

export default Examples;
