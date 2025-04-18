# DocDaily

## Introduction

Web application for clinical use designed to manage healthcare professionals' schedules. It is intended for internal use in medical centers to organize patient appointments and medical treatments.

![DocDaily ingles](https://github.com/user-attachments/assets/3be1c05e-d6f5-446b-91d6-c3a12e5807b1)

### Mandatory Requirements

- Login system for each staff member at the medical center.
- The main screen should display all schedules (as shown in the image).
- The left side of the screen should be a collapsible sidebar, not fixed.
- The left section must contain filters for the schedules and dropdowns with all the professionals and available treatments.
- At the top date section, users should be able to navigate to previous and upcoming days to change the schedule view accordingly.
- The "New Record" button should open another screen to fill in all the patient's data.
- In each appointment, the "+" button should allow updating the appointment status, editing, or deleting it.
- Clicking on the patient’s name in the appointment should lead to their medical history.
- Each treatment must be assigned a color to improve visual identification:
  - Informative (new appointments): Yellow
  - Treatments: Light Blue
  - Treatment follow-ups: Green
- To log out at the end of the day, click on "User" and a dropdown will appear with options to log out or switch users.

### Desired Requirements

- In each medical history, a button to upload documents like consent forms, lab results, etc.
- Ability to mark when a patient arrives to indicate they are ready to be seen.
- If 20 minutes pass after an appointment and the patient hasn’t arrived, the appointment should turn red.
- In the filters on the left, selecting a specialist should dynamically filter the treatment options to only those offered by that specialist.
