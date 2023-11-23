import { Social } from '@/components/atoms/Icons';
import styles from './styles.module.scss';
import { domain } from '@/global/Seo';
import ShareLink from './ShareLink';

const share = {
  facebook: `https://www.facebook.com/sharer/sharer.php?u=`,
  twitter: `https://twitter.com/intent/tweet?url=`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=`,
  pinterest: `https://pinterest.com/pin/create/link/?url=`,
  telegram: 'https://t.me/share/url?url='
}

const ShareArticle = ({ title, slug }) => {
  const url = `${domain}/blog/${slug}`
  const shareLink = (platform) => {
    return `${share[platform]}${url}`;
  }
  return (
    <div className={styles.shareArticle}>
      <p>Поделитесь статьей</p>
      <div>
        <ShareLink title={title} url={url} />
        <a href={shareLink('telegram')} target='_blank' rel="noopener">
          <Social.Telegram />
        </a>
        <a href={shareLink('facebook')} target='_blank' rel="noopener">
          <Social.Facebook />
        </a>
      </div>
    </div>
  );
};

export default ShareArticle;