-- Create the trigger function first if it doesn't exist
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create the testimonials table
create table if not exists public.testimonials (
  id uuid not null default gen_random_uuid(),
  name text not null,
  email text null,
  company text null,
  position text null,
  avatar_url text null,
  rating integer null default 5,
  testimonial text not null,
  is_featured boolean null default false,
  is_active boolean null default true,
  approved boolean null default false,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint testimonials_pkey primary key (id),
  constraint testimonials_rating_check check (
    (rating >= 1) and (rating <= 5)
  )
);

-- Create indexes
create index if not exists testimonials_is_active_idx on public.testimonials using btree (is_active);

create index if not exists testimonials_is_featured_idx on public.testimonials using btree (is_featured);

create index if not exists testimonials_rating_idx on public.testimonials using btree (rating);

create index if not exists testimonials_created_at_idx on public.testimonials using btree (created_at desc);

create index if not exists testimonials_approved_idx on public.testimonials using btree (approved);

-- Create trigger for updated_at
drop trigger if exists testimonials_updated_at on public.testimonials;

create trigger testimonials_updated_at 
  before update on public.testimonials 
  for each row 
  execute function handle_updated_at();

-- Enable Row Level Security
alter table public.testimonials enable row level security;

-- Create policies for public read access (only approved testimonials)
create policy "Public can view approved testimonials"
  on public.testimonials for select
  using (approved = true and is_active = true);

-- Create policies for authenticated users (admin)
create policy "Authenticated users can insert testimonials"
  on public.testimonials for insert
  with check (true);

create policy "Authenticated users can update testimonials"
  on public.testimonials for update
  using (true);

create policy "Authenticated users can delete testimonials"
  on public.testimonials for delete
  using (true);