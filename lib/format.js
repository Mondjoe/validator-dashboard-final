export function formatBalance(value, symbol) {
  if (value == null) return '-';
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  const formatted = num.toLocaleString(undefined, {
    maximumFractionDigits: 6
  });
  return symbol ? `${formatted} ${symbol}` : formatted;
}
