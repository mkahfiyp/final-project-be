# Database Seeding Documentation

## 📊 Seeded Data Summary

Database telah berhasil diisi dengan data dummy yang lengkap untuk semua tabel.

## 🔐 Login Credentials

### Regular Users (Role: USER)
- **john.doe@gmail.com** / `password123`
  - Profile: John Doe, Computer Science graduate
  - Education: Stanford University
  - Experience: Google, Microsoft
  - Applications: Applied to Senior Full Stack Developer
  - Skills Assessment: JavaScript (85%), React (92%)

- **jane.smith@gmail.com** / `password123`
  - Profile: Jane Smith, MBA graduate  
  - Education: Harvard Business School
  - Experience: McKinsey & Company
  - Applications: Applied to Data Scientist

- **bob.wilson@gmail.com** / `password123`
  - Profile: Bob Wilson, Engineering graduate
  - Education: MIT
  - Applications: Applied to Frontend Developer Intern (ACCEPTED)

- **alice.brown@gmail.com** / `password123`
  - Profile: Alice Brown, Design graduate
  - Applications: Applied to UX/UI Designer (INTERVIEW scheduled)

### Company Users (Role: COMPANY)
- **hr@techcorp.com** / `password123`
  - Company: TechCorp Solutions
  - Jobs Posted: Senior Full Stack Developer, Frontend Developer Intern

- **careers@startuphub.com** / `password123`
  - Company: Startup Hub Inc
  - Jobs Posted: Data Scientist, DevOps Engineer

- **jobs@designstudio.com** / `password123`
  - Company: Creative Design Studio
  - Jobs Posted: UX/UI Designer

### Developer (Role: DEVELOPER)
- **admin@jobportal.com** / `admin123`
  - System Administrator

## 📋 Data Created

### Users & Profiles
- ✅ 8 users total (4 regular users, 3 companies, 1 developer)
- ✅ 4 complete user profiles with personal information
- ✅ All users are verified and ready to login

### Companies
- ✅ 3 companies with complete information
- ✅ Each company linked to a company user account
- ✅ Company details include description, website, contact info

### Jobs
- ✅ 5 job postings across different categories:
  - Senior Full Stack Developer (TechCorp) - $120k/year
  - Data Scientist (Startup Hub) - $110k/year  
  - UX/UI Designer (Creative Design Studio) - $85k/year
  - Frontend Developer Intern (TechCorp) - $25/hour
  - DevOps Engineer (Startup Hub) - $105k/year
- ✅ Jobs include skills requirements, locations, salary details
- ✅ Some jobs have preselection tests enabled

### Skills
- ✅ 10 technical skills: JavaScript, TypeScript, React, Node.js, Python, Java, SQL, AWS, Docker, Kubernetes
- ✅ Skills are linked to relevant job postings

### Applications
- ✅ 4 job applications with different statuses:
  - John → Senior Full Stack Developer (SUBMITTED)
  - Jane → Data Scientist (IN_REVIEW)
  - Alice → UX/UI Designer (INTERVIEW)
  - Bob → Frontend Developer Intern (ACCEPTED)
- ✅ Each application includes expected salary and CV path

### Education & Experience
- ✅ Education records for users (Stanford, Harvard, MIT)
- ✅ Work experience history (Google, Microsoft, McKinsey)
- ✅ Realistic dates and descriptions

### Job Saves
- ✅ 4 saved jobs by different users
- ✅ Users can bookmark jobs they're interested in

### Interviews
- ✅ 1 scheduled interview for Alice's UX/UI Designer application
- ✅ Interview date: September 25, 2024

### Skill Assessments
- ✅ 3 skill assessment categories:
  - JavaScript Fundamentals
  - React Development  
  - Node.js Backend
- ✅ 4 assessment questions with multiple choice answers
- ✅ 2 completed assessments by John with scores
- ✅ 2 generated certificates with unique codes

### Subscriptions
- ✅ 3 subscription plans:
  - Basic Plan - $9
  - Premium Plan - $19
  - Pro Plan - $39
- ✅ 2 active user subscriptions

### Company Reviews
- ✅ 2 employee reviews for companies
- ✅ Ratings for culture, work-life balance, facilities, career growth
- ✅ Salary estimates from employees

### Selection Tests
- ✅ 2 completed selection tests for jobs with preselection
- ✅ Technical questions with correct answers
- ✅ Pass/fail results recorded

## 🧪 Testing APIs

Dengan data ini, Anda dapat menguji semua endpoints API:

### Authentication
```bash
POST /api/auth/login
{
  "email": "john.doe@gmail.com",
  "password": "password123"
}
```

### Get Jobs
```bash
GET /api/jobs
```

### Apply to Job
```bash
POST /api/applications
{
  "job_id": 1,
  "expected_salary": 120000,
  "cv": "path/to/cv.pdf"
}
```

### Save Job
```bash
POST /api/job-save
{
  "job_id": 1
}
```

### And many more endpoints...

## 🔄 Re-seeding Database

Untuk menjalankan seeder lagi:

```bash
npm run seed
```

⚠️ **Warning**: Menjalankan seeder akan menghapus semua data yang ada dan menggantinya dengan data dummy yang baru.

## 📝 Notes

- Semua password user adalah `password123` kecuali admin yang menggunakan `admin123`
- Tanggal dibuat realistis dan konsisten
- Foreign key relationships sudah benar
- Data mencakup semua fitur utama aplikasi job portal
