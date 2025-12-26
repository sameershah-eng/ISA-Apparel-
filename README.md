# ISA - Premium Apparel Management

## 1. Database Population (100 Items)
Run this SQL in your Supabase SQL Editor to populate the catalog. This script generates high-end trousers with realistic pricing and inventory levels.

```sql
DO $$
DECLARE
    cat_id uuid;
    prod_id uuid;
    i integer;
    titles text[] := ARRAY['Aristocrat', 'Regency', 'Highlands', 'Savile', 'Metropolitan', 'Riviera', 'Oxford', 'Cambridge', 'Diplomat', 'Statesman'];
    fabrics text[] := ARRAY['Merino Wool', 'Cashmere Blend', 'Heavy Cotton Drill', 'Egyptian Linen', 'Technical Twill', 'Silk Wool', 'Brushed Flannel', 'Summer Corduroy'];
    styles text[] := ARRAY['Trouser', 'Chino', 'Pleated Pant', 'Commuter Pant', 'Evening Slack', 'Atelier Edition'];
    img_ids text[] := ARRAY['1594932224030-9455144cced3', '1624372927050-12484ec669b2', '1506630448388-4e683c67ddb0', '1593032465175-481ac7f401a0', '1539109136881-3be0616acf4b', '1541099649105-f69ad21f3246'];
BEGIN
    FOR i IN 1..100 LOOP
        -- Select a random category
        SELECT id INTO cat_id FROM categories ORDER BY random() LIMIT 1;
        
        -- Insert the product
        INSERT INTO products (slug, title, price, description, long_description, stock, category_id)
        VALUES (
            lower(titles[(i % 10) + 1] || '-' || fabrics[(i % 8) + 1] || '-' || i),
            titles[(i % 10) + 1] || ' ' || styles[(i % 6) + 1] || ' (No. ' || i || ')',
            (random() * (650 - 185) + 185)::numeric(10,2),
            'Hand-finished ' || fabrics[(i % 8) + 1] || ' ' || styles[(i % 6) + 1] || '.',
            'Part of our ' || titles[(i % 10) + 1] || ' collection. Premium tailoring.',
            floor(random() * 25 + 2),
            cat_id
        ) RETURNING id INTO prod_id;
        
        -- Insert Images (ORDER: product_id, url, sort_order)
        INSERT INTO product_images (product_id, url, sort_order)
        VALUES 
            (prod_id, 'https://images.unsplash.com/photo-' || img_ids[(i % 6) + 1] || '?auto=format&fit=crop&w=800&q=80', 0),
            (prod_id, 'https://images.unsplash.com/photo-' || img_ids[((i+1) % 6) + 1] || '?auto=format&fit=crop&w=800&q=80', 1);
            
        -- Insert Variants
        INSERT INTO product_variants (product_id, size, color_name, color_hex, stock)
        VALUES 
            (prod_id, '32', 'Midnight', '#2C3468', 5), 
            (prod_id, '34', 'Midnight', '#2C3468', 5),
            (prod_id, '36', 'Midnight', '#2C3468', 5);
    END LOOP;
END $$;
```

## 2. Dynamic Features
- **Pagination**: The Shop view now automatically paginates items (12 per page) to ensure smooth scrolling with 100+ items.
- **Search**: Real-time fuzzy search works across titles, categories, and fabric descriptions.
- **Price Filter**: Range slider allowing clients to narrow down by budget.
- **Live Inventory**: "Limited Availability" badges appear dynamically when a product's database stock falls below 5.
