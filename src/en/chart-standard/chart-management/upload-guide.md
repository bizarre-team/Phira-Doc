# Chart Upload Guide

This document covers the upload workflow, slot limits, and related rules for Phira charts.

## Slot Limits

Phira imposes a limit on the number of unstable charts a user can have simultaneously to ensure server resources and chart quality. Each user has a base limit of **5** unstable charts. For each stable chart the user owns, the limit increases by 1.

**Examples**:
- New user: up to 5 unstable charts
- User with 2 stable charts: up to 5 + 2 = 7 unstable charts
- User with 3 or more stable charts: no unstable slot limit

## Upload Requirements

Before uploading a chart, please ensure:

1. **Account in good standing**: not banned from uploading charts
2. **Sufficient slots**: current number of unstable charts has not reached the limit
3. **Valid chart format**: includes a complete `info.yml` and all required resource files
4. **Compliant content**: chart name, description, tags, etc. do not contain prohibited content

## Upload Workflow

After importing a chart in the Phira client, fill in or update the necessary information on the info editing page, then click the "Upload" button to submit. Once uploaded, the chart enters the review queue to await reviewer processing. For more details on the review process, see the [Review & Stable Guide](./review-and-stable.md).

## FAQ

### Q: What if my slots are full?

You can:
1. Delete unstable charts you no longer need
2. Apply for stable on high-quality charts to earn more slots
3. Wait for existing charts to pass review or be rejected

### Q: What if the upload fails?

Common causes:
- Slots full: delete some charts or apply for stable
- Invalid file format: check `info.yml` and resource files
- Prohibited content: revise any sensitive content and retry
- Network issues: check your connection and retry

## Related Links

- [Review & Stable Guide](./review-and-stable.md)
- [Collaborator Feature](./collaborator.md)
- [Chart Info Format](../chartinfo)
