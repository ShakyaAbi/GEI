--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS '';


--
-- Name: MediaType; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."MediaType" AS ENUM (
    'image',
    'document'
);


ALTER TYPE public."MediaType" OWNER TO admin;

--
-- Name: ProjectStatus; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."ProjectStatus" AS ENUM (
    'active',
    'completed',
    'on_hold',
    'cancelled'
);


ALTER TYPE public."ProjectStatus" OWNER TO admin;

--
-- Name: StakeholderType; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."StakeholderType" AS ENUM (
    'team_member',
    'partner',
    'beneficiary'
);


ALTER TYPE public."StakeholderType" OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.admins (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.admins OWNER TO admin;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.authors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text,
    affiliation text,
    bio text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.authors OWNER TO admin;

--
-- Name: faculty; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.faculty (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    title text NOT NULL,
    department text,
    image text,
    specialization text,
    email text,
    publications integer,
    awards integer,
    linkedin_url text,
    google_scholar_url text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.faculty OWNER TO admin;

--
-- Name: globe_data; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.globe_data (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    latitude numeric(10,8) NOT NULL,
    longitude numeric(11,8) NOT NULL,
    category character varying(100),
    color character varying(7) DEFAULT '#0066cc'::character varying,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.globe_data OWNER TO admin;

--
-- Name: globe_data_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.globe_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.globe_data_id_seq OWNER TO admin;

--
-- Name: globe_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.globe_data_id_seq OWNED BY public.globe_data.id;


--
-- Name: program_area_features; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.program_area_features (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "programAreaId" uuid NOT NULL,
    title text NOT NULL,
    subtitle text,
    description text,
    image text,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.program_area_features OWNER TO admin;

--
-- Name: program_area_partners; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.program_area_partners (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    program_area_id uuid NOT NULL,
    name text NOT NULL,
    logo text,
    website text,
    description text,
    order_index integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.program_area_partners OWNER TO admin;

--
-- Name: program_area_team_members; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.program_area_team_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    program_area_id uuid NOT NULL,
    name text NOT NULL,
    title text,
    role text,
    image text,
    email text,
    bio text,
    order_index integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.program_area_team_members OWNER TO admin;

--
-- Name: program_areas; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.program_areas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    hero_image text,
    seo_title text,
    seo_description text,
    order_index integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    icon text
);


ALTER TABLE public.program_areas OWNER TO admin;

--
-- Name: project_content; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    content_type text NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    is_published boolean DEFAULT true NOT NULL,
    author text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.project_content OWNER TO admin;

--
-- Name: project_custom_fields; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project_custom_fields (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    field_name text NOT NULL,
    field_value text NOT NULL,
    field_type text DEFAULT 'text'::text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.project_custom_fields OWNER TO admin;

--
-- Name: project_media; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project_media (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    file_url text NOT NULL,
    file_type public."MediaType" NOT NULL,
    file_name text,
    file_size integer,
    caption text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.project_media OWNER TO admin;

--
-- Name: project_stakeholders; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project_stakeholders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    organization text,
    role text,
    type public."StakeholderType" DEFAULT 'team_member'::public."StakeholderType" NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.project_stakeholders OWNER TO admin;

--
-- Name: project_updates; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.project_updates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    update_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    milestone boolean DEFAULT false NOT NULL,
    created_by uuid,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.project_updates OWNER TO admin;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    program_area_id uuid,
    title text NOT NULL,
    description text,
    location text,
    duration text,
    status public."ProjectStatus" DEFAULT 'active'::public."ProjectStatus" NOT NULL,
    budget text,
    beneficiaries text,
    impact_metrics text[],
    image text,
    hero_image text,
    order_index integer DEFAULT 0 NOT NULL,
    start_date date,
    end_date date,
    slug text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    overview text
);


ALTER TABLE public.projects OWNER TO admin;

--
-- Name: publication_authors; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.publication_authors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    publication_id uuid NOT NULL,
    author_id uuid NOT NULL,
    author_order integer DEFAULT 1 NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.publication_authors OWNER TO admin;

--
-- Name: publications; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.publications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    abstract text,
    journal text,
    publication_year integer,
    publication_type text DEFAULT 'Journal Article'::text NOT NULL,
    doi text,
    pdf_url text,
    citations integer DEFAULT 0 NOT NULL,
    category_id uuid,
    is_featured boolean DEFAULT false NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.publications OWNER TO admin;

--
-- Name: report_files; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.report_files (
    id integer NOT NULL,
    report_id integer,
    filename character varying(255) NOT NULL,
    original_name character varying(255) NOT NULL,
    file_path character varying(500) NOT NULL,
    file_size integer,
    mime_type character varying(100),
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.report_files OWNER TO admin;

--
-- Name: report_files_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.report_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.report_files_id_seq OWNER TO admin;

--
-- Name: report_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.report_files_id_seq OWNED BY public.report_files.id;


--
-- Name: report_photos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.report_photos (
    id integer NOT NULL,
    report_id integer,
    filename character varying(255) NOT NULL,
    original_name character varying(255) NOT NULL,
    file_path character varying(500) NOT NULL,
    alt_text character varying(255),
    sort_order integer DEFAULT 0,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.report_photos OWNER TO admin;

--
-- Name: report_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.report_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.report_photos_id_seq OWNER TO admin;

--
-- Name: report_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.report_photos_id_seq OWNED BY public.report_photos.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    upload_date timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    published boolean DEFAULT false,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.reports OWNER TO admin;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO admin;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: research_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.research_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.research_categories OWNER TO admin;

--
-- Name: stories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.stories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    excerpt text,
    content text NOT NULL,
    image text,
    category text,
    author text,
    read_time text,
    featured boolean DEFAULT false NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.stories OWNER TO admin;

--
-- Name: timeline_events; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.timeline_events (
    id integer NOT NULL,
    year integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.timeline_events OWNER TO admin;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.timeline_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.timeline_events_id_seq OWNER TO admin;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.timeline_events_id_seq OWNED BY public.timeline_events.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    role text DEFAULT 'user'::text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: globe_data id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.globe_data ALTER COLUMN id SET DEFAULT nextval('public.globe_data_id_seq'::regclass);


--
-- Name: report_files id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.report_files ALTER COLUMN id SET DEFAULT nextval('public.report_files_id_seq'::regclass);


--
-- Name: report_photos id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.report_photos ALTER COLUMN id SET DEFAULT nextval('public.report_photos_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: timeline_events id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.timeline_events ALTER COLUMN id SET DEFAULT nextval('public.timeline_events_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3e04099f-42d9-46dd-8485-918ff1c05590	72d0a5ad43215a4452fdb827afb2c10d18f70df58e7e89eca3ba96bb96dfae31	2025-07-04 11:48:47.764425+00	20250630081342_init	\N	\N	2025-07-04 11:48:47.471612+00	1
a66d5a74-51cb-430c-9686-97d731546c59	fd5f62a3a8a885e4c72d971b836a64fe8abf8b8ca657ba43190f69dcfc50a8e6	2025-07-04 11:48:47.789977+00	20250630172327_add_project_content_relation	\N	\N	2025-07-04 11:48:47.767709+00	1
2edc31e2-7456-4fff-82ec-7eca3c875b13	bc709cad37a846c033b6de6d49cd455a49753e0951361b493eb12f53395e741f	2025-07-04 11:48:47.820242+00	20250703091755_geisql	\N	\N	2025-07-04 11:48:47.793495+00	1
466d6eee-b733-4204-bf64-feb2cfff37a1	f6a6ac3dd2ca67bfe13339068b57f5d9cf40f9000a3aa06ed6632b27a99f14c1	2025-07-10 18:05:04.6475+00	20250710180504_add_program_area_features_and_icon	\N	\N	2025-07-10 18:05:04.614953+00	1
795abcb2-0625-4e9c-99b0-b487766422a5	b74e7b4f952a06bc4bb7f4a1126731b0dbca02bf86d2ee00d510e4d71de1ea88	2025-07-11 15:50:51.440018+00	20250711155051_add_stories_and_admin	\N	\N	2025-07-11 15:50:51.372339+00	1
53f94a2a-7b36-4103-a89c-df8b6093d463	fdb97ac8d3890286fd9a7a45683cc8ff07340870d2d02b14d1ee6577215130db	2025-07-12 14:45:31.957005+00	20250712144531_add_project_overview	\N	\N	2025-07-12 14:45:31.940006+00	1
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.admins (id, email, password, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.authors (id, name, email, affiliation, bio, created_at) FROM stdin;
44063507-c244-42c2-b6b7-bfe9c3fbdc67	Dr. Bernhard Fassl	bernhard.fassl@gei.org	Global Environmental and Health Initiative	Founder of GEI and expert in global pediatric care, health system strengthening, and climate-health integration. Leads initiatives in hospital capacity building and medical innovation.	2025-07-04 11:49:39.49+00
e99132dc-a2ac-4bc7-bd3b-0b33a2df5dc7	Dr. Allison Judkins	allison.judkins@gei.org	GEI Research Department	Head of Research at GEI, specializing in health equity, monitoring and evaluation, and evidence-based systems design for maternal and newborn health.	2025-07-04 11:49:39.495+00
994ca512-687b-4ff8-ac23-a1da3f6e147f	Rabin Nepal	rabin.nepal@gei.org	GEI Public Health Division	GEI Public Health Manager in Nepal, leading community-based assessments, anemia prevention programs, and maternal health capacity building.	2025-07-04 11:49:39.498+00
23d75935-4350-4bc7-8e73-e907330b7d9d	Bibek Lamichhane	bibek.lamichhane@gei.org	GEI Asia Regional Office	President of GEI Asia and Head of Public Health. Expert in health systems, rural care access, and training program cascades in South Asia.	2025-07-04 11:49:39.501+00
9fb7ec1f-29e7-4929-879f-6b9b64ee70eb	Suyog Shrestha	suyog.shrestha@gei.org	GEI Green Innovation Team	President of Green Job Creation, overseeing clean energy, permaculture, plastic reuse, and environmental technology pilots in Nepal.	2025-07-04 11:49:39.504+00
\.


--
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.faculty (id, name, title, department, image, specialization, email, publications, awards, linkedin_url, google_scholar_url, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: globe_data; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.globe_data (id, title, description, latitude, longitude, category, color, created_at) FROM stdin;
\.


--
-- Data for Name: program_area_features; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.program_area_features (id, "programAreaId", title, subtitle, description, image, "orderIndex", created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: program_area_partners; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.program_area_partners (id, program_area_id, name, logo, website, description, order_index, created_at) FROM stdin;
\.


--
-- Data for Name: program_area_team_members; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.program_area_team_members (id, program_area_id, name, title, role, image, email, bio, order_index, created_at) FROM stdin;
\.


--
-- Data for Name: program_areas; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.program_areas (id, name, slug, description, hero_image, seo_title, seo_description, order_index, created_at, updated_at, icon) FROM stdin;
d3e2222f-6b88-4723-90c0-4480d1abd03e	Sustainable Economic Development	economic-development	Creating community-based green businesses, promoting women-led cooperatives, eco-tourism, and permaculture in underserved regions.	/uploads/images/image-1751631658047-363224819.jpeg	Community Development & Livelihoods | GEI	Learn how GEI supports sustainable income generation, permaculture farming, and women’s economic empowerment.	0	2025-07-04 11:49:39.518+00	2025-07-04 11:49:39.518+00	\N
6cafc328-3a83-40a2-a852-bc0d135dca61	Environmental Sustainability & Green Innovation	environmental-green-tech	GEI pioneers clean technologies including water purification, air pollution mitigation, and waste recycling to improve environmental health.	/uploads/images/image-1751631722134-573693247.png	Environmental Innovation | GEI	Explore GEI’s innovations in water purification, air quality improvement, and sustainable waste management.	0	2025-07-04 11:49:39.508+00	2025-07-04 11:49:39.508+00	Globe
d6fd704c-ff63-4b38-b0c7-3b46863e43f7	Health Capacity Building	health-capacity	Improving maternal and child health through infrastructure upgrades, anemia management, safe delivery training, and diagnostics innovation.	/uploads/images/image-1751631666538-54233161.jpg	Maternal & Child Health Programs | GEI	Discover GEI’s maternal and child health programs, including nutrition, anemia prevention, and newborn care.	0	2025-07-04 11:49:39.514+00	2025-07-04 11:49:39.514+00	Zap
\.


--
-- Data for Name: project_content; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project_content (id, project_id, title, content, content_type, order_index, is_published, author, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: project_custom_fields; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project_custom_fields (id, project_id, field_name, field_value, field_type, created_at) FROM stdin;
\.


--
-- Data for Name: project_media; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project_media (id, project_id, file_url, file_type, file_name, file_size, caption, created_at) FROM stdin;
c64c6bc6-d101-4423-88fc-d5d6ad934733	53067a2b-95ad-426e-8f14-58f3ceefd75f	/uploads/images/file-1752431952996-559985462.jpg	image	3c3e009a-a356-407c-9058-efc3c37d7a78.jpg	372481	\N	2025-07-13 18:39:13.025+00
19fd828e-d449-46d6-a16f-3a3034b9269a	53067a2b-95ad-426e-8f14-58f3ceefd75f	/uploads/images/file-1752432006704-992558193.jpg	image	f23e85a4-70c5-4ed0-b64f-c5b8808af597.jpg	187303	\N	2025-07-13 18:40:06.721+00
7393ebf3-aadf-434d-bcda-0eb2a5de86cd	300d4521-361e-494e-910d-6612c2bf9702	/uploads/images/file-1752434314629-299527568.jpg	image	58fbd0ff-c9ba-4d45-83d6-0f0bf407942f.jpg	421551	\N	2025-07-13 19:18:34.678+00
cfb1eb44-d001-4740-a37b-8f60954e23c5	300d4521-361e-494e-910d-6612c2bf9702	/uploads/images/file-1752434431827-959184084.jpg	image	IMG_5618 (Medium).jpg	162620	\N	2025-07-13 19:20:31.882+00
11f3f5c4-fd9c-40ea-ba78-40b8fc9b3feb	300d4521-361e-494e-910d-6612c2bf9702	/uploads/images/file-1752434438902-628521454.jpg	image	5593a289-4e20-4f2c-bbf0-f7818cc8e7a6 (1).jpg	178403	\N	2025-07-13 19:20:38.913+00
53d651e8-d31d-4646-8f01-673cd2765cd1	63a4b6fc-eb99-406c-9933-e99045ae50db	/uploads/images/file-1752434509401-635970914.jpeg	image	IMG_2039.jpeg	3128127	\N	2025-07-13 19:21:49.514+00
1bef7763-2236-4528-8202-4dac690215db	63a4b6fc-eb99-406c-9933-e99045ae50db	/uploads/images/file-1752434512772-670075027.jpeg	image	IMG_2068.jpeg	4200652	\N	2025-07-13 19:21:52.907+00
fe241d54-8d56-4f97-8508-4c5756d2ea94	63a4b6fc-eb99-406c-9933-e99045ae50db	/uploads/images/file-1752434518012-197022823.jpeg	image	IMG_2132.jpeg	2078651	\N	2025-07-13 19:21:58.122+00
\.


--
-- Data for Name: project_stakeholders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project_stakeholders (id, project_id, name, email, phone, organization, role, type, created_at) FROM stdin;
\.


--
-- Data for Name: project_updates; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.project_updates (id, project_id, title, description, update_date, milestone, created_by, created_at) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.projects (id, program_area_id, title, description, location, duration, status, budget, beneficiaries, impact_metrics, image, hero_image, order_index, start_date, end_date, slug, created_at, updated_at, overview) FROM stdin;
300d4521-361e-494e-910d-6612c2bf9702	d6fd704c-ff63-4b38-b0c7-3b46863e43f7	Sustainable Health Capacity Building - Accham and Bajura	Implementing sustainable basic health systems strengthening and capacity building in rural Nepal through public-private-academic partnerships.	Accham and Bajura Districts, Nepal	2024-2025	active	$500,000	500+ community health workers, 28 health facilities	{"500+ trained health workers","28 health posts upgraded","14 birthing centers functional"}	\N	/uploads/images/image-1752434440019-701204527.jpeg	0	\N	\N	sustainable-health-capacity-building-accham-bajura	2025-07-13 18:10:35.664+00	2025-07-13 18:10:35.664+00	**Populations in rural, impoverished areas worldwide do not have access to quality health services, resulting in preventable morbidity and mortality. Women and children are particularly vulnerable.**\n\n### Project Highlights\n- **"Adopt" 2 districts in rural Nepal**\n- **Model for sustainable, systematic healthcare capacity building**\n- **Public-private-academic partnership**\n\n### 2024 Achievements\n- Comprehensive health facility evaluation\n- Addressed gaps in health service delivery, customized to each facility\n- **500+ community health workers trained**\n- **14/28 health posts upgraded to functional birthing centers**\n- Health management staff trained in quality and logistics\n\nHealth facilities are now able to provide basic preventive and life-saving care.
9d6ca009-06ac-4eb2-ba43-9dc18013054b	6cafc328-3a83-40a2-a852-bc0d135dca61	Women's Microenterprise Fund	Providing microloans and business training to women entrepreneurs in rural areas.	India		active	$350,000	10000 households	{}	\N	\N	0	\N	\N	womens-microenterprise-fund	2025-07-10 18:28:59.239+00	2025-07-10 18:28:59.239+00	asdsadasdaasdasdasdasdas
cc30b1e7-e4a7-4fbc-85ba-e498944cc3b7	d3e2222f-6b88-4723-90c0-4480d1abd03e	Novel Economic Initiatives and Income Generation	Creating green, sustainable economies using locally available resources and connecting rural economies to markets.	Helambu, Accham, Bajura Districts, Nepal	2024-2026	active	$200,000	150+ households, local communities	{"Economic surveys completed","Permaculture training","Community health programs"}	\N	\N	0	2024-01-01	2026-12-31	novel-economic-initiatives-income-generation	2025-07-13 18:10:35.695+00	2025-07-13 18:10:35.695+00	## Background\n\n**Poverty and lack of economic opportunity are root causes of poor health, education, and malnutrition in underserved communities.**\n\n### Approach\n- Develop replicable models for green, sustainable economies\n- Use local resources and connect rural economies to markets\n- Invest in permaculture, ecotourism, and commercial goods production\n- Launch community health outreach programs\n\n### Activities\n- **Permaculture farming**\n- **Agrotourism & ecovillage development**\n- **Community health promotion** (training, screening, referral)\n\n### Baseline Economic Surveys\n- **Helambu, Accham, Bajura**\n- 54% of boys and 45% of girls attend school regularly\n- Average annual income per person: NRs 7,003 (USD 55)\n- 76% of households have no savings or disposable income\n- Farmers lack access to marketplaces\n\n### Impact\n- Economic surveys completed\n- Permaculture training\n- Community health programs launched
cca6e63f-5578-4046-a2e1-df1b2ddba170	d3e2222f-6b88-4723-90c0-4480d1abd03e	Helambu Livelihood Project	Building economic capacity through social entrepreneurship and sustainable finance programs in Helambu municipality.	Helambu Municipality, Nepal	2024-2026	active	$44,500	150+ households in Helambu	{"Dairy cow operation","Sustainable finance program","Community co-ops"}	\N	\N	0	2024-01-01	2026-12-31	helambu-livelihood-project	2025-07-13 18:10:35.716+00	2025-07-13 18:10:35.716+00	## Baseline Evaluation (2024)\n\n- 150 households surveyed\n- 54% of boys and 45% of girls attend school regularly\n- 30–45% of household members are illiterate\n- Average annual income per person: NRs 7,003 (USD 55)\n- 76% of households have no savings or disposable income\n- Some farmers sell products from home, earning ~$30/mo\n\n## 2025 Project Steps\n1. **Build economic capacity** of Melamchi Gang (MG) and Ichok residents\n2. **Social entrepreneurship program**\n3. **Sustainable finance program** ($44,500 fund for loans)\n4. **Dairy and ghee production** for local market\n\n### Deliverables\n- Social Welfare Council approval\n- Baseline economic survey\n- Training for local co-ops\n- Community entrepreneurial management\n- Perpetual fund for loans\n- Dairy/ghee production and market access
b0278fe5-975e-4c02-88ed-8cf3c4f3ab27	d3e2222f-6b88-4723-90c0-4480d1abd03e	Center for Health, Agrotourism and Community Economic Development	Building green, sustainable economies in Nepal through integrated community development approaches.	Upper Karnali Region, Nepal	2024-2027	active	$300,000	Local communities in Upper Karnali region	{"13 hectares land","Permaculture training","Economic development center"}	\N	\N	0	2024-01-01	2027-12-31	center-health-agrotourism-community-economic-development	2025-07-13 18:10:35.706+00	2025-07-13 18:10:35.706+00	## Background\n\n**Rural municipalities in Western Nepal face challenges in development, economic output, health, and education.**\n\n### Baseline Survey (2024)\n- **Accham and Bajura**: Unique resources (pure water, fertile land, natural beauty)\n- **Challenges:**\n  - Lack of unified regional economic development\n  - Underutilized natural resources\n  - Endemic poverty and malnutrition\n  - Mass migration due to lack of opportunity\n\n### Project Goals\n1. Connect people to local industrial and economic activities\n2. Launch and expand economic opportunities\n3. Build knowledge in agriculture, water management, and eco-tourism\n4. Preserve traditional culture\n5. Improve health outcomes and service quality\n\n### Components\n- Permaculture agricultural programs\n- Investment in green agriculture (olive, apple, rice, millet, potato)\n- Reforestation, water treatment, waste management\n- Economic development center, microloan program\n- Health and environment promotion\n\n### Community Contributions\n- Building donation and maintenance\n- 13 hectares for agriculture training\n- Transport logistics and sales connections\n- Community integration and personnel
63eb6f58-0d5b-4181-a31c-023d3605aa10	d6fd704c-ff63-4b38-b0c7-3b46863e43f7	Innovation in Anemia Prevention, Treatment and Screening	Pilot testing of AI-powered screening tool to detect and manage anemia in Nepal using cast iron cookpots.	Nuwakot, Solukhumbhu, Humla Districts, Nepal	2025-2026	active	$150,000	3,000+ screened individuals	{"AI screening tool validation","Cast iron cookpot intervention","Community-based screening"}	\N	\N	0	2025-01-01	2026-12-31	innovation-anemia-prevention-treatment-screening	2025-07-13 18:10:35.711+00	2025-07-13 18:10:35.711+00	## Overview\n\n**In 2025, GEI will pilot a novel, AI-powered anemia screening tool in Nepal, combined with a new approach to treat and prevent anemia using cast iron cookpots.**\n\n### 2024 Findings\n- Screening is intermittent and limited\n- Community screening uses "color cards" (inaccurate)\n- IFA (iron-folic-acid) provided, but no follow-up\n- Anemia distribution is not uniform; high-risk areas need long-term programs\n\n### Baseline Screening Results\n- **Nuwakot:** 1659 screened, 68% anemia overall\n- **Solukhumbhu:** 830 screened, 64% anemia overall\n- **Humla:** 159 screened, 22% anemia overall\n\n### The Tool\n- **Monere.ai**: AI-powered anemia screening app (NiADA)\n- Non-invasive, smartphone-based, 5-second test\n- No need for expensive or invasive equipment\n\n### Pilot Study Design\n1. Validate NiADA vs. lab results\n2. Qualitative research and household surveys\n3. Test cast iron pots for anemia reduction\n\n### Significance\n- Low-cost, community-based screening\n- Immediate policy impact via collaboration with Nepal National Health Research Council
71557899-cf37-4fd4-81f4-e14926805bb2	d6fd704c-ff63-4b38-b0c7-3b46863e43f7	Maternal Neonatal Training Program - Humla and Nuwakot	Building case management skills among health workers and care capacity in rural health facilities to manage IHE and postpartum hemorrhage.	Humla, Nuwakot, Accham, Bajura Districts, Nepal	2024-2026	active	$300,000	500+ health workers, 38 health facilities	{"HBB/HMS training","38 facilities upgraded","500+ health workers trained"}	\N	\N	0	2024-01-01	2026-12-31	maternal-neonatal-training-program-humla-nuwakot	2025-07-13 18:10:35.721+00	2025-07-13 18:10:35.721+00	## Introduction\n\n**Neonatal and maternal mortality remain a significant priority for Nepal, especially in remote regions.**\n\n### Project Goal\n- Build case management skills among health workers\n- Improve care capacity in rural health facilities for IHE and postpartum hemorrhage\n- Implement Training of Trainers (TOT) for Helping Babies Breathe and Helping Mother’s Survive (HBB/HMS)\n- Disseminate knowledge to frontline care workers in Nuwakot, Accham, and Bajura\n\n### Activities\n1. **Care and service gap definition** (baseline survey)\n   - Completed in Accham and Bajura\n   - Scheduled in Nuwakot (2025)\n2. **Skills package implementation**\n   - Training centers at district hospitals\n   - Master trainer courses (Nuwakot: Jan 2025, Kolti PHC: Fall 2025)\n3. **Skills upgrading for health workers**\n   - Batches of 10–15 rural health workers trained (2025–2026)\n   - 28 facilities upgraded in Accham and Bajura; 10 in Nuwakot\n   - 170+ management committee members trained (Accham/Bajura)\n   - 500+ community health volunteers trained (Accham/Bajura); Nuwakot pending (2025)
53067a2b-95ad-426e-8f14-58f3ceefd75f	6cafc328-3a83-40a2-a852-bc0d135dca61	Clean Water & Waste Management Systems	Implementing affordable water filtration and treatment modalities to address water contamination issues in Nepal.	Dhulikhel Hospital, Nepal	2024-2026	active	$90,000	Hospital patients and staff, local community	{"180,000 liters/day","First hospital water plant","Cost-effective solution"}	\N	/uploads/images/image-1752431970442-909860077.jpg	0	\N	\N	clean-water-waste-management-systems	2025-07-13 18:10:35.69+00	2025-07-13 18:10:35.69+00	**Overview**\n\nReliable access to clean water is essential for health and development, yet many regions of Nepal still lack access to safe drinking water. Contamination with bacteria, viruses, and toxins contributes to widespread disease and preventable deaths.\n\n**Project Highlights**\n\n- **Nepal’s first hospital-based water purification plant at Dhulikhel Hospital**\n- **Locally built, chemical-free purification using modular filtration**\n- **Public health and market-based model for sustainability and scale**\n\n**2024 Achievements**\n\n- Constructed a water purification plant producing **180,000 liters/day**\n- System built entirely using **local materials and local engineers**\n- **Meets national drinking water standards** without using chlorine\n- Eliminated the hospital’s reliance on bottled water purchases\n- Attracted attention from **international partners and donors**\n\nDhulikhel Hospital now provides safe drinking water to its patients, staff, and departments, becoming a model for cost-effective, sustainable clean water systems in Nepal.\n\n**Market Survey Insights**\n\n- High demand for clean water from **hotels, restaurants, and households**\n- Most existing bottled water is **uncertified and of variable quality**\n- Community expressed willingness to switch to **locally certified water**\n\n> **Estimated daily demand from local buyers: 3,000–5,000 liters**\n\n**Next Steps in 2025**\n\n**Water Quality Certification**\n\n- Seek certification from **Nepal Academy of Science and Technology (NAST)**\n- Present model to **UNICEF and other organizations** for national/global scale-up\n- Expand production with support from GEI’s business and engineering teams\n\n**Public Water Kiosks**\n\n- Install **public water dispensing kiosks** near the hospital entrance\n- Revenue supports **subsidized care** for patients unable to afford treatment\n- Expected to have high community uptake due to visibility and convenience
63a4b6fc-eb99-406c-9933-e99045ae50db	d6fd704c-ff63-4b38-b0c7-3b46863e43f7	Kolti Referral Hospital - Western Nepal	Upgrading the current Primary Health Center in Kolti to a 50-bed hospital providing emergency surgical, maternity, pediatric and general medical services.	Kolti, Budhinanda Municipality, Western Nepal	2025-2027	active	$2.5 million	225,000 population across 17 municipalities	{"50-bed hospital","Emergency services","Maternal care","Pediatric care"}	\N	/uploads/images/image-1752434519648-576077705.jpeg	0	\N	\N	kolti-referral-hospital-western-nepal	2025-07-13 18:10:35.68+00	2025-07-13 18:10:35.68+00	**Goal:** Upgrade the current Primary Health Center in Kolti to a **50-bed hospital** providing emergency surgical, maternity, pediatric, and general medical services to a population of **225,000**.\n\n### Key Features\n- **Public-private-academic partnership**\n- **Location:** Kolti, Budhinanda municipality\n- **Partners:** 17 municipalities from 4 districts\n- **Integration:** Linked with Dhulikhel Hospital outreach centers\n- **Community Development Center:** Economic, agricultural, and educational programs\n\n### Services\n- **CEONC:** Comprehensive emergency obstetric, neonatal intensive care\n- **Emergency room:** Trauma, cardiovascular, obstetric, dental\n- **General medical:** Laboratory, radiology, skilled care, operating room\n- **Preventive:** Prenatal, postnatal, nutrition, cancer screening, dental\n- **Community health programs**\n\n### Financing\n- **Capital investment:** $2–2.5 million\n- **Annual operating costs:** $300,000–$400,000\n- **50% construction and all operational costs covered by government after construction**\n\n### 2025 Activities\n- Hospital operations planning\n- Financial feasibility assessment\n- Secure commitments from local and central government\n- Community engagement and planning
\.


--
-- Data for Name: publication_authors; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.publication_authors (id, publication_id, author_id, author_order, created_at) FROM stdin;
\.


--
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.publications (id, title, abstract, journal, publication_year, publication_type, doi, pdf_url, citations, category_id, is_featured, created_at, updated_at) FROM stdin;
cf2cdaa4-1033-4769-b21f-53daf79ea4ee	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-04 11:49:39.468+00	2025-07-04 11:49:39.468+00
d2a8e0fa-26a1-487a-8194-842b2c24ecd8	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI’s validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-04 11:49:39.483+00	2025-07-04 11:49:39.483+00
0e999c5f-d0cb-4d82-8782-2359a08e509b	Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project	GEI’s partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.	International Journal of Health Systems & Climate	2024	Case Study	10.1234/gei.2024.005	https://example.com/papers/kolti-climate-resilient-hospital.pdf	14	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-04 11:49:39.487+00	2025-07-04 11:49:39.487+00
3be26fbd-af41-4f19-8ab6-131bbc8dab7b	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-10 18:28:02.489+00	2025-07-10 18:28:02.489+00
fc354f20-5f6b-49d5-b340-e39949d00829	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	White Paper	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	7	ab4bec3e-efe9-4319-abed-23c6ad3216cf	t	2025-07-10 18:28:02.502+00	2025-07-10 18:28:02.502+00
dbe73b0e-8d91-4967-85c0-484285d37d0f	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-10 18:28:02.506+00	2025-07-10 18:28:02.506+00
6d947a57-5c4e-491e-bdab-e23fdd763191	Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project	GEI's partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.	International Journal of Health Systems & Climate	2024	Case Study	10.1234/gei.2024.005	https://example.com/papers/kolti-climate-resilient-hospital.pdf	14	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-10 18:28:02.511+00	2025-07-10 18:28:02.511+00
afaafbc0-7ec2-46b9-8b99-1df03424fa23	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-10 18:28:59.176+00	2025-07-10 18:28:59.176+00
55fde3c5-b3e9-431b-ad6a-07b4d6b4f3f2	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-10 18:28:59.191+00	2025-07-10 18:28:59.191+00
d4d67758-345b-43e1-9b73-75a50e4dfef1	Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project	GEI's partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.	International Journal of Health Systems & Climate	2024	Case Study	10.1234/gei.2024.005	https://example.com/papers/kolti-climate-resilient-hospital.pdf	14	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-10 18:28:59.194+00	2025-07-10 18:28:59.194+00
154197e4-3e55-47eb-a8c4-eb9b89fcd338	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	Case Study	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	7	ab4bec3e-efe9-4319-abed-23c6ad3216cf	t	2025-07-10 18:28:59.187+00	2025-07-10 18:28:59.187+00
2ac63d2f-0a27-4bb2-b020-502c4d6e2138	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Reports	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-04 11:49:39.475+00	2025-07-04 11:49:39.475+00
2cd45059-5f5e-45b9-9b43-acb493cec798	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Reports	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-10 18:28:59.182+00	2025-07-10 18:28:59.182+00
8c1487ed-50ae-4924-9bd9-4582f54ee360	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI’s eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	Annual Report	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	7	ab4bec3e-efe9-4319-abed-23c6ad3216cf	t	2025-07-04 11:49:39.479+00	2025-07-04 11:49:39.479+00
fab0263f-a5e7-4da1-adfd-9f62f6f11257	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Reports	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-10 18:28:02.498+00	2025-07-10 18:28:02.498+00
7d1134cf-3a0f-4980-a89c-ccf0b101da35	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:10:35.543+00	2025-07-13 18:10:35.543+00
afe2eb57-af2f-46c7-b820-13ab7e4beb37	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Peer-Reviewed Article	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:10:35.606+00	2025-07-13 18:10:35.606+00
ecfdd268-d0b4-4a46-a0b3-518d72428ae7	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	White Paper	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	7	ab4bec3e-efe9-4319-abed-23c6ad3216cf	t	2025-07-13 18:10:35.614+00	2025-07-13 18:10:35.614+00
6a5c617b-58a3-4687-ba7f-4257057ce285	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:10:35.621+00	2025-07-13 18:10:35.621+00
11d63775-b962-47db-ac26-ae775e132324	Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project	GEI's partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.	International Journal of Health Systems & Climate	2024	Case Study	10.1234/gei.2024.005	https://example.com/papers/kolti-climate-resilient-hospital.pdf	14	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:10:35.627+00	2025-07-13 18:10:35.627+00
86d43299-a58f-40bf-b51b-333af1373798	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:17:55.4+00	2025-07-13 18:17:55.4+00
91616928-9e7d-454e-ba65-384ddd9a38f5	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Peer-Reviewed Article	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:17:55.412+00	2025-07-13 18:17:55.412+00
e9fa74a9-0b00-47d6-9658-4d1ded9cce4c	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	White Paper	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	7	ab4bec3e-efe9-4319-abed-23c6ad3216cf	t	2025-07-13 18:17:55.421+00	2025-07-13 18:17:55.421+00
3e9d56e8-2ecb-48bd-958c-364e6d64e650	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:17:55.426+00	2025-07-13 18:17:55.426+00
02f5cb50-42c5-4ae5-a112-0dad9e3ac1ae	Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project	GEI's partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.	International Journal of Health Systems & Climate	2024	Case Study	10.1234/gei.2024.005	https://example.com/papers/kolti-climate-resilient-hospital.pdf	14	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:17:55.433+00	2025-07-13 18:17:55.433+00
aa606739-4096-4862-985d-cf3eb3c23495	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:18:48.927+00	2025-07-13 18:18:48.927+00
3f7f02ef-b00b-473b-ab9e-871a672dce32	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Peer-Reviewed Article	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:18:48.943+00	2025-07-13 18:18:48.943+00
104eec1c-25a9-4e2d-bdeb-ea25aad86a9c	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	White Paper	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	7	ab4bec3e-efe9-4319-abed-23c6ad3216cf	t	2025-07-13 18:18:48.953+00	2025-07-13 18:18:48.953+00
03e61326-66b4-4084-b5eb-bdd4a4cc2584	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:18:48.96+00	2025-07-13 18:18:48.96+00
b5f921b1-7c50-436e-a668-5605852ec9c9	Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project	GEI's partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.	International Journal of Health Systems & Climate	2024	Case Study	10.1234/gei.2024.005	https://example.com/papers/kolti-climate-resilient-hospital.pdf	14	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:18:48.965+00	2025-07-13 18:18:48.965+00
d598064c-0bd5-4721-a739-626088c0015a	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:23:28.223+00	2025-07-13 18:23:28.223+00
3165a425-3f31-44b4-8425-12ba9800cf9b	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Peer-Reviewed Article	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:23:28.235+00	2025-07-13 18:23:28.235+00
1a1f736d-4929-4ac7-bda5-d04c245e8b68	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	White Paper	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	7	ab4bec3e-efe9-4319-abed-23c6ad3216cf	t	2025-07-13 18:23:28.246+00	2025-07-13 18:23:28.246+00
af863e9b-1f51-40db-bee2-45030675d4a3	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	d6be635d-9196-4a8e-a707-dceff75d392b	t	2025-07-13 18:23:28.253+00	2025-07-13 18:23:28.253+00
830ec76c-20b5-4760-a50c-6793075d476f	Climate-Resilient Health Infrastructure: Lessons from the Kolti Hospital Project	GEI's partnership in designing and planning the Kolti Referral Hospital demonstrates how climate-smart health infrastructure can bridge access gaps in remote districts.	International Journal of Health Systems & Climate	2024	Case Study	10.1234/gei.2024.005	https://example.com/papers/kolti-climate-resilient-hospital.pdf	14	1498629f-590f-4155-b95b-d55ca7097c9c	t	2025-07-13 18:23:28.259+00	2025-07-13 18:23:28.259+00
\.


--
-- Data for Name: report_files; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.report_files (id, report_id, filename, original_name, file_path, file_size, mime_type, created_at) FROM stdin;
\.


--
-- Data for Name: report_photos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.report_photos (id, report_id, filename, original_name, file_path, alt_text, sort_order, created_at) FROM stdin;
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reports (id, title, description, upload_date, published, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: research_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.research_categories (id, name, slug, description, created_at) FROM stdin;
1498629f-590f-4155-b95b-d55ca7097c9c	Environmental Health & Innovation	environmental-innovation	Research on water and air pollution, waste management, and clean technology innovations for community health and sustainability.	2025-07-04 11:49:39.45+00
d6be635d-9196-4a8e-a707-dceff75d392b	Maternal, Neonatal & Child Health	mnch	Studies on maternal and child health, nutrition, and anemia including safe childbirth, essential newborn care, and health systems strengthening.	2025-07-04 11:49:39.455+00
ab4bec3e-efe9-4319-abed-23c6ad3216cf	Inclusive Economic Development	economic-development	Research on poverty alleviation through sustainable livelihoods, women’s empowerment, green jobs, and community business development.	2025-07-04 11:49:39.459+00
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.stories (id, title, excerpt, content, image, category, author, read_time, featured, created_at, updated_at) FROM stdin;
dcc145c7-0de6-4327-a982-f713b41e896c	The Baby Didn’t Cry	A mother’s final journey through the gaps in our health system	A mother's final hours in the hills of Nepal\n\nIn the farthest folds of the Nepali hills, where the roads vanish into footpaths and clouds cling low, a mother named Maya clutched her swollen belly and whispered a quiet prayer.\n\nShe was 81 pounds, too fragile for the life she carried. Chronic diarrhea and years of undernutrition had already stolen her strength. Still, she smiled when her baby kicked. This would be her second child. The first hadn’t survived past infancy. But this time, she had hope—she had made it to one prenatal care visit.\n\nWhen the labor pains came, they came fast. With no health post nearby and no road to travel on, her family rushed her by foot through dense forest to the nearest rural clinic—a two-hour walk that felt like forever.\n\nAt the clinic, reality hit hard.\n\nThe electricity blinked on and off like a dying candle. The delivery bed was rusted. The equipment hadn’t been touched in weeks. The only nurse on duty looked panicked. There was no trained birth attendant. The doctor was away.\n\nAs Maya moaned in pain, the nurse fumbled for the newborn resuscitation bag and mask—but it wasn’t there. When the baby arrived, he wasn’t crying. He was gasping. The staff didn’t know how to manage birth asphyxia. The baby died within two hours.\n\nMaya was still bleeding. The placenta had not come out fully, and no one knew how to manage it. There was no blood bank. No ambulance. No road. No way out.\n\nShe bled for eighteen hours.\n\nAnd then, Maya died too.\n\nThis Should Never Be a Normal Story\nMaya’s name is changed, but her story is real. It plays out every week in the most remote corners of Nepal and beyond—where mothers are brave, but health systems are broken.\n\nShe didn’t die because she was poor.\nShe didn’t die because she was weak.\nShe died because we were not ready for her.\n\nAt Global Envirotech Initiative (GEI), we believe the place you are born—or give birth—should not decide whether you live.\n\nThat’s why we work at the intersection of health and technology, bringing:\n\nSolar-powered energy to clinics with failing electricity,\n\nDigital tools to track life-saving equipment,\n\nTraining programs so every birth attendant knows what to do,\n\nAnd community-designed systems that leave no mother behind.\n\nBecause no woman should ever lose her life over a missing mask. Or a dark room. Or a forgotten trail.\n\nMaya didn’t have a choice.\n\nBut the next mother can—and that choice begins with us.	/uploads/images/image-1752251524879-822187315.jpg		DF. Fasal	5 mins	t	2025-07-11 16:02:51.381+00	2025-07-11 16:02:51.381+00
\.


--
-- Data for Name: timeline_events; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.timeline_events (id, year, title, description, sort_order, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, email, password, name, role, created_at, updated_at) FROM stdin;
057948d6-42cb-4202-9cf7-3945998405ca	admin@gei.org	$2b$10$exjvBrXvUsuNvUIr8UxPH.lHenEYfj/7L0cFMCvbjhFGiPBwgD3U.	Admin User	admin	2025-07-04 11:49:39.433+00	2025-07-04 11:49:39.433+00
\.


--
-- Name: globe_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.globe_data_id_seq', 1, false);


--
-- Name: report_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.report_files_id_seq', 1, false);


--
-- Name: report_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.report_photos_id_seq', 1, false);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- Name: timeline_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.timeline_events_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: faculty faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pkey PRIMARY KEY (id);


--
-- Name: globe_data globe_data_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.globe_data
    ADD CONSTRAINT globe_data_pkey PRIMARY KEY (id);


--
-- Name: program_area_features program_area_features_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.program_area_features
    ADD CONSTRAINT program_area_features_pkey PRIMARY KEY (id);


--
-- Name: program_area_partners program_area_partners_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.program_area_partners
    ADD CONSTRAINT program_area_partners_pkey PRIMARY KEY (id);


--
-- Name: program_area_team_members program_area_team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.program_area_team_members
    ADD CONSTRAINT program_area_team_members_pkey PRIMARY KEY (id);


--
-- Name: program_areas program_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.program_areas
    ADD CONSTRAINT program_areas_pkey PRIMARY KEY (id);


--
-- Name: project_content project_content_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_content
    ADD CONSTRAINT project_content_pkey PRIMARY KEY (id);


--
-- Name: project_custom_fields project_custom_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_custom_fields
    ADD CONSTRAINT project_custom_fields_pkey PRIMARY KEY (id);


--
-- Name: project_media project_media_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_media
    ADD CONSTRAINT project_media_pkey PRIMARY KEY (id);


--
-- Name: project_stakeholders project_stakeholders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_stakeholders
    ADD CONSTRAINT project_stakeholders_pkey PRIMARY KEY (id);


--
-- Name: project_updates project_updates_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_updates
    ADD CONSTRAINT project_updates_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: publication_authors publication_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.publication_authors
    ADD CONSTRAINT publication_authors_pkey PRIMARY KEY (id);


--
-- Name: publications publications_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_pkey PRIMARY KEY (id);


--
-- Name: report_files report_files_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.report_files
    ADD CONSTRAINT report_files_pkey PRIMARY KEY (id);


--
-- Name: report_photos report_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.report_photos
    ADD CONSTRAINT report_photos_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: research_categories research_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.research_categories
    ADD CONSTRAINT research_categories_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: timeline_events timeline_events_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.timeline_events
    ADD CONSTRAINT timeline_events_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: admins_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX admins_email_key ON public.admins USING btree (email);


--
-- Name: authors_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX authors_email_key ON public.authors USING btree (email);


--
-- Name: faculty_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX faculty_email_key ON public.faculty USING btree (email);


--
-- Name: program_areas_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX program_areas_name_key ON public.program_areas USING btree (name);


--
-- Name: program_areas_slug_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX program_areas_slug_key ON public.program_areas USING btree (slug);


--
-- Name: projects_slug_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX projects_slug_key ON public.projects USING btree (slug);


--
-- Name: publication_authors_publication_id_author_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX publication_authors_publication_id_author_id_key ON public.publication_authors USING btree (publication_id, author_id);


--
-- Name: research_categories_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX research_categories_name_key ON public.research_categories USING btree (name);


--
-- Name: research_categories_slug_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX research_categories_slug_key ON public.research_categories USING btree (slug);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: program_area_features program_area_features_programAreaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.program_area_features
    ADD CONSTRAINT "program_area_features_programAreaId_fkey" FOREIGN KEY ("programAreaId") REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: program_area_partners program_area_partners_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.program_area_partners
    ADD CONSTRAINT program_area_partners_program_area_id_fkey FOREIGN KEY (program_area_id) REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: program_area_team_members program_area_team_members_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.program_area_team_members
    ADD CONSTRAINT program_area_team_members_program_area_id_fkey FOREIGN KEY (program_area_id) REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_content project_content_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_content
    ADD CONSTRAINT project_content_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_custom_fields project_custom_fields_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_custom_fields
    ADD CONSTRAINT project_custom_fields_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_media project_media_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_media
    ADD CONSTRAINT project_media_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_stakeholders project_stakeholders_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_stakeholders
    ADD CONSTRAINT project_stakeholders_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_updates project_updates_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.project_updates
    ADD CONSTRAINT project_updates_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: projects projects_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_program_area_id_fkey FOREIGN KEY (program_area_id) REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publication_authors publication_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.publication_authors
    ADD CONSTRAINT publication_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publication_authors publication_authors_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.publication_authors
    ADD CONSTRAINT publication_authors_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publications publications_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.research_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: report_files report_files_report_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.report_files
    ADD CONSTRAINT report_files_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.reports(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: report_photos report_photos_report_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.report_photos
    ADD CONSTRAINT report_photos_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.reports(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

