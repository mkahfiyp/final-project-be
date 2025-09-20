import { PrismaClient } from './prisma/generated/client';

const prisma = new PrismaClient();

async function testApplicationsEndpoint() {
    console.log('🧪 Testing Applications Endpoint...\n');

    try {
        // Get a user with applications
        const userWithApps = await prisma.users.findFirst({
            where: {
                role: 'USER',
                applications: {
                    some: {}
                }
            },
            include: {
                applications: {
                    take: 3
                }
            }
        });

        if (!userWithApps) {
            console.log('❌ No users with applications found');
            return;
        }

        console.log(`✅ Testing with user: ${userWithApps.name} (${userWithApps.email})`);
        console.log(`   User ID: ${userWithApps.user_id}`);
        console.log(`   Applications count: ${userWithApps.applications.length}`);

        // Test the service method directly
        console.log('\n🔍 Testing service method directly...');
        
        // Simulate the service call
        const applications = await prisma.applications.findMany({
            where: {
                user_id: userWithApps.user_id,
            },
            include: {
                Jobs: {
                    select: {
                        title: true,
                        location: true,
                        salary: true,
                        periodSalary: true,
                        currency: true,
                        expiredAt: true,
                        slug: true,
                        Companies: {
                            select: {
                                name: true,
                                profile_picture: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            skip: 0,
        });

        const total = await prisma.applications.count({
            where: {
                user_id: userWithApps.user_id,
            },
        });

        const mappedApplications = applications.map((app) => ({
            application_id: app.application_id,
            job_title: app.Jobs?.title,
            company_name: app.Jobs?.Companies?.name,
            company_logo: app.Jobs?.Companies?.profile_picture,
            location: app.Jobs?.location,
            salary: app.Jobs?.salary,
            periodSalary: app.Jobs?.periodSalary,
            currency: app.Jobs?.currency,
            expected_salary: app.expected_salary,
            status: app.status,
            applied_at: app.createdAt,
            job_expired_at: app.Jobs?.expiredAt,
            job_slug: app.Jobs?.slug,
            cv: app.cv,
        }));

        const result = {
            data: mappedApplications,
            total,
            limit: 10,
            offset: 0,
        };

        console.log(`✅ Service method result:`);
        console.log(`   Total found: ${result.total}`);
        console.log(`   Data length: ${result.data.length}`);
        
        if (result.data.length > 0) {
            console.log(`\n📋 Sample application data:`);
            const sample = result.data[0];
            console.log(`   Application ID: ${sample.application_id}`);
            console.log(`   Job Title: ${sample.job_title}`);
            console.log(`   Company: ${sample.company_name}`);
            console.log(`   Status: ${sample.status}`);
            console.log(`   Applied At: ${sample.applied_at}`);
            console.log(`   Expected Salary: ${sample.expected_salary}`);
        }

        // Check for common issues
        console.log('\n🔍 Checking for potential issues...');
        
        // Check if Jobs relation is working
        const appsWithJobs = result.data.filter(app => app.job_title);
        console.log(`   Apps with job data: ${appsWithJobs.length}/${result.data.length}`);
        
        // Check if Company relation is working
        const appsWithCompany = result.data.filter(app => app.company_name);
        console.log(`   Apps with company data: ${appsWithCompany.length}/${result.data.length}`);

        // Check for null/undefined values
        const nullJobs = result.data.filter(app => !app.job_title);
        if (nullJobs.length > 0) {
            console.log(`   ⚠️  Found ${nullJobs.length} applications with null job titles`);
            console.log(`      This might indicate job records were deleted`);
        }

        // Suggest frontend debugging steps
        console.log('\n💡 Frontend Debugging Suggestions:');
        console.log('   1. Check if user is authenticated properly');
        console.log('   2. Verify JWT token is being sent in cookies');
        console.log('   3. Check browser network tab for the API call');
        console.log('   4. Verify the API endpoint URL is correct');
        console.log('   5. Check CORS settings');
        console.log('   6. Ensure user role is USER, not COMPANY');
        
        console.log('\n🛠️  Test this endpoint manually:');
        console.log(`   GET http://localhost:8000/applications/my-applications`);
        console.log(`   Cookie: accessToken=<your_jwt_token>`);
        console.log(`   Expected response: { success: true, data: [...] }`);

    } catch (error) {
        console.error('❌ Error during testing:', error);
    }
}

testApplicationsEndpoint()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('\n🔌 Database connection closed');
    });