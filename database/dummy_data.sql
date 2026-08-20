-- dummy_data.sql
-- IMPORTANT: Docker runs /docker-entrypoint-initdb.d/ scripts BEFORE Django runs its migrations.
-- If you uncomment the INSERT statements for Django tables, the database initialization will crash 
-- because the tables do not exist yet. 

-- To insert dummy data for Django, consider using Django Fixtures or a custom management command.
-- If you are managing tables manually outside of Django, you can define them in setup.sql and insert here.

-- Example (Commented out to prevent crashes during container startup):
/*
INSERT INTO accounts_user (password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, role) 
VALUES 
('pbkdf2_sha256$600000$dummy_hash', false, 'citizen_1', 'John', 'Doe', 'citizen1@example.com', false, true, NOW(), 'CITIZEN'),
('pbkdf2_sha256$600000$dummy_hash', false, 'officer_1', 'Jane', 'Smith', 'officer1@police.gov', true, true, NOW(), 'POLICE_SI');
*/
