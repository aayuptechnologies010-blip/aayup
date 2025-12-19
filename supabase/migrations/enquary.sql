-- Create the trigger function first if it doesn't exist
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create the enquiry table
create table if not exists public.enquiry (
  id uuid not null default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text null,
  company text null,
  service_type text null,
  budget_range text null,
  project_description text not null,
  timeline text null,
  status text null default 'new',
  priority text null default 'medium',
  notes text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint enquiry_pkey primary key (id),
  constraint enquiry_priority_check check (
    priority in ('low', 'medium', 'high', 'urgent')
  ),
  constraint enquiry_status_check check (
    status in ('new', 'reviewing', 'quoted', 'accepted', 'rejected', 'closed')
  )
);

-- Create indexes
create index if not exists enquiry_status_idx on public.enquiry using btree (status);

create index if not exists enquiry_priority_idx on public.enquiry using btree (priority);

create index if not exists enquiry_created_at_idx on public.enquiry using btree (created_at desc);

create index if not exists enquiry_email_idx on public.enquiry using btree (email);

create index if not exists enquiry_service_type_idx on public.enquiry using btree (service_type);

-- Create trigger for updated_at
drop trigger if exists enquiry_updated_at on public.enquiry;

create trigger enquiry_updated_at
  before update on public.enquiry
  for each row
  execute function handle_updated_at();

-- Enable Row Level Security
alter table public.enquiry enable row level security;

-- Create policies for public insert (anyone can submit enquiries)
create policy "Anyone can submit enquiries"
  on public.enquiry for insert
  with check (true);

-- Create policies for authenticated users (admin)
create policy "Authenticated users can view all enquiries"
  on public.enquiry for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update enquiries"
  on public.enquiry for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete enquiries"
  on public.enquiry for delete
  using (auth.role() = 'authenticated');