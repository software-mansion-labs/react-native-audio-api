import React from 'react';

import useScreenSize from '@site/src/hooks/useScreenSize';

interface ShapeProps {
  color: string;
}

const Shape: React.FC<ShapeProps> = ({ color }) => {
  const { windowWidth } = useScreenSize();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 585.763"
      width={windowWidth * 1.4}
      style={{
        display: 'block',
        position: 'absolute',
        bottom: -1,
        left: 0,
        width: '100vw',
      }}
    >
      <path
        fill={color}
        d="M2048,585.763H0v-12.881c0,0,2048,28.813,2048-572.882V585.763z"
      />
    </svg>
  );
};

export default Shape;
