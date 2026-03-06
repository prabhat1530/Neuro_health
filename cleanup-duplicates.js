const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Cleaning up duplicate accounts...");

    // Find all doctors
    const doctors = await prisma.doctor.findMany({
        include: { user: true }
    });

    const uniqueNames = new Map(); // Name -> { email, id, userId }
    const toDelete = [];

    // We want to keep the ones that start with 'doc_' (our curated ones)
    // or the ones the user likely created.
    doctors.forEach(d => {
        const name = d.user.name.trim().replace(/\s+/g, ' '); // Normalize name
        if (uniqueNames.has(name)) {
            const existing = uniqueNames.get(name);
            // If the current one is a curated one (doc_*) and the existing one isn't, swap them
            if (d.user.email.startsWith('doc_') && !existing.email.startsWith('doc_')) {
                toDelete.push(existing.userId);
                uniqueNames.set(name, { email: d.user.email, id: d.id, userId: d.user.id });
            } else {
                // Otherwise, the current one is the duplicate
                if (d.user.email !== existing.email) {
                    toDelete.push(d.user.id);
                }
            }
        } else {
            uniqueNames.set(name, { email: d.user.email, id: d.id, userId: d.user.id });
        }
    });

    console.log(`Deleting ${toDelete.length} duplicate doctor users...`);

    // Delete users (cascade will handle Doctor, Appointments, etc.)
    for (const userId of toDelete) {
        await prisma.user.delete({ where: { id: userId } });
    }

    console.log("✅ Cleanup complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
