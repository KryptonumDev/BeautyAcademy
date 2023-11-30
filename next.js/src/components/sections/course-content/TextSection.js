import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Img from '@/components/atoms/Img';
import Button from '@/components/atoms/Button';
import Video from '@/components/organisms/Video';

const TextSection = ({
  isColumn=false,
  isReversed=false,
  centered=false,
  heading,
  paragraph,
  img,
  cta,
  video,
}) => {
  return (
    <div
      className={styles.textSection}
      data-column={isColumn}
      data-reversed={isReversed}
      data-video={Boolean(video)}
      data-centered={centered}
    >
      <div>
        <Markdown.h2 className="h3">{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
        {cta?.href && (
          <Button data={cta} />
        )}
      </div>
      {video ? (
        <Video asset={video.asset} className={styles.video} />
      ) : (
        <Img
          src={img}
          width={1813}
          height={798}
          className={styles.img}
        />
      )}
    </div>
  );
};

export default TextSection;