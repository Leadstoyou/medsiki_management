import { environment } from 'src/environments/environment';

const cookiePrf = `${environment.baseDomain}_cms_`;

export function getCookie(name: string): string | null {
  const nameEQ = `${cookiePrf}${name}=`; // Đảm bảo cookiePrf đúng giá trị
  const cookies = document.cookie.split(';');

  for (let c of cookies) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }

  return null;
}

/**
 * @see https://stackoverflow.com/a/44945595
 */
export function removeAllCookies(excludes: Array<string> = []) {
  const cookies = document.cookie.split(';');

  for (const element of cookies) {
    const [cookieName] = element.split('=');

    !excludes.includes(cookieName.trim()) && deleteCookie(cookieName);
  }
}

export function deleteCookie(cookieName: string) {
  document.cookie = `${cookieName}=;expires=Sat Jan 01 00:00:00 2000; domain=${environment.baseDomain}; path=/; SameSite=None; Secure`;
}

export function replaceCookie(cookieName: string, cookieValue: string) {
  const date = new Date();

  /** 12h */
  date.setTime(date.getTime() + 12 * 60 * 60 * 1000);

  document.cookie = `${cookiePrf}${cookieName}=${cookieValue};expires=${date}; domain=${environment.baseDomain}; path=/`;
}
