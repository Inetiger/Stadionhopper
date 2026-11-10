// Recalculate historical metrics from the versioned GitHub evidence snapshot.
function summarize(data) {
  const start = Date.parse(data.window_start);
  const end = Date.parse(data.window_end_exclusive);
  if (!(end > start)) throw new Error('Invalid measurement window');
  const commits = new Map(data.commit_graph.map(c => [c.sha, c]));
  const deployments = [...new Map(data.deployments
    .filter(d => Date.parse(d.deployed_at) >= start && Date.parse(d.deployed_at) < end)
    .map(d => [d.run_id, d])).values()]
    .sort((a, b) => a.deployed_at.localeCompare(b.deployed_at));
  const seen = new Set();
  const samples = [];
  const missing = new Set();
  for (let i = 0; i < deployments.length; i++) {
    const deployment = deployments[i];
    const pending = [deployment.sha];
    while (pending.length) {
      const sha = pending.pop();
      if (seen.has(sha)) continue;
      seen.add(sha);
      const commit = commits.get(sha);
      if (!commit) { missing.add(sha); continue; }
      pending.push(...commit.parents);
      if (i === 0 || commit.parents.length > 1 ||
          commit.message.startsWith('chore(dora): record')) continue;
      const seconds = (Date.parse(deployment.deployed_at) -
        Date.parse(commit.committed_at)) / 1000;
      if (!Number.isFinite(seconds) || seconds < 0)
        throw new Error('Invalid timestamp for commit ' + sha);
      samples.push(seconds);
    }
  }
  samples.sort((a, b) => a - b);
  const n = samples.length;
  const median = !n ? null : n % 2 ? samples[(n - 1) / 2] :
    (samples[n / 2 - 1] + samples[n / 2]) / 2;
  return {
    deployments: deployments.length,
    deployments_per_week: deployments.length * 7 / ((end - start) / 86400000),
    lead_time_samples: n,
    median_lead_seconds: missing.size ? null : median,
    missing_ancestors: [...missing],
    change_failure_rate: null,
    failed_deployment_recovery_time: null,
    deployment_rework_rate: null
  };
}
module.exports = { summarize };
if (require.main === module) {
  const fs = require('node:fs');
  const input = process.argv[2];
  if (!input) throw new Error('Usage: node scripts/summarize-dora-analysis.js metrics/dora/analysis-2026-11-10.json');
  console.log(JSON.stringify(summarize(JSON.parse(fs.readFileSync(input, 'utf8'))), null, 2));
}
