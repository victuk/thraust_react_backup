const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatCurrency = (numberValue: number): string => {
    const originalNumber = numberValue / 100;
    return formatter.format(originalNumber);
}