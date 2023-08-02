# Insulin-PWA
A Progressive Web App that facilitate calculation of insulin supply for a patient.


## Supabase SQL Setup Query

~~~~ sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for public calculations
create table calculations (
  id uuid on delete cascade not null primary key,
  user_id references auth.users not null,
  created_at timestamp with time zone,
  ttd float8,
  days float8,
  strength float8,
  volume float8, 
  result float8
);

-- Set up Row Level Security (RLS) for calculations
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table calculations
  enable row level security;

create policy "Enable insert for authenticated users only (<=20 inserts/user)" on calculations
  for insert 
  to authenticated with check ((
    SELECT count(*) AS count
    FROM calculations calculations_1
    WHERE (auth.uid() = calculations_1.user_id)) < 20);

create policy "Enable select for users based on user_id" on calculations
  for select with check (auth.uid() = id);

create policy "Enable delete for users based on user_id" on calculations
  for delete using (auth.uid() = id);