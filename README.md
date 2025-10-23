# 📝 Notebook App

A lightweight note-taking and task management app to organize your work

[![GitHub Release](https://img.shields.io/github/release/umf-iti-200/notebook-app.svg)](https://github.com/umf-iti-200/notebook-app/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/umf-iti-200/notebook-app.svg)](https://github.com/umf-iti-200/notebook-app/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/umf-iti-200/notebook-app.svg)](https://github.com/umf-iti-200/notebook-app)
![GitHub License](https://img.shields.io/github/license/umf-iti-200/notebook-app)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Screenshots

<img src="https://raw.githubusercontent.com/umf-iti-200/notebook-app/main/public/images/screenshot.png" width="60%">

## Limitations

 - No account system.
 - No front-end validation implemented.
 - Backend validation is minimal and may not cover all edge cases.
 - All data is sent from the server without any column filtering.

## Usage Guidelines

**Step 1**: Install all dependencies

Open the terminal and run the following command:

```bash
npm install
```

**Step 2**: Create a environment file

Copy `.env.sample` to `.env` and set your environment variables, e.g.:

```properties
PORT=80
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=your_db_name
```

**Step 3**: Run database the SQL

Open pgAdmin and run all the SQL from the following file:

```
db.sql
```

**Step 4**: Start the server

```bash
node server.js
```

**Step 5**: Open a browser and go to:

```url
http://localhost
```

> [!WARNING]
> This project is for **academic purposes only**. Do **not** use it in production whatsoever.
