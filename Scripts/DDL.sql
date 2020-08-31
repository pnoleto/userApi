BEGIN;

create table if not exists  "user".userInfo(
	id bigserial primary key not null,
	userInfo jsonb not null
);

COMMIT;
