export function parseDateString(value: string): Date | null {
  if (!value) return null;
  if (value.includes("/")) {
    const [dd, mm, yyyy] = value.split("/");
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export function dateToTimestamp(value: string): number {
  const d = parseDateString(value);
  return d ? d.getTime() : Number.NaN;
}

export function formatDatePt(value: string): string {
  const d = parseDateString(value);
  if (!d) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}
