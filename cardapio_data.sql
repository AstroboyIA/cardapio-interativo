--
-- PostgreSQL database dump
--

\restrict n9lyQRoOw28hWIVTkuyWY9mhhfElqn2Q6dr3Ol8yQ4TtWqzw5z9dBuZT0upz37O

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

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
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: cardapio_user
--

COPY public.categories (id, slug, nome, created_at) FROM stdin;
caebfcc1-3f08-408d-b651-f6bc60937949	drinks-autorais	Drinks Autorais	2026-02-08 23:48:17.339813
0ac47574-7171-4de7-ada1-ab637f18b6a0	drinks-coqueteis	Drinks Coqueteis	2026-02-10 00:11:55.901633
9e587378-fad1-4571-b9e2-ee5bffe8c6d6	drinks-classicos	Drinks Clássicos	2026-02-08 23:48:17.339813
\.


--
-- Data for Name: drinks; Type: TABLE DATA; Schema: public; Owner: cardapio_user
--

COPY public.drinks (id, categoria_id, nome, descricao, imagem, ativo, created_at, updated_at, ingredientes) FROM stdin;
9e78dec2-70b7-4b29-994a-4c9f15de8d47	9e587378-fad1-4571-b9e2-ee5bffe8c6d6	🍸 Mojito	Refrescante e equilibrado, perfeito para eventos ao ar livre.	assets/img/mojito-exemplo.jpeg	t	2026-02-08 23:59:06.040784	2026-02-08 23:59:06.040784	Rum, hortelã, limão, açúcar, água com gás
8917c1c8-6fd3-4a17-a10d-e74d462e0c6d	9e587378-fad1-4571-b9e2-ee5bffe8c6d6	🍹 Caipirinha	O clássico brasileiro que não pode faltar.	assets/img/caipirinha-exemplo.jpeg	t	2026-02-10 00:22:50.625369	2026-02-10 00:22:50.625369	Cachaça, limão, açúcar
13b56b5c-e931-406b-ba43-957804b1687b	9e587378-fad1-4571-b9e2-ee5bffe8c6d6	🍊 Negroni	Intenso e sofisticado, ideal para quem aprecia sabores marcantes.		t	2026-02-10 00:22:50.625369	2026-02-10 00:22:50.625369	Gin, vermute rosso, Campari
9a3a946d-8e68-4024-9c54-e29319977c7a	9e587378-fad1-4571-b9e2-ee5bffe8c6d6	🍋 Margarita	Cítrica e vibrante, com final seco e elegante.		t	2026-02-10 00:22:50.625369	2026-02-10 00:22:50.625369	Tequila, licor de laranja, limão
0096795c-89c6-4923-a18d-8c49518173fe	caebfcc1-3f08-408d-b651-f6bc60937949	✨ Divino	Um drink autoral com equilíbrio entre doçura e frescor.		t	2026-02-10 00:23:21.476612	2026-02-10 00:23:21.476612	Rum (60ml),xarope de capim santo(30ml), abacaxi,  água com gás.
2209ecb0-ce98-4d68-a3cf-fae75989ac2b	caebfcc1-3f08-408d-b651-f6bc60937949	🌙 Manguetown - (copo com gelo)	Aromático e envolvente, criado para momentos especiais.		t	2026-02-10 00:23:21.476612	2026-02-10 00:23:21.476612	Vodka (60ml), extrato de manga/fruta manga (60m), xarope simples (25ml), fermentado de gengibre.
7f14799a-cd87-4b68-95eb-cec86d2d700d	caebfcc1-3f08-408d-b651-f6bc60937949	🌿 Ginger Ale	Leve, herbal e surpeendente do primeiro ao último gole.		t	2026-02-10 00:23:21.476612	2026-02-10 00:23:21.476612	 Cachaça (60ml), xarope de gengibre, limão, xarope simples, água com gás, espuma de gengibre.
2455fcf5-9f31-4cd2-b91b-0aef8efc8dbf	caebfcc1-3f08-408d-b651-f6bc60937949	🔥 Sunshine	Um drink intenso com toque defumado e final elegante.		t	2026-02-10 00:23:21.476612	2026-02-10 00:23:21.476612	Vodka (60ml), xarope de hubisco (15ml), xarope simples (20ml), morango, suco de laranja, espuma de limão
ba5d60cf-ad17-4153-ade6-e4f754b81dd3	caebfcc1-3f08-408d-b651-f6bc60937949	🌸 Flor	Descrição generica		t	2026-02-10 00:23:21.476612	2026-02-10 00:23:21.476612	Vodka (60ml), xarope de hibisco, abacaxi, espuma de morango
a636bd6f-ddaa-4f82-8547-6ba004935779	caebfcc1-3f08-408d-b651-f6bc60937949	🍋 Limonada Suíça	Descrição generica		t	2026-02-10 00:23:21.476612	2026-02-10 00:23:21.476612	Vodka, leite condensado, limão, ágia com gás.
7a3c4674-65f3-463a-9be3-be8be86f6628	caebfcc1-3f08-408d-b651-f6bc60937949	💙 Azura	Descrição generica		t	2026-02-10 00:23:21.476612	2026-02-10 00:23:21.476612	Suco de laranja, limão azul, espuma de limão, água com gás.
44c64f37-1187-46bf-8c85-e007ec4afbf4	0ac47574-7171-4de7-ada1-ab637f18b6a0	🍓 Refresco de Frutas Vermelhas	Doce na medida certa e extermamente refrescante.		t	2026-02-10 00:23:36.900534	2026-02-10 00:23:36.900534	Frutas vermelhas, limão, açucar, água com gás.
983ed871-291f-449b-aa57-b4c17b89a7fe	0ac47574-7171-4de7-ada1-ab637f18b6a0	🍍 Tropical Fresh	Leve e tropical, perfeito para todos os públicos.		t	2026-02-10 00:23:36.900534	2026-02-10 00:23:36.900534	Abacaxi, coco, hortelã.
2d5d3801-1e06-4b8e-b80c-f1c7ff414a69	0ac47574-7171-4de7-ada1-ab637f18b6a0	🍋 Citrus Splash	Refrescância cítrica com equilíbrio e leveza.		t	2026-02-10 00:23:36.900534	2026-02-10 00:23:36.900534	Limão, laranja, açucar, água com gás.
629fc672-949e-4e8a-a784-538b401fa5d5	0ac47574-7171-4de7-ada1-ab637f18b6a0	🍏 Green Life	Natural, fresco e cheio de sabor.		t	2026-02-10 00:23:36.900534	2026-02-10 00:23:36.900534	Maçã verde, hortelã, limão.
\.


--
-- PostgreSQL database dump complete
--

\unrestrict n9lyQRoOw28hWIVTkuyWY9mhhfElqn2Q6dr3Ol8yQ4TtWqzw5z9dBuZT0upz37O

