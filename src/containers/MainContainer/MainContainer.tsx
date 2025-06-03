import { FC, Fragment, ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import clsx from 'clsx';

import styles from './MainContainer.module.scss';

import LoaderComponent from '@shared/LoaderComponent';

interface MainContainerProps {
  className?: string;
  children?: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ className = '' }) => {
  return (
    <Fragment>
      <main className={clsx(styles.root, className, 'container')}>
        <Suspense fallback={<LoaderComponent />}>
          <Outlet />
        </Suspense>
      </main>
    </Fragment>
  );
};

export default MainContainer;
