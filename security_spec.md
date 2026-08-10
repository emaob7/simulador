# Security Specification: Simulator App

## 1. Data Invariants

1. **User Identity Invariant**: A user can only create or update their own profile (unless an Admin is performing the update).
2. **Approval Gate**: Non-admin users must have `isApproved == true` to access simulation data (SESSIONS and PROGRESS).
3. **Session Integrity**: A session must belong to the authenticated user (`user_id == request.auth.uid`).
4. **Ownership Invariant**: Users cannot read or write sessions or progress belonging to other users.
5. **Admin Override**: Users with the `admin` role in their document can read all data and update approval statuses.
6. **Immutable Fields**: `role` and `isApproved` are immutable by the user and can only be set or modified by an Admin.

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)

| Payload ID | Description | Target Collection | Payload | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| DD-01 | Spoof Owner ID | `sessions` | `{ "user_id": "other_user_id", ... }` | `PERMISSION_DENIED` |
| DD-02 | Self-Approval | `users` | `{ "isApproved": true }` (by non-admin) | `PERMISSION_DENIED` |
| DD-03 | Self-Promotion to Admin | `users` | `{ "role": "admin" }` (by non-admin) | `PERMISSION_DENIED` |
| DD-04 | Read Other's Session | `sessions` | `get(/sessions/other_session_id)` | `PERMISSION_DENIED` |
| DD-05 | List All Users | `users` | `list(/users)` (by non-admin) | `PERMISSION_DENIED` |
| DD-06 | List All Sessions | `sessions` | `list(/sessions)` (by non-admin) | `PERMISSION_DENIED` |
| DD-07 | Modify Completed Session | `sessions` | `update(/sessions/id, { score: 100 })` | `PERMISSION_DENIED` (Terminal State) |
| DD-08 | Junk ID Injection | `sessions` | `create(/sessions/very-long-id-1234567...)` | `PERMISSION_DENIED` (Size Guard) |
| DD-09 | Unauthorized Deletion | `sessions` | `delete(/sessions/id)` (by other user) | `PERMISSION_DENIED` |
| DD-10 | Shadow Field Write | `users` | `{ "displayName": "Me", "isHack": true }` | `PERMISSION_DENIED` (Keys Strictness) |
| DD-11 | PII Leak (Email) | `users` | `get(/users/other_user_id)` (non-admin) | `PERMISSION_DENIED` |
| DD-12 | Bypass Progress Guard | `progress` | `create(/progress/id)` (without being approved) | `PERMISSION_DENIED` |

## 3. Test Runner (Draft)

```typescript
// firestore.rules.test.ts
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

// Note: Actual test implementation requires local emulator or test lab.
// These tests verify the "Dirty Dozen" scenarios against the rules.
```
