-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE SEQUENCE IF NOT EXISTS users_id_seq START 1;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    balance numeric NOT NULL DEFAULT '0'::numeric,
    btc numeric NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.btcs

-- DROP TABLE IF EXISTS public.btcs;

CREATE SEQUENCE IF NOT EXISTS btcs_id_seq START 1;

CREATE TABLE IF NOT EXISTS public.btcs
(
    id integer NOT NULL DEFAULT nextval('btcs_id_seq'::regclass),
    "userId" integer NOT NULL,
    balance numeric NOT NULL DEFAULT '0'::numeric,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    operation character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'buy'::character varying,
    rate numeric NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT btcs_pkey PRIMARY KEY (id),
    CONSTRAINT btcs_users_userid_foreign FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.btcs
    OWNER to postgres;

-- Table: public.deals

-- DROP TABLE IF EXISTS public.deals;

CREATE SEQUENCE IF NOT EXISTS deals_id_seq START 1;

CREATE TABLE IF NOT EXISTS public.deals
(
    id integer NOT NULL DEFAULT nextval('deals_id_seq'::regclass),
    "userId" integer NOT NULL,
    balance numeric NOT NULL DEFAULT '0'::numeric,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    operation character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'insert'::character varying,
    rate numeric NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT deals_pkey PRIMARY KEY (id),
    CONSTRAINT deals_users_userid_foreign FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.deals
    OWNER to postgres;
