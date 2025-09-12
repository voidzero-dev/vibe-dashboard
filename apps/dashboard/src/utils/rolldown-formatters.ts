export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString();
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const bundleSizeDiffTooltipFormatter = (value: any, name: string, props: any) => {
  const data = props.payload;
  if (!data) return [value, name];

  const publicationDateText = data.publicationDate
    ? ` | Published: ${formatDate(data.publicationDate)}`
    : ' | Publication date unavailable';

  if (data.isBaseline) {
    return [`${formatNumberWithCommas(data.currentSize)} bytes (baseline)${publicationDateText}`, 'Bundle Size'];
  }

  const sign = value >= 0 ? '+' : '';
  const changeText = `${sign}${formatNumberWithCommas(value)} bytes`;
  const fromTo = `(${formatNumberWithCommas(data.previousSize)} → ${formatNumberWithCommas(data.currentSize)})`;

  return [`${changeText} ${fromTo}${publicationDateText}`, 'Size Change'];
};

export const buildTimeTooltipFormatter = (value: any, name: string, props: any) => {
  const data = props.payload;
  if (!data) return [value, name];

  const publicationDateText = data.publicationDate
    ? ` | Published: ${formatDate(data.publicationDate)}`
    : ' | Publication date unavailable';

  return [`${value}ms${publicationDateText}`, 'Build Time'];
};
