'use client';
import { useRef } from 'react';
import styles from './styles.module.scss';

const VideoFlowerFrame = ({ asset: { url, altText }, className}) => {
  const videoRef = useRef(null);
  const toggleVideo = () => {
    const video = videoRef.current;
    video[video.paused ? 'play' : 'pause']();
  };
  
  return (
    <div
      className={`${styles.wrapper} ${className || ''}`}
    >
      <button
        aria-label='Toggle Video'
        onClick={() => toggleVideo()}
      ></button>
      <Frame />
      <video ref={videoRef}>
        <source src={url} />
        <p>{altText}</p>
      </video>
    </div>
  );
};

export default VideoFlowerFrame;

const Frame = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='310'
    height='309'
    viewBox='0 0 310 309'
    fill='var(--background-200)'
  >
    <path
      d='M154.758 38.04C150.57 5.257 126.82.444 117.102 0h75.375c-28.875 1.695-37.136 26.622-37.719 38.04zM271.25 154.469c32.781-4.188 37.594-27.938 38.039-37.657v75.376c-1.695-28.876-26.622-37.136-38.039-37.719zm-232.922.062C5.547 158.719.734 182.469.29 192.188v-75.376c1.695 28.875 26.622 37.136 38.04 37.719zm116.492 116.43c4.188 32.781 27.938 37.594 37.657 38.039h-75.375c28.875-1.695 37.135-26.622 37.718-38.039z'
    ></path>
    <path
      d='M.29 11.756V0h11.732C3.226.795.663 7.42.288 11.756zM297.533.023h11.756v11.733C308.494 2.96 301.869.398 297.533.023zm11.756 297.221V309h-11.732c8.795-.795 11.357-7.42 11.732-11.756zM12.033 308.977H.277v-11.733c.795 8.795 7.42 11.358 11.756 11.733z'
    ></path>
  </svg>
)