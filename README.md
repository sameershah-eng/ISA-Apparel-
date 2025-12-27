
# ISA Apparel - Database Population Guide

To initialize the ISA Bespoke ecosystem, execute the following SQL in your Supabase SQL Editor. This script populates the Fabric Archive, Customization Engine, and a 100-item high-end catalog.

```sql
-- 1. CLEAN SLATE
TRUNCATE bespoke_order_details, user_measurements, customization_options, fabrics, product_variants, product_images, products, categories CASCADE;

-- 2. CATEGORIES
INSERT INTO categories (id, name) VALUES 
('c1000000-0000-0000-0000-000000000001', 'Dress Pant'),
('c1000000-0000-0000-0000-000000000002', 'Chino'),
('c1000000-0000-0000-0000-000000000003', 'Bespoke'),
('c1000000-0000-0000-0000-000000000004', 'Accessories');

-- 3. FABRIC ARCHIVE (Textile Inventory)
INSERT INTO fabrics (name, material, weight_gsm, weave, color_name, color_hex, price_multiplier, stock_meters) VALUES
('S150 Merino Archive', '100% Italian Merino Wool', 280, 'Twill', 'Midnight Navy', '#2C3468', 1.80, 500),
('Irish Heritage Linen', '100% Pure Linen', 320, 'Plain Weave', 'Natural Ecru', '#F5F5DC', 1.40, 300),
('Sea Island Cotton', '100% Sea Island Cotton', 240, 'Gabardine', 'Deep Black', '#000000', 1.60, 450),
('Venetian Cashmere-Wool', '90% Wool, 10% Cashmere', 310, 'Satin Weave', 'Charcoal Grey', '#36454F', 2.20, 200),
('English Calvary Twill', '100% Heavy Cotton', 420, 'Twisted Twill', 'British Tan', '#D2B48C', 1.20, 400);

-- 4. CUSTOMIZATION OPTIONS (The Engine)
INSERT INTO customization_options (category, option_name, added_cost, is_default) VALUES
('Pleats', 'Flat Front', 0.00, TRUE),
('Pleats', 'Single Pleat', 25.00, FALSE),
('Pleats', 'Double Pleat', 45.00, FALSE),
('Pockets', 'Slant Pockets', 0.00, TRUE),
('Pockets', 'On-Seam Pockets', 15.00, FALSE),
('Pockets', 'Watch Pocket', 20.00, FALSE),
('Waistband', 'Belt Loops', 0.00, TRUE),
('Waistband', 'Side Adjusters', 55.00, FALSE),
('Waistband', 'Extended Tab', 30.00, FALSE),
('Cuffs', 'Plain Hem', 0.00, TRUE),
('Cuffs', '1.5" Cuffed', 20.00, FALSE),
('Cuffs', '2" Cuffed', 25.00, FALSE);

-- 5. SAMPLE MEASUREMENT PROFILE
INSERT INTO user_measurements (profile_name, waist_circ, hip_circ, inseam, outseam, thigh_circ, knee_circ, ankle_opening, is_verified) VALUES
('Standard Fit - UK 34', 86.5, 102.0, 81.0, 108.5, 62.0, 44.0, 19.5, TRUE);

-- 6. DYNAMIC 100-ITEM CATALOG GENERATOR
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
        -- Distribute categories (Bespoke every 5th item)
        IF i % 5 = 0 THEN
           cat_id := 'c1000000-0000-0000-0000-000000000003'; -- Bespoke
        ELSE
           SELECT id INTO cat_id FROM categories WHERE id != 'c1000000-0000-0000-0000-000000000003' ORDER BY random() LIMIT 1;
        END IF;

        -- Insert Product
        INSERT INTO products (slug, title, price, description, long_description, stock, category_id)
        VALUES (
            lower(titles[(i % 10) + 1] || '-' || fabrics[(i % 8) + 1] || '-' || i),
            titles[(i % 10) + 1] || ' ' || styles[(i % 6) + 1] || ' (No. ' || i || ')',
            (random() * (750 - 220) + 220)::numeric(10,2),
            'Archival ' || fabrics[(i % 8) + 1] || ' ' || styles[(i % 6) + 1] || '.',
            'A master-cut ' || styles[(i % 6) + 1] || ' featuring high-rise architecture and hand-stitched detailing.',
            floor(random() * 20 + 5),
            cat_id
        ) RETURNING id INTO prod_id;

        -- Insert Images
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
