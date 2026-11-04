-- ========================================================================
-- HOMIQ — SMART PROPERTY CRM
-- Database Migration Schema: PostgreSQL + Supabase Multi-Tenant SaaS
-- ========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS DEFINITIONS
CREATE TYPE user_role AS ENUM (
    'super_admin',
    'owner',
    'company_admin',
    'marketing_manager',
    'marketing_staff'
);

CREATE TYPE subscription_status AS ENUM (
    'trial',
    'active',
    'expired',
    'suspended'
);

CREATE TYPE lead_priority AS ENUM (
    'low',
    'medium',
    'high'
);

CREATE TYPE lead_status AS ENUM (
    'new_lead',
    'contacted',
    'interested',
    'site_visit',
    'negotiation',
    'booking',
    'closing',
    'lost'
);

CREATE TYPE unit_status AS ENUM (
    'available',
    'booked',
    'sold'
);

CREATE TYPE follow_up_status AS ENUM (
    'pending',
    'completed',
    'missed',
    'rescheduled'
);

CREATE TYPE site_visit_status AS ENUM (
    'scheduled',
    'completed',
    'rescheduled',
    'cancelled'
);

CREATE TYPE payment_method AS ENUM (
    'kpr_subsidi',
    'kpr_komersial',
    'cash_keras',
    'cash_bertahap'
);

CREATE TYPE booking_payment_status AS ENUM (
    'pending',
    'partial',
    'paid',
    'refunded',
    'cancelled'
);

CREATE TYPE akad_status AS ENUM (
    'belum_akad',
    'pemberkasan',
    'proses_bank',
    'sudah_akad',
    'batal'
);

-- 2. SUBSCRIPTION PLANS
CREATE TABLE public.subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    monthly_price NUMERIC(15, 2) NOT NULL,
    yearly_price NUMERIC(15, 2) NOT NULL,
    max_users INT NOT NULL,
    max_projects INT NOT NULL,
    max_units INT NOT NULL,
    features_json JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TENANTS (ORGANISASI / DEVELOPER)
CREATE TABLE public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    region VARCHAR(100) DEFAULT 'Kabupaten Garut',
    address TEXT,
    phone VARCHAR(30),
    logo_url TEXT,
    is_demo BOOLEAN DEFAULT false,
    subscription_status subscription_status DEFAULT 'trial',
    plan_id UUID REFERENCES public.subscription_plans(id),
    trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
    subscription_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROFILES (USERS & ROLES)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY, -- Terhubung langsung dengan auth.users.id
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    role user_role NOT NULL DEFAULT 'marketing_staff',
    is_active BOOLEAN DEFAULT true,
    monthly_sales_target NUMERIC(15, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECTS (PROYEK PERUMAHAN)
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    city VARCHAR(100) DEFAULT 'Garut',
    description TEXT,
    facilities TEXT[] DEFAULT ARRAY[]::TEXT[],
    cover_image_url TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. UNIT TYPES (TIPE RUMAH)
CREATE TABLE public.unit_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- e.g. Tipe 36/60, Tipe 45/72
    land_area NUMERIC(8, 2) NOT NULL,
    building_area NUMERIC(8, 2) NOT NULL,
    base_price NUMERIC(15, 2) NOT NULL,
    specifications TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. UNITS (KAVLING / BLOK UNIT RUMAH)
CREATE TABLE public.units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    unit_type_id UUID NOT NULL REFERENCES public.unit_types(id) ON DELETE CASCADE,
    unit_code VARCHAR(50) NOT NULL, -- e.g. Blok A-01
    land_area NUMERIC(8, 2) NOT NULL,
    building_area NUMERIC(8, 2) NOT NULL,
    price NUMERIC(15, 2) NOT NULL,
    specifications TEXT,
    status unit_status NOT NULL DEFAULT 'available',
    version INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_tenant_project_unit UNIQUE (tenant_id, project_id, unit_code)
);

-- 8. CUSTOMERS (DIREKTORI PELANGGAN)
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    whatsapp_number VARCHAR(30) NOT NULL,
    normalized_phone VARCHAR(30) NOT NULL,
    address TEXT,
    occupation VARCHAR(100),
    budget_min NUMERIC(15, 2),
    budget_max NUMERIC(15, 2),
    housing_preference TEXT,
    info_source VARCHAR(100),
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_tenant_customer_phone UNIQUE (tenant_id, normalized_phone)
);

-- 9. LEADS (CALON PEMBELI)
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    normalized_phone VARCHAR(30) NOT NULL,
    source VARCHAR(100) DEFAULT 'Meta Ads',
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    interested_project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    budget NUMERIC(15, 2),
    priority lead_priority DEFAULT 'medium',
    status lead_status NOT NULL DEFAULT 'new_lead',
    lost_reason TEXT,
    last_contacted_at TIMESTAMPTZ,
    next_follow_up_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_tenant_lead_phone UNIQUE (tenant_id, normalized_phone)
);

-- 10. LEAD STATUS HISTORIES
CREATE TABLE public.lead_status_histories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    previous_status lead_status,
    new_status lead_status NOT NULL,
    changed_by UUID REFERENCES public.profiles(id),
    notes TEXT,
    changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. FOLLOW UPS (SMART FOLLOW-UP ENGINE)
CREATE TABLE public.follow_ups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    assigned_to UUID NOT NULL REFERENCES public.profiles(id),
    scheduled_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    status follow_up_status DEFAULT 'pending',
    channel VARCHAR(50) DEFAULT 'WhatsApp',
    communication_notes TEXT,
    next_follow_up_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. SITE VISITS (SURVEI LOKASI)
CREATE TABLE public.site_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id),
    project_id UUID NOT NULL REFERENCES public.projects(id),
    marketing_id UUID NOT NULL REFERENCES public.profiles(id),
    visit_datetime TIMESTAMPTZ NOT NULL,
    status site_visit_status DEFAULT 'scheduled',
    result_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. BOOKINGS & TRANSACTIONS
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    booking_code VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES public.customers(id),
    lead_id UUID REFERENCES public.leads(id),
    project_id UUID NOT NULL REFERENCES public.projects(id),
    unit_id UUID NOT NULL REFERENCES public.units(id),
    marketing_id UUID NOT NULL REFERENCES public.profiles(id),
    unit_price_at_booking NUMERIC(15, 2) NOT NULL,
    booking_fee NUMERIC(15, 2) NOT NULL,
    dp_amount NUMERIC(15, 2) DEFAULT 0,
    payment_method payment_method DEFAULT 'kpr_subsidi',
    payment_status booking_payment_status DEFAULT 'pending',
    akad_status akad_status DEFAULT 'belum_akad',
    booked_at TIMESTAMPTZ DEFAULT NOW(),
    akad_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. BOOKING PAYMENTS
CREATE TABLE public.booking_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    payment_type VARCHAR(50) NOT NULL, -- booking_fee, dp, pelunasan
    amount NUMERIC(15, 2) NOT NULL,
    payment_date DATE DEFAULT CURRENT_DATE,
    reference_note TEXT,
    recorded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. WHATSAPP TEMPLATES
CREATE TABLE public.whatsapp_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    message_body TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. NOTIFICATIONS & AUDIT LOGS
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id),
    actor_role user_role,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    action VARCHAR(50) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================
-- POSTGRESQL FUNCTIONS & ROW LEVEL SECURITY (RLS)
-- ========================================================================

-- Helper Functions
CREATE OR REPLACE FUNCTION public.current_user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- TRANSACTIONAL STORED PROCEDURE: ANTI DOUBLE-BOOKING UNIT
CREATE OR REPLACE FUNCTION public.create_unit_booking_tx(
    p_tenant_id UUID,
    p_booking_code VARCHAR,
    p_customer_id UUID,
    p_lead_id UUID,
    p_project_id UUID,
    p_unit_id UUID,
    p_marketing_id UUID,
    p_unit_price NUMERIC,
    p_booking_fee NUMERIC,
    p_dp_amount NUMERIC,
    p_payment_method payment_method,
    p_notes TEXT
)
RETURNS UUID AS $$
DECLARE
    v_unit_status unit_status;
    v_booking_id UUID;
BEGIN
    -- 1. Kunci baris unit dengan SELECT ... FOR UPDATE (Atomic Row-Locking)
    SELECT status INTO v_unit_status
    FROM public.units
    WHERE id = p_unit_id AND tenant_id = p_tenant_id
    FOR UPDATE;

    -- 2. Validasi ketersediaan unit
    IF v_unit_status IS NULL THEN
        RAISE EXCEPTION 'UNIT_NOT_FOUND: Unit kavling tidak ditemukan.';
    END IF;

    IF v_unit_status != 'available' THEN
        RAISE EXCEPTION 'UNIT_NOT_AVAILABLE: Unit ini sudah di-booking atau terjual oleh transaksi lain.';
    END IF;

    -- 3. Masukkan transaksi booking
    INSERT INTO public.bookings (
        tenant_id, booking_code, customer_id, lead_id, project_id, unit_id,
        marketing_id, unit_price_at_booking, booking_fee, dp_amount,
        payment_method, payment_status, akad_status, notes
    ) VALUES (
        p_tenant_id, p_booking_code, p_customer_id, p_lead_id, p_project_id, p_unit_id,
        p_marketing_id, p_unit_price, p_booking_fee, p_dp_amount,
        p_payment_method, 'pending', 'belum_akad', p_notes
    ) RETURNING id INTO v_booking_id;

    -- 4. Kunci status unit menjadi 'booked'
    UPDATE public.units
    SET status = 'booked', version = version + 1
    WHERE id = p_unit_id AND tenant_id = p_tenant_id;

    -- 5. Jika ada lead terkait, perbarui status lead menjadi 'booking'
    IF p_lead_id IS NOT NULL THEN
        UPDATE public.leads
        SET status = 'booking', last_contacted_at = NOW()
        WHERE id = p_lead_id AND tenant_id = p_tenant_id;

        INSERT INTO public.lead_status_histories (
            tenant_id, lead_id, previous_status, new_status, changed_by, notes
        ) VALUES (
            p_tenant_id, p_lead_id, 'negotiation', 'booking', p_marketing_id, 'Booking unit resmi tercatat: ' || p_booking_code
        );
    END IF;

    -- 6. Catat ke audit log
    INSERT INTO public.audit_logs (
        tenant_id, actor_id, actor_role, entity_type, entity_id, action, new_values
    ) VALUES (
        p_tenant_id, p_marketing_id, 'marketing_staff', 'booking', v_booking_id, 'CREATE_BOOKING',
        jsonb_build_object('unit_id', p_unit_id, 'code', p_booking_code, 'fee', p_booking_fee)
    );

    RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
