
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number | null;
  rating: number;
  image_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface ProductStore {
  id: string;
  product_id: string;
  store_name: string;
  store_price: number;
  store_url: string;
  in_stock: boolean;
  created_at: string;
}

export const ProductService = {
  async getProducts({ limit = 10, offset = 0, category = null }): Promise<Product[]> {
    let query = supabase.from('products' as any).select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
      
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data as Product[];
  },
  
  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products' as any)
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }
    
    return data as Product;
  },
  
  async getProductStores(productId: string): Promise<ProductStore[]> {
    const { data, error } = await supabase
      .from('product_stores' as any)
      .select('*')
      .eq('product_id', productId)
      .order('store_price', { ascending: true });
      
    if (error) {
      console.error('Error fetching product stores:', error);
      return [];
    }
    
    return data as ProductStore[];
  }
};
