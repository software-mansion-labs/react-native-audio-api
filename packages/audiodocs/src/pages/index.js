import React from 'react';
import Layout from '@theme/Layout';
import { HireUsSection } from '@swmansion/t-rex-ui';

import FooterBackground from '@site/src/components/FooterBackground';
import HeadingBackground from '@site/src/components/HeadingBackground';
import AudioProvider from '@site/src/components/AudioProvider';
import Spectrum from '@site/src/components/Spectrum';
import Heading from '@site/src/components/Heading';
import styles from './styles.module.css';

export default function Home() {
  return (
    <Layout wrapperClassName={styles.wrapper}>
      <AudioProvider>
        <HeadingBackground />
        <div className={styles.container}>
          <Heading />
        </div>
        <Spectrum />
        <div style={{ height: 100 }} />
        <div className={styles.container}>
          <HireUsSection
            href={
              'https://swmansion.com/contact/projects?utm_source=audio&utm_medium=docs'
            }
          />
        </div>
        <FooterBackground />
      </AudioProvider>
    </Layout>
  );
}
