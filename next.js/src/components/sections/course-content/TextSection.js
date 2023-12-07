import styles from './styles.module.scss';
import Img from '@/components/atoms/Img';
import Button from '@/components/atoms/Button';
import Video from '@/components/organisms/Video';

const TextSection = ({
  isColumn = false,
  isReversed = false,
  centered = false,
  content,
  image,
  cta,
  video,
}) => {
  return (
    <div
      className={styles.textSection}
      data-column={!isColumn}
      data-reversed={Boolean(isReversed)}
      data-video={Boolean(video)}
      data-centered={Boolean(centered)}
    >
      <div>
        <div className={styles.paragraph} dangerouslySetInnerHTML={{ __html: content }} />
        {cta?.url && (
          <Button target={cta.target} href={cta.url}>{cta.title}</Button>
        )}
      </div>
      {video ? (
        <Video asset={video} className={styles.video} />
      ) : (
        <Img
          src={image.url}
          width={image.metadata.width}
          height={image.metadata.height}
          alt={image.altText}
          className={styles.img}
        />
      )}
    </div>
  );
};

export default TextSection;