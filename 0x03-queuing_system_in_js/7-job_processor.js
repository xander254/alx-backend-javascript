#!/usr/bin/yarn dev
import kue from "kue";

const queue = kue.createQueue();

const BLACKLISTED_NUMBERS = ["4153518780", "4153518781"];

const sendNotification = (phoneNumber, message, job, done) => {
  let total = 2;
  let pending = 2;

  const interval = setInterval(() => {
    if (total - pending <= total / 2) {
      job.progress(total - pending, total);
    }

    if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
      clearInterval(interval);
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      return;
    }

    if (total === pending) {
      console.log(
        `Sending notification to ${phoneNumber}, with message: ${message}`
      );
    }

    pending--;

    if (pending === 0) {
      clearInterval(interval);
      done();
    }
  }, 1000);
};

queue.process("push_notification_code_2", 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
