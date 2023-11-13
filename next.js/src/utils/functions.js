export const removeMarkdown = (markdown) => {
  return markdown?.replace(/\*\*(.*?)\*\*/g, '$1');
}

export const removeHtmlTags = (data) => {
  return data.replace(/<[^>]*>/g, '');
}

export const portableTextToMarkdown = (node) => {
  if (node._type === 'span') {
    let text = node.text;
    if (node.marks && node.marks.includes('strong')) {
      text = `**${text}**`;
    }
    return text;
  }
  if (Array.isArray(node.children)) {
    return node.children.map(child => portableTextToMarkdown(child)).join('');
  }
  return '';
};

export const slugify = (text) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;',
    b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------',
    p = new RegExp(a.split('').join('|'), 'g');
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-i-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

export const phoneValidation = (e) => {
  if (
    (e.metaKey || e.ctrlKey) && e.key === 'a' ||
    (e.metaKey || e.ctrlKey) && e.key === 'a' ||
    (e.metaKey || e.ctrlKey) && e.key === 'c' ||
    (e.metaKey || e.ctrlKey) && e.key === 'x' ||
    (e.metaKey || e.ctrlKey) && e.key === 'v' ||
    (e.metaKey || e.ctrlKey) && e.key === 'z' ||
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight' ||
    e.key === 'Home' ||
    e.key === 'End' ||
    e.key === 'Backspace' ||
    e.key === 'Delete' ||
    e.key === 'Enter' ||
    e.key === 'Tab'
  ) {
    return;
  }
  const allowedCharactersPattern = /[0-9()_+\-\s]/;
  const pressedKey = e.key;
  if (!allowedCharactersPattern.test(pressedKey)) {
    e.preventDefault();
  }
}

export const prettyfyDate = (date) => {
  const dateFormat = new Date(date);
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateFormat);
}