# Data Model: Enhanced Enterprise Employee Announcement Tool

## Core Entities

### Announcement (Enhanced)
**Description**: Extended announcement entity with enterprise metadata and approval workflow support

**Fields**:
- `id`: string (SharePoint item ID)
- `title`: string (required, max 200 chars)
- `message`: string (required, rich text)
- `communicationType`: "Policy Update" | "Company News" | "Team Announcement" | "Benefits Update"
- `audience`: "All Staff" | "Department" | "Team"
- `tone`: "Formal" | "Friendly" | "Urgent" | "Celebratory"
- `status`: "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Published" | "Archived"
- `createdBy`: User (creator information)
- `createdAt`: DateTime
- `modifiedBy`: User (last modifier)
- `modifiedAt`: DateTime
- `publishedAt`: DateTime (nullable)
- `scheduledFor`: DateTime (nullable, future enhancement)

**Type-Specific Fields**:
- `policyName`: string (Policy Update only)
- `effectiveDate`: Date (Policy Update only)
- `newsCategory`: string (Company News only)
- `impactLevel`: string (Company News only)
- `teamName`: string (Team Announcement only)
- `announcementType`: string (Team Announcement only)
- `benefitType`: string (Benefits Update only)
- `enrollmentDeadline`: Date (Benefits Update only)

**Relationships**:
- One-to-many with ApprovalWorkflow
- One-to-many with AuditRecord
- One-to-many with DeliveryRecord

**Validation Rules**:
- Title and message are required
- Communication type determines required additional fields
- Status transitions follow workflow rules
- Only creators and approvers can modify (based on status)

**State Transitions**:
- Draft → Pending Approval (submit for approval)
- Pending Approval → Approved (manager approval)
- Pending Approval → Rejected (manager rejection)
- Approved → Published (automatic or manual trigger)
- Published → Archived (after retention period)

### User (Microsoft 365 Integration)
**Description**: User entity sourced from Azure Active Directory via Microsoft Graph

**Fields**:
- `id`: string (Azure AD object ID)
- `email`: string (primary email)
- `displayName`: string
- `givenName`: string
- `surname`: string
- `jobTitle`: string
- `department`: string
- `manager`: User (nullable)
- `roles`: string[] (application-specific roles)
- `isActive`: boolean

**Relationships**:
- One-to-many with Announcement (as creator)
- One-to-many with ApprovalWorkflow (as approver)
- One-to-many with AuditRecord (as actor)

**Validation Rules**:
- Email must be valid format
- Roles must be from approved list: ["HR Administrator", "Manager", "System Administrator"]
- Department must exist in Azure AD

### ApprovalWorkflow
**Description**: Tracks approval process for announcements requiring management review

**Fields**:
- `id`: string (SharePoint item ID)
- `announcementId`: string (foreign key)
- `requestedBy`: User
- `requestedAt`: DateTime
- `approverAssigned`: User
- `assignedAt`: DateTime
- `status`: "Pending" | "Approved" | "Rejected" | "Reassigned"
- `decision`: "Approved" | "Rejected" (nullable)
- `decisionAt`: DateTime (nullable)
- `decisionBy`: User (nullable)
- `comments`: string (nullable, approver feedback)
- `reassignedTo`: User (nullable)
- `reassignedAt`: DateTime (nullable)

**Relationships**:
- Many-to-one with Announcement
- Many-to-one with User (multiple users involved)

**Validation Rules**:
- Only one active approval per announcement
- Approver must have "Manager" role
- Decision timestamp required when status is Approved/Rejected

**State Transitions**:
- Pending → Approved (manager approval)
- Pending → Rejected (manager rejection)
- Pending → Reassigned (escalation or delegation)

### AuditRecord
**Description**: Immutable audit trail for all system activities and compliance

**Fields**:
- `id`: string (SharePoint item ID)
- `timestamp`: DateTime
- `userId`: string (actor's Azure AD ID)
- `userEmail`: string (actor's email)
- `action`: string (standardized action type)
- `entityType`: string (affected entity type)
- `entityId`: string (affected entity ID)
- `details`: object (action-specific details)
- `ipAddress`: string
- `userAgent`: string
- `sessionId`: string
- `correlationId`: string (for tracking related actions)

**Action Types**:
- "announcement.created"
- "announcement.updated"
- "announcement.submitted"
- "announcement.approved"
- "announcement.rejected"
- "announcement.published"
- "approval.assigned"
- "approval.decided"
- "user.login"
- "user.logout"

**Validation Rules**:
- All fields required (no nullable fields)
- Timestamp must be UTC
- Records are immutable (no updates allowed)
- Action must be from approved list

### DeliveryRecord
**Description**: Tracks email delivery status and recipient engagement

**Fields**:
- `id`: string (SharePoint item ID)
- `announcementId`: string (foreign key)
- `recipientEmail`: string
- `deliveryStatus`: "Pending" | "Sent" | "Delivered" | "Failed" | "Bounced"
- `sentAt`: DateTime (nullable)
- `deliveredAt`: DateTime (nullable)
- `openedAt`: DateTime (nullable)
- `clickedAt`: DateTime (nullable)
- `errorMessage`: string (nullable, for failed deliveries)
- `retryCount`: number (default 0)
- `lastRetryAt`: DateTime (nullable)

**Relationships**:
- Many-to-one with Announcement
- Many-to-one with User (via email)

**Validation Rules**:
- Email must be valid format
- Status transitions must be chronological
- Retry count limited to 3 attempts

## SharePoint List Schema

### Announcements List
- **Title**: Single line of text (title field)
- **Message**: Multiple lines of text (rich text)
- **CommunicationType**: Choice (Policy Update, Company News, Team Announcement, Benefits Update)
- **Audience**: Choice (All Staff, Department, Team)
- **Tone**: Choice (Formal, Friendly, Urgent, Celebratory)
- **Status**: Choice (Draft, Pending Approval, Approved, Rejected, Published, Archived)
- **TypeSpecificData**: Multiple lines of text (JSON for type-specific fields)
- **PublishedDate**: Date and Time
- **ScheduledDate**: Date and Time

### Approval Workflows List
- **Title**: Single line of text (auto-generated)
- **AnnouncementId**: Number (lookup to Announcements)
- **ApproverEmail**: Single line of text
- **Status**: Choice (Pending, Approved, Rejected, Reassigned)
- **Decision**: Choice (Approved, Rejected)
- **Comments**: Multiple lines of text
- **DecisionDate**: Date and Time

### Audit Records List
- **Title**: Single line of text (auto-generated)
- **Timestamp**: Date and Time
- **UserEmail**: Single line of text
- **Action**: Single line of text
- **EntityType**: Single line of text
- **EntityId**: Single line of text
- **Details**: Multiple lines of text (JSON)
- **SessionInfo**: Multiple lines of text (JSON with IP, user agent, etc.)

### Delivery Records List
- **Title**: Single line of text (auto-generated)
- **AnnouncementId**: Number (lookup to Announcements)
- **RecipientEmail**: Single line of text
- **DeliveryStatus**: Choice (Pending, Sent, Delivered, Failed, Bounced)
- **SentDate**: Date and Time
- **DeliveredDate**: Date and Time
- **EngagementData**: Multiple lines of text (JSON with open/click timestamps)