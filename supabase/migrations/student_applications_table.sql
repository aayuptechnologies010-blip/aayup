-- Create the trigger function first if it doesn't exist
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create the student_applications table
create table if not exists public.student_applications (
  id uuid not null default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  college_university text not null,
  degree text not null,
  year_of_study text not null,
  program_type text not null,
  status text null default 'pending',
  notes text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint student_applications_pkey primary key (id),
  constraint student_applications_program_type_check check (
    program_type in ('internship', 'training', 'workshop', 'mentorship')
  ),
  constraint student_applications_status_check check (
    status in ('pending', 'reviewing', 'shortlisted', 'accepted', 'rejected', 'closed')
  )
);

-- Create indexes
create index if not exists student_applications_status_idx on public.student_applications using btree (status);

create index if not exists student_applications_program_type_idx on public.student_applications using btree (program_type);

create index if not exists student_applications_created_at_idx on public.student_applications using btree (created_at desc);

create index if not exists student_applications_email_idx on public.student_applications using btree (email);

-- Create trigger for updated_at
drop trigger if exists student_applications_updated_at on public.student_applications;

create trigger student_applications_updated_at 
  before update on public.student_applications 
  for each row 
  execute function handle_updated_at();

-- Enable Row Level Security
alter table public.student_applications enable row level security;

-- Create policies for public insert (students can apply)
create policy "Anyone can submit student applications"
  on public.student_applications for insert
  with check (true);

-- Create policies for authenticated users (admin)
create policy "Authenticated users can view all applications"
  on public.student_applications for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update applications"
  on public.student_applications for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete applications"
  on public.student_applications for delete
  using (auth.role() = 'authenticated');