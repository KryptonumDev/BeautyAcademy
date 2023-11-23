'use client'

const ShareLink = ({ title, url }) => {
  const shareData = { title, url };

  const handleShare = async (e) => {
    const btn = e.currentTarget;
    try {
      await navigator.share(shareData);
    } catch {
      const btnSpan = btn.querySelector('span');
      const btnSpanText = btnSpan.textContent;
      await navigator.clipboard.writeText(shareData.url);
      btnSpan.textContent = 'Скопированная ссылка 👏🏼'
      setTimeout(() => {
        btnSpan.textContent = btnSpanText;
      }, 3000);
    }
  }

  return (
    <button onClick={(e) => handleShare(e)}>
      <Copy />
      <span>Копировать ссылку</span>
    </button>
  );
};

export default ShareLink;

const Copy = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='19'
    height='24'
    fill='none'
    viewBox='0 0 19 24'
  >
    <path
      stroke='#7A6A65'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17.679 8.133h-4.5a2.25 2.25 0 01-2.25-2.25v-4.5m6.75 6.557v9.193a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-13.5a2.25 2.25 0 012.25-2.25h4.693c.597 0 1.169.237 1.59.659l4.308 4.307c.422.422.659.994.659 1.59z'
    ></path>
    <path
      stroke='#7A6A65'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.179 4.758H3.054a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-1.125'
    ></path>
  </svg>
)