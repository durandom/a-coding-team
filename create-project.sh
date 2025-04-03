#!/bin/bash

# Create main directories
mkdir -p project/status/{product_manager,architect,team_lead,engineer,qa}
mkdir -p project/issues/{feature_requests,bugs,improvements}
mkdir -p project/templates

# Get current date and time
CURRENT_DATE=$(date +"%Y-%m-%d")
CURRENT_DATETIME=$(date +"%Y-%m-%d %H:%M")

# Define template variables for status files
ACTIVE_HEADER_TEMPLATE="# %s Active Assignments - Last Modified: $CURRENT_DATETIME

## How to Use This File
- This file tracks all %s you are currently working on
- Update the \"Last Modified\" timestamp in the header whenever you make changes
- Update task status and \"Last Updated\" timestamp for each task when progress is made
- Move completed tasks to \"completed.md\" and pull new tasks from \"backlog.md\" as needed
"

BACKLOG_HEADER_TEMPLATE="# %s Backlog - Last Modified: $CURRENT_DATETIME

## How to Use This File
- This file contains upcoming %s that have not been started yet
- Add new %s with a priority level and brief description
- Move %s to \"active_assignments.md\" when you begin work on them
- Update the \"Last Modified\" timestamp whenever you make changes
"

COMPLETED_HEADER_TEMPLATE="# %s Completed Assignments - Last Modified: $CURRENT_DATETIME

## How to Use This File
- This file archives %s that have been fully completed and verified
- Move items here from \"active_assignments.md\" when they are complete
- Each entry should include the completion date and handoff notes
- Update the \"Last Modified\" timestamp whenever you make changes
"

# Create status files for each role with custom content
# Product Manager files
printf "$ACTIVE_HEADER_TEMPLATE" "Product Manager" "feature requests" > project/status/product_manager/active_assignments.md
cat >> project/status/product_manager/active_assignments.md << EOL

## Current Tasks
1. **FR-001_user_authentication** (High Priority)
   - Status: In progress (50% complete)
   - Description: Implementing user authentication system
   - Notes: Gathering requirements for social login integration
   - Dependencies: None
   - Last Updated: $CURRENT_DATETIME

## Blocked Tasks
1. **FR-002_payment_gateway** (Medium Priority)
   - Blocker: Waiting for finance team approval on payment processor selection
   - Contact: finance@example.com
   - Last Updated: $CURRENT_DATETIME
EOL

printf "$BACKLOG_HEADER_TEMPLATE" "Product Manager" "feature requests" "feature requests" "feature requests" > project/status/product_manager/backlog.md
cat >> project/status/product_manager/backlog.md << EOL

## Upcoming Feature Requests
1. **FR-003_user_profile** (Medium Priority)
   - Description: Allow users to customize their profile and settings
   - Target start date: Q3 2025
   - Added: $CURRENT_DATETIME

2. **FR-004_notification_system** (Low Priority)
   - Description: Implement in-app and email notifications for user activities
   - Target start date: Q4 2025
   - Added: $CURRENT_DATETIME
EOL

printf "$COMPLETED_HEADER_TEMPLATE" "Product Manager" "feature requests" > project/status/product_manager/completed.md
cat >> project/status/product_manager/completed.md << EOL

## Completed Feature Requests
1. **FR-000_project_setup** (High Priority)
   - Description: Initial project setup and workflow definition
   - Completed on: $CURRENT_DATE
   - Handed off to: Software Architect
   - Notes: Basic project structure established
EOL

# Architect files
printf "$ACTIVE_HEADER_TEMPLATE" "Architect" "architecture plans" > project/status/architect/active_assignments.md
cat >> project/status/architect/active_assignments.md << EOL

## Current Tasks
1. **FR-001_user_authentication** (High Priority)
   - Status: In progress (25% complete)
   - Description: Designing authentication system architecture
   - Notes: Evaluating OAuth providers and security requirements
   - Dependencies: None
   - Last Updated: $CURRENT_DATETIME

## Blocked Tasks
(No blocked tasks currently)
EOL

printf "$BACKLOG_HEADER_TEMPLATE" "Architect" "architecture plans" "architecture plans" "architecture plans" > project/status/architect/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "Architect" "architecture plans" > project/status/architect/completed.md

# Team Lead files
printf "$ACTIVE_HEADER_TEMPLATE" "Team Lead" "epics" > project/status/team_lead/active_assignments.md
cat >> project/status/team_lead/active_assignments.md << EOL

## Current Epics
(No active epics currently - waiting for architecture plans)

## Blocked Epics
(No blocked epics currently)
EOL

printf "$BACKLOG_HEADER_TEMPLATE" "Team Lead" "epics" "epics" "epics" > project/status/team_lead/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "Team Lead" "epics" > project/status/team_lead/completed.md

# Engineer files
printf "$ACTIVE_HEADER_TEMPLATE" "Engineer" "tasks" > project/status/engineer/active_assignments.md
cat >> project/status/engineer/active_assignments.md << EOL

## Current Tasks
(No active tasks currently - waiting for task breakdown)

## Blocked Tasks
(No blocked tasks currently)
EOL

printf "$BACKLOG_HEADER_TEMPLATE" "Engineer" "tasks" "tasks" "tasks" > project/status/engineer/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "Engineer" "tasks" > project/status/engineer/completed.md

# QA files
printf "$ACTIVE_HEADER_TEMPLATE" "QA" "testing tasks" > project/status/qa/active_assignments.md
cat >> project/status/qa/active_assignments.md << EOL

## Current Tasks
(No active tasks currently - waiting for implementation)

## Blocked Tasks
(No blocked tasks currently)
EOL

printf "$BACKLOG_HEADER_TEMPLATE" "QA" "testing tasks" "testing tasks" "testing tasks" > project/status/qa/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "QA" "bug reports and test cases" > project/status/qa/completed.md

# Create basic templates
cat > project/templates/feature_request_template.md << 'EOL'
# Feature Request: [FR-XXX_feature_name]

## Overview
[Brief description of the requested feature]

## Business Value
[Why this feature is important for the business or users]

## User Stories
As a [type of user], I want to [perform an action] so that [achieve a goal].

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Additional Information
[Any other relevant information, constraints, or references]

## Attachments
[Links to mockups, diagrams, or additional documentation]
EOL

cat > project/templates/epic_template.md << 'EOL'
# Epic: [EP-XXX_epic_name]

## Parent Feature Request
[FR-XXX_feature_name]

## Overview
[Brief description of this epic and its scope]

## Objectives
[What this epic aims to achieve]

## Technical Considerations
[Any technical limitations, choices, or architecture details]

## Dependencies
[Any dependencies on other epics or systems]

## Tasks
- [ ] [T-XXX_task_name]
- [ ] [T-XXX_task_name]
- [ ] [T-XXX_task_name]

## Estimation
[Story points or time estimate]

## Priority
[High/Medium/Low]
EOL

cat > project/templates/task_template.md << 'EOL'
# Task: [T-XXX_task_name]

## Parent Epic
[EP-XXX_epic_name]

## Description
[Detailed description of what needs to be done]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Technical Details
[Specific implementation details, API specifications, etc.]

## Dependencies
[Any dependencies on other tasks or systems]

## Estimation
[Story points or time estimate]

## Priority
[High/Medium/Low]

## Assigned To
[Engineer name or "Unassigned"]
EOL

cat > project/templates/bug_report_template.md << 'EOL'
# Bug Report: [BUG-XXX_bug_name]

## Description
[Detailed description of the bug]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser/Device: [e.g., Chrome 98, iPhone 13]
- OS: [e.g., Windows 11, iOS 15]
- Version/Build: [e.g., v2.1.0, build 12345]

## Impact
[High/Medium/Low] - [Brief explanation of the impact]

## Screenshots/Logs
[Attach screenshots, error logs, or console output]

## Related Components
[Which components or features are affected]

## Assigned To
[Engineer name or "Unassigned"]
EOL

cat > project/templates/improvement_template.md << 'EOL'
# Improvement Request: [IMP-XXX_improvement_name]

## Overview
[Brief description of the proposed improvement]

## Current Situation
[Description of the current state/feature]

## Proposed Changes
[Detailed description of the proposed improvements]

## Benefits
[Expected benefits from implementing this improvement]

## Impact Assessment
[High/Medium/Low] - [Areas/components affected]

## Priority
[High/Medium/Low]

## Related Features/Components
[Which features or components this improvement relates to]
EOL

# Create initial README with project overview
cat > project/README.md << 'EOL'
# AI-Driven Development Workflow

This repository implements an **AI-driven development workflow** using structured files and clear role-based transitions. It ensures that tasks are well-documented, handed over smoothly, and tracked properly, even in the absence of external issue-tracking tools.

## Project Overview
[Brief description of your project goes here]

## Getting Started
1. Check the appropriate status directory for your role:
   - `/status/product_manager/` - For Product Managers
   - `/status/architect/` - For Software Architects
   - `/status/team_lead/` - For Team Leads
   - `/status/engineer/` - For Software Engineers
   - `/status/qa/` - For QA Engineers

2. Review your active assignments in the `active_assignments.md` file.

3. Follow the instructions in the workflow documentation to complete your tasks.

## Project Structure
This project follows a structured file-based workflow as described in detail in our main documentation.

## Roles and Responsibilities
- **Product Manager**: Defines features, roadmap, and user stories
- **Software Architect**: Designs system architecture, APIs, and tech stack decisions
- **Team Lead**: Breaks down epics into manageable tasks
- **Software Engineer**: Implements features, writes tests, and maintains the codebase
- **QA Engineer**: Tests features, writes automated/manual test cases, and tracks bugs

For detailed workflow information, refer to our main documentation.
EOL

echo "Project directory structure initialized successfully with example content!"