-- Create the trigger function first if it doesn't exist
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create the jobs table
create table if not exists public.jobs (
  id uuid not null default gen_random_uuid(),
  title text not null,
  department text not null,
  employment_type text not null,
  work_mode text not null,
  location text not null,
  seniority_level text not null,
  salary_range text null,
  last_date date not null,
  role_summary text not null,
  responsibilities text[] not null,
  projects text null,
  required_qualifications text[] not null,
  required_technical_skills text[] not null,
  required_soft_skills text[] not null,
  required_experience text not null,
  preferred_qualifications text[] null,
  perks_benefits text[] not null,
  is_active boolean null default true,
  created_at timestamp with time zone not null default timezone('utc', now()),
  updated_at timestamp with time zone not null default timezone('utc', now()),
  constraint jobs_pkey primary key (id)
);

-- Create indexes for better query performance
create index if not exists jobs_department_idx on public.jobs using btree (department);

create index if not exists jobs_employment_type_idx on public.jobs using btree (employment_type);

create index if not exists jobs_work_mode_idx on public.jobs using btree (work_mode);

create index if not exists jobs_is_active_idx on public.jobs using btree (is_active);

create index if not exists jobs_last_date_idx on public.jobs using btree (last_date);

create index if not exists jobs_created_at_idx on public.jobs using btree (created_at desc);

-- Create trigger for updated_at
drop trigger if exists jobs_updated_at on public.jobs;

create trigger jobs_updated_at
  before update on public.jobs
  for each row
  execute function handle_updated_at();

-- Enable Row Level Security
alter table public.jobs enable row level security;

-- Create policies for public read access (only active jobs with future last_date)
create policy "Public can view active jobs"
  on public.jobs for select
  using (is_active = true and last_date >= current_date);

-- Create policies for authenticated users (admin)
create policy "Authenticated users can insert jobs"
  on public.jobs for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update jobs"
  on public.jobs for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete jobs"
  on public.jobs for delete
  using (auth.role() = 'authenticated');

create policy "Authenticated users can view all jobs"
  on public.jobs for select
  using (auth.role() = 'authenticated');