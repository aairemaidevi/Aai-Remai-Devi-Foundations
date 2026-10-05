create table if not exists public.volunteer_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  mobile text not null check (char_length(mobile) between 7 and 30),
  address text not null check (char_length(address) between 1 and 1000),
  cause text not null check (cause in ('education', 'livelihoods', 'health', 'women')),
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null check (char_length(donor_name) between 1 and 120),
  donor_email text not null check (char_length(donor_email) between 3 and 254),
  cause text not null check (cause in ('education', 'livelihoods', 'health', 'women')),
  frequency text not null check (frequency in ('once', 'monthly')),
  amount_rupees numeric(12, 2) not null check (amount_rupees > 0),
  currency text not null default 'INR' check (currency = 'INR'),
  volunteer_updates boolean not null default false,
  payment_provider text,
  payment_reference text unique,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.donations
  add column if not exists amount_rupees numeric(12, 2);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'donations'
      and column_name = 'amount_paise'
  ) then
    execute '
      update public.donations
      set amount_rupees = amount_paise / 100.0
      where amount_rupees is null
    ';
  end if;
end $$;

alter table public.donations
  drop column if exists amount_paise;

alter table public.donations
  alter column amount_rupees set not null;

alter table public.donations
  drop constraint if exists donations_amount_rupees_positive;

alter table public.donations
  add constraint donations_amount_rupees_positive check (amount_rupees > 0);

alter table public.volunteer_submissions enable row level security;
alter table public.donations enable row level security;

revoke all on table public.volunteer_submissions from anon, authenticated;
revoke all on table public.donations from anon, authenticated;
grant insert on table public.volunteer_submissions to anon, authenticated;
grant insert on table public.donations to anon, authenticated;

drop policy if exists "Public can submit volunteer forms" on public.volunteer_submissions;
create policy "Public can submit volunteer forms"
  on public.volunteer_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Public can submit pending donations" on public.donations;
create policy "Public can submit pending donations"
  on public.donations
  for insert
  to anon, authenticated
  with check (
    status = 'pending'
    and payment_provider is null
    and payment_reference is null
    and paid_at is null
  );

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view site images" on storage.objects;
create policy "Public can view site images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-images');
