import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { DocSidebar } from '@swmansion/t-rex-ui';

export default function DocSidebarWrapper(props) {
  const titleImages = {
    light: useBaseUrl('/img/title.svg'),
    dark: useBaseUrl('/img/title-dark.svg'),
  };

  const heroImages = {
    logo: useBaseUrl('/img/logo-hero.svg'),
    title: useBaseUrl('/img/title-hero.svg'),
  };

  const newItems = [];
  const experimentalItems = [];
  const unreleasedItems = [];

  return (
    <DocSidebar
      {...props}
      newItems={newItems}
      heroImages={heroImages}
      titleImages={titleImages}
      unreleasedItems={unreleasedItems}
      experimentalItems={experimentalItems}
    />
  );
}
