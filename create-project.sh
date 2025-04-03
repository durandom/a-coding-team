#!/bin/bash

# Create main directories
mkdir -p project/status/{product_manager,architect,team_lead,engineer,qa}
mkdir -p project/issues/{feature_requests,bugs,improvements}
mkdir -p project/templates

# Define template variables for status files
ACTIVE_HEADER_TEMPLATE="# %s Active Assignments

## How to Use This File
- This file tracks all %s you are currently working on
- Update the status and notes for each task when progress is made
- Move completed tasks to \"completed.md\" and pull new tasks from \"backlog.md\" as needed
"

BACKLOG_HEADER_TEMPLATE="# %s Backlog

## How to Use This File
- This file contains upcoming %s that have not been started yet
- Add new %s with a priority level and brief description
- Move %s to \"active_assignments.md\" when you begin work on them
"

COMPLETED_HEADER_TEMPLATE="# %s Completed Assignments

## How to Use This File
- This file archives %s that have been fully completed and verified
- Move items here from \"active_assignments.md\" when they are complete
- Each entry should include handoff notes and completion status
"

# Create status files for each role with template headers only
# Product Manager files
printf "$ACTIVE_HEADER_TEMPLATE" "Product Manager" "feature requests" > project/status/product_manager/active_assignments.md
printf "$BACKLOG_HEADER_TEMPLATE" "Product Manager" "feature requests" "feature requests" "feature requests" > project/status/product_manager/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "Product Manager" "feature requests" > project/status/product_manager/completed.md

# Architect files
printf "$ACTIVE_HEADER_TEMPLATE" "Architect" "architecture plans" > project/status/architect/active_assignments.md
printf "$BACKLOG_HEADER_TEMPLATE" "Architect" "architecture plans" "architecture plans" "architecture plans" > project/status/architect/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "Architect" "architecture plans" > project/status/architect/completed.md

# Team Lead files
printf "$ACTIVE_HEADER_TEMPLATE" "Team Lead" "epics" > project/status/team_lead/active_assignments.md
printf "$BACKLOG_HEADER_TEMPLATE" "Team Lead" "epics" "epics" "epics" > project/status/team_lead/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "Team Lead" "epics" > project/status/team_lead/completed.md

# Engineer files
printf "$ACTIVE_HEADER_TEMPLATE" "Engineer" "tasks" > project/status/engineer/active_assignments.md
printf "$BACKLOG_HEADER_TEMPLATE" "Engineer" "tasks" "tasks" "tasks" > project/status/engineer/backlog.md
printf "$COMPLETED_HEADER_TEMPLATE" "Engineer" "tasks" > project/status/engineer/completed.md

# QA files
printf "$ACTIVE_HEADER_TEMPLATE" "QA" "testing tasks" > project/status/qa/active_assignments.md
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

## Issues Directory Structure
The `/issues/` directory serves as our file-based ticketing system with three main categories:

### Feature Requests (`/issues/feature_requests/`)
- Each feature request gets its own directory with a unique ID (e.g., `FR-001_user_authentication/`)
- Feature request directories contain:
  - `feature_request.md` - Initial feature request by Product Manager
  - `architecture_plan.md` - Software Architect's implementation plan
  - `attachments/` folder - For mockups, diagrams, or additional documentation
  - `epics/` folder - Contains subdirectories for each epic within the feature
    - Epic subdirectories (e.g., `EP-001_login_system/`) contain:
      - `epic_details.md` - Epic description and requirements
      - `tasks/` folder - Individual tasks broken down by Team Lead
        - Task directories (e.g., `T-001_login_ui/`) contain:
          - `task_details.md` - Task description and requirements
          - `implementation_notes.md` - Developer's notes during implementation
          - `completion_summary.md` - Summary after task completion

### Bugs (`/issues/bugs/`)
- Each bug report gets its own directory with a unique ID (e.g., `BUG-001_login_timeout/`)
- Bug directories contain:
  - `bug_report.md` - Initial bug report by QA Engineer
  - `investigation_notes.md` - Developer's investigation notes
  - `fix_details.md` - Documentation of the bug fix
  - `attachments/` folder - For screenshots, logs, or other evidence

### Improvements (`/issues/improvements/`)
- Each improvement request gets its own directory with a unique ID (e.g., `IMP-001_performance_optimization/`)
- Similar structure to feature requests but focused on enhancements to existing features

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

# Add .keep files to all empty directories to ensure they're tracked in version control
touch project/issues/feature_requests/.keep
touch project/issues/bugs/.keep
touch project/issues/improvements/.keep

echo "Project directory structure initialized successfully!"