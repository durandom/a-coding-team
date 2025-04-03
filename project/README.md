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

### Features (`/issues/features/`)
- Each feature gets its own directory with a unique ID (e.g., `F-001_user_authentication/`)
- Feature directories contain:
  - `feature.md` - Initial feature definition by Product Manager
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
- Similar structure to features but focused on enhancements to existing features

## Project Structure
This project follows a structured file-based workflow as described in detail in our main documentation.

## Roles and Responsibilities
- **Product Manager**: Defines features, roadmap, and user stories
- **Software Architect**: Designs system architecture, APIs, and tech stack decisions
- **Team Lead**: Breaks down epics into manageable tasks
- **Software Engineer**: Implements features, writes tests, and maintains the codebase
- **QA Engineer**: Tests features, writes automated/manual test cases, and tracks bugs

For detailed workflow information, refer to our main documentation.
