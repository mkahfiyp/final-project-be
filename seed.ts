import { PrismaClient } from "./prisma/generated/client";
import { hashPassword } from "./src/utils/hash";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting to seed database...");

    // Clear existing data in correct order (respecting foreign key constraints)
    console.log("🧹 Cleaning existing data...");

    // Delete child records first
    await prisma.blog.deleteMany();
    await prisma.reviews.deleteMany();
    await prisma.assessmentCertificates.deleteMany();
    await prisma.userAssessments.deleteMany();
    await prisma.assessmentQuestions.deleteMany();
    await prisma.userSubscriptions.deleteMany();
    await prisma.interviews.deleteMany();
    await prisma.selectionQuestions.deleteMany();
    await prisma.selections.deleteMany();
    await prisma.applications.deleteMany();
    await prisma.jobSave.deleteMany();
    await prisma.education.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.profiles.deleteMany();
    await prisma.userCompanies.deleteMany();

    // Delete junction tables and skills
    await prisma.jobs.deleteMany();
    await prisma.skills.deleteMany();
    await prisma.skillAssessments.deleteMany();
    await prisma.subscriptions.deleteMany();

    // Delete main entities last
    await prisma.companies.deleteMany();
    await prisma.users.deleteMany();

    console.log("👥 Creating users...");

    // Create Users
    const users = await Promise.all([
        // Regular Users
        prisma.users.create({
            data: {
                username: "john_doe",
                email: "john.doe@gmail.com",
                password: await hashPassword("password123"),
                name: "John Doe",
                role: "USER",
                isVerfied: true,
            },
        }),
        prisma.users.create({
            data: {
                username: "jane_smith",
                email: "jane.smith@gmail.com",
                password: await hashPassword("password123"),
                name: "Jane Smith",
                role: "USER",
                isVerfied: true,
            },
        }),
        prisma.users.create({
            data: {
                username: "bob_wilson",
                email: "bob.wilson@gmail.com",
                password: await hashPassword("password123"),
                name: "Bob Wilson",
                role: "USER",
                isVerfied: true,
            },
        }),
        prisma.users.create({
            data: {
                username: "alice_brown",
                email: "alice.brown@gmail.com",
                password: await hashPassword("password123"),
                name: "Alice Brown",
                role: "USER",
                isVerfied: true,
            },
        }),
        // Company Users
        prisma.users.create({
            data: {
                username: "tech_corp",
                email: "hr@techcorp.com",
                password: await hashPassword("password123"),
                name: "Tech Corp HR",
                role: "COMPANY",
                isVerfied: true,
            },
        }),
        prisma.users.create({
            data: {
                username: "startup_hub",
                email: "careers@startuphub.com",
                password: await hashPassword("password123"),
                name: "Startup Hub Careers",
                role: "COMPANY",
                isVerfied: true,
            },
        }),
        prisma.users.create({
            data: {
                username: "design_studio",
                email: "jobs@designstudio.com",
                password: await hashPassword("password123"),
                name: "Design Studio Jobs",
                role: "COMPANY",
                isVerfied: true,
            },
        }),
        // Developer User
        prisma.users.create({
            data: {
                username: "admin_dev",
                email: "admin@jobportal.com",
                password: await hashPassword("admin123"),
                name: "Admin Developer",
                role: "DEVELOPER",
                isVerfied: true,
            },
        }),
    ]);

    console.log("👤 Creating user profiles...");

    // Create Profiles for regular users
    await Promise.all([
        prisma.profiles.create({
            data: {
                email: users[0].email,
                name: users[0].name,
                education: "Bachelor of Computer Science",
                phone: "+1234567890",
                birthDate: new Date("1990-05-15"),
                gender: "MALE",
                address: "123 Main St, New York, NY 10001",
                user_id: users[0].user_id,
            },
        }),
        prisma.profiles.create({
            data: {
                email: users[1].email,
                name: users[1].name,
                education: "Master of Business Administration",
                phone: "+1234567891",
                birthDate: new Date("1988-08-20"),
                gender: "FEMALE",
                address: "456 Oak Ave, Los Angeles, CA 90210",
                user_id: users[1].user_id,
            },
        }),
        prisma.profiles.create({
            data: {
                email: users[2].email,
                name: users[2].name,
                education: "Bachelor of Engineering",
                phone: "+1234567892",
                birthDate: new Date("1992-03-10"),
                gender: "MALE",
                address: "789 Pine St, Chicago, IL 60601",
                user_id: users[2].user_id,
            },
        }),
        prisma.profiles.create({
            data: {
                email: users[3].email,
                name: users[3].name,
                education: "Bachelor of Design",
                phone: "+1234567893",
                birthDate: new Date("1991-11-25"),
                gender: "FEMALE",
                address: "321 Elm St, Miami, FL 33101",
                user_id: users[3].user_id,
            },
        }),
    ]);

    console.log("🏢 Creating companies...");

    // Create Companies
    const companies = await Promise.all([
        prisma.companies.create({
            data: {
                name: "TechCorp Solutions",
                email: "contact@techcorp.com",
                phone: "+1555000001",
                description: "Leading technology solutions provider specializing in cloud computing and AI.",
                website: "https://techcorp.com",
                user_id: users[4].user_id,
            },
        }),
        prisma.companies.create({
            data: {
                name: "Startup Hub Inc",
                email: "hello@startuphub.com",
                phone: "+1555000002",
                description: "Innovative startup accelerator and venture capital firm.",
                website: "https://startuphub.com",
                user_id: users[5].user_id,
            },
        }),
        prisma.companies.create({
            data: {
                name: "Creative Design Studio",
                email: "info@designstudio.com",
                phone: "+1555000003",
                description: "Award-winning design studio creating exceptional digital experiences.",
                website: "https://designstudio.com",
                user_id: users[6].user_id,
            },
        }),
    ]);

    console.log("🎓 Creating education records...");

    // Create Education records
    await Promise.all([
        prisma.education.create({
            data: {
                university: "Stanford University",
                degree: "Bachelor of Science",
                fieldOfStudy: "Computer Science",
                startDate: new Date("2008-09-01"),
                endDate: new Date("2012-06-15"),
                description: "Focused on algorithms, data structures, and software engineering.",
                user_id: users[0].user_id,
            },
        }),
        prisma.education.create({
            data: {
                university: "Harvard Business School",
                degree: "Master of Business Administration",
                fieldOfStudy: "Strategic Management",
                startDate: new Date("2010-09-01"),
                endDate: new Date("2012-05-20"),
                description: "Specialized in corporate strategy and leadership.",
                user_id: users[1].user_id,
            },
        }),
        prisma.education.create({
            data: {
                university: "MIT",
                degree: "Bachelor of Engineering",
                fieldOfStudy: "Mechanical Engineering",
                startDate: new Date("2009-09-01"),
                endDate: new Date("2013-06-10"),
                description: "Focus on robotics and automation systems.",
                user_id: users[2].user_id,
            },
        }),
    ]);

    console.log("💼 Creating experience records...");

    // Create Experience records
    await Promise.all([
        prisma.experience.create({
            data: {
                name: "Google Inc",
                position: "Software Engineer",
                startDate: new Date("2012-07-01"),
                endDate: new Date("2015-12-31"),
                description: "Developed scalable web applications and worked on search algorithms.",
                user_id: users[0].user_id,
            },
        }),
        prisma.experience.create({
            data: {
                name: "Microsoft Corporation",
                position: "Senior Software Engineer",
                startDate: new Date("2016-01-01"),
                endDate: new Date("2020-06-30"),
                description: "Led team of 5 developers building cloud infrastructure tools.",
                user_id: users[0].user_id,
            },
        }),
        prisma.experience.create({
            data: {
                name: "McKinsey & Company",
                position: "Management Consultant",
                startDate: new Date("2012-06-01"),
                endDate: new Date("2016-08-31"),
                description: "Advised Fortune 500 companies on digital transformation strategies.",
                user_id: users[1].user_id,
            },
        }),
    ]);

    console.log("🛠️ Creating skills...");

    // Create Skills
    const skills = await Promise.all([
        prisma.skills.create({ data: { name: "JavaScript" } }),
        prisma.skills.create({ data: { name: "TypeScript" } }),
        prisma.skills.create({ data: { name: "React" } }),
        prisma.skills.create({ data: { name: "Node.js" } }),
        prisma.skills.create({ data: { name: "Python" } }),
        prisma.skills.create({ data: { name: "Java" } }),
        prisma.skills.create({ data: { name: "SQL" } }),
        prisma.skills.create({ data: { name: "AWS" } }),
        prisma.skills.create({ data: { name: "Docker" } }),
        prisma.skills.create({ data: { name: "Kubernetes" } }),
    ]);

    console.log("💼 Creating job postings...");

    // Create Jobs
    const jobs = await Promise.all([
        prisma.jobs.create({
            data: {
                title: "Senior Full Stack Developer",
                slug: "senior-full-stack-developer-techcorp",
                description: "We're looking for an experienced Full Stack Developer to join our growing team. You'll work on cutting-edge projects using modern technologies like React, Node.js, and AWS.",
                category: "SOFTWARE_ENGINEERING",
                latitude: "40.7128",
                longitude: "-74.0060",
                location: "New York, NY",
                salary: 120000,
                periodSalary: "YEAR",
                currency: "DOLLAR",
                job_type: "FULL_TIME",
                preselection_test: true,
                expiredAt: new Date("2024-12-31"),
                company_id: companies[0].company_id,
                skills: {
                    connect: [
                        { id: skills[0].id }, // JavaScript
                        { id: skills[1].id }, // TypeScript
                        { id: skills[2].id }, // React
                        { id: skills[3].id }, // Node.js
                    ],
                },
            },
        }),
        prisma.jobs.create({
            data: {
                title: "Data Scientist",
                slug: "data-scientist-startup-hub",
                description: "Join our data team to build ML models and extract insights from large datasets. Experience with Python, SQL, and cloud platforms required.",
                category: "DATA_SCIENCE",
                latitude: "37.7749",
                longitude: "-122.4194",
                location: "San Francisco, CA",
                salary: 110000,
                periodSalary: "YEAR",
                currency: "DOLLAR",
                job_type: "FULL_TIME",
                preselection_test: false,
                expiredAt: new Date("2024-11-30"),
                company_id: companies[1].company_id,
                skills: {
                    connect: [
                        { id: skills[4].id }, // Python
                        { id: skills[6].id }, // SQL
                        { id: skills[7].id }, // AWS
                    ],
                },
            },
        }),
        prisma.jobs.create({
            data: {
                title: "UX/UI Designer",
                slug: "ux-ui-designer-creative-studio",
                description: "We're seeking a creative UX/UI Designer to design beautiful and intuitive user experiences for web and mobile applications.",
                category: "DESIGN",
                latitude: "34.0522",
                longitude: "-118.2437",
                location: "Los Angeles, CA",
                salary: 85000,
                periodSalary: "YEAR",
                currency: "DOLLAR",
                job_type: "FULL_TIME",
                preselection_test: false,
                expiredAt: new Date("2024-10-31"),
                company_id: companies[2].company_id,
                skills: {
                    connect: [
                        { id: skills[0].id }, // JavaScript (for prototyping)
                    ],
                },
            },
        }),
        prisma.jobs.create({
            data: {
                title: "Frontend Developer Intern",
                slug: "frontend-developer-intern-techcorp",
                description: "Great opportunity for students or recent graduates to gain hands-on experience in frontend development.",
                category: "SOFTWARE_ENGINEERING",
                latitude: "40.7128",
                longitude: "-74.0060",
                location: "New York, NY",
                salary: 25,
                periodSalary: "HOUR",
                currency: "DOLLAR",
                job_type: "INTERNSHIP",
                preselection_test: true,
                expiredAt: new Date("2024-09-30"),
                company_id: companies[0].company_id,
                skills: {
                    connect: [
                        { id: skills[0].id }, // JavaScript
                        { id: skills[2].id }, // React
                    ],
                },
            },
        }),
        prisma.jobs.create({
            data: {
                title: "DevOps Engineer",
                slug: "devops-engineer-startup-hub",
                description: "Looking for a DevOps Engineer to help scale our infrastructure using containerization and cloud technologies.",
                category: "SOFTWARE_ENGINEERING",
                latitude: "37.7749",
                longitude: "-122.4194",
                location: "San Francisco, CA",
                salary: 105000,
                periodSalary: "YEAR",
                currency: "DOLLAR",
                job_type: "FULL_TIME",
                preselection_test: true,
                expiredAt: new Date("2024-12-15"),
                company_id: companies[1].company_id,
                skills: {
                    connect: [
                        { id: skills[7].id }, // AWS
                        { id: skills[8].id }, // Docker
                        { id: skills[9].id }, // Kubernetes
                    ],
                },
            },
        }),
    ]);

    console.log("📝 Creating applications...");

    // Create Applications
    const applications = await Promise.all([
        prisma.applications.create({
            data: {
                expected_salary: 125000,
                cv: "/uploads/cv/john_doe_cv.pdf",
                status: "SUBMITTED",
                user_id: users[0].user_id,
                job_id: jobs[0].job_id,
            },
        }),
        prisma.applications.create({
            data: {
                expected_salary: 115000,
                cv: "/uploads/cv/jane_smith_cv.pdf",
                status: "IN_REVIEW",
                user_id: users[1].user_id,
                job_id: jobs[1].job_id,
            },
        }),
        prisma.applications.create({
            data: {
                expected_salary: 90000,
                cv: "/uploads/cv/alice_brown_cv.pdf",
                status: "INTERVIEW",
                user_id: users[3].user_id,
                job_id: jobs[2].job_id,
            },
        }),
        prisma.applications.create({
            data: {
                expected_salary: 22,
                cv: "/uploads/cv/bob_wilson_cv.pdf",
                status: "ACCEPTED",
                user_id: users[2].user_id,
                job_id: jobs[3].job_id,
            },
        }),
    ]);

    console.log("💾 Creating job saves...");

    // Create Job Saves
    await Promise.all([
        prisma.jobSave.create({
            data: {
                user_id: users[0].user_id,
                job_id: jobs[1].job_id,
            },
        }),
        prisma.jobSave.create({
            data: {
                user_id: users[0].user_id,
                job_id: jobs[4].job_id,
            },
        }),
        prisma.jobSave.create({
            data: {
                user_id: users[1].user_id,
                job_id: jobs[0].job_id,
            },
        }),
        prisma.jobSave.create({
            data: {
                user_id: users[2].user_id,
                job_id: jobs[2].job_id,
            },
        }),
    ]);

    console.log("📅 Creating interviews...");

    // Create Interviews
    await Promise.all([
        prisma.interviews.create({
            data: {
                application_id: applications[2].application_id,
                schedule: new Date("2024-09-25T10:00:00Z"),
            },
        }),
    ]);

    console.log("🧪 Creating skill assessments...");

    // Create Skill Assessments
    const assessments = await Promise.all([
        prisma.skillAssessments.create({
            data: {
                skill_name: "JavaScript Fundamentals",
            },
        }),
        prisma.skillAssessments.create({
            data: {
                skill_name: "React Development",
            },
        }),
        prisma.skillAssessments.create({
            data: {
                skill_name: "Node.js Backend",
            },
        }),
    ]);

    console.log("❓ Creating assessment questions...");

    // Create Assessment Questions
    await Promise.all([
        // JavaScript Assessment Questions
        prisma.assessmentQuestions.create({
            data: {
                assessment_id: assessments[0].assessment_id,
                question: "What is the difference between let, const, and var in JavaScript?",
                option_a: "let and const are block-scoped, var is function-scoped",
                option_b: "let is function-scoped, const and var are block-scoped",
                option_c: "All three are block-scoped",
                option_d: "All three are function-scoped",
                correct_option: "A",
            },
        }),
        prisma.assessmentQuestions.create({
            data: {
                assessment_id: assessments[0].assessment_id,
                question: "What does the 'this' keyword refer to in JavaScript?",
                option_a: "The global object",
                option_b: "The current function",
                option_c: "The object that owns the method",
                option_d: "The parent object",
                correct_option: "C",
            },
        }),
        // React Assessment Questions
        prisma.assessmentQuestions.create({
            data: {
                assessment_id: assessments[1].assessment_id,
                question: "What is JSX in React?",
                option_a: "A JavaScript library",
                option_b: "A syntax extension for JavaScript",
                option_c: "A CSS framework",
                option_d: "A database query language",
                correct_option: "B",
            },
        }),
        prisma.assessmentQuestions.create({
            data: {
                assessment_id: assessments[1].assessment_id,
                question: "What is the purpose of React hooks?",
                option_a: "To connect to databases",
                option_b: "To style components",
                option_c: "To use state and lifecycle features in functional components",
                option_d: "To handle routing",
                correct_option: "C",
            },
        }),
    ]);

    console.log("📊 Creating user assessments...");

    // Create User Assessments (completed assessments)
    const userAssessments = await Promise.all([
        prisma.userAssessments.create({
            data: {
                assessment_id: assessments[0].assessment_id,
                user_id: users[0].user_id,
                score: 85,
            },
        }),
        prisma.userAssessments.create({
            data: {
                assessment_id: assessments[1].assessment_id,
                user_id: users[0].user_id,
                score: 92,
            },
        }),
    ]);

    console.log("🏆 Creating assessment certificates...");

    // Create Assessment Certificates
    await Promise.all([
        prisma.assessmentCertificates.create({
            data: {
                user_assessment_id: userAssessments[0].user_assessment_id,
                certificate_code: "JS-CERT-2024-001",
            },
        }),
        prisma.assessmentCertificates.create({
            data: {
                user_assessment_id: userAssessments[1].user_assessment_id,
                certificate_code: "REACT-CERT-2024-001",
            },
        }),
    ]);

    console.log("💳 Creating subscriptions...");

    // Create Subscriptions
    const subscriptions = await Promise.all([
        prisma.subscriptions.create({
            data: {
                name: "Basic Plan",
                price: 9,
            },
        }),
        prisma.subscriptions.create({
            data: {
                name: "Premium Plan",
                price: 19,
            },
        }),
        prisma.subscriptions.create({
            data: {
                name: "Pro Plan",
                price: 39,
            },
        }),
    ]);

    console.log("👤 Creating user subscriptions...");

    // Create User Subscriptions
    await Promise.all([
        prisma.userSubscriptions.create({
            data: {
                user_id: users[0].user_id,
                subscription_id: subscriptions[1].subscription_id,
                end_date: new Date("2024-12-31"),
            },
        }),
        prisma.userSubscriptions.create({
            data: {
                user_id: users[1].user_id,
                subscription_id: subscriptions[0].subscription_id,
                end_date: new Date("2024-10-31"),
            },
        }),
    ]);

    console.log("🏢 Creating user companies (work history)...");

    // Create User Companies (work history for reviews)
    const userCompanies = await Promise.all([
        prisma.userCompanies.create({
            data: {
                company_id: companies[0].company_id,
                user_id: users[0].user_id,
                start_date: new Date("2020-01-01"),
                end_date: new Date("2023-12-31"),
            },
        }),
        prisma.userCompanies.create({
            data: {
                company_id: companies[1].company_id,
                user_id: users[1].user_id,
                start_date: new Date("2021-06-01"),
                end_date: new Date("2023-08-31"),
            },
        }),
    ]);

    console.log("⭐ Creating company reviews...");

    // Create Reviews
    await Promise.all([
        prisma.reviews.create({
            data: {
                user_company_id: userCompanies[0].user_company_id,
                salary_estimate: 125000,
                rating_culture: 4,
                rating_work_life_balance: 4,
                rating_facilities: 5,
                rating_career: 4,
            },
        }),
        prisma.reviews.create({
            data: {
                user_company_id: userCompanies[1].user_company_id,
                salary_estimate: 110000,
                rating_culture: 5,
                rating_work_life_balance: 5,
                rating_facilities: 4,
                rating_career: 5,
            },
        }),
    ]);

    console.log("🧪 Creating selection tests...");

    // Create Selection Tests
    const selections = await Promise.all([
        prisma.selections.create({
            data: {
                job_id: jobs[0].job_id,
                passingScore: 70,
                result: "PASS",
                user_id: users[0].user_id,
            },
        }),
        prisma.selections.create({
            data: {
                job_id: jobs[3].job_id,
                passingScore: 60,
                result: "PASS",
                user_id: users[2].user_id,
            },
        }),
    ]);

    console.log("❓ Creating selection questions...");

    // Create Selection Questions
    await Promise.all([
        prisma.selectionQuestions.create({
            data: {
                selection_id: selections[0].selection_id,
                question: "What is the time complexity of binary search?",
                option_A: "O(n)",
                option_B: "O(log n)",
                option_C: "O(n log n)",
                option_D: "O(1)",
                correct_option: "B",
            },
        }),
        prisma.selectionQuestions.create({
            data: {
                selection_id: selections[0].selection_id,
                question: "Which data structure uses LIFO principle?",
                option_A: "Queue",
                option_B: "Array",
                option_C: "Stack",
                option_D: "Linked List",
                correct_option: "C",
            },
        }),
        prisma.selectionQuestions.create({
            data: {
                selection_id: selections[1].selection_id,
                question: "What does HTML stand for?",
                option_A: "Hyper Text Markup Language",
                option_B: "High Tech Modern Language",
                option_C: "Home Tool Markup Language",
                option_D: "Hyperlink and Text Markup Language",
                correct_option: "A",
            },
        }),
    ]);

    console.log("📝 Creating blog posts...");

    // Create Blog Posts
    const blogs = await Promise.all([
        prisma.blog.create({
            data: {
                title: "The Future of Remote Work in Tech Industry",
                slug: "future-remote-work-tech-industry",
                content: `
# The Future of Remote Work in Tech Industry

The tech industry has been at the forefront of the remote work revolution. As we move into 2025, it's clear that remote work is not just a temporary trend but a fundamental shift in how we approach professional life.

## Key Benefits of Remote Work

### For Employees
- **Better Work-Life Balance**: No more long commutes means more time for personal activities
- **Increased Productivity**: Many developers report higher focus levels when working from home
- **Global Opportunities**: Access to job opportunities regardless of geographical location
- **Cost Savings**: Reduced expenses on transportation, work clothes, and meals

### For Companies
- **Access to Global Talent**: Companies can hire the best talent from anywhere in the world
- **Reduced Overhead Costs**: Lower office space and utility expenses
- **Improved Employee Retention**: Happy employees are more likely to stay with the company
- **Enhanced Diversity**: Remote work enables companies to build more diverse teams

## Challenges and Solutions

While remote work offers many advantages, it also presents unique challenges:

### Communication Barriers
**Challenge**: Lack of face-to-face interaction can lead to miscommunication
**Solution**: Implement regular video calls, use collaborative tools like Slack or Microsoft Teams, and establish clear communication protocols

### Maintaining Team Culture
**Challenge**: Building and maintaining company culture can be difficult in a remote environment
**Solution**: Organize virtual team-building activities, create digital spaces for casual interactions, and ensure regular one-on-one meetings

### Work-Life Boundaries
**Challenge**: The line between work and personal life can become blurred
**Solution**: Establish clear working hours, create dedicated workspace, and encourage employees to take regular breaks

## The Technology Stack for Remote Work

Essential tools for successful remote work include:

1. **Communication**: Slack, Microsoft Teams, Discord
2. **Video Conferencing**: Zoom, Google Meet, Microsoft Teams
3. **Project Management**: Jira, Trello, Asana, Linear
4. **Code Collaboration**: GitHub, GitLab, Bitbucket
5. **Documentation**: Notion, Confluence, GitBook
6. **Design Collaboration**: Figma, Miro, InVision

## Looking Ahead: Trends for 2025

- **Hybrid Models**: Many companies are adopting flexible hybrid arrangements
- **AI-Powered Productivity**: Integration of AI tools to enhance remote work efficiency
- **Virtual Reality Meetings**: VR technology making remote meetings more immersive
- **Async-First Culture**: Growing emphasis on asynchronous communication and work

## Conclusion

Remote work in the tech industry is here to stay. Companies that embrace this shift and invest in the right tools and culture will have a significant advantage in attracting and retaining top talent. The key is finding the right balance that works for both the organization and its employees.
                `,
                excerpt: "Exploring how remote work is shaping the future of the tech industry, its benefits, challenges, and what to expect in 2025.",
                featured_image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
                author_id: users.find(u => u.email === "admin@jobportal.com")?.user_id || 1,
                published: true,
            },
        }),
        prisma.blog.create({
            data: {
                title: "Essential Skills for Software Developers in 2025",
                slug: "essential-skills-software-developers-2025",
                content: `
# Essential Skills for Software Developers in 2025

The software development landscape is constantly evolving. As we progress through 2025, developers need to stay ahead of the curve by mastering both foundational and emerging skills.

## Core Technical Skills

### Programming Languages
The demand for certain programming languages continues to grow:

1. **JavaScript/TypeScript**: Still dominating web development
2. **Python**: Leading in AI/ML, data science, and backend development
3. **Rust**: Growing rapidly for system programming and performance-critical applications
4. **Go**: Preferred for cloud-native and microservices architectures
5. **Swift/Kotlin**: Essential for mobile app development

### Frameworks and Technologies
- **Frontend**: React, Vue.js, Svelte, Next.js
- **Backend**: Node.js, FastAPI, Django, Spring Boot
- **Mobile**: React Native, Flutter
- **Cloud**: AWS, Azure, Google Cloud Platform
- **Databases**: PostgreSQL, MongoDB, Redis, Vector databases

## Emerging Technologies

### Artificial Intelligence and Machine Learning
- Understanding of ML concepts and algorithms
- Experience with AI tools like GitHub Copilot, ChatGPT for development
- Knowledge of AI frameworks: TensorFlow, PyTorch, Hugging Face
- Vector databases and embedding technologies

### Cloud-Native Development
- Containerization with Docker and Kubernetes
- Serverless architecture (AWS Lambda, Vercel Functions)
- Infrastructure as Code (Terraform, CloudFormation)
- CI/CD pipelines and DevOps practices

### Web3 and Blockchain
- Smart contract development (Solidity, Rust)
- Decentralized application (dApp) development
- Understanding of blockchain fundamentals
- Crypto wallet integration

## Soft Skills That Matter

### Communication
- Clear technical writing and documentation
- Ability to explain complex concepts to non-technical stakeholders
- Active listening and collaboration skills
- Code review and feedback delivery

### Problem-Solving
- Algorithmic thinking and data structures knowledge
- Debugging and troubleshooting skills
- System design and architectural thinking
- Performance optimization techniques

### Adaptability
- Continuous learning mindset
- Ability to quickly adapt to new technologies
- Flexibility in working with different teams and projects
- Embracing change and uncertainty

## Industry-Specific Knowledge

### Security
- Understanding of common vulnerabilities (OWASP Top 10)
- Secure coding practices
- Authentication and authorization
- Data privacy and compliance (GDPR, CCPA)

### Performance and Scalability
- Code optimization techniques
- Database performance tuning
- Caching strategies
- Load balancing and horizontal scaling

### Testing
- Unit testing and Test-Driven Development (TDD)
- Integration and end-to-end testing
- Performance testing
- Security testing

## How to Stay Current

1. **Follow Industry Leaders**: Subscribe to newsletters, podcasts, and blogs
2. **Contribute to Open Source**: Build your portfolio and learn from others
3. **Attend Conferences**: Both virtual and in-person events
4. **Practice Regularly**: Code challenges, side projects, and experimentation
5. **Network**: Join developer communities and professional groups

## Building Your Learning Path

### For Beginners (0-2 years)
- Master one programming language thoroughly
- Understand fundamental CS concepts
- Build several personal projects
- Learn version control (Git)

### For Intermediate Developers (2-5 years)
- Expand to multiple languages and frameworks
- Learn system design basics
- Contribute to open source projects
- Start mentoring junior developers

### For Senior Developers (5+ years)
- Focus on architectural and leadership skills
- Stay updated with emerging technologies
- Build and lead technical teams
- Share knowledge through writing and speaking

## Conclusion

The key to success in software development is not just mastering specific technologies, but developing a continuous learning mindset. The most successful developers are those who can adapt, learn quickly, and combine technical expertise with strong soft skills.

Remember: Technology changes rapidly, but fundamental problem-solving skills and the ability to learn will always be valuable.
                `,
                excerpt: "A comprehensive guide to the technical and soft skills that will define successful software developers in 2025.",
                featured_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
                author_id: users.find(u => u.email === "admin@jobportal.com")?.user_id || 1,
                published: true,
            },
        }),
        prisma.blog.create({
            data: {
                title: "Mastering Technical Interviews: A Complete Guide",
                slug: "mastering-technical-interviews-complete-guide",
                content: "# Mastering Technical Interviews: A Complete Guide\n\nTechnical interviews can be intimidating, but with the right preparation and mindset, you can ace them. This comprehensive guide covers everything you need to know to succeed in your next technical interview.\n\n## Types of Technical Interviews\n\n### 1. Coding Interviews\n- **Format**: Live coding on a whiteboard or shared screen\n- **Focus**: Problem-solving, algorithms, data structures\n- **Duration**: 45-60 minutes\n- **Preparation**: Practice on LeetCode, HackerRank, CodeSignal\n\n### 2. System Design Interviews\n- **Format**: Architectural discussion with diagrams\n- **Focus**: Scalability, reliability, system components\n- **Duration**: 45-90 minutes\n- **Preparation**: Study system design patterns and real-world architectures\n\n### 3. Behavioral Interviews\n- **Format**: Conversational, scenario-based questions\n- **Focus**: Past experiences, problem-solving approach, cultural fit\n- **Duration**: 30-45 minutes\n- **Preparation**: STAR method (Situation, Task, Action, Result)\n\n## Preparation Strategy\n\n### 3 Months Before\n- **Foundation Building**: Review CS fundamentals\n- **Language Mastery**: Choose your preferred programming language\n- **Resource Setup**: Create accounts on coding platforms\n\n### 1 Month Before\n- **Company Research**: Study specific company requirements\n- **Behavioral Prep**: Prepare STAR stories\n- **System Design**: Focus on architecture patterns\n\n## During the Interview\n\n### Best Practices\n1. **Clarify Requirements**: Ask questions about edge cases and constraints\n2. **Think Out Loud**: Explain your thought process\n3. **Start Simple**: Begin with a brute force solution\n4. **Optimize Gradually**: Improve time and space complexity\n5. **Test Your Code**: Walk through examples\n\n## Conclusion\n\nSuccess in technical interviews comes from consistent practice, understanding fundamental concepts, and developing strong communication skills. Stay confident, be honest about what you don't know, and always keep learning. Good luck with your interviews!",
                excerpt: "Everything you need to know to excel in technical interviews, from coding challenges to system design and behavioral questions.",
                featured_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
                author_id: users.find(u => u.email === "admin@jobportal.com")?.user_id || 1,
                published: true,
            },
        }),
        prisma.blog.create({
            data: {
                title: "Building Scalable Web Applications: Best Practices",
                slug: "building-scalable-web-applications-best-practices",
                content: "# Building Scalable Web Applications: Best Practices\n\nCreating web applications that can handle growth and increased user demand is one of the biggest challenges in software development. This guide covers essential practices for building scalable web applications.\n\n## What is Scalability?\n\nScalability is the ability of a system to handle increased workload by adding resources to the system. There are two main types:\n\n### Vertical Scaling (Scale Up)\n- Adding more power (CPU, RAM) to existing machines\n- Easier to implement initially\n- Has physical limitations\n- Single point of failure\n\n### Horizontal Scaling (Scale Out)\n- Adding more machines to the resource pool\n- More complex but offers better long-term growth\n- Requires application design considerations\n- Better fault tolerance\n\n## Architecture Patterns for Scalability\n\n### 1. Microservices Architecture\nBreak down your application into smaller, independent services with these benefits:\n- Independent deployment and scaling\n- Technology diversity\n- Better fault isolation\n- Team autonomy\n\n### 2. Event-Driven Architecture\nUse events to communicate between different parts of your system for loose coupling and better scalability.\n\n## Database Scaling Strategies\n\n### 1. Read Replicas\nDistribute read operations across multiple database instances to improve read performance.\n\n### 2. Database Sharding\nDistribute data across multiple databases based on a shard key.\n\n### 3. Caching Strategies\nImplement application-level caching and Redis caching to reduce database load.\n\n## Performance Optimization Techniques\n\n### 1. Database Query Optimization\n- Use indexes for frequently queried columns\n- Optimize queries with EXPLAIN\n- Use pagination for large result sets\n\n### 2. API Response Optimization\n- Implement pagination\n- Use field selection\n- Return only necessary data\n\n### 3. Asynchronous Processing\nUse queue systems for heavy operations to improve response times.\n\n## Monitoring and Observability\n\n### 1. Application Metrics\nTrack request duration, active connections, and other key metrics.\n\n### 2. Health Checks\nImplement health check endpoints to monitor service status.\n\n## Load Balancing Strategies\n\n### 1. Round Robin\nDistribute requests evenly across servers.\n\n### 2. Weighted Round Robin\nDistribute requests based on server capacity.\n\n## Security Considerations\n\n### 1. Rate Limiting\nImplement rate limiting to prevent abuse.\n\n### 2. Input Validation\nValidate all user inputs to prevent security vulnerabilities.\n\n## Conclusion\n\nBuilding scalable web applications requires careful planning, the right architecture patterns, and continuous monitoring. Key takeaways:\n\n1. Start Simple: Don't over-engineer from the beginning\n2. Monitor Everything: You can't improve what you don't measure\n3. Plan for Growth: Design with scalability in mind\n4. Test Regularly: Load test before you need to scale\n5. Iterate: Continuously improve based on real-world usage\n\nRemember that premature optimization can be harmful. Focus on building a solid foundation, then scale based on actual needs.",
                excerpt: "Learn the essential patterns, techniques, and best practices for building web applications that can scale with your growing user base.",
                featured_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
                author_id: users.find(u => u.email === "admin@jobportal.com")?.user_id || 1,
                published: true,
            },
        }),
        prisma.blog.create({
            data: {
                title: "Getting Started with Docker and Containerization",
                slug: "getting-started-docker-containerization",
                content: "# Getting Started with Docker and Containerization\n\nDocker has revolutionized how we develop, deploy, and manage applications. This comprehensive guide will help you understand containerization and get started with Docker.\n\n## What is Containerization?\n\nContainerization is a lightweight form of virtualization that packages applications and their dependencies into containers. Unlike traditional virtual machines, containers share the host OS kernel, making them more efficient.\n\n### Benefits of Containerization\n- **Consistency**: Same environment across development, testing, and production\n- **Portability**: Run anywhere Docker is installed\n- **Efficiency**: Lower resource overhead than VMs\n- **Scalability**: Easy to scale applications horizontally\n- **Isolation**: Applications run in isolated environments\n\n## Docker Fundamentals\n\n### Core Concepts\n\n#### Images\nRead-only templates used to create containers. You can list, pull, and remove images using Docker commands.\n\n#### Containers\nRunning instances of Docker images. You can run, stop, and manage containers easily.\n\n#### Dockerfile\nText file with instructions to build an image. It defines the base image, working directory, dependencies, and startup commands.\n\n## Creating Your First Docker Application\n\n### Step 1: Create a Simple Node.js App\nCreate a basic Express.js application with health check endpoints.\n\n### Step 2: Create package.json\nDefine your application dependencies and scripts.\n\n### Step 3: Create Dockerfile\nWrite instructions to build your Docker image with proper security practices.\n\n### Step 4: Create .dockerignore\nExclude unnecessary files from the Docker build context.\n\n### Step 5: Build and Run\nBuild your image and run it as a container.\n\n## Docker Compose for Multi-Container Applications\n\nDocker Compose helps manage multi-container applications with a single YAML file that defines all services, networks, and volumes.\n\n## Advanced Docker Concepts\n\n### Multi-Stage Builds\nOptimize image size by using multiple build stages, separating build dependencies from runtime dependencies.\n\n### Docker Volumes\nPersist data outside containers using named volumes or bind mounts.\n\n### Docker Networks\nConnect containers using custom networks for better isolation and communication.\n\n## Best Practices\n\n### 1. Image Optimization\n- Use specific tags instead of 'latest'\n- Use multi-stage builds\n- Minimize layers\n- Use .dockerignore\n\n### 2. Security Best Practices\n- Don't run as root user\n- Use official base images\n- Keep images updated\n- Scan for vulnerabilities\n\n### 3. Health Checks\nAdd health check commands to monitor container health.\n\n### 4. Environment Configuration\nUse environment variables and build arguments for configuration.\n\n## Docker in CI/CD\n\nIntegrate Docker builds into your CI/CD pipeline using GitHub Actions or other platforms.\n\n## Monitoring and Debugging\n\n### Container Logs\nView and follow container logs for debugging.\n\n### Container Inspection\nInspect container configuration and monitor resource usage.\n\n### Performance Monitoring\nUse monitoring tools like Prometheus and Grafana.\n\n## Troubleshooting Common Issues\n\n### Image Build Failures\nDebug build issues with verbose output and cache management.\n\n### Container Runtime Issues\nCheck container status and resource usage.\n\n### Network Issues\nTest connectivity and inspect network configuration.\n\n## Production Deployment\n\n### Container Orchestration Options\n1. Docker Swarm: Built-in orchestration\n2. Kubernetes: Advanced orchestration platform\n3. AWS ECS: Amazon's container service\n4. Google Cloud Run: Serverless containers\n\n## Conclusion\n\nDocker and containerization have become essential tools in modern software development. Key takeaways:\n\n1. Start Simple: Begin with basic Dockerfiles and gradually add complexity\n2. Follow Best Practices: Security, optimization, and maintainability matter\n3. Use Docker Compose: Simplify multi-container development\n4. Monitor and Debug: Understanding logs and inspection tools is crucial\n5. Plan for Production: Consider orchestration and deployment strategies\n\nRemember that containerization is about creating consistent, portable, and scalable applications. Master these fundamentals, and you'll be well-equipped to work with containers in any environment.",
                excerpt: "A comprehensive guide to Docker and containerization, covering everything from basic concepts to production deployment.",
                featured_image: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800&h=400&fit=crop",
                author_id: users.find(u => u.email === "admin@jobportal.com")?.user_id || 1,
                published: false, // Draft blog post
            },
        }),
    ]);

    console.log("✅ Database seeding completed successfully!");

    // Print summary
    console.log("\n📊 SEEDING SUMMARY:");
    console.log(`👥 Users created: ${users.length}`);
    console.log(`🏢 Companies created: ${companies.length}`);
    console.log(`💼 Jobs created: ${jobs.length}`);
    console.log(`📝 Applications created: ${applications.length}`);
    console.log(`🛠️ Skills created: ${skills.length}`);
    console.log(`🧪 Skill Assessments created: ${assessments.length}`);
    console.log(`📝 Blog posts created: ${blogs.length}`);
    console.log(`💳 Subscriptions created: ${subscriptions.length}`);
    console.log(`⭐ Reviews created: 2`);
    console.log(`🧪 Selection Tests created: ${selections.length}`);

    console.log("\n🔐 LOGIN CREDENTIALS:");
    console.log("📧 Regular Users:");
    console.log("  - john.doe@gmail.com / password123");
    console.log("  - jane.smith@gmail.com / password123");
    console.log("  - bob.wilson@gmail.com / password123");
    console.log("  - alice.brown@gmail.com / password123");
    console.log("🏢 Company Users:");
    console.log("  - hr@techcorp.com / password123");
    console.log("  - careers@startuphub.com / password123");
    console.log("  - jobs@designstudio.com / password123");
    console.log("👨‍💻 Developer:");
    console.log("  - admin@jobportal.com / admin123");
}

main()
    .catch((e) => {
        console.error("❌ Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
