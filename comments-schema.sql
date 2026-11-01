-- Jalankan sekali di SQL Editor proyek Supabase khusus portofolio.
create table if not exists public.portfolio_comments (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 60),
  body text not null check (char_length(trim(body)) between 3 and 1000),
  created_at timestamptz not null default now(),
  approved boolean not null default true
);

alter table public.portfolio_comments alter column approved set default true;

create index if not exists portfolio_comments_published_idx
  on public.portfolio_comments (created_at desc) where approved = true;

alter table public.portfolio_comments enable row level security;
revoke all on public.portfolio_comments from anon, authenticated;
grant select on public.portfolio_comments to anon;
grant insert (name, body) on public.portfolio_comments to anon;

drop policy if exists "Public can read approved comments" on public.portfolio_comments;
create policy "Public can read approved comments"
  on public.portfolio_comments for select to anon
  using (approved = true);

drop policy if exists "Public can submit comments for review" on public.portfolio_comments;
drop policy if exists "Public can submit comments immediately" on public.portfolio_comments;
create policy "Public can submit comments immediately"
  on public.portfolio_comments for insert to anon
  with check (approved = true);
