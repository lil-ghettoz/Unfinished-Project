export async function processAlertJob(job: { alertId: string }) {
  return {
    alertId: job.alertId,
    processed: true
  };
}
