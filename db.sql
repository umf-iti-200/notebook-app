CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO notes (title, content, created_at, updated_at) VALUES
('Grocery List', 'Buy milk, eggs, bread, and coffee.', NOW(), NOW()),
('Daily Reminder', 'Finish report, call client, and back up files.', NOW(), NOW());
