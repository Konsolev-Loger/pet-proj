export type User = {
  id: number;
  email: string;
  fullName: string;
  role?: string;
  phone?: string;
  createdAt?: string;
};
export type UserEdit = {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
};

export type UserState = {
  status: 'logged' | 'guest' | 'not-logged';
  data: User | null;
};
// ==============================================================
export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  stockCount: number;
  img: string;
};
export type ProductResponse = {
  statusCode: number;
  message: string;
  data: Product[];
  error: string | null;
};
// ==============================================================

export type News = {
  id: number;
  title: string;
  content: string;
  imgurl: string;
};
export type NewsResponse = {
  statusCode: number;
  message: string;
  data: News[];
  error: string | null;
};
// ==============================================================

export type RefreshTokensResponse = {
  user: User;
  accessToken: string;
};

export type MainpageProps = {
  getAllProduct: () => Promise<void>;
  product: Product[];
};

export type RegistrationProps = {
  setUser: (user: UserState) => void;
};

export type FormData = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type ServerResponseType<DataType> = {
  statusCode: number;
  message: string;
  data: DataType | null;
  error: string | null;
};
// ===============================================================
export type CartItem = {
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Product: Product; // вложенный объект продукта
};
export type CartResponse = {
  statusCode: number;
  message: string;
  data: CartItem[] | null;
  error: string | null;
};
// ===============================================================
export type OrderItem = {
  productId: number;
  title: string;
  imgurl: string;
  price: number;
};

export type Order = {
  id: number;
  userId: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};
