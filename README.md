# AI-Driven Development Workflow

This repository implements an **AI-driven development workflow** using structured files and clear role-based transitions. It ensures that tasks are well-documented, handed over smoothly, and tracked properly, even in the absence of external issue-tracking tools like JIRA or GitHub Issues.

## 📌 **Overview**
In this workflow, different roles collaborate on a project while tracking progress through structured files. Each role has **clear responsibilities, input/output expectations, and a Definition of Done (DoD)** to ensure seamless transitions.

### **Roles in the Development Process**
1. **Product Manager (PM)** → Defines features, roadmap, and user stories
2. **Software Architect** → Designs system architecture, APIs, and tech stack decisions
3. **UI/UX Designer** → Creates wireframes, mock-ups, and user flows
4. **Software Engineer** → Implements features, writes tests, and maintains the codebase
5. **QA Engineer** → Tests features, writes automated/manual test cases, and tracks bugs

## 🔄 **Workflow & Handover Process**
Each role is responsible for updating specific files before handing off tasks to the next role. The workflow ensures:
✅ Clear documentation of system evolution
✅ Easy tracking of features, architecture, and UI changes
✅ Enforced checklists for quality and completeness

### **File System Structure**
```
/project
  ├── roadmap/
  │   ├── 2025_q1_roadmap.md        # Product roadmap
  │   ├── feature_auth_system.md    # Feature definitions
  │
  ├── architecture/
  │   ├── ARCHITECTURE_OVERVIEW.md  # System architecture overview
  │   ├── ADR_001_auth_strategy.md  # Architectural decision records (ADRs)
  │   ├── system_diagram_auth.png   # System diagrams
  │
  ├── design/
  │   ├── UI_OVERVIEW.md            # UI/UX guidelines and components
  │   ├── auth_login_wireframe.fig  # Wireframes and mock-ups
  │   ├── auth_css_guidelines.md    # CSS and style rules
  │
  ├── implementation/
  │   ├── auth_module.js            # Implemented features
  │   ├── auth_tests.spec.js        # Unit tests
  │
  ├── qa/
  │   ├── QA_OVERVIEW.md            # Test plans and known issues
  │   ├── test_plan_auth.md         # Test strategy for authentication
  │   ├── bug_report_001.md         # Found issues and bug tracking
  │
  ├── docs/
  │   ├── CHANGELOG.md              # Tracks all changes and system evolution
  │   ├── FEATURE_OVERVIEW.md        # Active and upcoming features
  │   ├── ARCHITECTURE_OVERVIEW.md   # High-level system design
  │   ├── UI_OVERVIEW.md             # UI components and user flow
  │   ├── QA_OVERVIEW.md             # Test coverage and bug reports
  │
  ├── prompts/
  │   ├── common_prompt.md          # General AI prompt for all roles
  │   ├── pm_prompt.md              # Product Manager-specific AI prompt
  │   ├── architect_prompt.md       # Software Architect-specific AI prompt
  │   ├── designer_prompt.md        # UI/UX Designer-specific AI prompt
  │   ├── engineer_prompt.md        # Software Engineer-specific AI prompt
  │   ├── qa_prompt.md              # QA Engineer-specific AI prompt
  │
  ├── dod/
  │   ├── common_dod.md             # General Definition of Done for all roles
  │   ├── pm_dod.md                 # Product Manager-specific DoD
  │   ├── architect_dod.md          # Software Architect-specific DoD
  │   ├── designer_dod.md           # UI/UX Designer-specific DoD
  │   ├── engineer_dod.md           # Software Engineer-specific DoD
  │   ├── qa_dod.md                 # QA Engineer-specific DoD
```

## 📝 **Definition of Done (DoD) Locations**
Each role has a structured DoD stored in the `/dod/` directory to ensure quality and completeness before transitioning tasks.

- **Common DoD:** `dod/common_dod.md` (General quality and completeness rules)
- **Product Manager DoD:** `dod/pm_dod.md`
- **Software Architect DoD:** `dod/architect_dod.md`
- **UI/UX Designer DoD:** `dod/designer_dod.md`
- **Software Engineer DoD:** `dod/engineer_dod.md`
- **QA Engineer DoD:** `dod/qa_dod.md`

These documents define the specific exit criteria for each role before passing tasks to the next phase.

---

## 📌 **Conclusion**
This workflow ensures that every change is well-documented, that AI-assisted development remains structured, and that roles transition smoothly without loss of context. **By following this structured file system and enforcing handovers, we ensure high-quality, AI-driven development.**

