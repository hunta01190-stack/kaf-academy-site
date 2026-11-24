-- KAF Academy trial classes: every Saturday at 7:00 PM, March 6 – July 31, 2027
-- 22 classes, up to 6 students each, location to be announced.
--
-- How to run: Supabase dashboard → SQL Editor → New query → paste this → Run.
--
-- Column names follow what the website reads from `trial_classes`
-- (class_date, start_time, location_name, location_address, capacity).
-- If your table uses different names or has other required columns,
-- the Run will fail with an error and nothing is inserted.

insert into trial_classes (class_date, start_time, location_name, location_address, capacity)
select
  d::date,
  time '19:00',
  'Location TBA',
  'Johns Creek / Alpharetta area — exact park will be emailed before class',
  6
from generate_series(date '2027-03-06', date '2027-07-31', interval '7 days') as d
where not exists (
  select 1
  from trial_classes t
  where t.class_date = d::date
    and t.start_time = time '19:00'
);

-- Check the result (should list 22 Saturdays):
-- select class_date, start_time, location_name, capacity
-- from trial_classes
-- where class_date between '2027-03-01' and '2027-07-31'
-- order by class_date;

-- When a location is decided, update one date (example):
-- update trial_classes
-- set location_name = 'Shakerag Park — Johns Creek',
--     location_address = '10945 Rogers Circle, Johns Creek, GA'
-- where class_date = '2027-03-06';
