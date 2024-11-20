--
-- PostgreSQL database dump
--

-- Dumped from database version 14.14 (Homebrew)
-- Dumped by pg_dump version 14.14 (Homebrew)

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    address_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    city character varying NOT NULL,
    country character varying NOT NULL,
    street character varying NOT NULL
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.amenities (
    amenities_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    pool boolean NOT NULL,
    gym boolean NOT NULL,
    spa boolean NOT NULL,
    restaurant boolean NOT NULL,
    bar boolean NOT NULL
);


ALTER TABLE public.amenities OWNER TO postgres;

--
-- Name: availability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.availability (
    availability_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    available boolean NOT NULL,
    "totalRoomsLeft" integer NOT NULL
);


ALTER TABLE public.availability OWNER TO postgres;

--
-- Name: booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking (
    booking_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    room_id uuid NOT NULL,
    "checkIn" date NOT NULL,
    "checkOut" date NOT NULL,
    user_id uuid,
    hotel_id uuid
);


ALTER TABLE public.booking OWNER TO postgres;

--
-- Name: booking_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking_metrics (
    booking_metrics_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    total_bookings double precision NOT NULL,
    cancelled_bookings double precision NOT NULL,
    completed_bookings double precision NOT NULL,
    metrics_id uuid,
    booking_id uuid
);


ALTER TABLE public.booking_metrics OWNER TO postgres;

--
-- Name: credentials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credentials (
    credential_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    user_id uuid
);


ALTER TABLE public.credentials OWNER TO postgres;

--
-- Name: details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.details (
    detail_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    stars double precision NOT NULL,
    rating double precision NOT NULL,
    "imgUrl" character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.details OWNER TO postgres;

--
-- Name: hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotels (
    hotel_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    amenities_id uuid,
    detail_id uuid,
    address_id uuid,
    availability_id uuid
);


ALTER TABLE public.hotels OWNER TO postgres;

--
-- Name: metric_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metric_types (
    metric_type_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    metric_name character varying NOT NULL
);


ALTER TABLE public.metric_types OWNER TO postgres;

--
-- Name: metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metrics (
    metrics_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at date NOT NULL,
    metric_type_id uuid
);


ALTER TABLE public.metrics OWNER TO postgres;

--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    payment_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    amount integer NOT NULL,
    date timestamp without time zone NOT NULL,
    method character varying NOT NULL,
    user_id uuid
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- Name: room_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_files (
    room_file_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    file_url character varying NOT NULL,
    room_id uuid
);


ALTER TABLE public.room_files OWNER TO postgres;

--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    room_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type character varying NOT NULL,
    room_type_id uuid,
    hotel_id uuid
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: rooms_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms_type (
    room_type_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    price numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    currency character varying NOT NULL,
    rooms_left integer NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.rooms_type OWNER TO postgres;

--
-- Name: search_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.search_metrics (
    search_metrics_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    total_searches double precision NOT NULL,
    searches_per_user double precision NOT NULL,
    non_user_searches double precision NOT NULL,
    metrics_id uuid
);


ALTER TABLE public.search_metrics OWNER TO postgres;

--
-- Name: time_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.time_metrics (
    time_metrics_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    session_starts timestamp without time zone NOT NULL,
    session_ends timestamp without time zone NOT NULL,
    session_duration time without time zone NOT NULL,
    session_start_time character varying NOT NULL,
    session_end_time character varying NOT NULL,
    metrics_id uuid,
    user_id uuid
);


ALTER TABLE public.time_metrics OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    lastname character varying NOT NULL,
    birthday timestamp without time zone NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    total_visits double precision DEFAULT '0'::double precision NOT NULL,
    average_session_duration double precision DEFAULT '0'::double precision NOT NULL,
    credential_id uuid
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: visits_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visits_metrics (
    visit_metrics_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    total_visits double precision NOT NULL,
    average_duration timestamp without time zone NOT NULL,
    metrics_id uuid,
    user_id uuid
);


ALTER TABLE public.visits_metrics OWNER TO postgres;

--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (address_id, city, country, street) FROM stdin;
\.


--
-- Data for Name: amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.amenities (amenities_id, pool, gym, spa, restaurant, bar) FROM stdin;
\.


--
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.availability (availability_id, available, "totalRoomsLeft") FROM stdin;
\.


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking (booking_id, room_id, "checkIn", "checkOut", user_id, hotel_id) FROM stdin;
\.


--
-- Data for Name: booking_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking_metrics (booking_metrics_id, total_bookings, cancelled_bookings, completed_bookings, metrics_id, booking_id) FROM stdin;
\.


--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credentials (credential_id, username, email, password, user_id) FROM stdin;
\.


--
-- Data for Name: details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.details (detail_id, stars, rating, "imgUrl", description) FROM stdin;
\.


--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotels (hotel_id, name, amenities_id, detail_id, address_id, availability_id) FROM stdin;
\.


--
-- Data for Name: metric_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metric_types (metric_type_id, metric_name) FROM stdin;
\.


--
-- Data for Name: metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metrics (metrics_id, created_at, metric_type_id) FROM stdin;
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (payment_id, amount, date, method, user_id) FROM stdin;
\.


--
-- Data for Name: room_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_files (room_file_id, file_url, room_id) FROM stdin;
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (room_id, type, room_type_id, hotel_id) FROM stdin;
\.


--
-- Data for Name: rooms_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms_type (room_type_id, price, currency, rooms_left, description) FROM stdin;
\.


--
-- Data for Name: search_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.search_metrics (search_metrics_id, total_searches, searches_per_user, non_user_searches, metrics_id) FROM stdin;
\.


--
-- Data for Name: time_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.time_metrics (time_metrics_id, session_starts, session_ends, session_duration, session_start_time, session_end_time, metrics_id, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, lastname, birthday, "isAdmin", total_visits, average_session_duration, credential_id) FROM stdin;
\.


--
-- Data for Name: visits_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visits_metrics (visit_metrics_id, total_visits, average_duration, metrics_id, user_id) FROM stdin;
\.


--
-- Name: metric_types PK_00e481489398a8fc6b29fdd66e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metric_types
    ADD CONSTRAINT "PK_00e481489398a8fc6b29fdd66e1" PRIMARY KEY (metric_type_id);


--
-- Name: hotels PK_07c76323b3d9bf6915bf15b3e2d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "PK_07c76323b3d9bf6915bf15b3e2d" PRIMARY KEY (hotel_id);


--
-- Name: booking_metrics PK_14ef4e8810c02a1c10005fec395; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_metrics
    ADD CONSTRAINT "PK_14ef4e8810c02a1c10005fec395" PRIMARY KEY (booking_metrics_id);


--
-- Name: rooms_type PK_203ddb38ad1f31effda2e32df4c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms_type
    ADD CONSTRAINT "PK_203ddb38ad1f31effda2e32df4c" PRIMARY KEY (room_type_id);


--
-- Name: details PK_381a4d06f76dbee6571db5cc6bf; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT "PK_381a4d06f76dbee6571db5cc6bf" PRIMARY KEY (detail_id);


--
-- Name: room_files PK_6f4b34381ace2a0d5eb07e7464b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_files
    ADD CONSTRAINT "PK_6f4b34381ace2a0d5eb07e7464b" PRIMARY KEY (room_file_id);


--
-- Name: search_metrics PK_8a01931f1b2f07dd085b539dd74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_metrics
    ADD CONSTRAINT "PK_8a01931f1b2f07dd085b539dd74" PRIMARY KEY (search_metrics_id);


--
-- Name: metrics PK_8ead5ee894673c1b37dca16e49f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrics
    ADD CONSTRAINT "PK_8ead5ee894673c1b37dca16e49f" PRIMARY KEY (metrics_id);


--
-- Name: time_metrics PK_901c870aaa1b8af88bb746aa5d0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.time_metrics
    ADD CONSTRAINT "PK_901c870aaa1b8af88bb746aa5d0" PRIMARY KEY (time_metrics_id);


--
-- Name: users PK_96aac72f1574b88752e9fb00089; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);


--
-- Name: visits_metrics PK_9cde34fef1f0e61ab86f3b71159; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits_metrics
    ADD CONSTRAINT "PK_9cde34fef1f0e61ab86f3b71159" PRIMARY KEY (visit_metrics_id);


--
-- Name: availability PK_9cf7131c94627d1f8b30540d353; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT "PK_9cf7131c94627d1f8b30540d353" PRIMARY KEY (availability_id);


--
-- Name: booking PK_9ecc24640e39cd493c318a117f1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "PK_9ecc24640e39cd493c318a117f1" PRIMARY KEY (booking_id);


--
-- Name: payment PK_9fff60ac6ac1844ea4e0cfba67a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY (payment_id);


--
-- Name: rooms PK_a54158a6ef7c66aaa81e7aa2421; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT "PK_a54158a6ef7c66aaa81e7aa2421" PRIMARY KEY (room_id);


--
-- Name: amenities PK_a7a66049a530230aacea5765eb6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT "PK_a7a66049a530230aacea5765eb6" PRIMARY KEY (amenities_id);


--
-- Name: address PK_db4aae0a059fd4ef7709cb802b0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY (address_id);


--
-- Name: credentials PK_deddc3fc8fa9227193e910b0c39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "PK_deddc3fc8fa9227193e910b0c39" PRIMARY KEY (credential_id);


--
-- Name: users REL_23b9db2106e4f409452018f7a7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_23b9db2106e4f409452018f7a7" UNIQUE (credential_id);


--
-- Name: hotels REL_289ea42e3885b1d6db4e115873; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "REL_289ea42e3885b1d6db4e115873" UNIQUE (detail_id);


--
-- Name: booking_metrics REL_4f78d0dfb73703aa88099b81e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_metrics
    ADD CONSTRAINT "REL_4f78d0dfb73703aa88099b81e1" UNIQUE (booking_id);


--
-- Name: hotels REL_8263740973e64b578b278c586e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "REL_8263740973e64b578b278c586e" UNIQUE (availability_id);


--
-- Name: hotels REL_9a4f7330771288336226689e7b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "REL_9a4f7330771288336226689e7b" UNIQUE (amenities_id);


--
-- Name: hotels REL_bf37c85874ec1747f5fa7836c9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "REL_bf37c85874ec1747f5fa7836c9" UNIQUE (address_id);


--
-- Name: payment REL_c66c60a17b56ec882fcd8ec770; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "REL_c66c60a17b56ec882fcd8ec770" UNIQUE (user_id);


--
-- Name: credentials REL_c68a6c53e95a7dc357f4ebce8f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "REL_c68a6c53e95a7dc357f4ebce8f" UNIQUE (user_id);


--
-- Name: credentials UQ_9696610f85145a37910365498f9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "UQ_9696610f85145a37910365498f9" UNIQUE (username);


--
-- Name: credentials UQ_c286aa8e09ecff5cc756ee83214; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "UQ_c286aa8e09ecff5cc756ee83214" UNIQUE (email);


--
-- Name: room_files FK_2266d839ddc0b5f90e8c6e9b3ff; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_files
    ADD CONSTRAINT "FK_2266d839ddc0b5f90e8c6e9b3ff" FOREIGN KEY (room_id) REFERENCES public.rooms(room_id);


--
-- Name: users FK_23b9db2106e4f409452018f7a76; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_23b9db2106e4f409452018f7a76" FOREIGN KEY (credential_id) REFERENCES public.credentials(credential_id) ON DELETE CASCADE;


--
-- Name: booking FK_276896d1a1a30be6de9d7d43f53; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: hotels FK_289ea42e3885b1d6db4e115873e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "FK_289ea42e3885b1d6db4e115873e" FOREIGN KEY (detail_id) REFERENCES public.details(detail_id) ON DELETE CASCADE;


--
-- Name: time_metrics FK_2fe80600c9b4310671e150f41d5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.time_metrics
    ADD CONSTRAINT "FK_2fe80600c9b4310671e150f41d5" FOREIGN KEY (metrics_id) REFERENCES public.metrics(metrics_id);


--
-- Name: booking_metrics FK_4f78d0dfb73703aa88099b81e19; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_metrics
    ADD CONSTRAINT "FK_4f78d0dfb73703aa88099b81e19" FOREIGN KEY (booking_id) REFERENCES public.booking(booking_id);


--
-- Name: visits_metrics FK_576551cdd10ad9648d584be80e4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits_metrics
    ADD CONSTRAINT "FK_576551cdd10ad9648d584be80e4" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: booking FK_6ca304d91e5bad989662136928f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "FK_6ca304d91e5bad989662136928f" FOREIGN KEY (hotel_id) REFERENCES public.hotels(hotel_id);


--
-- Name: rooms FK_7a61484af364d0d804b21b25c7f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT "FK_7a61484af364d0d804b21b25c7f" FOREIGN KEY (hotel_id) REFERENCES public.hotels(hotel_id) ON DELETE CASCADE;


--
-- Name: hotels FK_8263740973e64b578b278c586ea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "FK_8263740973e64b578b278c586ea" FOREIGN KEY (availability_id) REFERENCES public.availability(availability_id) ON DELETE CASCADE;


--
-- Name: rooms FK_8a380bdc519b8701daf0ec62da0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT "FK_8a380bdc519b8701daf0ec62da0" FOREIGN KEY (room_type_id) REFERENCES public.rooms_type(room_type_id) ON DELETE CASCADE;


--
-- Name: booking_metrics FK_8d1204396d87a294e0f82f70393; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_metrics
    ADD CONSTRAINT "FK_8d1204396d87a294e0f82f70393" FOREIGN KEY (metrics_id) REFERENCES public.metrics(metrics_id);


--
-- Name: hotels FK_9a4f7330771288336226689e7bf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "FK_9a4f7330771288336226689e7bf" FOREIGN KEY (amenities_id) REFERENCES public.amenities(amenities_id) ON DELETE CASCADE;


--
-- Name: metrics FK_aab643f3e71c84efc4a1e2d79ee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrics
    ADD CONSTRAINT "FK_aab643f3e71c84efc4a1e2d79ee" FOREIGN KEY (metric_type_id) REFERENCES public.metric_types(metric_type_id);


--
-- Name: search_metrics FK_abf4a4bccb1da7c02427e03918a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_metrics
    ADD CONSTRAINT "FK_abf4a4bccb1da7c02427e03918a" FOREIGN KEY (metrics_id) REFERENCES public.metrics(metrics_id);


--
-- Name: hotels FK_bf37c85874ec1747f5fa7836c9a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "FK_bf37c85874ec1747f5fa7836c9a" FOREIGN KEY (address_id) REFERENCES public.address(address_id) ON DELETE CASCADE;


--
-- Name: payment FK_c66c60a17b56ec882fcd8ec770b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: credentials FK_c68a6c53e95a7dc357f4ebce8f0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: visits_metrics FK_cc7446838d520f82c8e73ccb860; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits_metrics
    ADD CONSTRAINT "FK_cc7446838d520f82c8e73ccb860" FOREIGN KEY (metrics_id) REFERENCES public.metrics(metrics_id);


--
-- Name: time_metrics FK_dc5426f48a0033431ca040c43f2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.time_metrics
    ADD CONSTRAINT "FK_dc5426f48a0033431ca040c43f2" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

