#!/usr/bin/yarn dev
import kue from "kue";

/**
 * Creates push notification jobs from an array of job data.
 * @param {Array} jobs - List of job data (objects with phoneNumber and message)
 * @param {kue.Queue} queue - The Kue queue instance
 */
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }

  for (const jobInfo of jobs) {
    const job = queue.create("push_notification_code_3", jobInfo);

    job
      .on("enqueue", () => {
        console.log(`Notification job created: ${job.id}`);
      })
      .on("complete", () => {
        console.log(`Notification job ${job.id} completed`);
      })
      .on("failed", (err) => {
        console.log(`Notification job ${job.id} failed: ${err.message || err}`);
      })
      .on("progress", (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });

    job.save();
  }
}

export default createPushNotificationsJobs;
