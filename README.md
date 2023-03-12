# Exercise Tracker

## `Create, View & Sort Exercises`

### How To Setup Locally ?
- install __NodeJS__(https://nodejs.dev)

- add the folder containing nodejs executable to *PATH*. variable
- clone this repository (`git clone https://github.com/Foss-Educational-Projects/Exercise-Tracker.git`)
- run **`yarn install` or `npm install` or `pnpm install`** in __Command Prompt__ or __Bash__ inside the root directory
- visit `localhost:3000` in your preffered browser to view the application

Check out [Live Demo](https://exercise-tracker.com) if u dont want to setup by yourself

### How To Use ?
- to view all users, append `/api/users` to `localhost:3000` or `url` and hit `Enter`

- to create a new user, type a name into the respective input, and hit `Create User` Button
- store or copy the **_id** somewhere as will require later
- to create a new exrecise, fill out the respective input fields (date field is optional and current date will be automatically added) into the respective input, and hit `Create Exercise` Button
- to get existing user, type `/api/users/[paste the id without brackets]`, and hit `Enter` Button
- to get all exercises of an user, paste `/api/users/[user id]/logs` in the **URL** and hit `Enter`

- to get exercises in a range of time, paste `/api/users/[user id]/logs?[from][&to][&limit]`(__from__ and __to__ has to be in `YYYY-MM-DD` format and __limit__ has to be number) to the **URL**, and hit `Enter` Button

### Features
- Regex Checking For Username
- Error Handling To Prevent Crashes

## End
