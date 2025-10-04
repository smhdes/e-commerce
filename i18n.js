import { notFound } from 'next/navigation';

export const locales = ['tr', 'en'];
export const defaultLocale = 'tr';

export function getLocale(request) {
  // Check for locale in URL path
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return defaultLocale;
  }

  // Extract locale from pathname
  const segments = pathname.split('/');
  const locale = segments[1];
  
  if (locales.includes(locale)) {
    return locale;
  }

  return defaultLocale;
}

export function getLocalizedPathname(pathname, locale) {
  const segments = pathname.split('/');
  
  // Remove existing locale if present
  if (locales.includes(segments[1])) {
    segments.splice(1, 1);
  }
  
  // Add new locale
  if (locale !== defaultLocale) {
    segments.splice(1, 0, locale);
  }
  
  return segments.join('/');
}
