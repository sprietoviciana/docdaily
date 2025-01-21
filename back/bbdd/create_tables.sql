CREATE DATABASE docdaily;

USE docdaily;

CREATE TABLE
    patients (
        id INT auto_increment primary key,
        name VARCHAR(50) not null,
        lastname VARCHAR(50) not null,
        birthday date,
        dni VARCHAR(30) not null,
        email VARCHAR(50) unique
    );

CREATE TABLE
    doctors (
        id INT auto_increment primary key,
        name VARCHAR(50) not null,
        lastname VARCHAR(50) not null
    );

CREATE TABLE
    agenda (
        id INT auto_increment primary key,
        date DATE,
        start_time TIME,
        end_time TIME,
        treatment TEXT,
        doctor_id INT,
        patient_id INT,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id),
        FOREIGN KEY (patient_id) REFERENCES patients (id)
    );