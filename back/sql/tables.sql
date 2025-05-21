CREATE TABLE
    IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) not null,
        lastname VARCHAR(50) not null
    );

CREATE TABLE
    IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) not null,
        lastname VARCHAR(50) not null
    );

CREATE TABLE
    IF NOT EXISTS agenda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE,
        start_time TIME,
        end_time TIME,
        treatment TEXT,
        doctor_id INT,
        patient_id INT,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id),
        FOREIGN KEY (patient_id) REFERENCES patients (id)
    );