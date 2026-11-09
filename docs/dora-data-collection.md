# DORA data collection

This repository distinguishes **CI activity**, **release classification**, and
**actual production deployments**. They are different events and must not be
used interchangeably.

## Automated deployment event ledger

`.github/workflows/dora-deployments.yml` listens for GitHub
`deployment_status` events in the `github-pages` or `production`
environment. It appends one JSON object per unique deployment-status event to
`metrics/dora/deployments.jsonl` on `main`.

The ledger preserves the deployment ID, status ID, environment, ref, commit
SHA, state, timestamps, actor, and available deployment/log URLs. Duplicate
webhook deliveries are ignored. The workflow serializes writes to avoid
concurrent updates.

The ledger is an event source, not a precomputed DORA report. It only receives
events if the publishing workflow creates a GitHub Deployment and reports
deployment statuses for one of the supported environment names. Confirm that
GitHub Pages publishing is configured to use the `github-pages` environment.
If the current publishing action does not emit deployment-status events, update
that publishing workflow to create/report a GitHub Deployment before relying
on this ledger.

## The five current DORA measures

| Measure | Required evidence | Calculation / interpretation |
| --- | --- | --- |
| Change Lead Time | Production deployment SHA and corresponding commit timestamp | Time from commit to successful production deployment. State which commit timestamp convention is used. |
| Deployment Frequency | Unique successful production deployment IDs and timestamps | Count successful production deployments per day/week/month. Do not count CI runs or commits. |
| Failed Deployment Recovery Time | Production incident start/detection and service-restored timestamps | Elapsed time from the incident caused by a deployment until service is restored. A failed CI job is not a production incident. |
| Change Fail Rate | Production deployments linked to incidents requiring immediate intervention, rollback, or hotfix | Failed production deployments divided by total production deployments in the same period. Classify incidents explicitly; do not equate every failed deployment status with a change failure. |
| Deployment Rework Rate | Unplanned production deployments made to remediate a user-facing service degradation | Unplanned rework deployments divided by total production deployments. Record the reason for each corrective deployment. |

Report the metric window, population, exclusions, and missing-data rate. Do not
turn missing observations into zero. A deployment status of `failure` means
the deployment operation failed; it is not automatically evidence that users
experienced a production failure.

## Production incident recording

When a production deployment causes user-facing degradation, create a GitHub
issue using the **Production incident** issue form. Record, as accurately as
possible:

- when the impact began and when it was detected;
- the affected deployment ID and commit SHA;
- impact and suspected/confirmed cause;
- when service was restored;
- the recovery deployment/commit and whether rollback or hotfix was required.

Link the issue to relevant pull requests and deployments. Use the timestamps of
the actual incident and restoration, not the time the issue was written.

## Permissions and verification

The workflow requires the repository Actions token to have **Contents: read and
write** permission. Repository or organization Actions policies must allow
`actions/github-script@v7`. The workflow writes only to `main`.

After merging, verify a real Pages/production deployment creates a new line in
`metrics/dora/deployments.jsonl`. If no line appears, inspect whether the
publishing process emits `deployment_status` events and whether its environment
is named `github-pages` or `production`.

## Existing release-history script

The existing CI job invokes `automated-dora-metrics` against Git history. Its
output is retained as **historical release-classification data**. It is not
treated as a complete DORA dataset: feature/bugfix labels and release counts
cannot establish production deployment frequency, change failure rate,
recovery time, or deployment rework rate.
