export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString();
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- recharts Formatter type uses `any` for payload
type TooltipFormatter = (
  value: any,
  name: any,
  item: any,
  index: number,
  payload: any,
) => [string, string];

export const bundleSizeDiffTooltipFormatter: TooltipFormatter = (value, _name, item) => {
  const data = item.payload;
  if (!data) return [String(value), ""];

  const publicationDateText = data.publicationDate
    ? ` | Published: ${formatDate(data.publicationDate)}`
    : " | Publication date unavailable";

  if (data.isBaseline) {
    return [
      `${formatNumberWithCommas(data.currentSize)} bytes (baseline)${publicationDateText}`,
      "Bundle Size",
    ];
  }

  const sign = value >= 0 ? "+" : "";
  const changeText = `${sign}${formatNumberWithCommas(value)} bytes`;
  const fromTo = `(${formatNumberWithCommas(data.previousSize)} → ${formatNumberWithCommas(data.currentSize)})`;

  return [`${changeText} ${fromTo}${publicationDateText}`, "Size Change"];
};

export const buildTimeTooltipFormatter: TooltipFormatter = (value, _name, item) => {
  const data = item.payload;
  if (!data) return [String(value), ""];

  const publicationDateText = data.publicationDate
    ? ` | Published: ${formatDate(data.publicationDate)}`
    : " | Publication date unavailable";

  return [`${value}ms${publicationDateText}`, "Build Time"];
};
