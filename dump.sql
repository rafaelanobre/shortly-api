--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 1, 's7toeeowaqP6G', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:09:57.01907');
INSERT INTO public.urls VALUES (3, 1, 'yZwwBnXvMIZYk', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:10:17.828627');
INSERT INTO public.urls VALUES (4, 1, 'iSxPMd0EoATic', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:10:57.225585');
INSERT INTO public.urls VALUES (5, 1, 'iWhMvUxUf6utF', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:14:10.707946');
INSERT INTO public.urls VALUES (6, 1, 'NV-Yi-_Uq_r1H', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:14:30.406362');
INSERT INTO public.urls VALUES (7, 1, '9ZY8xFfTogKVD', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:14:36.680054');
INSERT INTO public.urls VALUES (8, 1, 'T6DEnoQ2as7QL', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:15:20.561824');
INSERT INTO public.urls VALUES (9, 1, 'jGSDfG1a1a5UW', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:17:09.061798');
INSERT INTO public.urls VALUES (10, 1, 'PzazZSYsvNsmF', 'https://github.com/ai/nanoid#readme', 0, '2023-08-05 23:20:18.938861');
INSERT INTO public.urls VALUES (11, 1, 'hpyv9qrEJuyvc', 'https://www.youtube.com/', 0, '2023-08-06 12:01:48.065894');
INSERT INTO public.urls VALUES (13, 1, 'l1zN0xhXhYc4M', 'https://www.youtube.com/', 0, '2023-08-06 12:12:09.466628');
INSERT INTO public.urls VALUES (14, 1, 'L5V5aL5UVDjiT', 'https://www.youtube.com/', 0, '2023-08-06 12:12:30.362846');
INSERT INTO public.urls VALUES (2, 1, 'LcGeYuSRjMUJN', 'https://github.com/ai/nanoid#readme', 3, '2023-08-05 23:09:58.674402');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$7u94nPpBQv.mXcl9sGRKvOviGpPFg/PIS1vqDwH0UQc9oui8naelO', '2023-08-06 20:48:21.464759');
INSERT INTO public.users VALUES (2, 'João Silva', 'joao@example.com', '$2b$10$WgFW2WnZC5oJKvnP4XlvMOUB1./eIWYV.QPgL8ZNQmgtA0RCC3Ywy', '2023-08-06 20:50:14.232105');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

