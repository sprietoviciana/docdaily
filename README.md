# DocDaily

## Introduction

Web application for clinical use designed to manage healthcare professionals' schedules. It is intended for internal use in medical centers to organize patient appointments and medical treatments.
![DocDaily update](https://github.com/user-attachments/assets/308cbe57-cf78-4fea-9645-67c0c6a7856f)


### Mandatory Requirements

- Login system for each staff member at the medical center.
- The main screen should display all schedules (as shown in the image).
- The left side of the screen should be a collapsible sidebar, not fixed.
- The left section must contain filters for the schedules and dropdowns with all the professionals and available treatments.
- At the top date section, users should be able to navigate to previous and upcoming days to change the schedule view accordingly.
- The "New Record" button should open another screen to fill in all the patient's data.
- In each appointment, the "+" button should allow updating the appointment status, editing, or deleting it.
- Clicking on the patient’s name in the appointment should lead to their medical history.
  ![Historial](https://github.com/user-attachments/assets/f41631d6-938f-4697-924a-38768fb06720)

- Each treatment must be assigned a color to improve visual identification:
  - Informative (new appointments): Yellow
  - Treatments: Light Blue
  - Treatment follow-ups: Green
  - If 20 minutes pass after an appointment and the patient hasn’t arrived, the appointment should turn red.
![Sin título-2024-12-09-1328](https://github.com/user-attachments/assets/c2e88e9c-d088-4c19-af5d-ef8c0bfbb2e2)


    
- To log out at the end of the day, click on "User" and a dropdown will appear with options to log out or switch users.


### Desired Requirements

- In each medical history, a button to upload documents like consent forms, lab results, etc.
- Ability to mark when a patient arrives to indicate they are ready to be seen.
- In the filters on the left, selecting a specialist should dynamically filter the treatment options to only those offered by that specialist.
