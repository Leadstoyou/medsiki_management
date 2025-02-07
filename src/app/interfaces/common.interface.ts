export interface UrlFile {
  url: string;
  name: string;
}
export interface FileData {
  file: File;
  name: string;
  pdfUrl?: string;
  docxHtml?: string;
  xlsxHtml?: string;
  preview?: string;
}
export interface GitData {
  authored_date: string;
  author_email: string;
}