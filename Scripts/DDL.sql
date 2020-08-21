BEGIN;

create table if not exists  "user".userInfo(
	id bigserial primary key not null,
	userInfo jsonb not null
);

create table if not exists "user".userSession(
	id bigserial primary key not null,
	userSession jsonb not null
);

create table if not exists "user".Role(
	id bigserial primary key not null,
	Roles jsonb not null
);

COMMIT;
