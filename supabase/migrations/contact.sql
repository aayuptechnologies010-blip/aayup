-- Create the trigger function first if it doesn't exist
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create the contact table
create table if not exists public.contact (
  id uuid not null default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text null,
  subject text null,
  message text not null,
  status text null default 'new',
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint contact_pkey primary key (id),
  constraint contact_status_check check (
    status in ('new', 'in_progress', 'resolved', 'closed')
  )
);

-- Create indexes
create index if not exists contact_status_idx on public.contact using btree (status);

create index if not exists contact_created_at_idx on public.contact using btree (created_at desc);

create index if not exists contact_email_idx on public.contact using btree (email);

-- Create trigger for updated_at
drop trigger if exists contact_updated_at on public.contact;

create trigger contact_updated_at
  before update on public.contact
  for each row
  execute function handle_updated_at();

-- Enable Row Level Security
alter table public.contact enable row level security;

-- Create policies for public insert (anyone can submit contact forms)
create policy "Anyone can submit contact forms"
  on public.contact for insert
  with check (true);

-- Create policies for authenticated users (admin)
create policy "Authenticated users can view all contacts"
  on public.contact for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update contacts"
  on public.contact for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete contacts"
  on public.contact for delete
  using (auth.role() = 'authenticated');