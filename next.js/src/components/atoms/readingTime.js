const countWords = (text) => {
  const trimmedText = text.trim();
  if (trimmedText === '') {
    return 0;
  }
  const words = trimmedText.split(/\s+/);
  return words.length;
};

const readingTime = (text) => {
  const words = countWords(text);
  const averageReadingSpeedWordsPerMinute = 200;
  const readingTime = Math.ceil(words / averageReadingSpeedWordsPerMinute);
  return `${readingTime} ${readingTime === 1 ? 'minute' : 'minutes'}`;
};

export default readingTime;