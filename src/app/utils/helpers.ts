import { BaseQueryRequest, SortTypeRequest } from '#interfaces/api.interface';
import { ISelectOption, SearchQuery } from '#interfaces/table.interface';
import { ENCRYPTION_SECRET, STRING, USER_ROLE } from './const';
import { IAccount } from '#interfaces/account.interface';
import { ALL_OPTION, IBaseEntity } from '#interfaces/index';
import * as CryptoJS from 'crypto-js';
import { HttpResponse } from '@angular/common/http';
import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { NotificationParams } from '#interfaces/notification.interface';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
import * as echarts from 'echarts';
import * as JSZip from 'jszip';
import { FileData } from '#interfaces/common.interface';
import { getCookie } from './cookie.helper';
export function isset(value: unknown): boolean {
  return typeof value !== 'undefined';
}

export function isImage(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isPDFfile(file: File): boolean {
  const officeMimeTypes = ['application/pdf', 'application/pdf; charset=utf-8'];
  return officeMimeTypes.includes(file.type);
}

export function isDOCfile(file: File): boolean {
  const officeMimeTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document; charset=utf-8',
  ];
  return officeMimeTypes.includes(file.type);
}

export function isExcelfile(file: File): boolean {
  const officeMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
    'text/csv',
    'text/csv; charset=utf-8',
  ];
  return officeMimeTypes.includes(file.type);
}

export function windowOpen(url: string, target = '_blank'): void {
  window.open(url, target);
}

export function toSearchQuery(queries: SearchQuery, extraOptions?: { [key: string]: unknown }) {
  const { pageIndex, pageSize, sort } = queries;

  const query: BaseQueryRequest = {
    page: pageIndex,
    size: pageSize,
    ...extraOptions,
  };

  if (sort) {
    query.sortBy = sort.key;
    query.sortType = sort.value.toUpperCase() as SortTypeRequest;
  }

  return query;
}

export function getRoleName(user: IAccount): string {
  const currentRole = user.role;
  switch (true) {
    case currentRole === USER_ROLE.MANAGER:
      return 'role.manager';
    default:
      return '';
  }
}

export function getAbsoluteHeight(el: HTMLElement): number {
  if (!el) return 0;
  const styles = window.getComputedStyle(el);
  const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

export function checkRole(currentRole: USER_ROLE, roles?: USER_ROLE[]): boolean {
  return !roles || !roles.length || roles.includes(currentRole);
}

export function setComboBoxData<T extends IBaseEntity>(data: T[]): ISelectOption[] {
  const mappingData = data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return [ALL_OPTION, ...mappingData];
}

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function getHostname(): string {
  return window.location.hostname;
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export const randomCharacter = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 5) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    const charRandom = randomCharacter().toLocaleLowerCase();
    const unixTimeStamp = Math.floor(new Date().getTime() / 1000);
    sessionId = `${charRandom}_${unixTimeStamp}`;
    setSessionId(sessionId);
  }
  return sessionId;
};
export const setSessionId = (value: string) => localStorage.setItem('sessionId', value);

export const isValidEmail = (email: string) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexEmail.test(email);
};

export const httpFetch = async (
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET' = 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: Record<string, string> = {},
) => {
  return await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
};

export function backHistoryPage() {
  window.history.back();
}

export function setFavicon(faviconUrl: string) {
  if (!faviconUrl) return;
  // eslint-disable-next-line quotes
  const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.href = faviconUrl;
  document.getElementsByTagName('head')[0].appendChild(link);
}

export function decrypt(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function onDownload(res: HttpResponse<Blob>, fileName?: string) {
  const blob = res.body!;
  fileName = fileName || res.headers.get('File-Name')!;
  let url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  if (fileName.includes('.csv')) {
    const data = await blob.text();
    url = `data:text/csv;charset=utf-8,\uFEFF${data}`;
  }

  link.href = url;
  link.download = decodeURIComponent(fileName);
  link.click();
  link.remove();
}

export async function onDownloadFile(res: HttpResponse<Blob>, fileName?: string) {
  const blob = res.body!;
  fileName = fileName || res.headers.get('File-Name')!;

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = decodeURIComponent(fileName);

  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export async function displayDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const childElements = Array.from(tempDiv.children);

    const firstFiveHtml = childElements
      .slice(0, 5)
      .map((child) => child.outerHTML)
      .join('');

    return firstFiveHtml;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return '';
  }
}

export async function displayPdf(file: File): Promise<string> {
  const pdfData = await readFileAsArrayBuffer(file);
  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  await page.render(renderContext).promise;
  return canvas.toDataURL();
}
export function initBarChartForGitCommit(elementId: string, xAxisData: string[], yAxisData: number[]) {
  const chartDom = document.getElementById(elementId) as HTMLElement;
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'item',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (params: any) {
        return `Author: ${params.name} <br/> Commits: ${params.value}`;
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        formatter: function (value: string) {
          return value.length > 10 ? value.substring(0, 10) + '...' : value;
        },
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yAxisData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        label: {
          show: true,
          position: 'top',
          color: '#000',
        },
      },
    ],
  };

  myChart.setOption(option);
}

export async function downloadAndAddFile(url: string, filename: string): Promise<File | undefined> {
  try {
    const token = getCookie(STRING.ACCESS_TOKEN); 

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
    const blob = await response.blob();
    return new File([blob], filename, { type: contentType });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error downloading file:', error);
    return undefined;
  }
}

export function downloadFileZip(files: FileData[], fileName: string) {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file.file);
  });
  zip.generateAsync({ type: 'blob' }).then((content) => {
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  });
}
function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function generateNotificationMessage(template: string, params: NotificationParams): string {
  return template.replace(/{(\w+)}/g, (match, key) => params[key]?.toString() || match);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
};
