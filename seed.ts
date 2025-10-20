import { faker } from "@faker-js/faker";
import { hashPassword } from "./src/utils/hash";
import {
  Category,
  Currency,
  DegreeLevel,
  JobType,
  PeriodSalary,
  Role,
  Status,
} from "./prisma/generated/client";
import { prisma } from "./src/config/prisma";
import { createSlug } from "./src/utils/createSlug";

// ------------------ Data Constants ------------------
const institutions = [
  "Universitas Indonesia",
  "Institut Teknologi Bandung",
  "Universitas Gadjah Mada",
  "Universitas Airlangga",
  "Institut Pertanian Bogor",
  "Universitas Diponegoro",
  "Universitas Brawijaya",
  "Universitas Padjadjaran",
  "Universitas Hasanuddin",
  "Institut Teknologi Sepuluh Nopember",
  "Universitas Sebelas Maret",
  "Universitas Andalas",
  "Universitas Sumatera Utara",
  "Universitas Lampung",
  "Universitas Negeri Yogyakarta",
  "Universitas Negeri Malang",
  "Universitas Negeri Jakarta",
  "Universitas Pendidikan Indonesia",
  "Universitas Muhammadiyah Yogyakarta",
  "Universitas Islam Indonesia",
  "SMA Negeri 1 Jakarta",
  "SMA Negeri 8 Jakarta",
  "SMA Negeri 3 Bandung",
  "SMA Negeri 5 Yogyakarta",
  "Harvard University",
  "Massachusetts Institute of Technology",
  "Stanford University",
  "University of Oxford",
  "University of Cambridge",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "California Institute of Technology",
  "University of Chicago",
  "University of Pennsylvania",
  "University of California, Berkeley",
  "University of Michigan",
  "Cornell University",
  "Duke University",
  "University of Toronto",
  "McGill University",
  "National University of Singapore",
  "University of Melbourne",
  "University of Sydney",
  "Politeknik Negeri Jakarta",
  "Universitas Atma Jaya Jakarta",
  "Universitas Kristen Petra",
  "Universitas Katolik Parahyangan",
  "Sanata Dharma University",
  "Telkom University",
  "Trisakti University",
  "Pelita Harapan University",
  "Bina Nusantara University",
  "Mercu Buana University",
  "Tarumanagara University",
  "Gunadarma University",
  "Esa Unggul University",
  "Universitas Muhammadiyah Surakarta",
  "Universitas Islam Bandung",
  "Universitas Islam Malang",
  "Universitas Islam Sumatera Utara",
  "University of Oxford Brookes",
  "University of British Columbia",
  "Imperial College London",
  "London School of Economics",
  "King's College London",
  "University of Edinburgh",
  "University of Manchester",
  "University of Warwick",
  "University of Queensland",
  "University of Auckland",
  "National Taiwan University",
  "Seoul National University",
  "Peking University",
  "Tsinghua University",
  "ETH Zurich",
  "University of Tokyo",
  "Kyoto University",
  "University of Hong Kong",
  "University of New South Wales",
  "University of Western Australia",
  "Monash University",
  "University of Adelaide",
];

const fieldsOfStudy = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Network Engineering",
  "Computer Engineering",
  "Information Systems",
  "Business Administration",
  "Management",
  "Marketing",
  "Finance",
  "Accounting",
  "Economics",
  "Human Resources",
  "International Business",
  "Supply Chain Management",
  "Entrepreneurship",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Architecture",
  "Industrial Engineering",
  "Chemical Engineering",
  "Environmental Engineering",
  "Biomedical Engineering",
  "Pharmacy",
  "Medicine",
  "Nursing",
  "Dentistry",
  "Law",
  "Political Science",
  "Psychology",
  "Sociology",
  "Education",
  "Early Childhood Education",
  "Linguistics",
  "Graphic Design",
  "Industrial Design",
  "Interior Design",
  "Fashion Design",
  "Film Studies",
  "Communication Studies",
  "Journalism",
  "Public Relations",
  "Performing Arts",
  "Music",
  "Fine Arts",
  "History",
  "Anthropology",
  "Philosophy",
  "Mathematics",
  "Statistics",
  "Physics",
  "Chemistry",
  "Biology",
  "Environmental Science",
  "Geology",
  "Astronomy",
  "Political Science",
  "International Relations",
];

const cities = [
  { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { name: "Bandung", lat: -6.9175, lng: 107.6191 },
  { name: "Surabaya", lat: -7.2575, lng: 112.7521 },
  { name: "Yogyakarta", lat: -7.7956, lng: 110.3695 },
  { name: "Medan", lat: 3.5952, lng: 98.6722 },
  { name: "Semarang", lat: -6.9667, lng: 110.4167 },
  { name: "Makassar", lat: -5.1477, lng: 119.4327 },
  { name: "Bali", lat: -8.3405, lng: 115.092 },
  { name: "Palembang", lat: -2.9909, lng: 104.7563 },
  { name: "Pontianak", lat: 0.0333, lng: 109.3333 },
  { name: "Balikpapan", lat: -1.2671, lng: 116.8316 },
  { name: "Manado", lat: 1.4914, lng: 124.8419 },
  { name: "Banjarmasin", lat: -3.3167, lng: 114.5833 },
  { name: "Bandar Lampung", lat: -5.4297, lng: 105.2619 },
  { name: "Samarinda", lat: -0.502, lng: 117.153 },
  { name: "Malang", lat: -7.9839, lng: 112.6214 },
  { name: "Solo", lat: -7.5686, lng: 110.817 },
  { name: "Tasikmalaya", lat: -7.3306, lng: 108.22 },
  { name: "Depok", lat: -6.4025, lng: 106.7949 },
  { name: "Bogor", lat: -6.597, lng: 106.8166 },
  { name: "Cirebon", lat: -6.7328, lng: 108.5529 },
  { name: "Padang", lat: -0.9471, lng: 100.4172 },
  { name: "Pekanbaru", lat: 0.533, lng: 101.4478 },
  { name: "Jayapura", lat: -2.533, lng: 140.717 },
  { name: "Kupang", lat: -10.1833, lng: 123.6167 },
  { name: "Ambon", lat: -3.6957, lng: 128.1811 },
  { name: "Ternate", lat: 0.8, lng: 127.4 },
  { name: "Manokwari", lat: -0.861, lng: 134.0627 },
  { name: "Sorong", lat: -0.8833, lng: 131.25 },
  { name: "Denpasar", lat: -8.65, lng: 115.2167 },
];

const skills = [
  // -------- Programming / IT --------
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Go",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Rust",
  "SQL",
  "NoSQL",
  "HTML",
  "CSS",
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "GraphQL",
  "REST API",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Firebase",
  "Git",
  "Linux",
  "CI/CD",
  "Webpack",
  "Babel",
  "Next.js",
  "Nuxt.js",
  "Tailwind CSS",
  "Sass",
  "Less",
  "Bootstrap",
  "Material UI",
  "Figma",
  "Photoshop",
  "Illustrator",

  // -------- Data / AI --------
  "Data Analysis",
  "Data Visualization",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "Scikit-learn",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Big Data",
  "Hadoop",
  "Spark",
  "Tableau",
  "Power BI",
  "SQL Server",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Elasticsearch",

  // -------- Design --------
  "UI Design",
  "UX Design",
  "Graphic Design",
  "Web Design",
  "Mobile App Design",
  "Wireframing",
  "Prototyping",
  "Figma",
  "Sketch",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "After Effects",
  "Cinema 4D",
  "Blender",
  "3D Modeling",
  "Animation",

  // -------- Marketing --------
  "SEO",
  "Content Marketing",
  "Social Media Marketing",
  "Email Marketing",
  "Copywriting",
  "Google Ads",
  "Facebook Ads",
  "Instagram Marketing",
  "TikTok Marketing",
  "Brand Strategy",
  "Market Research",
  "Public Relations",
  "Influencer Marketing",

  // -------- Management / Business --------
  "Project Management",
  "Agile",
  "Scrum",
  "Kanban",
  "Leadership",
  "Team Management",
  "Business Analysis",
  "Product Management",
  "Strategy",
  "Operations Management",
  "Supply Chain Management",
  "Risk Management",
  "Change Management",
  "Financial Management",

  // -------- Finance / Accounting --------
  "Accounting",
  "Bookkeeping",
  "Financial Analysis",
  "Investment Analysis",
  "Budgeting",
  "Forecasting",
  "Excel",
  "QuickBooks",
  "SAP",
  "Taxation",
  "Auditing",
  "Corporate Finance",
  "Financial Modeling",
  "Risk Assessment",

  // -------- Communication / Soft Skills --------
  "Presentation",
  "Negotiation",
  "Public Speaking",
  "Creative Thinking",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Conflict Resolution",
  "Teamwork",
  "Adaptability",
  "Emotional Intelligence",
  "Networking",
  "Coaching",

  // -------- Others / Misc --------
  "Photography",
  "Videography",
  "Event Planning",
  "Customer Service",
  "Research",
  "Writing",
  "Blogging",
  "Translation",
  "Teaching",
  "Foreign Languages",
  "Legal Knowledge",
];

const companyImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
  "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800",
  "https://images.unsplash.com/photo-1507209696998-3c532be9b2b6?w=800",
  "https://images.unsplash.com/photo-1524567497590-4c8a62b9a8b0?w=800",
  "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
  "https://images.unsplash.com/photo-1560264418-c4445382edbc?w=800",
  "https://images.unsplash.com/photo-1581092919535-712f0c1c59d8?w=800",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
  "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800",
  "https://images.unsplash.com/photo-1612832021044-f0c9f9f13a0e?w=800",
  "https://images.unsplash.com/photo-1621570162868-1a2b9c049b2f?w=800",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
  "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
  "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=800",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
  "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800",
  "https://images.unsplash.com/photo-1526481280695-3c720685208b?w=800",
  "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=800",
  "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800",
  "https://images.unsplash.com/photo-1531497865146-1f953e7f3bfc?w=800",
  "https://images.unsplash.com/photo-1542223616-7e7f2c3a5e32?w=800",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
  "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?w=800",
  "https://images.unsplash.com/photo-1584697964192-3d5e3d3dcb09?w=800",
  "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
  "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800",
  "https://images.unsplash.com/photo-1507209696998-3c532be9b2b6?w=800",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
  "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
  "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
  "https://images.unsplash.com/photo-1560264418-c4445382edbc?w=800",
  "https://images.unsplash.com/photo-1581092919535-712f0c1c59d8?w=800",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
  "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800",
  "https://images.unsplash.com/photo-1612832021044-f0c9f9f13a0e?w=800",
  "https://images.unsplash.com/photo-1621570162868-1a2b9c049b2f?w=800",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
  "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
  "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=800",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800",
  "https://images.unsplash.com/photo-1526481280695-3c720685208b?w=800",
  "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=800",
  "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800",
  "https://images.unsplash.com/photo-1531497865146-1f953e7f3bfc?w=800",
  "https://images.unsplash.com/photo-1542223616-7e7f2c3a5e32?w=800",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
  "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?w=800",
  "https://images.unsplash.com/photo-1584697964192-3d5e3d3dcb09?w=800",
  "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
  "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800",
  "https://images.unsplash.com/photo-1612832021044-f0c9f9f13a0e?w=800",
  "https://images.unsplash.com/photo-1621570162868-1a2b9c049b2f?w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
  "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800",
  "https://images.unsplash.com/photo-1507209696998-3c532be9b2b6?w=800",
  "https://images.unsplash.com/photo-1524567497590-4c8a62b9a8b0?w=800",
  "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
  "https://images.unsplash.com/photo-1560264418-c4445382edbc?w=800",
  "https://images.unsplash.com/photo-1581092919535-712f0c1c59d8?w=800",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
  "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800",
  "https://images.unsplash.com/photo-1612832021044-f0c9f9f13a0e?w=800",
  "https://images.unsplash.com/photo-1621570162868-1a2b9c049b2f?w=800",
];

const companiesNameEmail = [
  { name: "TechNova Solutions", email: "contact@technova.com" },
  { name: "BlueWave Systems", email: "info@bluewave.io" },
  { name: "GreenLeaf Innovations", email: "hello@greenleaf.com" },
  { name: "Skyline Technologies", email: "support@skyline.tech" },
  { name: "NextGen Labs", email: "admin@nextgenlabs.org" },
  { name: "BrightFuture Corp", email: "contact@brightfuture.co" },
  { name: "RedStone Digital", email: "info@redstone.io" },
  { name: "Apex Global", email: "hello@apexglobal.com" },
  { name: "UrbanHive", email: "support@urbanhive.net" },
  { name: "CloudBridge", email: "admin@cloudbridge.io" },

  { name: "QuantumWorks", email: "contact@quantumworks.com" },
  { name: "VisionarySoft", email: "info@visionarysoft.net" },
  { name: "DataForge", email: "hello@dataforge.io" },
  { name: "BrightSpark AI", email: "support@brightspark.ai" },
  { name: "CyberNest", email: "admin@cybernest.org" },
  { name: "Stellar Systems", email: "contact@stellar.tech" },
  { name: "InnovaCore", email: "info@innovacore.io" },
  { name: "HyperEdge", email: "hello@hyperedge.net" },
  { name: "NeoCloud", email: "support@neocloud.com" },
  { name: "Vertex Labs", email: "admin@vertexlabs.io" },

  { name: "FutureLink", email: "contact@futurelink.com" },
  { name: "GlobeTech", email: "info@globetech.io" },
  { name: "PrimeLogic", email: "hello@primelogic.net" },
  { name: "EcoSphere", email: "support@ecosphere.org" },
  { name: "SoftBridge", email: "admin@softbridge.com" },
  { name: "InfoMatrix", email: "contact@infomatrix.io" },
  { name: "BrightMind", email: "info@brightmind.co" },
  { name: "CloudCore", email: "hello@cloudcore.net" },
  { name: "UrbanLink", email: "support@urbanlink.io" },
  { name: "NovaEdge", email: "admin@novaedge.com" },

  { name: "AeroTech", email: "contact@aerotech.io" },
  { name: "SmartWorks", email: "info@smartworks.net" },
  { name: "DataVision", email: "hello@datavision.org" },
  { name: "NextPath", email: "support@nextpath.co" },
  { name: "BrightWave", email: "admin@brightwave.com" },
  { name: "CoreLogic", email: "contact@corelogic.io" },
  { name: "InspireTech", email: "info@inspiretech.net" },
  { name: "Zenith Labs", email: "hello@zenithlabs.org" },
  { name: "Astra Systems", email: "support@astrasystems.io" },
  { name: "NeuraSoft", email: "admin@neurasoft.com" },

  { name: "DigitalHive", email: "contact@digitalhive.io" },
  { name: "OptimaTech", email: "info@optimatech.net" },
  { name: "BrightSky", email: "hello@brightsky.org" },
  { name: "CyberLogic", email: "support@cyberlogic.co" },
  { name: "SmartLink", email: "admin@smartlink.io" },
  { name: "UrbanEdge", email: "contact@urbanedge.com" },
  { name: "TechSphere", email: "info@techsphere.io" },
  { name: "BrightLabs", email: "hello@brightlabs.net" },
  { name: "CloudVision", email: "support@cloudvision.org" },
  { name: "ApexCore", email: "admin@apexcore.io" },

  { name: "ZenWorks", email: "contact@zenworks.com" },
  { name: "MetaTech", email: "info@metatech.io" },
  { name: "NextVision", email: "hello@nextvision.net" },
  { name: "GlobalEdge", email: "support@globaledge.org" },
  { name: "BrightCore", email: "admin@brightcore.co" },
  { name: "CyberWave", email: "contact@cyberwave.io" },
  { name: "SkyLabs", email: "info@skylabs.net" },
  { name: "TechBridge", email: "hello@techbridge.org" },
  { name: "UrbanSphere", email: "support@urbansphere.com" },
  { name: "FutureEdge", email: "admin@futureedge.io" },

  { name: "CoreVision", email: "contact@corevision.com" },
  { name: "InnovaTech", email: "info@innovatech.net" },
  { name: "BrightNet", email: "hello@brightnet.org" },
  { name: "SkyEdge", email: "support@skyedge.co" },
  { name: "QuantumCore", email: "admin@quantumcore.io" },
  { name: "NeoLogic", email: "contact@neologic.com" },
  { name: "UrbanTech", email: "info@urbantech.io" },
  { name: "SmartVision", email: "hello@smartvision.net" },
  { name: "CloudEdge", email: "support@cloudedge.org" },
  { name: "BrightLogic", email: "admin@brightlogic.co" },

  { name: "AeroLabs", email: "contact@aerolabs.io" },
  { name: "FutureCore", email: "info@futurecore.net" },
  { name: "SkyVision", email: "hello@skyvision.org" },
  { name: "PrimeEdge", email: "support@primeedge.co" },
  { name: "NeoSphere", email: "admin@neosphere.io" },
  { name: "UrbanWorks", email: "contact@urbanworks.com" },
  { name: "CyberCore", email: "info@cybercore.io" },
  { name: "BrightEdge", email: "hello@brightedge.net" },
  { name: "NextLogic", email: "support@nextlogic.org" },
  { name: "CoreLabs", email: "admin@corelabs.co" },

  { name: "InspireLabs", email: "contact@inspirelabs.com" },
  { name: "NovaCore", email: "info@novacore.io" },
  { name: "UrbanLogic", email: "hello@urbanlogic.net" },
  { name: "SmartCore", email: "support@smartcore.org" },
  { name: "BrightVision", email: "admin@brightvision.co" },
  { name: "CloudWorks", email: "contact@cloudworks.com" },
  { name: "ApexVision", email: "info@apexvision.io" },
  { name: "NextEdge", email: "hello@nextedge.net" },
  { name: "FutureSphere", email: "support@futuresphere.org" },
  { name: "TechLogic", email: "admin@techlogic.co" },
];

// ------------------ Helper Functions ------------------
const randomDateRange = (startYear = 2015, endYear = 2023) => {
  const startDate = faker.date.between({
    from: `${startYear}-01-01`,
    to: `${endYear}-12-31`,
  });
  const endDate =
    Math.random() < 0.7
      ? faker.date.between({ from: startDate, to: `${endYear}-12-31` })
      : null;
  return { startDate, endDate };
};

// ------------------ Main Seeding Function ------------------
async function main() {
  //   console.log("🎨 Seeding skills...");
  //   await prisma.skills.createMany({
  //     data: skills.map((name) => ({ name })),
  //     skipDuplicates: true,
  //   });
  //   console.log("👨‍💻 Creating developer...");
  //   const developer = await prisma.users.create({
  //     data: {
  //       username: "dev_user",
  //       email: "developer@example.com",
  //       password: await hashPassword("pass.123"),
  //       name: faker.person.fullName(),
  //       role: Role.DEVELOPER,
  //       isVerfied: true,
  //     },
  //   });
  //   // ------------------ Users ------------------
  //   console.log("🧑 Creating 100 users...");
  //   const degreeLevels = [
  //     DegreeLevel.HIGH_SCHOOL,
  //     DegreeLevel.DIPLOMA,
  //     DegreeLevel.BACHELOR,
  //     DegreeLevel.MASTER,
  //     DegreeLevel.DOCTORATE,
  //   ];
  //   const userPromises = Array.from({ length: 200 }).map(async (_, i) => {
  //     const degree = degreeLevels[i % degreeLevels.length];
  //     const birthDate = faker.date.birthdate({ min: 16, max: 70, mode: "age" });
  //     const name = `user ${i}`;
  //     const email = `user${i}@mail.com`;
  //     const randomCreatedAt = faker.date.past({ years: 10 });
  //     const createdUser = await prisma.users.create({
  //       data: {
  //         username: faker.internet.username(),
  //         email,
  //         password: await hashPassword("pass.123"),
  //         name,
  //         role: Role.USER,
  //         isVerfied: true,
  //         createdAt: randomCreatedAt,
  //         profiles: {
  //           create: {
  //             email,
  //             name,
  //             phone: faker.phone.number(),
  //             birthDate,
  //             gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
  //             address: faker.location.streetAddress(),
  //             profile_picture: faker.image.avatar(),
  //           },
  //         },
  //         education: {
  //           createMany: {
  //             data: Array.from({ length: 5 }).map(() => {
  //               const { startDate, endDate } = randomDateRange();
  //               return {
  //                 university: faker.helpers.arrayElement(institutions),
  //                 degree,
  //                 fieldOfStudy: faker.helpers.arrayElement(fieldsOfStudy),
  //                 description: faker.lorem.sentence({ min: 3, max: 5 }),
  //                 startDate,
  //                 endDate,
  //               };
  //             }),
  //           },
  //         },
  //         experience: {
  //           createMany: {
  //             data: Array.from({ length: 5 }).map(() => {
  //               const { startDate, endDate } = randomDateRange();
  //               return {
  //                 name: faker.company.name(),
  //                 position: faker.person.jobTitle(),
  //                 startDate,
  //                 endDate,
  //                 description: faker.lorem.sentence({ min: 3, max: 5 }),
  //               };
  //             }),
  //           },
  //         },
  //       },
  //     });
  //     const allSkills = await prisma.skills.findMany();
  //     await prisma.userSkills.createMany({
  //       data: Array.from({ length: 5 }).map(() => ({
  //         userId: createdUser.user_id,
  //         skillId: faker.helpers.arrayElement(allSkills).id,
  //       })),
  //       skipDuplicates: true,
  //     });
  //     return createdUser;
  //   });
  //   const allUsers = await Promise.all(userPromises);
  //   console.log("✅ Users created");
  //   ------------------ Companies & Jobs ------------------
  //   console.log("🏢 Creating companies & jobs...");
  //   const allSkills = await prisma.skills.findMany();
  //   const companyPromises = Array.from({ length: 100 }).map(async (_, i) => {
  //     const name = `company ${i}`;
  //     const email = `company${i}@mail.com`;
  //     const randomCreatedAt = faker.date.past({ years: 10 });
  //     const companyUser = await prisma.users.create({
  //       data: {
  //         username: faker.internet.username(),
  //         email,
  //         password: await hashPassword("pass.123"),
  //         name,
  //         role: Role.COMPANY,
  //         isVerfied: true,
  //         createdAt: randomCreatedAt,
  //         companies: {
  //           create: {
  //             name,
  //             email,
  //             phone: faker.phone.number(),
  //             description: faker.lorem.paragraphs(4),
  //             website: faker.internet.url(),
  //             profile_picture: faker.image.urlLoremFlickr({
  //               category: "business",
  //             }),
  //           },
  //         },
  //       },
  //       include: { companies: true },
  //     });
  //   const companies = await prisma.users.findMany({
  //     where: { role: Role.COMPANY, isVerfied: true },
  //     include: { companies: true },
  //   });
  //   const allSkills = await prisma.skills.findMany();
  //   for (const companyUser of companies) {
  //     if (!companyUser.companies?.company_id) continue;
  //     // buat job
  //     const jobsData = Array.from({ length: 5 }).map(async (_, idx) => {
  //       const loc = faker.helpers.arrayElement(cities);
  //       const title = faker.company.name();
  //       const category = faker.helpers.arrayElement(Object.values(Category));
  //       const job_type = faker.helpers.arrayElement(Object.values(JobType));
  //       const slug = await createSlug(
  //         title,
  //         category,
  //         job_type,
  //         companyUser.username
  //       );
  //       return {
  //         title,
  //         category,
  //         job_type,
  //         slug,
  //         description: faker.lorem.paragraph({ min: 12, max: 20 }),
  //         salary: faker.number.int({ min: 3000000, max: 90000000 }),
  //         periodSalary: faker.helpers.arrayElement(Object.values(PeriodSalary)),
  //         currency: Currency.RP,
  //         expiredAt: faker.date.soon({ days: 30 }),
  //         location: loc.name,
  //         latitude: String(loc.lat),
  //         longitude: String(loc.lng),
  //         preselection_test: idx >= 3, // 2 job terakhir preselection
  //         company_id: companyUser.companies!.company_id,
  //       };
  //     });
  //     const allJobs = await Promise.all(jobsData);
  //     // create jobs di DB
  //     const createdJobs = await Promise.all(
  //       allJobs.map((job) =>
  //         prisma.jobs.create({
  //           data: {
  //             ...job,
  //             skills: {
  //               connect: faker.helpers
  //                 .arrayElements(allSkills, { min: 3, max: 7 })
  //                 .map((s) => ({ id: s.id })),
  //             },
  //           },
  //         })
  //       )
  //     );
  //   }
  //   // create selections + questions untuk job preselection
  //   const preselectionJobs = await prisma.jobs.findMany({
  //     where: { preselection_test: true },
  //   });
  //   await Promise.all(
  //     preselectionJobs.map(async (job) => {
  //       const selection = await prisma.selections.create({
  //         data: {
  //           job_id: job.job_id,
  //           passingScore: faker.number.int({ min: 60, max: 80 }),
  //         },
  //       });
  //       const questionsData = Array.from({ length: 15 }).map(() => ({
  //         selection_id: selection.selection_id,
  //         question: faker.lorem.sentence(),
  //         option_A: faker.lorem.words(),
  //         option_B: faker.lorem.words(),
  //         option_C: faker.lorem.words(),
  //         option_D: faker.lorem.words(),
  //         correct_option: faker.helpers.arrayElement(["A", "B", "C", "D"]),
  //       }));
  //       await prisma.selectionQuestions.createMany({ data: questionsData });
  //     })
  //   );
  //   console.log("✅ Companies & jobs created");
  // 3;
  // // ------------------ Applications ------------------
  //   console.log("🗑️ Clearing old applications & user selections...");
  try {
    console.log("📄 Creating 50 applications for a specific job...");

    // ambil job target by slug
    const job = await prisma.jobs.findUnique({
      where: { job_id: 992 },
      include: { selection: true },
    });

    if (!job) throw new Error("Job not found");

    // ambil 50 user random
    const allUsers = await prisma.users.findMany({
      where: {
        role: Role.USER,
        isVerfied: true,
      },
      take: 50,
    });

    for (const user of allUsers) {
      // cek apakah user sudah apply ke job ini
      const alreadyApplied = await prisma.applications.findUnique({
        where: {
          user_id_job_id: { user_id: user.user_id, job_id: job.job_id },
        },
      });

      if (!alreadyApplied) {
        const randomCreatedAt = faker.date.past({ years: 5 });

        // bikin application
        await prisma.applications.create({
          data: {
            user_id: user.user_id,
            job_id: job.job_id,
            status: Status.SUBMITTED,
            expected_salary: faker.number.int({ min: 2000000, max: 50000000 }),
            cv: faker.internet.url() + "/dummy.pdf",
            createdAt: randomCreatedAt,
          },
        });

        // kalau job ada selection, bikin userSelection juga
        if (job.selection?.selection_id) {
          await prisma.userSelection.create({
            data: {
              user_id: user.user_id,
              selection_id: job.selection.selection_id,
              score:
                Math.round(faker.number.float({ min: 50, max: 100 }) * 100) /
                100,
              startedAt: faker.date.between({
                from: randomCreatedAt,
                to: new Date(),
              }),
            },
          });
        }
      }
    }

    console.log("✅ 50 Applications & user selections created");
  } catch (error) {
    console.log(error);
  }

  //   const allCompany = await prisma.companies.findMany();
  //   allCompany.forEach(async (company, index) => {
  //     const companyData = companiesNameEmail[index];
  //     if (!companyData) return;
  //     await prisma.users.update({
  //       where: { user_id: company.user_id },
  //       data: {
  //         email: companyData.email,
  //         name: companyData.name,
  //         companies: {
  //           update: {
  //             name: companyData.name,
  //             email: companyData.email,
  //             profile_picture: companyImages[index],
  //           },
  //         },
  //       },
  //     });
  //   });
  // hapus userSelection dulu (karena ada foreign key ke application/job/user)
}

// ------------------ Run ------------------
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
