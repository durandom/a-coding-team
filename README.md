# AI-Driven Development Workflow

This repository implements an **AI-driven development workflow** using structured files and clear role-based transitions. It ensures that tasks are well-documented, handed over smoothly, and tracked properly, even in the absence of external issue-tracking tools like JIRA or GitHub Issues.

## 📌 **Overview**
In this workflow, different roles collaborate on a project while tracking progress through structured files. Each role has **clear responsibilities, input/output expectations** to ensure seamless transitions.

### **Roles in the Development Process**
1. **Product Manager (PM)** → Defines features, roadmap, and user stories
2. **Software Architect** → Designs system architecture, APIs, and tech stack decisions
3. **Team Lead** → Breaks down epics into manageable tasks
4. **Software Engineer** → Implements features, writes tests, and maintains the codebase
5. **QA Engineer** → Tests features, writes automated/manual test cases, and tracks bugs

## 🔄 **Workflow & Handover Process**

The workflow is designed to mimic a ticketing system but using a file structure. Here's how it works:

1. **Feature Request Creation** (Product Manager)
   - Creates a new directory in `/issues/feature_requests/` with a unique ID
   - Fills out the `feature_request.md` using the template
   - Adds any relevant documents or diagrams to the `attachments/` folder

2. **Architecture Planning** (Software Architect)
   - Reviews the feature request
   - Creates `architecture_plan.md` outlining the implementation approach
   - Breaks down the feature into epics by creating subdirectories in the `epics/` folder
   - Each epic gets its own `epic_details.md` file

3. **Task Breakdown** (Team Lead)
   - Reviews the epics
   - Creates task directories in the `tasks/` folder of each epic
   - Fills out `task_details.md` for each task
   - Assigns priorities and dependencies

4. **Implementation** (Software Engineer)
   - Picks up a task by reviewing its `task_details.md`
   - Documents progress in `implementation_notes.md`
   - Upon completion, creates a `completion_summary.md` with details of the implementation

5. **Testing and Quality Assurance** (QA Engineer)
   - Reviews completed tasks
   - Creates bug reports in `/issues/bugs/` if issues are found
   - Updates task completion status once verified

6. **Bug Fixing** (Software Engineer)
   - Reviews bug reports in `/issues/bugs/`
   - Documents investigation in `investigation_notes.md`
   - Provides fix details in `fix_details.md`

This structure ensures that:
- All work is documented in a way that persists beyond the LLM context window
- Each step of the process is clearly defined
- The transition between roles is seamless, with clear handover points
- The history of decisions and implementations is preserved
- Anyone can pick up where another left off by reviewing the relevant files

### **File System Structure**
```
/project
   ├── status/
   │   ├── product_manager/            # Status files for Product Manager
   │   │   ├── active_assignments.md
   │   │   └── backlog.md
   │   ├── architect/                  # Status files for Software Architect
   │   │   ├── active_assignments.md
   │   │   └── backlog.md
   │   ├── team_lead/                  # Status files for Team Lead
   │   │   ├── active_assignments.md
   │   │   └── backlog.md
   │   ├── engineer/                   # Status files for Software Engineers
   │   │   ├── active_assignments.md
   │   │   └── backlog.md
   │   └── qa/                         # Status files for QA Engineers
   │       ├── active_assignments.md
   │       └── backlog.md
   │
   ├── issues/
   │   ├── feature_requests/
   │   │   ├── FR-001_user_authentication/
   │   │   │   ├── feature_request.md       # Initial feature request by Product Manager
   │   │   │   ├── architecture_plan.md     # Software Architect's implementation plan
   │   │   │   ├── attachments/             # Any relevant diagrams or documents
   │   │   │   └── epics/                   # Epics created for this feature request
   │   │   │       ├── EP-001_login_system/
   │   │   │       │   ├── epic_details.md  # Epic description and requirements
   │   │   │       │   └── tasks/           # Individual tasks for this epic
   │   │   │       │       ├── T-001_login_ui/
   │   │   │       │       │   ├── task_details.md      # Task description
   │   │   │       │       │   ├── implementation_notes.md # Developer's notes
   │   │   │       │       │   └── completion_summary.md   # Summary after completion
   │   │   │       │       ├── T-002_auth_api/
   │   │   │       │       │   └── ...
   │   │   │       │
   │   │   │       ├── EP-002_user_registration/
   │   │   │       │   └── ...
   │   │   │
   │   │   ├── FR-002_payment_gateway/
   │   │       └── ...
   │   │
   │   ├── bugs/
   │   │   ├── BUG-001_login_timeout/
   │   │   │   ├── bug_report.md            # Initial bug report
   │   │   │   ├── investigation_notes.md   # Developer's investigation
   │   │   │   ├── fix_details.md           # Documentation of the fix
   │   │   │   └── attachments/             # Screenshots, logs, etc.
   │   │   │
   │   │   └── BUG-002_payment_failure/
   │   │       └── ...
   │   │
   │   └── improvements/
   │       ├── IMP-001_performance_optimization/
   │       │   └── ...
   │       └── IMP-002_accessibility_update/
   │           └── ...
   │
   ├── templates/                       # Templates for different types of issues
   │   ├── feature_request_template.md
   │   ├── epic_template.md
   │   ├── task_template.md
   │   ├── bug_report_template.md
   │   └── improvement_template.md
   │
   └── README.md                        # Overview of the project and workflow
```

## 📊 **Assignment and Status Tracking**

To efficiently manage tasks between LLM sessions without requiring the model to read the entire project, we implement a role-specific status tracking system:

### **Role-Specific Status Directories**
```
/project
   ├── status/
   │   ├── product_manager/
   │   │   ├── active_assignments.md   # Current tasks for Product Manager
   │   │   └── backlog.md              # Upcoming feature requests
   │   │
   │   ├── architect/
   │   │   ├── active_assignments.md   # Current tasks for Software Architect
   │   │   └── backlog.md              # Feature requests awaiting architecture
   │   │
   │   ├── team_lead/
   │   │   ├── active_assignments.md   # Current epics for Team Lead
   │   │   └── backlog.md              # Epics awaiting breakdown
   │   │
   │   ├── engineer/
   │   │   ├── active_assignments.md   # Current tasks for Engineers
   │   │   └── backlog.md              # Tasks ready for implementation
   │   │
   │   └── qa/
   │       ├── active_assignments.md   # Current testing tasks
   │       └── backlog.md              # Tasks awaiting QA
```

Each role has its own status directory, allowing the LLM to focus only on the relevant assignments for that role.

### **Example of engineer/active_assignments.md**
```markdown
# Engineer Active Assignments - Last Modified: 2025-04-02 14:30

## Current Tasks
1. **T-001_login_ui** (High Priority)
   - Feature: FR-001 User Authentication
   - Epic: EP-001 Login System
   - Status: In progress (75% complete)
   - Notes: Need clarification on error handling
   - Dependencies: None
   - Last Updated: 2025-04-02 10:15

2. **T-002_auth_api** (Medium Priority)
   - Feature: FR-001 User Authentication
   - Epic: EP-001 Login System
   - Status: Not started
   - Dependencies: Database schema approval
   - Last Updated: 2025-04-01 16:45

## Blocked Tasks
1. **T-003_password_reset** (Medium Priority)
   - Blocker: Waiting for security team input
   - Contact: security@example.com
   - Last Updated: 2025-03-30 09:20
```

### **Starting a New LLM Session**
When starting a new LLM session:

1. Tell the LLM which role you're assuming (e.g., "I'm working as the Software Engineer")
2. Provide only the role-specific `active_assignments.md` file (e.g., `/status/engineer/active_assignments.md`)
3. Then provide only the specific files needed for the current task (e.g., just the task_details.md for T-001)

This approach ensures the LLM only processes the minimal context needed, without being overwhelmed by the entire project structure.

## 📝 **Updating Assignment Status**
At the end of each LLM session, update the relevant status files for your role:

1. Update task status in the specific task files
2. Update your role's `active_assignments.md` with new progress
3. Add the current timestamp to the "Last Updated" field for any modified tasks
4. Update the document header timestamp (e.g., "Last Modified: 2025-04-02 14:30")
5. Mark completed tasks in your role's `backlog.md` with a "Completed" status
6. Pull new tasks from your role's `backlog.md` as needed

If your work creates tasks for another role:
1. Update your own status files
2. Add the new task to the appropriate role's `backlog.md` with a timestamp

This lightweight status tracking system mimics the essential functions of a ticketing system while remaining file-based and minimalist.

## 📌 **Conclusion**
This workflow ensures that every change is well-documented, that AI-assisted development remains structured, and that roles transition smoothly without loss of context. **By following this structured file system and enforcing handovers, we ensure high-quality, AI-driven development.**

The key advantage of this approach is that it creates a persistent record of all development activities, allowing team members to collaborate effectively even when working with an LLM that has limited context awareness. Each new conversation with the LLM can begin by reviewing only the relevant status files and task-specific documentation, rather than the entire project history.