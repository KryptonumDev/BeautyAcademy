'use client';
import { useRef } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import phoneFrame from '@/public/phone-frame.webp';

const VideoPhoneFrame = ({ asset: { url, altText }, className}) => {
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
      <Image src={phoneFrame} alt="" />
      <video ref={videoRef}>
        <source src={url} />
        <p>{altText}</p>
      </video>
    </div>
  );
};

export default VideoPhoneFrame;