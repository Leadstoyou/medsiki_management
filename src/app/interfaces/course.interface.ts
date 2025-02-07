export interface Video {
  title: string;
  url: string;
  isPreview: boolean;
  index: number;
  id?: string;
}

export interface Course {
  id?: string;
  title: string;
  thumbnail: string;
  description: string;
  star: number;
  price: number;
  discountPrice?: number;
  videos: Video[]; 
  type : number;
}
