const { execSync } = require('child_process');
const connectionString = "postgresql://postgres.rpdowcfsvimoqulefclr:B%405%26mx2us%24MCH3j@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=no-verify";

process.env.DATABASE_URL = connectionString;

try {
    console.log('Running prisma db push...');
    execSync('npx prisma db push', { stdio: 'inherit', env: process.env });
    console.log('Success!');
} catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
}
