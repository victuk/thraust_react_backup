
interface SizeAndColor {
    size: string;
    color: string;
}

export interface CategoryInterface {
    _id: string;
    name: string;
    slug: string;
  }

  export interface ProductInterface {
    _id?: string;
    productName: string;
    description: string;
    pictures: string[];
    cost: number;
    forType: string[];
    stockStatus: string;
    sizeAndColor: SizeAndColor[];
    categories: string[] | CategoryInterface[];
}