
-- Enable realtime for products and product_stores tables
alter publication supabase_realtime add table products, product_stores;

-- Set replica identity to full for both tables to ensure we get complete row data
alter table products replica identity full;
alter table product_stores replica identity full;
