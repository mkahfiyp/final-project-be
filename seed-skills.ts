import { PrismaClient } from './prisma/generated/client';

const prisma = new PrismaClient();

// Comprehensive skills data for job portal
const skillsData = [
    // Programming Languages
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'C', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell Scripting', 'PowerShell', 'Dart', 'Elixir', 'Clojure', 'F#', 'Haskell', 'Lua', 'Assembly',

    // Frontend Technologies
    'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'HTML5', 'CSS3', 'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design', 'Chakra UI', 'Styled Components', 'Emotion', 'jQuery', 'Alpine.js', 'Stimulus', 'Lit', 'Stencil', 'Ember.js',

    // Backend Technologies
    'Node.js', 'Express.js', 'NestJS', 'Fastify', 'Koa.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Spring Framework', 'ASP.NET Core', 'ASP.NET', 'Ruby on Rails', 'Laravel', 'Symfony', 'CodeIgniter', 'Gin', 'Echo', 'Fiber', 'Phoenix', 'Rocket',

    // Mobile Development
    'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Cordova', 'PhoneGap', 'Native Android', 'Native iOS', 'Unity', 'Unreal Engine', 'Titanium', 'Qt', 'Kivy', 'Corona SDK',

    // Databases
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Microsoft SQL Server', 'Oracle Database', 'MariaDB', 'Cassandra', 'DynamoDB', 'CouchDB', 'Neo4j', 'InfluxDB', 'Elasticsearch', 'Amazon RDS', 'Google Cloud SQL', 'Azure SQL Database', 'Firebase Firestore', 'Supabase', 'PlanetScale',

    // Cloud Platforms & Services
    'AWS', 'Google Cloud Platform', 'Microsoft Azure', 'DigitalOcean', 'Heroku', 'Vercel', 'Netlify', 'Railway', 'Render', 'Cloudflare', 'Linode', 'Vultr', 'IBM Cloud', 'Oracle Cloud', 'Alibaba Cloud',

    // DevOps & Infrastructure
    'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'Travis CI', 'CircleCI', 'Ansible', 'Terraform', 'Vagrant', 'Chef', 'Puppet', 'Helm', 'ArgoCD', 'Istio', 'Prometheus', 'Grafana', 'ELK Stack', 'Nagios', 'Zabbix',

    // Version Control
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial', 'Perforce', 'Azure DevOps',

    // Testing
    'Jest', 'Mocha', 'Chai', 'Cypress', 'Selenium', 'Playwright', 'Puppeteer', 'TestCafe', 'Protractor', 'Karma', 'Jasmine', 'PHPUnit', 'PyTest', 'JUnit', 'TestNG', 'Mockito', 'Sinon', 'Enzyme', 'React Testing Library', 'Vue Test Utils',

    // API Technologies
    'REST API', 'GraphQL', 'gRPC', 'WebSocket', 'Socket.io', 'Server-Sent Events', 'JSON-RPC', 'SOAP', 'OpenAPI', 'Swagger', 'Postman', 'Insomnia', 'Apollo GraphQL', 'Relay',

    // Data Science & Analytics
    'Machine Learning', 'Deep Learning', 'Data Analysis', 'Data Visualization', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLTK', 'spaCy', 'Apache Spark', 'Hadoop', 'Kafka', 'Apache Airflow', 'Jupyter', 'Google Colab', 'Tableau', 'Power BI', 'Looker', 'D3.js',

    // Design & Creative
    'UI/UX Design', 'Graphic Design', 'Web Design', 'Mobile Design', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer', 'Canva', 'Adobe After Effects', 'Adobe Premiere Pro', 'Blender', 'Cinema 4D', 'Maya', '3ds Max',

    // Marketing & Sales
    'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Google Analytics', 'Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Instagram Marketing', 'TikTok Marketing', 'YouTube Marketing', 'Affiliate Marketing', 'Influencer Marketing', 'Marketing Automation', 'CRM', 'Salesforce', 'HubSpot', 'Mailchimp', 'Hootsuite', 'Buffer',

    // Business & Management
    'Project Management', 'Agile', 'Scrum', 'Kanban', 'Lean', 'Six Sigma', 'Product Management', 'Business Analysis', 'Strategic Planning', 'Financial Analysis', 'Risk Management', 'Quality Assurance', 'Leadership', 'Team Management', 'Stakeholder Management', 'Change Management', 'Process Improvement',

    // Tools & Software
    'Jira', 'Confluence', 'Trello', 'Asana', 'Monday.com', 'Notion', 'Slack', 'Microsoft Teams', 'Zoom', 'VS Code', 'IntelliJ IDEA', 'Eclipse', 'Vim', 'Emacs', 'Sublime Text', 'Atom', 'WebStorm', 'PyCharm', 'Visual Studio', 'Xcode', 'Android Studio',

    // Security
    'Cybersecurity', 'Penetration Testing', 'Ethical Hacking', 'Network Security', 'Information Security', 'OWASP', 'Security Auditing', 'Vulnerability Assessment', 'Incident Response', 'Risk Assessment', 'Compliance', 'GDPR', 'SOC 2', 'ISO 27001', 'CISSP', 'CEH', 'OSCP',

    // Networking
    'TCP/IP', 'DNS', 'DHCP', 'VPN', 'Firewall', 'Load Balancing', 'CDN', 'HTTP/HTTPS', 'SSL/TLS', 'OAuth', 'JWT', 'SAML', 'LDAP', 'Active Directory',

    // ERP & Enterprise Systems
    'SAP', 'Oracle ERP', 'Microsoft Dynamics', 'NetSuite', 'Workday', 'ServiceNow', 'Salesforce', 'Odoo', 'ERPNext', 'Sage', 'QuickBooks',

    // E-commerce
    'Shopify', 'WooCommerce', 'Magento', 'PrestaShop', 'BigCommerce', 'OpenCart', 'Drupal Commerce', 'Squarespace', 'Wix', 'Payment Gateway Integration', 'Stripe', 'PayPal', 'Square', 'Razorpay',

    // Content Management
    'WordPress', 'Drupal', 'Joomla', 'Ghost', 'Strapi', 'Contentful', 'Sanity', 'Prismic', 'Headless CMS', 'JAMstack',

    // Communication & Languages
    'English', 'Indonesian', 'Mandarin', 'Japanese', 'Korean', 'Spanish', 'French', 'German', 'Arabic', 'Portuguese', 'Russian', 'Hindi', 'Thai', 'Vietnamese', 'Dutch', 'Italian', 'Turkish',

    // Soft Skills
    'Communication', 'Problem Solving', 'Critical Thinking', 'Creativity', 'Teamwork', 'Time Management', 'Adaptability', 'Emotional Intelligence', 'Negotiation', 'Presentation Skills', 'Public Speaking', 'Writing', 'Research', 'Analytical Thinking', 'Decision Making', 'Conflict Resolution', 'Customer Service', 'Sales Skills',

    // Industry-Specific Skills
    'Healthcare IT', 'FinTech', 'EdTech', 'PropTech', 'AgriTech', 'LegalTech', 'InsurTech', 'RetailTech', 'Supply Chain Management', 'Logistics', 'Manufacturing', 'Automotive', 'Aerospace', 'Energy', 'Oil & Gas', 'Mining', 'Construction', 'Real Estate', 'Hospitality', 'Tourism',

    // Emerging Technologies
    'Artificial Intelligence', 'Blockchain', 'Cryptocurrency', 'NFT', 'Web3', 'DeFi', 'IoT', 'Edge Computing', 'Quantum Computing', 'AR/VR', 'Metaverse', '5G', 'Robotics', 'Automation', 'RPA', 'Computer Vision', 'Natural Language Processing', 'Big Data', 'Cloud Computing', 'Serverless', 'Microservices',

    // Specialized Tools
    'AutoCAD', 'SolidWorks', 'Rhino', 'SketchUp', 'Revit', 'ArchiCAD', 'ANSYS', 'MATLAB Simulink', 'LabVIEW', 'PLC Programming', 'SCADA', 'CNC Programming', 'Welding', 'PCB Design', 'FPGA', 'Embedded Systems', 'Arduino', 'Raspberry Pi'
];

async function seedSkills() {
    console.log('🎯 Starting to seed skills database...');

    try {
        let createdCount = 0;
        let skippedCount = 0;

        console.log(`📝 Processing ${skillsData.length} skills...`);

        for (const skillName of skillsData) {
            try {
                const result = await prisma.skills.upsert({
                    where: { name: skillName },
                    update: {}, // Don't update if exists
                    create: { name: skillName }
                });

                // Check if it was created or already existed
                const existingSkill = await prisma.skills.findUnique({
                    where: { name: skillName }
                });

                if (existingSkill) {
                    createdCount++;
                    console.log(`✅ Added skill: ${skillName}`);
                } else {
                    skippedCount++;
                }
            } catch (error) {
                console.log(`⚠️ Skipped skill (already exists): ${skillName}`);
                skippedCount++;
            }
        }

        console.log('\n🎉 Skills seeding completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   - Total processed: ${skillsData.length}`);
        console.log(`   - Successfully added: ${createdCount}`);
        console.log(`   - Skipped (already exist): ${skippedCount}`);

        // Show total skills in database
        const totalSkills = await prisma.skills.count();
        console.log(`   - Total skills in database: ${totalSkills}`);

    } catch (error) {
        console.error('❌ Error during skills seeding:', error);
        throw error;
    }
}

seedSkills()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('🔌 Database connection closed');
    });