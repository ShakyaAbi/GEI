--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.13

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
-- Name: MediaType; Type: TYPE; Schema: public; Owner: geiuser
--

CREATE TYPE public."MediaType" AS ENUM (
    'image',
    'document'
);


ALTER TYPE public."MediaType" OWNER TO geiuser;

--
-- Name: ProjectStatus; Type: TYPE; Schema: public; Owner: geiuser
--

CREATE TYPE public."ProjectStatus" AS ENUM (
    'active',
    'completed',
    'on_hold',
    'cancelled'
);


ALTER TYPE public."ProjectStatus" OWNER TO geiuser;

--
-- Name: StakeholderType; Type: TYPE; Schema: public; Owner: geiuser
--

CREATE TYPE public."StakeholderType" AS ENUM (
    'team_member',
    'partner',
    'beneficiary'
);


ALTER TYPE public."StakeholderType" OWNER TO geiuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public._prisma_migrations OWNER TO geiuser;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: geiuser
--

CREATE TABLE public.admins (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.admins OWNER TO geiuser;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: geiuser
--

CREATE TABLE public.authors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text,
    affiliation text,
    bio text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.authors OWNER TO geiuser;

--
-- Name: faculty; Type: TABLE; Schema: public; Owner: geiuser
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
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    order_index integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.faculty OWNER TO geiuser;

--
-- Name: globe_data; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.globe_data OWNER TO geiuser;

--
-- Name: globe_data_id_seq; Type: SEQUENCE; Schema: public; Owner: geiuser
--

CREATE SEQUENCE public.globe_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.globe_data_id_seq OWNER TO geiuser;

--
-- Name: globe_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: geiuser
--

ALTER SEQUENCE public.globe_data_id_seq OWNED BY public.globe_data.id;


--
-- Name: program_area_features; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.program_area_features OWNER TO geiuser;

--
-- Name: program_area_partners; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.program_area_partners OWNER TO geiuser;

--
-- Name: program_area_team_members; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.program_area_team_members OWNER TO geiuser;

--
-- Name: program_areas; Type: TABLE; Schema: public; Owner: geiuser
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
    icon text,
    icon_url text
);


ALTER TABLE public.program_areas OWNER TO geiuser;

--
-- Name: project_content; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.project_content OWNER TO geiuser;

--
-- Name: project_custom_fields; Type: TABLE; Schema: public; Owner: geiuser
--

CREATE TABLE public.project_custom_fields (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    field_name text NOT NULL,
    field_value text NOT NULL,
    field_type text DEFAULT 'text'::text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.project_custom_fields OWNER TO geiuser;

--
-- Name: project_media; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.project_media OWNER TO geiuser;

--
-- Name: project_stakeholders; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.project_stakeholders OWNER TO geiuser;

--
-- Name: project_updates; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.project_updates OWNER TO geiuser;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.projects OWNER TO geiuser;

--
-- Name: publication_authors; Type: TABLE; Schema: public; Owner: geiuser
--

CREATE TABLE public.publication_authors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    publication_id uuid NOT NULL,
    author_id uuid NOT NULL,
    author_order integer DEFAULT 1 NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.publication_authors OWNER TO geiuser;

--
-- Name: publications; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.publications OWNER TO geiuser;

--
-- Name: report_files; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.report_files OWNER TO geiuser;

--
-- Name: report_files_id_seq; Type: SEQUENCE; Schema: public; Owner: geiuser
--

CREATE SEQUENCE public.report_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_files_id_seq OWNER TO geiuser;

--
-- Name: report_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: geiuser
--

ALTER SEQUENCE public.report_files_id_seq OWNED BY public.report_files.id;


--
-- Name: report_photos; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.report_photos OWNER TO geiuser;

--
-- Name: report_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: geiuser
--

CREATE SEQUENCE public.report_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_photos_id_seq OWNER TO geiuser;

--
-- Name: report_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: geiuser
--

ALTER SEQUENCE public.report_photos_id_seq OWNED BY public.report_photos.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.reports OWNER TO geiuser;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: geiuser
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO geiuser;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: geiuser
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: research_categories; Type: TABLE; Schema: public; Owner: geiuser
--

CREATE TABLE public.research_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.research_categories OWNER TO geiuser;

--
-- Name: stories; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.stories OWNER TO geiuser;

--
-- Name: timeline_events; Type: TABLE; Schema: public; Owner: geiuser
--

CREATE TABLE public.timeline_events (
    id integer NOT NULL,
    year integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.timeline_events OWNER TO geiuser;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE; Schema: public; Owner: geiuser
--

CREATE SEQUENCE public.timeline_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timeline_events_id_seq OWNER TO geiuser;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: geiuser
--

ALTER SEQUENCE public.timeline_events_id_seq OWNED BY public.timeline_events.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: geiuser
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


ALTER TABLE public.users OWNER TO geiuser;

--
-- Name: globe_data id; Type: DEFAULT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.globe_data ALTER COLUMN id SET DEFAULT nextval('public.globe_data_id_seq'::regclass);


--
-- Name: report_files id; Type: DEFAULT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.report_files ALTER COLUMN id SET DEFAULT nextval('public.report_files_id_seq'::regclass);


--
-- Name: report_photos id; Type: DEFAULT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.report_photos ALTER COLUMN id SET DEFAULT nextval('public.report_photos_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: timeline_events id; Type: DEFAULT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.timeline_events ALTER COLUMN id SET DEFAULT nextval('public.timeline_events_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a0f84b94-24e0-4d37-b4d6-ac51f601537a	72d0a5ad43215a4452fdb827afb2c10d18f70df58e7e89eca3ba96bb96dfae31	2025-07-30 16:44:25.89037+00	20250630081342_init	\N	\N	2025-07-30 16:44:25.754609+00	1
e61f7359-389d-4d28-9a54-bf386d9797fb	fd5f62a3a8a885e4c72d971b836a64fe8abf8b8ca657ba43190f69dcfc50a8e6	2025-07-30 16:44:25.904836+00	20250630172327_add_project_content_relation	\N	\N	2025-07-30 16:44:25.891601+00	1
8246c72a-96e4-4027-aa96-283dacc6410b	bc709cad37a846c033b6de6d49cd455a49753e0951361b493eb12f53395e741f	2025-07-30 16:44:25.916068+00	20250703091755_geisql	\N	\N	2025-07-30 16:44:25.905848+00	1
090b4894-eb4b-40ea-82a1-5231e6bb6eda	f6a6ac3dd2ca67bfe13339068b57f5d9cf40f9000a3aa06ed6632b27a99f14c1	2025-07-30 16:44:25.931918+00	20250710180504_add_program_area_features_and_icon	\N	\N	2025-07-30 16:44:25.91693+00	1
a073072a-f7f5-4b49-9797-f97eba74733c	b74e7b4f952a06bc4bb7f4a1126731b0dbca02bf86d2ee00d510e4d71de1ea88	2025-07-30 16:44:25.9533+00	20250711155051_add_stories_and_admin	\N	\N	2025-07-30 16:44:25.932802+00	1
b6de0374-251f-4bee-a42f-9ebadac321bc	fdb97ac8d3890286fd9a7a45683cc8ff07340870d2d02b14d1ee6577215130db	2025-07-30 16:44:25.958149+00	20250712144531_add_project_overview	\N	\N	2025-07-30 16:44:25.954482+00	1
7563b678-2df0-413d-b24d-ed9d12d2c8a6	ebd3e68bc8afaadae105d17befaaf950c94bc96af5636aacd36668924597c045	2025-07-30 16:44:25.963933+00	20250717081742_add_program_area_icon_url	\N	\N	2025-07-30 16:44:25.959444+00	1
fc072e3d-13dc-4fee-a4b5-7124fe0e6b14	d242010f4b282fd762d7d04dadadb1f460a1ef0f2dea562a9844b04dab8a2c0a	2025-07-30 16:44:25.969145+00	20250718100552_add_faculty_order_index	\N	\N	2025-07-30 16:44:25.964885+00	1
bb5ff1a3-abd9-4fee-9649-ef5bf1dcb8b3	81fc32a832f138ab7401709f9b7cebb0e918f4f72191d05ba4427245a46f35fa	2025-07-30 16:44:25.973208+00	20250720102919_add_program_area_icon_svg	\N	\N	2025-07-30 16:44:25.970033+00	1
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.admins (id, email, password, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.authors (id, name, email, affiliation, bio, created_at) FROM stdin;
3bbb3d95-5dc2-49d3-8262-4f5710bacadb	Dr. Bernhard Fassl	bernhard.fassl@gei.org	Global Environmental and Health Initiative	Founder of GEI and expert in global pediatric care, health system strengthening, and climate-health integration. Leads initiatives in hospital capacity building and medical innovation.	2025-07-30 17:36:39.567+00
3046d5a7-7f0d-4676-b30d-665a87227018	Dr. Allison Judkins	allison.judkins@gei.org	GEI Research Department	Head of Research at GEI, specializing in health equity, monitoring and evaluation, and evidence-based systems design for maternal and newborn health.	2025-07-30 17:36:39.571+00
989ee5a0-f06c-49dd-8f64-4c029f994a2e	Rabin Nepal	rabin.nepal@gei.org	GEI Public Health Division	GEI Public Health Manager in Nepal, leading community-based assessments, anemia prevention programs, and maternal health capacity building.	2025-07-30 17:36:39.573+00
40c44981-ad49-4bdc-9c56-7fd80f61e5e2	Bibek Lamichhane	bibek.lamichhane@gei.org	GEI Asia Regional Office	President of GEI Asia and Head of Public Health. Expert in health systems, rural care access, and training program cascades in South Asia.	2025-07-30 17:36:39.575+00
c34aaae5-ddef-4612-8719-dfdc5ae8d432	Suyog Shrestha	suyog.shrestha@gei.org	GEI Green Innovation Team	President of Green Job Creation, overseeing clean energy, permaculture, plastic reuse, and environmental technology pilots in Nepal.	2025-07-30 17:36:39.577+00
08be6731-a679-42ee-9307-1a03a3bb1d2d	GABE	\N	\N	\N	2025-08-04 08:50:05.386+00
664f6085-a26c-4ba2-8440-c66750c943c9	Hemrag	\N	\N	\N	2025-08-04 08:57:43.808+00
7fc0daeb-025d-4a86-99f4-942f10fa12c8	Tomlin B	\N	\N	\N	2025-08-21 21:42:45.618+00
732db079-bfae-48e4-b984-35fb9a8ba4bf	Lamichhane B	\N	\N	\N	2025-08-21 21:42:45.699+00
9e6a1e9d-3335-4d18-acbd-95c31204705d	Dhungana R	\N	\N	\N	2025-08-21 21:42:45.776+00
9c6eca78-c543-454c-87f4-5ef74f99faa7	Richards G	\N	\N	\N	2025-08-21 21:42:45.848+00
7e95787f-a4e6-43fe-91ca-cdfe88cc51f1	Grubb P	\N	\N	\N	2025-08-21 21:42:45.924+00
1cbe1451-91f7-42a2-a8a3-ea32961c89d4	Mahato A	\N	\N	\N	2025-08-21 21:42:46.01+00
3ee63bcc-66b4-43e3-8322-516fdd525e4e	Fassl B	\N	\N	\N	2025-08-21 21:42:46.082+00
161c83a0-9e8d-4000-b65c-6bcae3d10b1c	Judkins A	\N	\N	\N	2025-08-21 21:42:46.158+00
\.


--
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.faculty (id, name, title, department, image, specialization, email, publications, awards, linkedin_url, google_scholar_url, created_at, updated_at, order_index) FROM stdin;
86ab60d3-7003-4a0b-8164-3da2d4c84fda	Spencer Crocker MS	Founder and President	\N	https://www.geiglobal.org/uploads/faculty/image-1753900546217-463t5c258o2.jpg	\N	\N	\N	\N	\N	\N	2025-07-30 18:35:46.782+00	2025-07-30 18:35:46.782+00	1
654e0431-f417-4c03-8e10-9f90030aff3c	Allison Judkins MD	Director: Research and Maternal child health	\N	https://www.geiglobal.org/uploads/faculty/image-1753900686866-vgpso67edoq.jpeg	\N	\N	\N	\N	https://healthcare.utah.edu/find-a-doctor/allison-judkins	\N	2025-07-30 18:38:07.415+00	2025-07-30 18:38:07.415+00	3
aba31131-207c-4cd8-bdac-cdc272d02971	Paribesh Bidari, MBA	Research, Data and Communications Consultant/Officer	\N	https://www.geiglobal.org/uploads/faculty/image-1753900877386-7u7vk7tm21a.jpeg	\N	\N	\N	\N	https://www.linkedin.com/in/paribesh-bidari-912a05121?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app	\N	2025-07-30 18:41:17.933+00	2025-07-30 18:41:17.933+00	8
a7cac80a-285c-4a46-92bf-cb89c6dc2fe5	Kishor Rawal BPH	District Coordinator	\N	https://www.geiglobal.org/uploads/faculty/image-1753900920723-ovv522gyry.jpeg	\N	\N	\N	\N	\N	\N	2025-07-30 18:42:01.272+00	2025-07-30 18:42:01.272+00	9
bcc53399-8d24-44af-b3ca-3442bcb49b72	Leela Khanal MS	Project Consultant	\N	https://www.geiglobal.org/uploads/faculty/image-1753900806314-4i0gvvfrjo7.jpeg	\N	\N	\N	\N	https://www.linkedin.com/in/leela-kumari-khanal-755b2a150?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app	\N	2025-07-30 18:40:06.862+00	2025-07-31 04:35:06.535+00	4
5831c555-f1dd-4632-8f11-4f60781d9465	Ranjan Dhungana MPH	Project Consultant	\N	https://www.geiglobal.org/uploads/faculty/image-1753937908160-chroxcdtfb.jpeg	\N	\N	\N	\N	\N	\N	2025-07-31 04:58:28.732+00	2025-07-31 04:58:28.732+00	11
aa0e3d3a-b8fd-47b5-b941-69f3a8712f35	Shreya Lohani	Field supervisor-Health project	\N	https://www.geiglobal.org/uploads/faculty/image-1753937935668-l3bb36tesy.jpeg	\N	\N	\N	\N	\N	\N	2025-07-31 04:58:56.207+00	2025-07-31 04:58:56.207+00	12
acf9e501-d617-4c11-90c5-fd1472f419e2	Field supervisor-Health project	Project Coordinator-DH	\N	https://www.geiglobal.org/uploads/faculty/image-1753937950256-gifdmv0tzpk.jpeg	\N	\N	\N	\N	\N	\N	2025-07-31 04:59:10.799+00	2025-07-31 04:59:10.799+00	13
7c82d3fc-6f7c-4820-bec9-41fed453c024	Priyanka Padhyay	Field supervisor-Health project	\N	https://www.geiglobal.org/uploads/faculty/image-1753937991870-e2pmz8wlp7i.jpeg	\N	\N	\N	\N	\N	\N	2025-07-31 04:59:52.411+00	2025-07-31 04:59:52.411+00	14
42498883-6a0d-452a-bf85-cf99e61f8f35	Santosh Rawal	Field Supervisor-Health Project	\N	https://www.geiglobal.org/uploads/faculty/image-1753938014946-vh1ik7fm07f.jpeg	\N	\N	\N	\N	\N	\N	2025-07-31 05:00:15.486+00	2025-07-31 05:00:15.486+00	15
8a6b3556-e103-442b-b131-6869c90cbac0	Sarala Sharma, MN	Project Consultant	\N	https://www.geiglobal.org/uploads/faculty/image-1753900842872-8h3fgrft75y.jpeg	\N	\N	\N	\N	\N	\N	2025-07-30 18:40:43.418+00	2025-07-31 07:34:15.411+00	5
f7a2c6cc-749a-4f49-939d-9fd59da5f0bb	Suyog, MBA	GEI business development	\N	https://www.geiglobal.org/uploads/faculty/image-1753900763744-dvvumnyhzlw.jpeg	\N	\N	\N	\N	\N	\N	2025-07-30 18:39:24.295+00	2025-07-31 07:34:25.857+00	6
7dfb4f89-d1b7-4975-9344-f499ce2b7717	Bibek Lamicchane MPH/MPA	Director of operations GEI Asia	\N	https://www.geiglobal.org/uploads/faculty/image-1753900728080-356p6uvhn6h.jpeg	\N	\N	\N	\N	\N	\N	2025-07-30 18:38:48.629+00	2025-07-31 07:34:37.483+00	7
dc00e6d2-4283-42ff-a38c-acb65f416189	Bernhard Fassl MD	Chief Operating Officer	\N	https://www.geiglobal.org/uploads/faculty/image-1766210433967-d4qnlcigqdo.jpeg	\N	\N	\N	\N	https://www.linkedin.com/in/bernhard-fassl-0a5545246/	\N	2025-07-30 18:37:00.993+00	2025-12-20 06:00:34.828+00	2
\.


--
-- Data for Name: globe_data; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.globe_data (id, title, description, latitude, longitude, category, color, created_at) FROM stdin;
\.


--
-- Data for Name: program_area_features; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.program_area_features (id, "programAreaId", title, subtitle, description, image, "orderIndex", created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: program_area_partners; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.program_area_partners (id, program_area_id, name, logo, website, description, order_index, created_at) FROM stdin;
\.


--
-- Data for Name: program_area_team_members; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.program_area_team_members (id, program_area_id, name, title, role, image, email, bio, order_index, created_at) FROM stdin;
\.


--
-- Data for Name: program_areas; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.program_areas (id, name, slug, description, hero_image, seo_title, seo_description, order_index, created_at, updated_at, icon, icon_url) FROM stdin;
d5f09433-9146-45f6-bfe2-49a2974c52d4	GREEN TECH INNOVATION	green-tech-innovation	GEI pioneers clean technologies including water purification, air pollution mitigation, and waste recycling to improve human and environmental health. 	https://geiglobal.org/uploads/program-areas/hero/image-1755721566832-6keb8t59his.jpg	Environmental Innovation | GEI	Explore GEI's innovations in water purification, air quality improvement, and sustainable waste management.	0	2025-07-30 17:36:39.581+00	2025-07-30 17:36:39.581+00	\N	\N
9fd7955c-0d58-4382-aaf7-40f720c3451c	SUSTAINABLE ECONOMIC DEVELOPMENT	sustainable-economic-development	Creating community-based green businesses, promoting women-led cooperatives, eco-tourism, and permaculture in underserved regions.	https://geiglobal.org/uploads/program-areas/hero/image-1755627109798-uimmhix8snj.jpeg	Community Development & Livelihoods | GEI	Learn how GEI supports sustainable income generation, permaculture farming, and women's economic empowerment.	0	2025-07-30 17:36:39.586+00	2025-07-30 17:36:39.586+00	\N	\N
b4024d9b-efea-45b0-85f9-956aa6b070df	HEALTH CAPACITY BUILDING	health-capacity-building	Improving maternal and child health through infrastructure upgrades, anemia management, safe delivery training, and diagnostics innovation.	https://geiglobal.org/uploads/program-areas/hero/image-1755626996640-rown3kvosr.jpeg	Maternal & Child Health Programs | GEI	Discover GEI's maternal and child health programs, including nutrition, anemia prevention, and newborn care.	0	2025-07-30 17:36:39.584+00	2025-07-30 17:36:39.584+00	\N	\N
5e01134e-b30f-468b-9084-8d13e8332ca9	TRAVEL WITH PURPOSE	travel-with-purpose	Learn about culture, global health and enjoy the wonders of the Himalayas. \n\nGEI offers travel and cultural immersion experiences like no other. Travel with experts. Live with the people. \n\nREACH OUT TO OUR TRAVEL EXPERTS TO CREATE A TRIP THAT'S RIGHT FOR YOU	https://geiglobal.org/uploads/program-areas/hero/image-1755893461739-j8oa0gdw0h8.jpeg	\N	\N	0	2025-08-22 20:11:01.852+00	2025-08-22 20:11:01.852+00	\N	\N
c4d3610a-7401-49c1-af32-b0d3c139f8a1	PROJECT CONSULTING AND SCIENTIFIC ADVISEMENT	project-consulting-and-scientific-advisement	TRANSFORM YOUR IDEA INTO REALITY\n\n**GEI specializes in IMPLEMENTATION SCIENCE** with a team of academic experts in scientific program planning, monitoring and evaluation, team building and overseeing project implementation. \n\nWe advise organizations on 3 continents who utilize our expert services including:\n- Research design\n- Data collection and baseline needs analyses, \n- Creating comprehensive strategic plans and implementation models, \n- Team training in implementation science\n- Human centered design innovation\n- Scientific publications 	https://geiglobal.org/uploads/program-areas/hero/image-1755626789315-xirq95bq96t.jpg	\N	\N	0	2025-08-19 18:06:29.417+00	2025-08-19 18:06:29.417+00	\N	\N
\.


--
-- Data for Name: project_content; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.project_content (id, project_id, title, content, content_type, order_index, is_published, author, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: project_custom_fields; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.project_custom_fields (id, project_id, field_name, field_value, field_type, created_at) FROM stdin;
\.


--
-- Data for Name: project_media; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.project_media (id, project_id, file_url, file_type, file_name, file_size, caption, created_at) FROM stdin;
56e6e66f-577f-40d9-9fa0-eb2841e297ce	75d345d2-0d9c-487a-a3e3-042d94056531	/uploads/images/file-1753899723639-vl9g6w6eny.jpg	image	3c3e009a-a356-407c-9058-efc3c37d7a78.jpg	372481	\N	2025-07-30 18:22:03.643+00
d8723bfa-107d-4bdf-8cb8-79bd041870e8	75d345d2-0d9c-487a-a3e3-042d94056531	/uploads/images/file-1753899736621-azib6e9bgm.jpg	image	f23e85a4-70c5-4ed0-b64f-c5b8808af597.jpg	187303	\N	2025-07-30 18:22:16.625+00
9b8d10e4-733f-4700-b894-c9acf29c9241	bd92f4d7-62c9-4308-9435-4cf3675f59a5	/uploads/images/file-1753936808208-1bvi8c2fylg.jpeg	image	IMG_2045.jpeg	1988608	\N	2025-07-31 04:40:08.235+00
83dc7cb8-163c-4643-a41b-56b00a766d70	bd92f4d7-62c9-4308-9435-4cf3675f59a5	/uploads/images/file-1753936811918-yq5svsuskmf.jpeg	image	IMG_2039 (Large) (1).jpeg	479998	\N	2025-07-31 04:40:11.927+00
ef1de839-40b8-46d9-9fd8-771901b8baa8	bd92f4d7-62c9-4308-9435-4cf3675f59a5	/uploads/images/file-1753936840425-kwtriflgli.jpeg	image	IMG_2040.jpeg	2155608	\N	2025-07-31 04:40:40.445+00
41992a27-a989-4d27-a044-8668c57011bb	2b7ab9d4-bd72-4eb3-8322-9936a4db3622	/uploads/images/file-1753936954931-wsmogw8ypzf.jpeg	image	IMG_5715.jpeg	3579446	\N	2025-07-31 04:42:34.961+00
6d8d0ebf-662c-4eae-9733-bb8d08d3d931	2b7ab9d4-bd72-4eb3-8322-9936a4db3622	/uploads/images/file-1753936999772-oqp3bkoocm.jpeg	image	IMG_5554.jpeg	4813468	\N	2025-07-31 04:43:19.827+00
3563851a-0e5a-4aa7-8641-82c973f6bb14	2b7ab9d4-bd72-4eb3-8322-9936a4db3622	/uploads/images/file-1753937035652-aj0pflfn25w.jpeg	image	IMG_5966 (1) (Large).jpeg	606649	\N	2025-07-31 04:43:55.66+00
3562a7c0-98bc-453f-8097-9127e2f6b32a	11f23ae2-82df-4235-86e2-1405c473563b	/uploads/images/file-1754616595863-zd9ax8a7y3.png	image	Screen Shot 2025-08-07 at 7.26.07 PM.png	118017	\N	2025-08-08 01:29:55.867+00
da36d636-e308-4176-a9e9-51ec5cac183f	11f23ae2-82df-4235-86e2-1405c473563b	/uploads/images/file-1754616739045-6svvt6eupap.jpg	image	IMG_2119.JPG	2743298	\N	2025-08-08 01:32:19.077+00
f3e77310-81b8-4149-b02c-390ef1d0363c	11f23ae2-82df-4235-86e2-1405c473563b	/uploads/images/file-1754617066048-f3pma8gxk2j.jpg	image	IMG_2158.JPG	2309664	\N	2025-08-08 01:37:46.067+00
5805c00e-b132-4b34-9be1-a51818737a45	11f23ae2-82df-4235-86e2-1405c473563b	/uploads/images/file-1754689982379-dr7pbbejdth.jpeg	image	0F68824A-ACB3-48AF-A241-C2328FF7A0B3_1_105_c.jpeg	218967	\N	2025-08-08 21:53:02.403+00
7bba9504-0381-4483-bb5d-85c89567d686	11f23ae2-82df-4235-86e2-1405c473563b	/uploads/images/file-1754690001659-xam5mout0e.jpeg	image	5C6DA870-1328-4A5F-8863-572BDF4D3B89_1_105_c.jpeg	261065	\N	2025-08-08 21:53:21.666+00
e497d342-0dd9-422e-be08-95254e7debc8	11f23ae2-82df-4235-86e2-1405c473563b	/uploads/images/file-1754690015407-ukd6paff9bk.jpeg	image	9FCCB980-8389-4476-ADEC-392B1E4DE394_1_105_c.jpeg	206456	\N	2025-08-08 21:53:35.412+00
bb4fa85c-56d1-46c4-9014-832ea9d403c7	11f23ae2-82df-4235-86e2-1405c473563b	/uploads/images/file-1754690068772-cyq13rz48so.jpeg	image	52B69F59-DE16-4A3D-8192-4A54FB90F697_1_105_c.jpeg	326388	\N	2025-08-08 21:54:28.779+00
ac80ee65-4598-438b-b67a-d05d654874b1	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707245815-723ayo2tx14.jpg	image	53cb66cc-d0f5-48a6-abaf-1d51996928aa.jpg	54202	\N	2025-08-20 16:27:25.826+00
b7550d63-c464-40ed-a20d-b9321b79fa01	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707333285-jxkdqqj0szh.webp	image	8DFEEFFF-26F0-45D1-853B-05ED425D412D.webp	546658	\N	2025-08-20 16:28:53.294+00
bdaf65ca-b6df-43ef-b1da-ff3b41b93379	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707440184-c8hvv9ffez.jpg	image	527bde78-8202-46ee-aa4e-0950668943ac.jpg	156692	\N	2025-08-20 16:30:40.188+00
53d5d115-f0cb-434e-8afa-d27807d3f607	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707542989-xmfqde78qi9.webp	image	E19A582B-E961-420B-BEA5-1BB8C7BDCDA9.webp	346680	\N	2025-08-20 16:32:23.007+00
57b8c460-4669-443b-b753-c3cf2baa1926	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707822565-1cn41fxpzws.png	image	Screen Shot 2025-08-20 at 10.35.56 AM.png	289498	\N	2025-08-20 16:37:02.572+00
e6119c39-9f0f-4523-a2de-f10f67175e0d	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707841849-fvgon3uc7je.png	image	Screen Shot 2025-08-20 at 10.36.03 AM.png	58092	\N	2025-08-20 16:37:21.852+00
ab36419a-02fd-4ac2-b100-19cd73e56c73	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707853039-9mnkd1uoy69.png	image	Screen Shot 2025-08-20 at 10.36.11 AM.png	251707	\N	2025-08-20 16:37:33.06+00
77f00baa-65fd-4828-b12d-9c91100bbfd3	14445908-1784-4c5c-b067-b01e5fd86ea4	/uploads/images/file-1755707865590-pv0sejgmwdl.png	image	Screen Shot 2025-08-20 at 10.36.18 AM.png	195240	\N	2025-08-20 16:37:45.598+00
23d7320f-2865-47cb-9471-9bf5468f2c6d	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719196341-oqu86pzloj9.png	image	Screen Shot 2025-08-20 at 12.48.19 PM.png	146326	\N	2025-08-20 19:46:36.345+00
54c65499-be69-4d74-8db3-e580e5ed0908	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719207500-f5yr0b5lq7.png	image	Screen Shot 2025-08-20 at 12.46.32 PM.png	231642	\N	2025-08-20 19:46:47.505+00
513ccfea-0cf5-4f80-b8e2-70a195a5e5cb	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719289728-zzsvk2ju89q.png	image	Screen Shot 2025-08-20 at 12.47.42 PM.png	201200	\N	2025-08-20 19:48:09.744+00
169986d4-6fc6-4c82-bb3a-5853914d8120	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719298415-dukz6no8dg.png	image	Screen Shot 2025-08-20 at 12.46.55 PM.png	409401	\N	2025-08-20 19:48:18.421+00
3bd19c8e-ae3e-4a68-a967-bdac1c15f776	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719311434-bi87nco3c26.png	image	Screen Shot 2025-08-20 at 12.46.49 PM.png	126211	\N	2025-08-20 19:48:31.439+00
99fb9de1-c75c-44f3-aefe-c1d7e547756f	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719322558-51v2uibbaju.png	image	Screen Shot 2025-08-20 at 12.46.16 PM.png	187978	\N	2025-08-20 19:48:42.562+00
00f10079-cb60-42a8-8099-a48c3440925f	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719328074-bud9nxilsr.png	image	Screen Shot 2025-08-20 at 12.46.01 PM.png	698845	\N	2025-08-20 19:48:48.081+00
1bacb214-325b-4b58-96d0-ff0c7f4e74bc	fa72ef99-413c-4e53-91fb-2bc3eee033f4	/uploads/images/file-1755719356473-hnr1ax3156f.png	image	Screen Shot 2025-08-20 at 1.49.04 PM.png	640869	\N	2025-08-20 19:49:16.481+00
9540c09b-f7d5-423e-8d10-62600eb80eb9	4d810120-7c00-418f-ad51-9fbd6757252b	/uploads/images/file-1755720283829-fjx0i2yu7ld.png	image	Screen Shot 2025-04-29 at 2.32.01 PM.png	1086967	\N	2025-08-20 20:04:43.841+00
31413551-af9f-44bd-a69a-35a451ab54a9	4d810120-7c00-418f-ad51-9fbd6757252b	/uploads/images/file-1755720294037-wuh21uj07y.png	image	Screen Shot 2025-04-29 at 2.33.35 PM.png	811368	\N	2025-08-20 20:04:54.049+00
a10c87ca-f6b8-444f-b248-2166ea84dc42	4d810120-7c00-418f-ad51-9fbd6757252b	/uploads/images/file-1755720325797-dlpvm7kwxd7.png	image	Screen Shot 2025-04-29 at 2.39.50 PM.png	855270	\N	2025-08-20 20:05:25.811+00
67be0de6-2d9e-4a6c-85c2-0610da08736d	4d810120-7c00-418f-ad51-9fbd6757252b	/uploads/images/file-1755720338971-aoc9jxtzcrn.png	image	Screen Shot 2025-04-29 at 2.40.53 PM.png	740302	\N	2025-08-20 20:05:38.982+00
af8b800f-40d2-453e-94a9-74ed118eca41	4d810120-7c00-418f-ad51-9fbd6757252b	/uploads/images/file-1755720360541-dr99e163t29.png	image	Screen Shot 2025-04-29 at 2.44.51 PM.png	586574	\N	2025-08-20 20:06:00.555+00
740ea47c-5f7a-4d70-b92f-f19a2e6d47c9	4d810120-7c00-418f-ad51-9fbd6757252b	/uploads/images/file-1755720395739-17pb3x8vqxu.png	image	Screen Shot 2025-04-29 at 3.53.42 PM.png	560139	\N	2025-08-20 20:06:35.761+00
580d2056-c9ce-4d2e-8717-937219a13837	4d810120-7c00-418f-ad51-9fbd6757252b	/uploads/images/file-1755720397257-czqdjfau0ce.jpeg	image	B6ECB7B5-4ADF-421E-B53F-660BBD3A1FC1.jpeg	115002	\N	2025-08-20 20:06:37.26+00
52d52adb-2cc1-4b7a-8154-dc230cc093f0	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787440882-44sfz7gxwt6.jpeg	image	109CE53A-56AA-4BBB-8DB7-09E1F7A92AC2_1_105_c.jpeg	501992	\N	2025-08-21 14:44:00.902+00
46894d3c-3fff-4b2a-8741-2c9315e165d5	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787473252-vztj7lurvao.jpeg	image	FBB34BC5-120E-476A-ACB8-318900F8AE4E_1_105_c.jpeg	323842	\N	2025-08-21 14:44:33.258+00
eeb17699-ea3e-417a-a268-4907e0a24c52	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787573221-jxfodw5p0ed.png	image	Screen Shot 2025-08-21 at 8.46.05 AM.png	2156990	\N	2025-08-21 14:46:13.257+00
e9e534e7-9556-48ad-8e30-dca6ec57bffb	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787625006-smyc3qia8bj.jpeg	image	E8031319-D39E-4A00-815E-CBC92F6AF011_1_105_c.jpeg	311471	\N	2025-08-21 14:47:05.014+00
628ddc3b-a5fe-4ad3-822d-01a497f9e980	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787720125-ikuz8s9cqp.jpeg	image	A9D734F3-0660-4D57-9CE3-284AD6D2B393_1_105_c.jpeg	353310	\N	2025-08-21 14:48:40.134+00
ba4077eb-4114-416d-8e90-65f5c6d645d3	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787820526-a2zu7ggqoyc.jpeg	image	E5F469AE-1B1B-42CE-8F97-ED0374B3F7B3_1_105_c.jpeg	295452	\N	2025-08-21 14:50:20.531+00
d1fcc194-aec4-40e0-848f-93bf8d067bfc	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787869859-cpbnlq1iyis.jpeg	image	C883A720-69E0-40C3-849A-4B3D5EB2FBC8_1_105_c.jpeg	409439	\N	2025-08-21 14:51:09.869+00
7a5a085f-ad54-4767-9ae3-c3051505ecfe	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787890115-duukojizfe9.jpeg	image	8884A9AD-9E2F-4D88-8F4D-8CD552986A5A_1_105_c.jpeg	377874	\N	2025-08-21 14:51:30.122+00
41bad028-ff07-44ce-956f-e98bf1c5c385	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755787900816-ky7ldwbiozs.jpeg	image	5F64B127-B463-4ADB-9CDA-6A269D241291_1_105_c.jpeg	307104	\N	2025-08-21 14:51:40.823+00
d906a06a-a415-46ca-bf64-e833c93c4d84	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788083448-tbzn016dc8.jpeg	image	1EEBC7D1-DDC7-436A-B79E-B9F142D3D7F7_1_105_c.jpeg	411606	\N	2025-08-21 14:54:43.455+00
4001c188-7664-424d-bd47-7d2514ba6f2c	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788097052-1dr2s96np43.jpeg	image	8E4D2BC4-9CD0-44AD-80CB-1914226F1F50_1_105_c.jpeg	289626	\N	2025-08-21 14:54:57.057+00
92f52b0d-d3e9-4288-9ec3-803cf2bd640a	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788108043-9wjjw61ukvk.jpeg	image	92D94817-026A-4A11-84BC-7215E7A66E22_1_105_c.jpeg	403086	\N	2025-08-21 14:55:08.052+00
346b614b-db77-497a-9f97-1fdc29bb6047	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788113015-che33tto6be.jpeg	image	BBA3A08D-E27D-43D1-9F17-75B08DE336B2_1_105_c.jpeg	388891	\N	2025-08-21 14:55:13.021+00
6f78a09b-61bc-4d15-a684-e1e57997f161	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788122508-lcyo4emvyfs.jpeg	image	E1D1955E-8755-4009-BCFC-143FEC2C9CC8_1_105_c.jpeg	381127	\N	2025-08-21 14:55:22.514+00
2e4967b4-64bd-4732-8a62-9748f6dc8c53	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788176844-odgn36l1rga.jpeg	image	DC25D63E-B3B3-4C7E-97F9-E578CAD48B43_1_105_c.jpeg	404943	\N	2025-08-21 14:56:16.862+00
f3c7a3bf-e954-42f8-a3d2-bfb51317abd8	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788181035-zjngghp4b9.jpeg	image	28AAAE8E-4911-418C-B144-6F3A4317AC3B_1_105_c.jpeg	372791	\N	2025-08-21 14:56:21.05+00
ddfe81e7-7ee3-4070-b4d8-b03bb0eaa592	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788191413-0bh31dhjxn37.jpeg	image	3FB29EE3-94A3-47DF-B4A1-527CB81F47C6_1_105_c.jpeg	199945	\N	2025-08-21 14:56:31.418+00
f50e1cc9-be2b-4dca-bfd0-f8c3b5d776ec	dda2d1be-f57e-43d3-9142-dfa551e5ac72	/uploads/images/file-1755788288052-boycnmojtik.jpeg	image	DCBE11AF-A689-4A60-9AB3-E93D07569A3B_1_105_c.jpeg	380352	\N	2025-08-21 14:58:08.058+00
4bd5ea20-1366-412e-8af3-47c35626433f	69fdb8fa-0b1e-4115-8775-da2a4b356ce5	/uploads/images/file-1755795391120-wd1utcp36o.png	image	Screen Shot 2025-08-21 at 10.56.18 AM.png	90861	\N	2025-08-21 16:56:31.125+00
c34a94e7-d98b-4b49-b53e-9c5c6d40e2ff	69fdb8fa-0b1e-4115-8775-da2a4b356ce5	/uploads/images/file-1755795400110-77k2njmd2mj.png	image	Screen Shot 2025-08-21 at 10.55.35 AM.png	154141	\N	2025-08-21 16:56:40.118+00
7f899a34-9bc8-464a-849f-965273d9f6ee	69fdb8fa-0b1e-4115-8775-da2a4b356ce5	/uploads/images/file-1755795418092-73ishfn5ahs.png	image	Screen Shot 2025-08-21 at 10.56.53 AM.png	180128	\N	2025-08-21 16:56:58.098+00
87e303b2-6503-478f-8b89-177d22fd6741	69fdb8fa-0b1e-4115-8775-da2a4b356ce5	/uploads/images/file-1755795633706-4iuo5bwof9.png	image	Screen Shot 2025-08-21 at 10.59.57 AM.png	473354	\N	2025-08-21 17:00:33.711+00
87729db9-3f6e-4e1b-a7e3-9d66d402270f	69fdb8fa-0b1e-4115-8775-da2a4b356ce5	/uploads/images/file-1755795692537-b7paavpwef.png	image	Screen Shot 2025-08-21 at 11.01.24 AM.png	265817	\N	2025-08-21 17:01:32.543+00
b8bbbd28-3ec6-497f-8b28-bf9d50272ff6	55fccdb9-cb57-40c9-a10b-b2c3079977da	/uploads/images/file-1756089770675-0g8sl7reznl7.png	image	Screen Shot 2025-08-24 at 10.42.01 PM.png	996953	\N	2025-08-25 02:42:50.702+00
7b393c09-c6fb-4ad4-abac-6b80192e95d5	341f1006-4753-4405-93cd-560276264084	/uploads/images/file-1756089932071-myeqf1hvkg.png	image	Screen Shot 2025-08-24 at 10.45.22 PM.png	1674043	\N	2025-08-25 02:45:32.1+00
8bcb86fd-618d-4b0f-b585-42a28c9e8414	7f6ea7f7-3b95-4d8f-9213-4077a3f5b153	/uploads/images/file-1756089997925-vf7j7xiqoem.jpeg	image	87f029fa-59dd-4a6a-926d-3dc23f726438.jpeg	498459	\N	2025-08-25 02:46:37.933+00
388964d3-18e0-435e-a50e-a13858cf9372	7f6ea7f7-3b95-4d8f-9213-4077a3f5b153	/uploads/images/file-1756090075794-tro8tzn499b.jpeg	image	6d72a2b5-6445-41d6-9934-d03b153ab1bf.jpeg	396390	\N	2025-08-25 02:47:55.813+00
7c203c97-f812-43e6-8ce7-1c898f8608d8	7f6ea7f7-3b95-4d8f-9213-4077a3f5b153	/uploads/images/file-1756090123316-m3rzq36vnr9.jpeg	image	d98a613f-9bea-4873-8b8a-3172d2415ec9.jpeg	466570	\N	2025-08-25 02:48:43.328+00
\.


--
-- Data for Name: project_stakeholders; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.project_stakeholders (id, project_id, name, email, phone, organization, role, type, created_at) FROM stdin;
\.


--
-- Data for Name: project_updates; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.project_updates (id, project_id, title, description, update_date, milestone, created_by, created_at) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.projects (id, program_area_id, title, description, location, duration, status, budget, beneficiaries, impact_metrics, image, hero_image, order_index, start_date, end_date, slug, created_at, updated_at, overview) FROM stdin;
75d345d2-0d9c-487a-a3e3-042d94056531	d5f09433-9146-45f6-bfe2-49a2974c52d4	Clean Water & Waste Management Systems	Implementing affordable water filtration and treatment modalities to address water contamination issues in Nepal.	Dhulikhel Hospital, Nepal	2024-2026	active	$90,000	Hospital patients and staff, local community	{"180,000 liters/day","First hospital water plant","Cost-effective solution"}	\N	/uploads/images/file-1753899736621-azib6e9bgm.jpg	0	2024-01-01	2026-12-31	clean-water-waste-management-systems	2025-07-30 17:36:39.603+00	2025-07-30 17:36:39.603+00	## Overview\n\n**Reliable access to clean water is a basic requirement for health, well-being, and development.**\n\n### Progress (2024)\n- **Water purification plant completed at Dhulikhel Hospital**\n- First hospital in Nepal to offer safe drinking water to patients and staff\n- **180,000 liters/day** of purified water produced\n- **Cost-effective:** $90,000 total cost\n- No chemicals used—modular local filters only\n\n### 2025 Plans\n1. **Water quality certification** (Nepal Academy of Science and Technology)\n2. **Public water kiosks** at hospital entrance\n3. **Commercial sales** to local businesses, hotels, restaurants\n4. **Expansion:** Explore partnership with Kathmandu University for campus water supply\n\n### Environmental Impact\n- Reduces bottled water use and plastic waste\n- Model for scale-up in Nepal and beyond
7f6ea7f7-3b95-4d8f-9213-4077a3f5b153	9fd7955c-0d58-4382-aaf7-40f720c3451c	Novel Economic Initiatives and Income Generation	Creating green, sustainable economies using locally available resources and connecting rural economies to markets.	Helambu, Accham, Bajura Districts, Nepal	2024-2026	active	$200,000	150+ households, local communities	{"Economic surveys completed","Permaculture training","Community health programs"}	\N	/uploads/images/file-1756090075794-tro8tzn499b.jpeg	0	\N	\N	novel-economic-initiatives-income-generation	2025-07-30 17:36:39.605+00	2025-07-30 17:36:39.605+00	## Background\n\n**Poverty and lack of economic opportunity are root causes of poor health, education, and malnutrition in underserved communities.**\n\n### Approach\n- Develop replicable models for green, sustainable economies\n- Use local resources and connect rural economies to markets\n- Invest in permaculture, ecotourism, and commercial goods production\n- Launch community health outreach programs\n\n### Activities\n- **Permaculture farming**\n- **Agrotourism & ecovillage development**\n- **Community health promotion** (training, screening, referral)\n\n### Baseline Economic Surveys\n- **Helambu, Accham, Bajura**\n- 54% of boys and 45% of girls attend school regularly\n- Average annual income per person: NRs 7,003 (USD 55)\n- 76% of households have no savings or disposable income\n- Farmers lack access to marketplaces\n\n### Impact\n- Economic surveys completed\n- Permaculture training\n- Community health programs launched
2b7ab9d4-bd72-4eb3-8322-9936a4db3622	b4024d9b-efea-45b0-85f9-956aa6b070df	Sustainable Health Capacity Building - Accham and Bajura	Implementing sustainable basic health systems strengthening and capacity building in rural Nepal through public-private-academic partnerships.	Accham and Bajura Districts, Nepal	2024-2025	active	$50,000	500+ community health workers, 28 health facilities	{"500+ trained health workers","28 health posts upgraded","14 birthing centers functional"}	\N	/uploads/images/file-1753937035652-aj0pflfn25w.jpeg	0	\N	\N	sustainable-health-capacity-building-accham-bajura	2025-07-30 17:36:39.592+00	2025-07-30 17:36:39.592+00	## Overview\n\n**Populations in rural, impoverished areas worldwide do not have access to quality health services, resulting in preventable morbidity and mortality. Women and children are particularly vulnerable.**\n\n### Project Highlights\n- **"Adopt" 2 districts in rural Nepal**\n- **Model for sustainable, systematic healthcare capacity building**\n- **Public-private-academic partnership**\n\n### 2024 Achievements\n- Comprehensive health facility evaluation\n- Addressed gaps in health service delivery, customized to each facility\n- **500+ community health workers trained**\n- **14/28 health posts upgraded to functional birthing centers**\n- Health management staff trained in quality and logistics\n\nHealth facilities are now able to provide basic preventive and life-saving care.
341f1006-4753-4405-93cd-560276264084	9fd7955c-0d58-4382-aaf7-40f720c3451c	Helambu Livelihood Project	Building economic capacity through social entrepreneurship and sustainable finance programs in Helambu municipality.	Helambu Municipality, Nepal	2024-2026	active	$44,500	150+ households in Helambu	{"Dairy cow operation","Sustainable finance program","Community co-ops"}	\N	/uploads/images/file-1756089932071-myeqf1hvkg.png	0	\N	\N	helambu-livelihood-project	2025-07-30 17:36:39.614+00	2025-07-30 17:36:39.614+00	## Baseline Evaluation (2024)\n\n- 150 households surveyed\n- 54% of boys and 45% of girls attend school regularly\n- 30–45% of household members are illiterate\n- Average annual income per person: NRs 7,003 (USD 55)\n- 76% of households have no savings or disposable income\n- Some farmers sell products from home, earning ~$30/mo\n\n## 2025 Project Steps\n1. **Build economic capacity** of Melamchi Gang (MG) and Ichok residents\n2. **Social entrepreneurship program**\n3. **Sustainable finance program** ($44,500 fund for loans)\n4. **Dairy and ghee production** for local market\n\n### Deliverables\n- Social Welfare Council approval\n- Baseline economic survey\n- Training for local co-ops\n- Community entrepreneurial management\n- Perpetual fund for loans\n- Dairy/ghee production and market access
11f23ae2-82df-4235-86e2-1405c473563b	b4024d9b-efea-45b0-85f9-956aa6b070df	Managing Maternal and Neonatal Emergencies: a novel training program for rural health providers	We build case management skills among health workers and enhance care capacity in rural health facilities to manage the most common medical emergencies during pregnancy, childbirth and newborn period. In collaboration with the Nepal government, Latter-day-saints charities and global experts, our team developed a novel, government accredited training program dedicated to improve case management skills.	Humla, Nuwakot, Accham, Bajura Districts, Nepal	2024-present	active	$30,000	500+ health workers, 38 health facilities	{"HBB/HMS training","38 facilities upgraded","500+ health workers trained","Knowledge and skill testing and certification (see table)"}	\N	/uploads/images/file-1754617066048-f3pma8gxk2j.jpg	0	\N	\N	managing-maternal-and-neonatal-emergencies-a-novel-training-program-for-rural-health-providers	2025-07-30 17:36:39.617+00	2025-07-30 17:36:39.617+00	## Introduction\n\n**Neonatal and maternal mortality remain a significant priority for Nepal, especially in remote regions.**\n\n### Project Goal\n- Assess the operational status of the health facility and staff at baseline, mid- and endline.\n- Build case management skills among health workers\n- Improve care capacity in rural health facilities for safe childbirth and managing maternal and neonatal emergencies\n- Connect health facilities to available local and national resources and train health facility managers in care quality and data management.\n- Create training centers and master trainers in rural areas for ongoing skills development and self reliance: We implement a Training of Trainers (TOT) for Helping Babies Breathe and Helping Mother’s Survive (HBB/HMS)\n- Reach the community: We engage with community based healthworkers (Female Community Health Volunteers), Mothers groups and idigenous groups to disseminate awareness of maternal child health and knowledge to the frontline of care.\n\n### Activities\n1. **BASELINE SURVEY: We evaluate health facilities to identify gaps in care in 6 domains: (1) Staff availability; (2) Staff skill and case management competency; (3) Essential medications and medical equipment; (4) Essential facility infrastructure; (5)  Logistics and supply; (6) Care quality and management**\n   - Completed in Humla, Accham and Bajura\n   - Upcoming in Nuwakot (2025)\n2. **Public-private-academic partnership: We form a local project team with leaders from the community, the government and technical experts to CO-CREATE (1) a plan to improve services; (2) share costs of upgrades; (3) create a sustainable locally financed funding plan to maintain operations after completion of the project phase**\n   - Training centers at district hospitals\n3. **Skills package implementation at rural training centers**\n   - Training centers at district hospitals\n   - Master trainer courses (Nuwakot: Jan 2025, Kolti PHC: Fall 2025)\n4. **Skills upgrading for health workers**\n   - Batches of 10–15 rural health workers trained (2025–2026)\n   - 28 facilities upgraded in Accham and Bajura; 10 in Nuwakot\n   - 170+ management committee members trained (Accham/Bajura)\n   - 500+ community health volunteers trained (Accham/Bajura); Nuwakot pending (2025)\n5. **Health facility upgrades**\n   - Repairs of essential infrastructure (water, electricity, roof, windows)\n   - Minimum equipment standard for safe maternal child health care (example: delivery table, instruments, autoclave etc.)\n6. **YOU MANAGE WHAT YOU MEASURE: WE MEASURE IMPACT**\n   - Midline (3y) and Endline (5-6y) capacity survey of health facilities to determine impact on health service delivery and identify opportunities for further improvements.\n   - Knowledge and skill testing (see graph)\n   - Detailed program reports are available upon request. Please contact us for more information\n
dda2d1be-f57e-43d3-9142-dfa551e5ac72	9fd7955c-0d58-4382-aaf7-40f720c3451c	Integrated Community Development in Far Western Nepal Nepal: A Model for Improving Health, Livelihoods and Environment	We build green, sustainable economies in Nepal through integrated community development approaches. Our model promotes sustainable community driven business development, organic agriculture, eco-tourism and health service development in the most remote and poorest regions of Asia.\n\nGEI leads a collaboration between Swamikartik Rural Municipality, Budhinanda Rural Municipality, Himali Rural Municipality, Jagganath Rural Municipality, Global Envirotech Initiative Asia/USA (GEI) and the Social Welfare Association Nepal (SWAN)	Upper Karnali Region, Nepal	2024-2027	active	$300,000	Local communities in Upper Karnali region	{"13 hectares land","Permaculture training","Economic development center"}	\N	/uploads/images/file-1755787720125-ikuz8s9cqp.jpeg	0	\N	\N	integrated-community-development-in-far-western-nepal-nepal-a-model-for-improving-health-livelihoods-and-environment	2025-07-30 17:36:39.607+00	2025-07-30 17:36:39.607+00	## Background\n\n**Rural municipalities in Western Nepal continue to struggle with development, as indicated in the human development index, economic output, health and education indicators. In addition to remoteness following issues are of high priority**\n- Lack of a unified regional approach to economic development efforts: many individual initiatives fail to gain appropriate traction due to their limited scope, limited support and lack of centralized planning\n- Naturally available resources - water, nature, agricultural land and products are not utilized to their full potential, leaving the areas of food production, production of commercial goods, development of eco-tourism untapped as sources of revenue generation for the local population.\n- Medical services – access to and availability – are highly limited for a population of 225,000 in the greater area including 17 municipalities from 4 surrounding districts (Bajura, Accham, Mugu, Humla)\n- Malnutrition and poverty are highly endemic among certain communities\n- Lack of local workforce: Missing economic, educational and professional development opportunities have led to mass migration of the youth and especially males to places of perceived opportunity: big cities in Nepal, India and the Middle East. \n- Lack of basic infrastructure including well developed roads, water supply systems and tourism infrastructure\n\n\nDespite these challenges, the areas offers unique opportunities and resources, which, once sustainably and responsibly harnessed, can lead to long-term improvements of society, economic and health parameters in the region. As a matter of fact, the region has not undergone many steps of harmful transformations visible inurban, highly populated areas of Nepal including severe environmental pollution, overcrowding and non-sustainable development. These opportunities include:\n- Access to pure and uncontaminated mountain water\n- Fertile land at altitudes suitable for agricultural development, food and raw material production\n- Natural beauty for eco-topurism development.\n\n### Baseline Survey (2024)\n- **Accham and Bajura**: Unique resources (pure water, fertile land, natural beauty)\n- **Challenges:**\n  - Lack of unified regional economic development\n  - Underutilized natural resources\n  - Endemic poverty and malnutrition\n  - Mass migration due to lack of opportunity\n\n### Project Goals\n1. Connect people to local industrial and economic activities\n2. Launch and expand economic opportunities\n3. Build knowledge in agriculture, water management, and eco-tourism\n4. Preserve traditional culture\n5. Improve health outcomes and service quality\n\n### Components\n\nAGRICULTURE, ECO-TOURISM AND ORGANIC FOOD PRODUCTION\n- Training programs to support permaculture, organic farming and food production, integrated pest + water management, off-season vegetable farming\n- Build knowledge and skill among community members with regards to self reliance,  agro-tourism and food habits. \n- Build knowledge about business operations, accessing government support programs and build financial literacy\n- Knowledge transfer to schools and youth\n\nBUSINESS DEVELOPMENT\n- Community integration and small business development through a microloan program, entrepreneurial and equipment support and establishing connection to the marketplace\n- Connecting to the market for sales of local organic agriculture and handmade industrial products.\n- Empowering local entrepreneurial activities through targeted investments\n- Use locally available resources to develop new businesses: adventure travel, water sales and cultural traditions for eco-tourism\n\nHEALTH PROMOTION AND ENVIRONMENTAL PROTECTION\n- Mother's groups the and the organization of female community health volunteers are powerful grassroots level organizations with a clearly defined role within their community as well as within the health system. These groups have been formed by the government of Nepal as a response to the geographical and logistical challenges encountered in healthcare delivery. We will mobilize these groups to become ambassadors of their environment and protectors of the natural resources to PREVENT AND REDUCE pollution, PROTECT forests and water sources while PROMOTING health behaviors.\n- Health promotion through capacity building among community based health providers, coordinating community health services with governmental health institutions and development of a community based, telehealth monitoring system. We plan to systematically connect with mother's groups and FCHV groups from all wards for bidirectional messaging with regards to health promotion, community health awareness, health screening and preventive activities, identification and referral off women and children 4 prenatal care, post Natal care, nutritional screening and identification of nutritional deficiencies. We plan to integrate the health promotion activities with curative services provided by the local hospital and referral centers, shorten the time required for patients to receive definitive treatment and achieve greater coverage of health prevention activities\n
bd92f4d7-62c9-4308-9435-4cf3675f59a5	b4024d9b-efea-45b0-85f9-956aa6b070df	Kolti Referral Hospital - Western Nepal	Upgrading the current Primary Health Center in Kolti to a 50-bed hospital providing emergency surgical, maternity, pediatric and general medical services.	Kolti, Budhinanda Municipality, Western Nepal	2025-2027	active	$10,000	225,000 population across 17 municipalities	{"50-bed hospital","Emergency services","Maternal care","Pediatric care"}	\N	/uploads/images/file-1753936811918-yq5svsuskmf.jpeg	0	\N	\N	kolti-referral-hospital-western-nepal	2025-07-30 17:36:39.6+00	2025-07-30 17:36:39.6+00	## Overview\n\n**Goal:** Upgrade the current Primary Health Center in Kolti to a **50-bed hospital** providing emergency surgical, maternity, pediatric, and general medical services to a population of **225,000**.\n\n### Key Features\n- **Public-private-academic partnership**\n- **Location:** Kolti, Budhinanda municipality\n- **Partners:** 17 municipalities from 4 districts\n- **Integration:** Linked with Dhulikhel Hospital outreach centers\n- **Community Development Center:** Economic, agricultural, and educational programs\n\n### Services\n- **CEONC:** Comprehensive emergency obstetric, neonatal intensive care\n- **Emergency room:** Trauma, cardiovascular, obstetric, dental\n- **General medical:** Laboratory, radiology, skilled care, operating room\n- **Preventive:** Prenatal, postnatal, nutrition, cancer screening, dental\n- **Community health programs**\n\n### Financing\n- **Capital investment:** $2–2.5 million\n- **Annual operating costs:** $300,000–$400,000\n- **50% construction and all operational costs covered by government after construction**\n\n### 2025 Activities\n- Hospital operations planning\n- Financial feasibility assessment\n- Secure commitments from local and central government\n- Community engagement and planning
14445908-1784-4c5c-b067-b01e5fd86ea4	c4d3610a-7401-49c1-af32-b0d3c139f8a1	Overview: GEI consultation and scientific advisement	GEI EXPERT CONSULTANCY SERVICES\n\nGEI provides training, management and consultancy services in a variety of areas with the overall goal to PROMOTE HEALTH AND PRODUCTIVITY by utilizing green technologies and community participatory approaches. \n\nGEI works with local governments and leaders, partner organizations and businesses TO BUILD CAPACITY in the areas of health promotion, green technologies and business development.\n\nOur team has over 3 decades of HANDS-ON OPERATIONAL EXPERIENCE to lead, implement, train and collaborate with organizations in the activities outlined below. GI features a highly qualified and experienced team to achieve programmatic goals in a timely fashion.\n	worldwide		completed			{}	\N	/uploads/images/file-1755707542989-xmfqde78qi9.webp	0	\N	\N	overview-gei-consultation-and-scientific-advisement	2025-08-20 16:27:00.249+00	2025-08-20 16:27:00.249+00	\n1.\tMATERNAL NEONATAL HEALTH: we are Master trainers in global training and health care capacity building programs\n- Community health worker training package\n- High risk newborn training package\n- Operations, quality improvement and  management of health facilities: QI tools for small health facilities\n- Health worker training package: Essential Newborn Care 1 & 2; Helping mothers survive training\n\n\n2. GAP ANALYSES AND STRATEGIC IMPLEMENTATION PLANNING\n- Team building\nDrivers\nAchieve Change\n\n3. DESIGN FOR IMPACT\n- Human centered design planning\n\n\n4. GREEN TECH AND BUSINESS DEVELOPMENT\n- Clean water: Water purification systems\n- Plastic waste recycling\n\n\n5. PROGRAM MANANEGMENT, MONITORING AND EVALUATION: Our academic team members has 2 decades of experience carrying out assessment in 3 continents\n- Community health needs assessment\n- Health facility assessment\n- Structured health system assessment\n- Economic assessment\n- WASH assessment\n- Nutrition assessment\n\n\n6.\tLIVELIHOOD AND ECONOMIC DEVELOPMENT\n- Agriculture\n- Goat raising\n- Financial literacy training\n- Vocational training\n- Ecotourism development\n\nPlease contact us for details\n\n\n
fa72ef99-413c-4e53-91fb-2bc3eee033f4	c4d3610a-7401-49c1-af32-b0d3c139f8a1	Baseline community health and economic assessment – Helambu, NEPAL	In collaboration with Tsering’s fund, a not-for-profit organization based in the US, we carried out a baseline health and community needs assessment in anticipation of a future health and economic development program. Our team conducted a comprehensive health capacity and and household-based inquiry to determine community needs and gaps in 11 domains.	Helambu	2024	completed	16,000	17,000	{}	\N	/uploads/images/file-1755719356473-hnr1ax3156f.png	0	\N	\N	baseline-community-health-and-economic-assessment-helambu-nepal	2025-08-20 19:43:22.507+00	2025-08-20 19:43:22.507+00	## Introduction\n\n** We performed a baseline assessment in 11 domains including one health services and community needs: The health service assessment consisted on evaluating the operational readiness of existing health facilities, community perceptions and experiences with regards to health services received and household based analyses to understand the economic, social, cultural and environmental context of life. We utilize standardized, previously validated survey tools adapted to the local context.**\n\n### Project Goal: We evaluated following domains:\n- THE HEALTH SERVICE ASSESSMENT DESCRIBES: \n(1) Essential infrastructure; (2) Staff availability; (3) Staff qualifications; (4) Essential equipment, supply chain and logistics; (5) Quality of care and health facility management; (6) Medical records and data. \nTHE COMMUNITY ASSESSMENT PROFILES \n(7) household demographics, structure, cultural beliefs and condition of the home; (8) Household economics; (9) Nutrition status, WASH status; (10) Community care seeking, trust, health service perception; (11) Peripartum care evaluation\n\n### Activities and Results\n1. ** Prenatal care services: among all the mothers, 33.56 had birth preparedness plan, 76.51% mothers screened for Anemia, 98.66% mothers measured Blood pressure and 95.30% mothers checked Urine Sample during their recent delivery**\n   - \n2. **61.74% of the mothers had their delivery on birthing centers of the hospitals whereas 36.91% of the delivery were done in hospitals.**\n   - \n3. ** Out of the 149 mothers screened, 63.76% of the delivery were attended by the skill birth attendants**\n   - \n4. **Among the 149 mothers surveyed, 95.30% of the mothers had no problems during the delivery however 4.70% of the mothers had problems like over bleeding, breech birth, over pain, faint, infection etc. Similarly, 8.7% of the mothers reported that they almost died during the delivery**\n   - \n5. **The 8.66% of the newborns were identified as healthy babies however 11.41% of the newborns were identified as low birth weight since early marriage, lack of balanced diet, awareness on healthy living and early delivery seems to be a major problem in Helambu district**\n\n6. ** During the last 12 months, out of total surveyed mothers 15.44% of the children's were reported with toothaches, 12.75% of the children's were reported with the bleeding gums and 9.40% of the children's were reported with the tooth decay or of their children.**\n\n7. ** Out of the total contributors in the surveyed 150 households of Helambu Rural Municipality, 59.4% of the income were done locally from jobs, farming, businesses, startups etc. whereas 40.6% of the income were made through the remittances.**\n\n8. **None of the household were found to have used the methods of water purification. Although small cloth is used during the jar filling to avoid sand, no specific measures of water purification are applied.**\n\n9. **YOU MANAGE WHAT YOU MEASURE: WE MEASURE IMPACT**\n   - Detailed program reports are available upon request. Please contact us for more information\n
4d810120-7c00-418f-ad51-9fbd6757252b	c4d3610a-7401-49c1-af32-b0d3c139f8a1	Rapid Assessment Survey And Household Economic Analysis And Needs Assessment: Accham And Bajura, NEPAL	In collaboration with the Social Welfare Association Nepal (SWAN) fund, a not-for-profit organization based in Nepal, we carried out a community ecnomic needs assessment in anticipation of a future health and economic development program. Our team conducted a comprehensive household-based inquiry to determine community needs, economic opportunities and areas of growth	Accham, Bajura	2023-2024	completed	25,000	200,000	{}	\N	/uploads/images/file-1755720397257-czqdjfau0ce.jpeg	0	\N	\N	rapid-assessment-survey-and-household-economic-analysis-and-needs-assessment-accham-and-bajura-nepal	2025-08-20 19:51:53.917+00	2025-08-20 19:51:53.917+00	## Introduction\n\n** We performed a baseline assessment in 5 domains and household based analyses to understand the economic, social, cultural and environmental context of life. We utilize standardized, previously validated survey tools adapted to the local context.**\n\n### Project Goal: We evaluated following domains:\nWe conducted a cross-sectional baseline survey in 2024 across all ten local government units of Achham District, which comprise three municipalities (Mangalsen, Kamalbazar, and Sanfebagar) and seven rural municipalities (Bannigadhi Jayagadh, Chaurpati, Dhakari, Mellekh, Panchadewal Binayak, Ramaroshan, Turmakhad). Each of these units functions as an administrative area with several wards (villages) under it. The study area ranges from relatively accessible town centers like Mangalsen (the district headquarters) to very remote hill villages accessible only by foot trails. Given this diversity, the baseline survey was designed to capture both common district-wide indicators and site-specific nuances.\n\nASSESSMENT PROFILES \n\nThe total population covered by the survey was 205,905 across the 10 municipalities, with population densities ranging from 60 to 238 people/km² and mostly negative annual growth rates, indicating youth out-migration. \n\nAverage personal annual income varied notably between municipalities (NPR 157,000–214,000), and remittances were a major income source in over half of households, aligning with national trends of labor migration in rural Nepal (over 55% households receiving remittances). \n\nAll municipalities had basic health posts offering antenatal care and delivery services; however, none had resident doctors or surgical obstetric services at local level. Maternal health service coverage (at least one prenatal care visit) ranged from 70% to 85%, generally higher in municipalities with better infrastructure and access. \n\nAccess to improved drinking water sources was high (80–90% of households), yet improved sanitation (latrine access) lagged at 55–72%, below the national basic sanitation coverage (~62%). \n\nChild nutrition emerged as a concern: qualitative diet recalls indicated low dietary diversity, and external evidence suggests over half of children in similar rural areas are undernourished or micronutrient-deficient. \n\nCommunity perceptions highlighted needs in livelihood opportunities, irrigation, and health facility upgrades.\n\nConclusions: Significant disparities exist within Achham District in income, health service coverage, and sanitation. Encouragingly, even the least-served communities have attained a moderate level of maternal health service utilization, but gaps in service quality and WASH infrastructure remain. \n\nThese findings underscore the importance of multi-sector interventions: improving rural health facilities (with skilled staff and emergency obstetric capability), strengthening community health worker programs, and addressing WASH deficiencies to improve health and nutrition outcomes. Aligning local development plans with these baseline indicators and evidence-based strategies—such as professionalized community health worker programs and sustained hygiene promotion—will be critical to achieving Nepal’s Sustainable Development Goals in this historically underserved region.\n\n\n**YOU MANAGE WHAT YOU MEASURE: WE MEASURE IMPACT**\n   - Detailed program reports are available upon request. Please contact us for more information\n
69fdb8fa-0b1e-4115-8775-da2a4b356ce5	b4024d9b-efea-45b0-85f9-956aa6b070df	Altitude and Anemia Prevalence: A socio-geographic analysis from three districts of Nepal	Anemia is a pervasive public health challenge in Nepal and is associated with significant morbidity and mortality. Reporting of anemia rates and anemia severity in Nepal is based on standard WHO classification criteria for measured HgB levels according to gender, pregnancy status and age. Living at high altitude influences hemoglobin levels and therefore the WHO recommends that a HgB correction factor should be applied to measurements taken of high altitude residents. We describe the rates of anemia before and after application of the WHO recommended altitude correction factor in 3 districts of Nepal.	Humla, Solukhumbhu, Sunsari, Nuwakot	2024	completed	12,000	8,000	{}	\N	/uploads/images/file-1755795692537-b7paavpwef.png	0	\N	\N	altitude-and-anemia-prevalence-a-socio-geographic-analysis-from-three-districts-of-nepal	2025-08-21 16:55:41.216+00	2025-08-21 16:55:41.216+00	### Methodology\nIn this cross-sectional quantitative study we utilized data obtained by Nepal based medical teams during community health screening events in 3 districts of Nepal: Solukhumbhu (Pasang Lhamu RM), Humla (Sarkeghat M); Nuwakot (Belkotgadhi RM). We abstracted demographic information, location of residence and measured hemoglobin values from medical records and applied WHO standard classification criteria for anemia. In addition, we applied the WHO altitude correction criteria to adjust measured HgB values for resident’s altitude. We report rates of anemia, anemia severity before and after altitude correction in 3 distinct districts of Nepal. We used the Fisher Exact test to determine significance. \n\n### Results \nWe reviewed 2639 hemoglobin tests obtained in Humla (159); Solukhumbu (828), Nuwakot (1652). After adjusting HgB values for the altitude of residence, anemia prevalence rates increased from: 28% to 76% (Humla); 11% to 60% (Solukhumbhu); 60% to 80% (Nuwakot) [p<0.01]. Anemia was highly prevalent in both genders but 9% higher among women [p<0.05]. Janajati and Sherpa demographic categories experiences similar anemia rates. Women of reproductive age and females under 12 had the highest anemia rates. After application of the WHO altitude correction, rates of severe anemia increased from 2% to 16% across all districts. \n\n### Conclusion \nReporting rates of anemia without applying the WHO recommended correction factors for high altitude residents may result in underreporting of anemia prevalence and severity in populations residing at elevations above 1500m. Re-examination of national NDHS anemia data may be warranted to align distribution of resources of public health resources with anemia prevalence rates.\n
55fccdb9-cb57-40c9-a10b-b2c3079977da	b4024d9b-efea-45b0-85f9-956aa6b070df	Innovation in Anemia Prevention, Treatment and Screening	Pilot testing of AI-powered screening tool to detect and manage anemia in Nepal using cast iron cookpots.	Nuwakot, Solukhumbhu, Humla Districts, Nepal	2025-2026	active	$15,000	3,000+ screened individuals	{"AI screening tool validation","Cast iron cookpot intervention","Community-based screening"}	\N	/uploads/images/file-1756089770675-0g8sl7reznl7.png	0	\N	\N	innovation-anemia-prevention-treatment-screening	2025-07-30 17:36:39.609+00	2025-07-30 17:36:39.609+00	## Overview\n\n**In 2025, GEI will pilot a novel, AI-powered anemia screening tool in Nepal, combined with a new approach to treat and prevent anemia using cast iron cookpots.**\n\n### 2024 Findings\n- Screening is intermittent and limited\n- Community screening uses "color cards" (inaccurate)\n- IFA (iron-folic-acid) provided, but no follow-up\n- Anemia distribution is not uniform; high-risk areas need long-term programs\n\n### Baseline Screening Results\n- **Nuwakot:** 1659 screened, 68% anemia overall\n- **Solukhumbhu:** 830 screened, 64% anemia overall\n- **Humla:** 159 screened, 22% anemia overall\n\n### The Tool\n- **Monere.ai**: AI-powered anemia screening app (NiADA)\n- Non-invasive, smartphone-based, 5-second test\n- No need for expensive or invasive equipment\n\n### Pilot Study Design\n1. Validate NiADA vs. lab results\n2. Qualitative research and household surveys\n3. Test cast iron pots for anemia reduction\n\n### Significance\n- Low-cost, community-based screening\n- Immediate policy impact via collaboration with Nepal National Health Research Council
ba2e6672-ab1d-4eda-b99d-5edaf94d7ed2	c4d3610a-7401-49c1-af32-b0d3c139f8a1	Impacts of Ambient Air Pollution and Heat Exposure on Reproductive, Maternal, Neonatal, Child, and Adolescent Health (RMNCAH) Outcomes in Nepal	Environmental stressors such as air pollution and extreme heat events are emerging as significant threats to reproductive, maternal, neonatal, child, and adolescent health (RMNCAH) outcomes globally. Despite increasing climate vulnerability in Nepal, there remains limited consolidated evidence to inform governments policy makers on how to effectively facilitate environmental health integration into health programs and surveillance systems. 	Kathmandu, Nepal	4 months	active	6,000		{}	\N	\N	0	\N	\N	impacts-of-ambient-air-pollution-and-heat-exposure-on-reproductive-maternal-neonatal-child-and-adolescent-health-rmncah-outcomes-in-nepal	2025-08-25 03:13:49.383+00	2025-08-25 03:13:49.383+00	Through this project we will \n(1) perform a systematic review of existing, publicly available air pollution and air temperature data, describe regional, seasonal and microclimatic determinants\n(2) evaluate the impact and associations between air pollution and heat exposure on reproductive and maternal-neonatal-child health outcomes. \n\nThe output of this analysis will include geospatial analysis overlaying environmental stressors with RMNCH outcomes, which will be a first in the country of Nepal. Ultimately we will provide an evidence-based guidance to inform future research, policy, and health system interventions, including the integration of environmental indicators into Nepal's DHIS2 Climate & Health Analytics Platform (CHAP).
\.


--
-- Data for Name: publication_authors; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.publication_authors (id, publication_id, author_id, author_order, created_at) FROM stdin;
7a7a5382-2409-4bb3-8a92-215036acc15e	174a7d31-1661-4440-b21a-6f08ddc10a5b	7fc0daeb-025d-4a86-99f4-942f10fa12c8	1	2025-08-21 21:42:46.315+00
87e00ecf-b0fa-4f34-aaab-0c7655787ef5	174a7d31-1661-4440-b21a-6f08ddc10a5b	732db079-bfae-48e4-b984-35fb9a8ba4bf	2	2025-08-21 21:42:46.315+00
523c18f1-299f-411b-80dc-1b27f216b4b5	174a7d31-1661-4440-b21a-6f08ddc10a5b	9e6a1e9d-3335-4d18-acbd-95c31204705d	3	2025-08-21 21:42:46.315+00
8417dbb2-f4d0-4fa6-a3f2-65ef63051bf2	174a7d31-1661-4440-b21a-6f08ddc10a5b	9c6eca78-c543-454c-87f4-5ef74f99faa7	4	2025-08-21 21:42:46.315+00
0d90b166-c1d7-41f1-92ad-fda09f686f87	174a7d31-1661-4440-b21a-6f08ddc10a5b	7e95787f-a4e6-43fe-91ca-cdfe88cc51f1	5	2025-08-21 21:42:46.315+00
099be9dc-e5ea-4d36-a3eb-b039444f8a49	174a7d31-1661-4440-b21a-6f08ddc10a5b	1cbe1451-91f7-42a2-a8a3-ea32961c89d4	6	2025-08-21 21:42:46.315+00
601a05eb-14f5-493e-8b0b-e1cc85f16810	174a7d31-1661-4440-b21a-6f08ddc10a5b	3ee63bcc-66b4-43e3-8322-516fdd525e4e	7	2025-08-21 21:42:46.315+00
e26e222e-3bb3-4947-836f-c6821e4171e8	174a7d31-1661-4440-b21a-6f08ddc10a5b	161c83a0-9e8d-4000-b65c-6bcae3d10b1c	8	2025-08-21 21:42:46.315+00
\.


--
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.publications (id, title, abstract, journal, publication_year, publication_type, doi, pdf_url, citations, category_id, is_featured, created_at, updated_at) FROM stdin;
8d83b15a-0f57-4097-b829-c6913806d16f	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	15f737ec-146a-4180-a692-a656efda017c	t	2025-07-30 18:28:17.231+00	2025-07-30 18:28:17.231+00
67344119-1802-4b10-921d-fcea6f946f76	Non-Invasive Anemia Detection for Maternal Health in Resource-Limited Settings	This publication documents GEI's validation and field trials of a non-invasive hemoglobin screening device for pregnant women in high-altitude settings.	Global Health Diagnostics Journal	2023	Journal Article	10.1234/gei.2023.004	https://example.com/papers/non-invasive-anemia.pdf	25	4ef0ba99-0369-42d9-accc-eb5017972ae8	t	2025-07-30 18:28:17.242+00	2025-07-30 18:28:17.242+00
de22dac0-2e66-40db-8a87-cc4f9ea12784	Scaling Water Purification Technologies in High-Altitude Nepal	This paper evaluates the deployment and impact of modular water purification systems co-developed by GEI and Dhulikhel Hospital in remote Himalayan communities.	Journal of Environmental Health Innovation	2023	Journal Article	10.1234/gei.2023.001	https://example.com/papers/water-purification-nepal.pdf	12	15f737ec-146a-4180-a692-a656efda017c	t	2025-07-30 18:29:25.807+00	2025-07-30 18:29:25.807+00
755ff707-8687-489e-b92d-cb36bee612bf	Community-Based Approaches to Anemia Management in Rural Nepal	This publication presents results from field-based anemia screening and treatment programs led by GEI in Accham, Nuwakot, and Bajura districts.	Maternal and Child Nutrition Review	2022	Peer-Reviewed Article	10.1234/gei.2022.002	https://example.com/papers/anemia-community-nepal.pdf	18	4ef0ba99-0369-42d9-accc-eb5017972ae8	t	2025-07-30 18:29:25.81+00	2025-07-30 18:29:25.81+00
ee6b9b2f-bc97-4861-be85-32beec95b719	Green Job Creation through Waste-to-Value Innovation in Nepal	The study explores how GEI's eco-business model, including plastic reuse and compost production, contributes to sustainable livelihoods in Western Nepal.	Journal of Sustainable Economic Development	2024	White Paper	10.1234/gei.2024.003	https://example.com/papers/waste-to-value.pdf	0	7c117d00-ab58-4eb1-ad9a-cc460742a43f	t	2025-07-30 18:28:17.24+00	2025-07-30 18:28:17.24+00
174a7d31-1661-4440-b21a-6f08ddc10a5b	1.\tDetermining Consensus Alignment and Barriers of Neonatal Thermal Management in Nepal Using a Modified Delphi Process. Tomlin B, Lamichhane B, Dhungana R, Richards G, Grubb P, Mahato A, Fassl B, Judkins A.	Determining Consensus Alignment and Barriers of Neonatal Thermal Management in Nepal Using a Modified Delphi Process\n\nAbstract\nObjective. Neonatal hypothermia is a worldwide health burden with an incidence ranging from 32% to 85% in hospitals and 11% to 92% in homebirths. It is prevalent in Nepal and associated with increased morbidity and mortality. The study objective was to identify key practice standards of newborn thermal management in Nepal. Methods. Our subjects included 6 lead newborn physicians from major birthing centers in Kathmandu. A modified Delphi process was used to identify the top 5 key practice standards for newborn thermoregulation in the hospital, health post, and home, compiled from 14 World Health Organization recommended practices. Results. There was consensus in all ranked practices except using radiant heat sources in the hospital and performing Kangaroo Mother Care in the homebirths. Comments conveyed that interventions during the immediate delivery phase were most impactful and feasible. Conclusion. Nepali physicians prioritized thermoregulatory practices during the immediate resuscitation period over the post-resuscitation period.	Glob Pediatr Health. 2024 Oct 17;11	2025	Journal Article	 DOI: 10.1177/2333794X241273300	\N	0	4ef0ba99-0369-42d9-accc-eb5017972ae8	f	2025-08-21 21:42:46.302+00	2025-08-21 21:42:46.302+00
b43d54a5-1e2d-4059-a252-06cd991d67e1	5. Altitude and Anemia Prevalence: A socio-geographic analysis from three districts of Nepal. Allison Judkins, Leela Khanal, Bibek Lamicchane, Paribesh Bidari, Rabin Dithal, Spencer Crocker, Bernhard Fassl	Background \nAnemia is a pervasive public health challenge in Nepal and is associated with significant morbidity and mortality. Reporting of anemia rates and anemia severity in Nepal is based on standard WHO classification criteria for measured HgB levels according to gender, pregnancy status and age. Living at high altitude influences hemoglobin levels and therefore the WHO recommends that a HgB correction factor should be applied to measurements taken of high altitude residents. We describe the rates of anemia before and after application of the WHO recommended altitude correction factor in 3 districts of Nepal.\nMethodology\nIn this cross-sectional quantitative study we utilized data obtained by Nepal based medical teams during community health screening events in 3 districts of Nepal: Solukhumbhu (Pasang Lhamu RM), Humla (Sarkeghat M); Nuwakot (Belkotgadhi RM). We abstracted demographic information, location of residence and measured hemoglobin values from medical records and applied WHO standard classification criteria for anemia. In addition, we applied the WHO altitude correction criteria to adjust measured HgB values for resident’s altitude. We report rates of anemia, anemia severity before and after altitude correction in 3 distinct districts of Nepal. We used the Fisher Exact test to determine significance. \nResults \nWe reviewed 2639 hemoglobin tests obtained in Humla (159); Solukhumbu (828), Nuwakot (1652). After adjusting HgB values for the altitude of residence, anemia prevalence rates increased from: 28% to 76% (Humla); 11% to 60% (Solukhumbhu); 60% to 80% (Nuwakot) [p<0.01]. Anemia was highly prevalent in both genders but 9% higher among women [p<0.05]. Janajati and Sherpa demographic categories experiences similar anemia rates. Women of reproductive age and females under 12 had the highest anemia rates. After application of the WHO altitude correction, rates of severe anemia increased from 2% to 16% across all districts. \nConclusion \nReporting rates of anemia without applying the WHO recommended correction factors for high altitude residents may result in underreporting of anemia prevalence and severity in populations residing at elevations above 1500m. Re-examination of national NDHS anemia data may be warranted to align distribution of resources of public health resources with anemia prevalence rates.\n	NHTC	2025	Technical Report	\N	/uploads/pdfs/pdf-1755795001928-kx93064dtid.pdf	0	4ef0ba99-0369-42d9-accc-eb5017972ae8	f	2025-08-21 16:50:02.2+00	2025-08-21 16:50:02.2+00
80c9b925-26e0-4e37-ba9c-263cc76d8944	2. Childbirth in Nepal: A Situation Analysis from Accham District. Mabee R, Matson S, Lamichhane B, Rawal S, Rawal, K, Fassl B, Judkins A.	Purpose of Study Background: Neonatal deaths in low resource environments are among the most common preventable causes of mortality. High neonatal mortality rates are reported in remote mountainous regions of Nepal. The purpose of this project was to conduct a health facility and peripartum healthcare service delivery analysis to identify opportunities for improvement in future projects. \n\nObjectives: 1) determine available functional equipment and infrastructure in birthing centers and 2) describe health service provision to women in labor during childbirth. \n\nMethods Used: The study took place between September -December 2023 in Accham district of Nepal and was part of a baseline, pre-intervention survey conducted before implementing a comprehensive maternal-child health survival program in the district. A team of Nepal based public health professionals conducted a peripartum survey of recently delivered women (RDW) within the last 3 years. They also conducted health facility surveys of birthing centers using standardized questionnaires and checklists abstracted from Nepal government survey tools. \n\nSummary of Results 530 RDW women, reporting 1157 pregnancies and 14 health facilities were surveyed in 10 municipalities (Table 1). 98% of women delivered in a health facility; 82% of deliveries had a trained provider present. 82% delivered in a birth center, and for 37% of women that gave birth in a birthing center, it took over 90 minutes to reach by walking (Figure 1). Among 14 facilities, 6 (43%) had a neonatal bag and mask, 1 had oxygen, 7 (50%) had infant warmers. 4 (28%) of facilities had leaking roofs, 6 (42%) had broken walls or windows;10 (70%) had running water and 13 (93%) had intermittent electricity. Regarding access to care, 33.6% of women reported difficulty accessing prenatal care. Additionally, 81% of respondents did not receive a health care worker visit within 1 week of delivery. There were 72 child deaths were reported (6%), with only 66 answers regarding when the child died. Of the deaths reported, 36% were during pregnancy, 5.5% during labor, and 50% in the neonatal period. \n\nConclusions Key issues that arise include health worker visit within 1 week of delivery, addressing low birth weight. SBA availability as well as access to prenatal and postnatal care could be further strengthened. Birthing center facility upgrades also need to be addressed. Additional investigation regarding the etiology of the pregnancy and child losses would provide additional insight into potential gaps in care delivery.	Journal of Investigative Medicine	2025	Journal Article	\N	\N	0	4ef0ba99-0369-42d9-accc-eb5017972ae8	f	2025-08-21 23:02:05.066+00	2025-08-21 23:02:05.066+00
b7495c59-b78d-412d-a80c-b2ddd2a29731	Diagnoses, treatments and outcomes in a rural neonatal intensive care unit in Gujarat, India.  Arredondo D, Butt MF, Ruf AM, Panchal H, Pathak P, Patel S, Malkan H, Yadav K, Patel N, Judkins A, Fassl B	Purpose of Study: The neonatal mortality rate in rural India is twice that in urban areas, where\nadmission to a newborn intensive care unit is commonly not an option. As a pilot project in\ncollaboration with the government, Mota Fofalia Community Health Center (MFCHC), located\nin a rural community in Gujarat, India, established a small NICU in 2016 to fill the gap of\nintensive care services in rural areas. The purpose of this study is to describe the patient, disease, treatment, and outcome characteristics of patients admitted to a rural Indian NICU.\n\nMethods Used: The retrospective study took place at MFCHC in May 2023. A team of students\nfrom NEOMED abstracted medical record information of infants admitted to the NICU from\n2016-2023 from the patient logbook, which documents basic demographic admission, diagnosis, treatment and medical outcomes.\n\nSummary of Results: 922 patients (45% female) were admitted to the NICU from January 2016\nthrough June 2023: 21% were preterm births, mean birth weight: 2.39kg, mean admission\nweight: 2.27kg, and mean age at admission: 5.19 days. Most common diagnoses: neonatal\njaundice (457/50%), low birth weight (236/25.8%), and respiratory distress (80/8.8%). 7 patients (0.76%) died and 52 (5.64%) were referred to higher centers; most common diagnoses of deaths and referrals were low birth weight and respiratory distress syndrome.\n\n\nConclusions: Neonatal jaundice, treated with phototherapy, is the most common condition at\nMFCHC’s NICU. Rural NICU care in India is feasible and may help reduce overcrowding in\nurban centers.	Journal of Investigative medicine	2024	Journal Article	\N	\N	0	4ef0ba99-0369-42d9-accc-eb5017972ae8	f	2025-08-21 23:16:40.396+00	2025-08-21 23:16:40.396+00
5e54bdd8-93ae-4212-bb5a-303baa46ba7a	4. Neonatal hypothermia prevalence in a tertiary referral birthing center in Nepal  Tomlin BD, Mahato A, Bohara N, Bajracharya A, Fassl B, Judkins A, Dongol S	Purpose of Study: Neonatal hypothermia is a massive worldwide health burden with a global\nincidence ranging from 32-85% in hospitals and 11-92% in home births. It has been well-studied that neonatal hypothermia is associated with increased morbidity and mortality. While limited studies are available on the prevalence of neonatal hypothermia in Nepal, the cold climate places newborns at an elevated risk. The World Health Organization recommends various practices that have been shown to prevent hypothermia, including Kangaroo Mother Care (KMC), immediate drying of the infant, early skin-to-skin, and early breastfeeding. Unfortunately, their adoption has not been universal, with one study estimating that only 10% of community births receive proper thermal management, and few studies have been done to assess rates of thermal management and their effect on hypothermia in higher-resource hospital settings in Nepal. The purpose of this study is to quantify the prevalence of neonatal hypothermia and assess the impact of standard thermoregulatory practices in the resuscitation period.\n\nMethods Used: This was a prospective cohort study that was based at Dhulikhel Hospital in\nNepal, an affiliate of Kathmandu University. A convenience sampling of babies > 35 weeks\ngestational age who were admitted to the newborn nursery between January and June of 2023was included in this study. Any thermoregulatory practices were recorded, and an axillary\ntemperature was measured at 1 hour of life as well as complications and discharge information.\nOur primary outcome was hypothermia at 1 hour of life.\n\nSummary of Results: 193 infants were included in this study. 13 infants (6.7%) were preterm\nand 21 infants (10.8%) were less than 2500g. At 1 hour of life, 69 (35.8%) of infants were\nnormothermic, 110 (57.0%) had mild hypothermia, and 14 (7.3%) had moderate hypothermia.\nThose born via C-section had less hypothermia than those born via vaginal delivery (48.3% vs.\n79.8%, p = <0.005). All infants were dried after delivery, 50.2% had early skin-to-skin, 21.2%\nhad Kangaroo Mother Care, and 11.9% had early breastfeeding. Infants who received early skin to-skin were more likely to be hypothermic (78.4% vs. 50.0%, p < 0.005) and those who\nreceived KMC were also more likely to be hypothermic (78.0% vs. 60.5%, p = 0.044). Early\nbreastfeeding appeared to have no impact on 1-hour hypothermia (60.9% vs 64.7%, p = 0.817).\n\nConclusions: A high prevalence of neonatal hypothermia at one hour of life exists in a tertiary\nreferral hospital setting in Nepal. Vaginal delivery, KMC, and early skin-to-skin are all\nassociated with higher rates of hypothermia.	Journal of Investigative Medicine	2024	Journal Article	\N	\N	0	4ef0ba99-0369-42d9-accc-eb5017972ae8	f	2025-08-21 23:05:54.571+00	2025-08-21 23:05:54.571+00
\.


--
-- Data for Name: report_files; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.report_files (id, report_id, filename, original_name, file_path, file_size, mime_type, created_at) FROM stdin;
\.


--
-- Data for Name: report_photos; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.report_photos (id, report_id, filename, original_name, file_path, alt_text, sort_order, created_at) FROM stdin;
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.reports (id, title, description, upload_date, published, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: research_categories; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.research_categories (id, name, slug, description, created_at) FROM stdin;
15f737ec-146a-4180-a692-a656efda017c	Environmental Health & Innovation	environmental-innovation	Research on water and air pollution, waste management, and clean technology innovations for community health and sustainability.	2025-07-30 17:36:39.542+00
4ef0ba99-0369-42d9-accc-eb5017972ae8	Maternal, Neonatal & Child Health	mnch	Studies on maternal and child health, nutrition, and anemia including safe childbirth, essential newborn care, and health systems strengthening.	2025-07-30 17:36:39.545+00
7c117d00-ab58-4eb1-ad9a-cc460742a43f	Inclusive Economic Development	economic-development	Research on poverty alleviation through sustainable livelihoods, women empowerment, green jobs, and community business development.	2025-07-30 17:36:39.548+00
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.stories (id, title, excerpt, content, image, category, author, read_time, featured, created_at, updated_at) FROM stdin;
6dd693d3-712c-4080-b758-354bcf4faf3c	Bernhard's Journey in Nepal	\N	MY GLOBAL JOURNEY\n1993\tFirst visit to Nepal – trekking in the Annapurna region\n1996-1997\tMedical Officer at Scheer Memorial hospital Banepa\n2001\tMedical Officer at Himalaya Rescue association Nepal, Pheriche, Solukhumbhu\n2002-2008\tTechnical consultant: One HEART Worldwide – Tibet maternal child health projects\n2008-2012\tBirthing centers and maternal neonatal emergency training programs in Baglung, Dolpa, Solukhumbhu - Technical consultant: One HEART Worldwide, Global Partners for Child Health, Social Welfare Association Nepal\n2012-2015\tHelping Babies breathe ad Helping Mothers survive training programs: Technical consultant for LDS charities\n2012-2017\tBirthing centers and maternal neonatal emergency training programs in Humla - Technical Consultant Social Welfare Association Nepal\n2015-2018\tHealthcare cacapcity building and medical training programs in rural Kenya\n2017-2022\tNuwakot: Livelihood and healthcare capacity project in Nuwakot district\n2023-present\tAccham and Bajura: GEI - Integrated community development: healthcare capacity building, community economic development, livelihood development\n\nLittle did I know when I arrived in Nepal in 1996 how much a country could shape my life both professionally and personally. I was a recent graduate from medical school in Vienna, Austria, ready to live in and learn about medicine in another country. Not only did my experience in the Nepal shape my professional career and understanding of medicine, but I fell in love with the land and especially the people. I have since returned to Nepal 51 more times and spent a total of over 5 years of my life in the country, in some of the most remote corners such as Dolpa, Baglung, Humla, Solukhumbhu, Nuwakot and many more.\n\nAs I developed my professional medical career, becoming an academic pediatrician and researcher working for various universities in the United states and as a technical consultant for various organizations, I started to understand the potential, the pitfalls and the current state of medical development work. My professional experiences led me to many countries in Africa and Asia where I gained valuable insights from organizations, governments and individuals who became my teachers and ultimately my inspiration to pursue my own path. I was part of projects in which our team of “western experts” taught life saving skills to health workers but failed to recognize that the supply chains to ensure ongoing supply of equipment or consider availability of permanent staff. Throughout those years in Kenya, Nepal, India, Tibet the story kept repeating itself: a well meant effort dealing with a singular medical problem lacks integration into the health system and societal system both of which are required to make it sustainable. But it was not until much later in my career that I truly started to understand the science of systems based capacity building which requires working outside of the health silo and being willing to embrace the complexity of integrating business, behavioral science, logistics and infrastructure and local culture into an integrated development program to work toward goals and deliverables which are defined by the local population. \n\nI want to share two formative experiences: \n-\tThe Social Welfare Association Nepal and their charismatic leader Mr. Krishna Karki taught me many lessons about the power of community level entrepreneurship developments linked with health capacity building. The changes I have personally witnessed in Baglung district, spearheaded by SWAN helped me open up my narrow medical mind to embrace a much wider view of sustainable development work. Quietly and without the fanfare of many other organizations, SWAN worked diligently, persistently towards improving the lives of the people of Baglung. Results were not immediate, but every year that I returned, progress was visible in all aspects of life - health, household income, education and opportunity. Sustainable change takes time and good outcomes are inevitable as long as the program inputs are genuine and people focused.\n-\t2017 was a year of profound change in that I got to know the family of the Crocker catalyst foundation, based in Salt Lake City, Utah.  The philanthropic interest focused on supporting integrated community development work by promoting sustainable green technologies come on local economic development and healthcare capacity building into a single effort. Mr. Spencer Crocker became a student of mine obtaining a Master degree in global health innovation, yet I learned at least as much from him as he learned from all the coursework: Most importantly, I came to realize that medical experts commonly fail to recognize the interconnectedness of economics and health, of culture and care access of poverty end limitations in societal development.\n\nWhen Spencer founded the Global Envirohealth Initiative (GEI) it was an easy decision to join his team and bring health science, business development and planetary health together under a single umbrella: Identified integrated community development as preferred strategy combining health care development, economic growth and environmental preservation based on science and respectful locally driven development. \n	https://www.geiglobal.org/uploads/stories/image-1753972135231-xicakj8r8h.jpg	\N	Bernhard Fasal 	\N	f	2025-07-30 18:46:47.47+00	2025-07-30 18:46:47.47+00
2982b8df-12da-4da4-a751-86f44f9eac7e	Origins of GEI	\N	Spencer founded GEI, mission-driven operational foundation dedicated to community-led, sustainable development across the globe. From day one, he made a personal commitment to take no salary from the organization—an intentional decision rooted in his desire to keep GEI’s mission focused entirely on bottom-up impact in underserved communities.\n\nHis journey began with a difficult but essential realization: traditional charitable models often fail to generate sustainable outcomes. Time and again, Spencer observed well-intentioned projects—schools, hospitals, water systems, food programs—fall into neglect the moment outside funding ended. Many charities and programs that he personally supported eventually unraveled. Despite good intentions, the common theme for many charities is the lack of long-term sustainability, leaving communities without lasting change.\n\nWhat also greatly concerned Spencer was the unintended consequences of certain philanthropic efforts. He witnessed millions of charitable dollars being spent on community sports facilities in regions where children were dying from diarrheal disease and malnutrition. He saw poverty-alleviation programs that created short-term jobs through factory farming or polluting industries—only to worsen environmental conditions and public health outcomes. These experiences reinforced a simple truth: doing good isn’t enough unless it’s done wisely, holistically, and is guided by data.\n\nThat belief became the foundation of GEI’s mission—not to simply pursue passion projects, but to rigorously design and test integrated solutions that reflect the real, intersecting needs of a community. GEI’s work starts with data-driven diagnostics: identifying the most urgent challenges in each community and developing tailored plans that balance economic opportunity, public health, and environmental sustainability. The goal is to create green jobs that don’t pollute, scale public health programs that can be sustained locally, and build systems that improve lives while protecting the ecosystems on which they rely.\n\nThe turning point came when Spencer partnered with his mentor and friend, Dr. Bernhard Fassl, a physician, researcher, and global health innovator who shared the same vision. Together, they transformed a handful of small, independent projects into a globally focused initiative grounded in three interdependent core pillars: green job creation, healthcare access, and environmental preservation. Their approach is rooted in the belief that healthy people, thriving communities, and a sustainable planet are deeply interconnected—and must be tackled as one.\n\nSpencer desires transformative, long-term change for communities and people who need it most. By empowering local leaders and communities to take ownership of solutions, GEI prioritizes cultural relevance, economic viability, and environmental resilience. Every program is designed not just to help—but to endure.		\N	Spencer Crocker 	5 mins	t	2025-08-14 04:58:08.275+00	2025-08-14 04:58:08.275+00
\.


--
-- Data for Name: timeline_events; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.timeline_events (id, year, title, description, sort_order, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: geiuser
--

COPY public.users (id, email, password, name, role, created_at, updated_at) FROM stdin;
e2eb2d1f-6f25-45aa-aaaf-e2900cc8434f	admin21@gei.org	$2b$10$PoC0QGk1.zZgyU3U91nxU.XAlTZZrysOfW6cEQgokebURGBkWsZbm	Admin User	admin	2025-07-30 17:36:39.53+00	2025-07-30 17:36:39.53+00
\.


--
-- Name: globe_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: geiuser
--

SELECT pg_catalog.setval('public.globe_data_id_seq', 1, false);


--
-- Name: report_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: geiuser
--

SELECT pg_catalog.setval('public.report_files_id_seq', 1, false);


--
-- Name: report_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: geiuser
--

SELECT pg_catalog.setval('public.report_photos_id_seq', 1, false);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: geiuser
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- Name: timeline_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: geiuser
--

SELECT pg_catalog.setval('public.timeline_events_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: faculty faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pkey PRIMARY KEY (id);


--
-- Name: globe_data globe_data_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.globe_data
    ADD CONSTRAINT globe_data_pkey PRIMARY KEY (id);


--
-- Name: program_area_features program_area_features_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.program_area_features
    ADD CONSTRAINT program_area_features_pkey PRIMARY KEY (id);


--
-- Name: program_area_partners program_area_partners_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.program_area_partners
    ADD CONSTRAINT program_area_partners_pkey PRIMARY KEY (id);


--
-- Name: program_area_team_members program_area_team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.program_area_team_members
    ADD CONSTRAINT program_area_team_members_pkey PRIMARY KEY (id);


--
-- Name: program_areas program_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.program_areas
    ADD CONSTRAINT program_areas_pkey PRIMARY KEY (id);


--
-- Name: project_content project_content_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_content
    ADD CONSTRAINT project_content_pkey PRIMARY KEY (id);


--
-- Name: project_custom_fields project_custom_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_custom_fields
    ADD CONSTRAINT project_custom_fields_pkey PRIMARY KEY (id);


--
-- Name: project_media project_media_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_media
    ADD CONSTRAINT project_media_pkey PRIMARY KEY (id);


--
-- Name: project_stakeholders project_stakeholders_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_stakeholders
    ADD CONSTRAINT project_stakeholders_pkey PRIMARY KEY (id);


--
-- Name: project_updates project_updates_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_updates
    ADD CONSTRAINT project_updates_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: publication_authors publication_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.publication_authors
    ADD CONSTRAINT publication_authors_pkey PRIMARY KEY (id);


--
-- Name: publications publications_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_pkey PRIMARY KEY (id);


--
-- Name: report_files report_files_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.report_files
    ADD CONSTRAINT report_files_pkey PRIMARY KEY (id);


--
-- Name: report_photos report_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.report_photos
    ADD CONSTRAINT report_photos_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: research_categories research_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.research_categories
    ADD CONSTRAINT research_categories_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: timeline_events timeline_events_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.timeline_events
    ADD CONSTRAINT timeline_events_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: admins_email_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX admins_email_key ON public.admins USING btree (email);


--
-- Name: authors_email_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX authors_email_key ON public.authors USING btree (email);


--
-- Name: faculty_email_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX faculty_email_key ON public.faculty USING btree (email);


--
-- Name: program_areas_name_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX program_areas_name_key ON public.program_areas USING btree (name);


--
-- Name: program_areas_slug_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX program_areas_slug_key ON public.program_areas USING btree (slug);


--
-- Name: projects_slug_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX projects_slug_key ON public.projects USING btree (slug);


--
-- Name: publication_authors_publication_id_author_id_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX publication_authors_publication_id_author_id_key ON public.publication_authors USING btree (publication_id, author_id);


--
-- Name: research_categories_name_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX research_categories_name_key ON public.research_categories USING btree (name);


--
-- Name: research_categories_slug_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX research_categories_slug_key ON public.research_categories USING btree (slug);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: geiuser
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: program_area_features program_area_features_programAreaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.program_area_features
    ADD CONSTRAINT "program_area_features_programAreaId_fkey" FOREIGN KEY ("programAreaId") REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: program_area_partners program_area_partners_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.program_area_partners
    ADD CONSTRAINT program_area_partners_program_area_id_fkey FOREIGN KEY (program_area_id) REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: program_area_team_members program_area_team_members_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.program_area_team_members
    ADD CONSTRAINT program_area_team_members_program_area_id_fkey FOREIGN KEY (program_area_id) REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_content project_content_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_content
    ADD CONSTRAINT project_content_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_custom_fields project_custom_fields_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_custom_fields
    ADD CONSTRAINT project_custom_fields_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_media project_media_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_media
    ADD CONSTRAINT project_media_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_stakeholders project_stakeholders_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_stakeholders
    ADD CONSTRAINT project_stakeholders_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_updates project_updates_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.project_updates
    ADD CONSTRAINT project_updates_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: projects projects_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_program_area_id_fkey FOREIGN KEY (program_area_id) REFERENCES public.program_areas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publication_authors publication_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.publication_authors
    ADD CONSTRAINT publication_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publication_authors publication_authors_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.publication_authors
    ADD CONSTRAINT publication_authors_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publications publications_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.research_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: report_files report_files_report_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.report_files
    ADD CONSTRAINT report_files_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.reports(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: report_photos report_photos_report_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: geiuser
--

ALTER TABLE ONLY public.report_photos
    ADD CONSTRAINT report_photos_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.reports(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

