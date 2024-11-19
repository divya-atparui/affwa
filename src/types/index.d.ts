import {
  type accountDetailsSchema,
  type addressInfoSchema,
  type contactDetailsSchema,
  type personalInfoSchema,
} from '@/schema/register';
// declare interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }

declare interface Product {
  createdStamp: string;
  mediumImageUrl?: string;
  productName?: string;
  introductionDate?: string;
  originalImageUrl?: string;
  detailImageUrl?: string;
  configId?: string;
  billOfMaterialLevel: string;
  createdByUserLogin: string;
  productId: string;
  smallImageUrl?: string;
  primaryProductCategoryId?: string;
  createdTxStamp: string;
  lastUpdatedTxStamp: string;
  isVirtual: 'Y' | 'N';
  longDescription?: string;
  internalName: string;
  lastModifiedByUserLogin: string;
  lastUpdatedStamp: string;
  lastModifiedDate?: string;
  productTypeId: string;
  createdDate: string;
  isVariant: 'Y' | 'N';
  largeImageUrl?: string;
  description?: string;
  defaultPrice?: string;
}

declare interface ProductResponse {
  statusCode: number;
  statusDescription: string;
  data: {
    resultList: Product[];
  };
}

interface ProductItemType {
  id: string;
  name?: string;
  description?: string;
  image?: string;
  defaultPrice?: string;
}

interface ProductResponse {
  products: Product[];
}

// Individual Product response

declare interface IndividualProduct {
  createdStamp: string; // ISO 8601 date string
  productName: string;
  createdByUserLogin: string;
  productId: string;
  smallImageUrl: string;
  taxable: 'Y' | 'N';
  primaryProductCategoryId: string;
  createdTxStamp: string; // ISO 8601 date string
  lastUpdatedTxStamp: string; // ISO 8601 date string
  isVirtual: 'Y' | 'N';
  autoCreateKeywords: 'Y' | 'N';
  description: string;
  chargeShipping: 'Y' | 'N';
  internalName: string;
  lastModifiedByUserLogin: string;
  lastUpdatedStamp: string; // ISO 8601 date string
  lastModifiedDate: string; // ISO 8601 date string
  productTypeId: string;
  createdDate: string; // ISO 8601 date string
  isVariant: 'Y' | 'N';
  largeImageUrl: string;
}

declare interface ProductPrices {
  defaultPrice: number;
  currencyUsed: string;
  price: number;
  orderItemPriceInfos: any[]; // Adjust if more specific details are known
  isSale: boolean;
  validPriceFound: boolean;
  averageCost: number;
  listPrice: number;
  basePrice: number;
}

declare interface IndividualProductDataResponse {
  statusCode: number;
  statusDescription: string;
  data: {
    product: Product;
    productPrices: ProductPrices;
  };
}
declare interface IndividualProductPageData {
  defaultPrice: number;
  smallImageUrl?: string;
  description?: string;
  productName?: string;
  primaryProductCategoryId?: string;
  isSale: boolean;
  largeImageUrl?: string;
  currencyUsed: string;
  listPrice: number;
  productId: string;
}

type CartStore = {
  items: CartItem[];
  addProduct: (product: IndividualProductPageData) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

declare interface CartItem {
  product: IndividualProductPageData;
  quantity: number;
}

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type AddressInfo = z.infer<typeof addressInfoSchema>;
type ContactDetails = z.infer<typeof contactDetailsSchema>;
type AccountDetails = z.infer<typeof accountDetailsSchema>;
