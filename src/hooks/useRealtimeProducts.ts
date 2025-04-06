import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductStore } from '@/services/ProductService';

// Enable realtime subscriptions for the tables
const enableRealtimeForTables = async () => {
  await supabase
    .channel('schema-db-changes')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'products' 
    }, (payload) => {
      console.log('Change received on products!', payload);
    })
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'product_stores' 
    }, (payload) => {
      console.log('Change received on product_stores!', payload);
    })
    .subscribe();
};

export const useRealtimeProducts = (productId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<ProductStore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enable realtime
    enableRealtimeForTables();
    
    // Fetch initial data
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // If we have a specific product ID, just fetch that one
        if (productId) {
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();
            
          if (productError) throw productError;
          setProducts(product ? [product] : []);
          
          const { data: storeData, error: storeError } = await supabase
            .from('product_stores')
            .select('*')
            .eq('product_id', productId);
            
          if (storeError) throw storeError;
          setStores(storeData || []);
        } 
        // Otherwise fetch all products
        else {
          const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (productsError) throw productsError;
          setProducts(productsData || []);
          
          // Only fetch stores if we have products
          if (productsData && productsData.length > 0) {
            const productIds = productsData.map(p => p.id);
            const { data: storeData, error: storeError } = await supabase
              .from('product_stores')
              .select('*')
              .in('product_id', productIds);
              
            if (storeError) throw storeError;
            setStores(storeData || []);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('realtime-products')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'products',
        ...(productId ? { filter: `id=eq.${productId}` } : {})
      }, (payload) => {
        console.log('Product change received:', payload);
        
        // Handle different database events
        if (payload.eventType === 'INSERT') {
          setProducts(prev => [...prev, payload.new as Product]);
        } else if (payload.eventType === 'UPDATE') {
          setProducts(prev => prev.map(p => p.id === payload.new.id ? payload.new as Product : p));
        } else if (payload.eventType === 'DELETE') {
          setProducts(prev => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'product_stores',
        ...(productId ? { filter: `product_id=eq.${productId}` } : {})
      }, (payload) => {
        console.log('Store change received:', payload);
        
        // Handle different database events
        if (payload.eventType === 'INSERT') {
          setStores(prev => [...prev, payload.new as ProductStore]);
        } else if (payload.eventType === 'UPDATE') {
          setStores(prev => prev.map(s => s.id === payload.new.id ? payload.new as ProductStore : s));
        } else if (payload.eventType === 'DELETE') {
          setStores(prev => prev.filter(s => s.id !== payload.old.id));
        }
      })
      .subscribe();
      
    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId]);

  // Helper function to get stores for a specific product
  const getStoresForProduct = (id: string) => {
    return stores.filter(store => store.product_id === id);
  };

  return {
    products,
    stores,
    getStoresForProduct,
    loading,
  };
};
