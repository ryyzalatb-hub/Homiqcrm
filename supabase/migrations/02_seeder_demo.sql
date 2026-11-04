-- ========================================================================
-- SEEDER DATA DEMO: GARUT SEJAHTERA PROPERTY
-- Spesifikasi Demo: 3 Proyek, 75 Unit (65 Available, 7 Booked, 3 Sold), 30 Pelanggan, 45 Leads
-- ========================================================================

-- Insert Plan Master
INSERT INTO public.subscription_plans (id, code, name, monthly_price, yearly_price, max_users, max_projects, max_units)
VALUES 
('11111111-1111-1111-1111-111111111111', 'starter', 'Starter', 99000, 990000, 5, 2, 60),
('22222222-2222-2222-2222-222222222222', 'business', 'Business', 249000, 2490000, 15, 5, 250),
('33333333-3333-3333-3333-333333333333', 'professional', 'Professional', 499000, 4990000, 40, 15, 1000);

-- Insert Demo Tenant
INSERT INTO public.tenants (id, name, slug, region, address, phone, is_demo, subscription_status, plan_id)
VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Garut Sejahtera Property (DEMO)',
    'garut-sejahtera-property',
    'Kabupaten Garut',
    'Jl. Cimanuk No. 88, Tarogong Kidul, Garut',
    '081234567890',
    true,
    'active',
    '22222222-2222-2222-2222-222222222222'
);

-- Insert 5 Marketing Profiles + 1 Owner
INSERT INTO public.profiles (id, tenant_id, full_name, email, phone, role, monthly_sales_target)
VALUES 
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Pak Hendra Gunawan', 'owner@garutsejahtera.demo', '081122334401', 'owner', 2000000000),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Teh Rina Melani', 'manager@garutsejahtera.demo', '081122334402', 'marketing_manager', 1500000000),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb03', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Kang Dika Pratama', 'dika@garutsejahtera.demo', '081122334403', 'marketing_staff', 500000000),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb04', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Kang Fajar Ramadhan', 'fajar@garutsejahtera.demo', '081122334404', 'marketing_staff', 500000000),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb05', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Teh Nisa Andriani', 'nisa@garutsejahtera.demo', '081122334405', 'marketing_staff', 500000000);

-- Insert 3 Proyek Perumahan Garut
INSERT INTO public.projects (id, tenant_id, name, location, city, description, facilities)
VALUES 
('cccccccc-cccc-cccc-cccc-cccccccccc01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bumi Cimanuk Asri', 'Tarogong Kidul', 'Garut', 'Hunian subsidi strategis 5 menit dari pusat Pemda Garut.', ARRAY['Masjid Al-Ikhlas', 'Taman Bermain', 'One Gate System', 'CCTV 24 Jam']),
('cccccccc-cccc-cccc-cccc-cccccccccc02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Grand Karangpawitan Residence', 'Karangpawitan', 'Garut', 'Perumahan komersial modern view perbukitan asri bebas banjir.', ARRAY['Masjid Jami', 'Row Jalan 8 Meter', 'Security 24 Jam', 'Playground']),
('cccccccc-cccc-cccc-cccc-cccccccccc03', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Banyuresmi Hillside', 'Banyuresmi', 'Garut', 'Hunian asri keluarga muda dekat kawasan wisata Situ Bagendit.', ARRAY['Taman Tematik', 'Jogging Track', 'Musholla']);

-- Insert Tipe Rumah
INSERT INTO public.unit_types (id, tenant_id, project_id, name, land_area, building_area, base_price, specifications)
VALUES 
('dddddddd-dddd-dddd-dddd-dddddddddd01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccc01', 'Tipe 36/60 (Subsidi FLPP)', 60, 36, 166000000, 'Rangka atap baja ringan, genteng metal pasir, bata merah diplester aci, keramik 40x40.'),
('dddddddd-dddd-dddd-dddd-dddddddddd02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccc02', 'Tipe 45/72 (Komersial Minimalis)', 72, 45, 345000000, 'Dinding bata ringan, granit 60x60, sanitary Toto, carport rabat beton, kusen aluminium.'),
('dddddddd-dddd-dddd-dddd-dddddddddd03', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccc03', 'Tipe 54/84 (Komersial Premium)', 84, 54, 485000000, 'Desain mezzanine modern, 3 kamar tidur, lantai granit, plafon gypsum tinggi 3.8m.');

-- Masukkan 75 Unit (Bumi Cimanuk Asri 30 Unit, Grand Karangpawitan 25 Unit, Banyuresmi 20 Unit)
-- Status: 66 Available, 6 Booked, 3 Sold (Total = 75)
DO $$
DECLARE
    i INT;
    u_status unit_status;
BEGIN
    -- Proyek 1: Bumi Cimanuk (30 unit: A01 - A30)
    FOR i IN 1..30 LOOP
        IF i <= 2 THEN u_status := 'sold';
        ELSIF i <= 5 THEN u_status := 'booked';
        ELSE u_status := 'available';
        END IF;

        INSERT INTO public.units (tenant_id, project_id, unit_type_id, unit_code, land_area, building_area, price, status)
        VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccc01', 'dddddddd-dddd-dddd-dddd-dddddddddd01', 'Blok A-' || LPAD(i::text, 2, '0'), 60, 36, 166000000, u_status);
    END LOOP;

    -- Proyek 2: Grand Karangpawitan (25 unit: B01 - B25)
    FOR i IN 1..25 LOOP
        IF i = 1 THEN u_status := 'sold';
        ELSIF i <= 4 THEN u_status := 'booked';
        ELSE u_status := 'available';
        END IF;

        INSERT INTO public.units (tenant_id, project_id, unit_type_id, unit_code, land_area, building_area, price, status)
        VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccc02', 'dddddddd-dddd-dddd-dddd-dddddddddd02', 'Blok B-' || LPAD(i::text, 2, '0'), 72, 45, 345000000, u_status);
    END LOOP;

    -- Proyek 3: Banyuresmi Hillside (20 unit: C01 - C20)
    FOR i IN 1..20 LOOP
        IF i = 1 THEN u_status := 'booked';
        ELSE u_status := 'available';
        END IF;

        INSERT INTO public.units (tenant_id, project_id, unit_type_id, unit_code, land_area, building_area, price, status)
        VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccc03', 'dddddddd-dddd-dddd-dddd-dddddddddd03', 'Blok C-' || LPAD(i::text, 2, '0'), 84, 54, 485000000, u_status);
    END LOOP;
END $$;
