/**
 * Cleanup Temp Files Function
 *
 * Scheduled administrative function for system maintenance.
 * Cleans up temporary files and failed jobs older than 24 hours.
 *
 * @author Gil Klainert
 * @version 1.0.0
  */
import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';
export const cleanupTempFiles = onSchedule({
    schedule: 'every 24 hours',
    timeoutSeconds: 540,
    memory: '512MiB',
    timeZone: 'UTC'
}, async (event) => {
    const bucket = admin.storage().bucket();
    const now = Date.now();
    const cutoffTime = now - (24 * 60 * 60 * 1000); // 24 hours ago
    try {
        console.log('Starting scheduled cleanup of temporary files...');
        // List files in temp directory
        const [files] = await bucket.getFiles({
            prefix: 'temp/'
        });
        console.log(`Found ${files.length} files in temp directory`);
        const deletePromises = files
            .filter(file => {
            const metadata = file.metadata;
            const timeCreated = metadata.timeCreated ? new Date(metadata.timeCreated).getTime() : 0;
            return timeCreated < cutoffTime;
        })
            .map(file => {
            console.log(`Deleting temp file: ${file.name}`);
            return file.delete();
        });
        await Promise.all(deletePromises);
        console.log(`Deleted ${deletePromises.length} temporary files`);
        // Also clean up old failed jobs
        const db = admin.firestore();
        const failedJobsQuery = db
            .collection('jobs')
            .where('status', '==', 'failed')
            .where('updatedAt', '<', new Date(cutoffTime));
        const failedJobs = await failedJobsQuery.get();
        console.log(`Found ${failedJobs.size} failed jobs to clean up`);
        if (failedJobs.size > 0) {
            const batch = db.batch();
            failedJobs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            console.log(`Deleted ${failedJobs.size} failed job records`);
        }
        console.log('Temporary file cleanup completed successfully');
    }
    catch (error) {
        console.error('Temporary file cleanup failed:', error);
        throw error;
    }
});
//# sourceMappingURL=cleanupTempFiles.js.map