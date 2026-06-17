# Collaborator Feature

**Introduced in Phira v0.7.1**

The collaborator feature allows chart uploaders to mention other users who participated in creating the chart within the chart description. Mentioned users must confirm their participation before the chart can enter the review process. This ensures contributors are properly credited while preventing unauthorized attribution.

## Mentioning Collaborators

In the chart description, use the following format to mention collaborators (brackets are case-insensitive for fullwidth/halfwidth):

```
@username (role)
```

**Examples**:
```
@Alice
@Bob (charting assistance)
@Charlie (playtesting & feedback)
```

When the description is saved, the client automatically parses and expands mentions into the full `@username#userID (role)` format.

## Confirmation Workflow

When uploading or updating a chart, the system automatically parses collaborator mentions in the description, extracts user IDs and role information, and sends in-app messages and email notifications to the mentioned users. After a collaborator clicks the confirmation link, their status updates to "Confirmed". The chart can only enter the review process once all collaborators have confirmed.

If any collaborator has not confirmed, the uploader should proactively contact them or remove their mention from the description.

## Modification & Removal

When updating the chart description, the system re-parses collaborator mentions: newly added collaborators receive invitations, confirmed collaborators retain their status, and role information is synced. Removing a collaborator mention from the description automatically revokes that user's collaborator status, and they will no longer affect the review process (relevant information is preserved in historical records).

Description changes take effect immediately without requiring a re-upload of chart files. Collaborators can still be removed by the uploader even after confirmation, but it is recommended to communicate with them beforehand.

## Related Links

- [Chart Upload Guide](./upload-guide.md)
- [Review & Stable Guide](./review-and-stable.md)
- [Chart Info Format](../chartinfo)
