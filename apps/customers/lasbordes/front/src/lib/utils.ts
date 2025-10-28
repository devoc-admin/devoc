import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale = "fr-FR"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}

export function formatDateTime(date: Date | string, locale = "fr-FR"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}
