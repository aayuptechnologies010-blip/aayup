-- Create the trigger function first if it doesn't exist
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create the applications table
create table if not exists public.applications (
  id uuid not null default gen_random_uuid(),
  job_id uuid null,
  full_name text not null,
  email text not null,
  phone text not null,
  current_location text not null,
  willing_to_relocate boolean null default false,
  current_job_title text not null,
  total_experience text not null,
  relevant_skills text[] not null,
  linkedin_url text null,
  portfolio_url text null,
  resume_url text not null,
  cover_letter text null,
  project_links text[] null,
  highest_degree text not null,
  university text not null,
  graduation_year text not null,
  how_did_you_hear text null,
  additional_info text null,
  status text null default 'pending',
  created_at timestamp with time zone not null default timezone('utc', now()),
  updated_at timestamp with time zone not null default timezone('utc', now()),
  constraint applications_pkey primary key (id),
  constraint applications_job_id_fkey foreign key (job_id) references public.jobs (id) on delete cascade,
  constraint applications_status_check check (
    status in ('pending', 'reviewing', 'shortlisted', 'interviewed', 'accepted', 'rejected', 'withdrawn')
  )
);

-- Create indexes for better query performance
create index if not exists applications_job_id_idx on public.applications using btree (job_id);

create index if not exists applications_status_idx on public.applications using btree (status);

create index if not exists applications_email_idx on public.applications using btree (email);

create index if not exists applications_created_at_idx on public.applications using btree (created_at desc);

-- Create trigger for updated_at
drop trigger if exists applications_updated_at on public.applications;

create trigger applications_updated_at
  before update on public.applications
  for each row
  execute function handle_updated_at();

-- Enable Row Level Security
alter table public.applications enable row level security;

-- Create policies for public insert (anyone can apply)
create policy "Anyone can submit applications"
  on public.applications for insert
  with check (true);

-- Create policies for authenticated users (admin)
create policy "Authenticated users can view all applications"
  on public.applications for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update applications"
  on public.applications for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete applications"
  on public.applications for delete
  using (auth.role() = 'authenticated');