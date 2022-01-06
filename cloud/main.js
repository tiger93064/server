// Cloud Code entry point

Parse.Cloud.job("myJob", (request) =>  {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the ParseServer logger passed in the request
  // message: a function to update the status message of the job object
  const { params, headers, log, message } = request;
  message("I just started "+new Date());
  return request
});


const Scheduler = require('parse-server-jobs-scheduler').default;
const scheduler = new Scheduler();

// Recreates all crons when the server is launched
scheduler.recreateScheduleForAllJobs();

// Recreates schedule when a job schedule has changed
Parse.Cloud.afterSave('_JobSchedule', async (request) => {
scheduler.recreateSchedule(request.object.id)
});

// Destroy schedule for removed job
Parse.Cloud.afterDelete('_JobSchedule', async (request) => {
scheduler.destroySchedule(request.object.id)
});