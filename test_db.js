const { Client } = require('pg');
const connectionString = "postgresql://postgres.rpdowcfsvimoqulefclr:B%405%26mx2us%24MCH3j@aws-1-ap-south-1.pooler.supabase.com:6543/postgres";

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
    .then(() => {
        console.log('Connected successfully!');
        client.end();
    })
    .catch(err => {
        console.error('Connection error:', err.message);
        process.exit(1);
    });
