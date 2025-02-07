import { Injectable } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as enStrings } from 'ngx-timeago/language-strings/en';
import { strings as viStrings } from 'ngx-timeago/language-strings/vi';

export type SupportedLanguage = 'en' | 'vi';

@Injectable()
export class CustomIntl extends TimeagoIntl {
  private readonly DEFAULT_LANGUAGE: SupportedLanguage = 'en';
  private readonly LANGUAGE_KEY = 'lang';

  constructor() {
    super();
    this.initializeStrings();
  }

  updateLocale(locale: SupportedLanguage): void {
    this.strings = this.getLanguageStrings(locale);
    this.changes.next();
  }

  private initializeStrings(): void {
    const savedLang = localStorage.getItem(this.LANGUAGE_KEY) as SupportedLanguage;
    const currentLang = this.isValidLanguage(savedLang) ? savedLang : this.DEFAULT_LANGUAGE;
    this.strings = this.getLanguageStrings(currentLang);
  }

  private getLanguageStrings(locale: SupportedLanguage) {
    return locale === 'vi' ? viStrings : enStrings;
  }

  private isValidLanguage(lang: string | null): lang is SupportedLanguage {
    return lang === 'en' || lang === 'vi';
  }
}
