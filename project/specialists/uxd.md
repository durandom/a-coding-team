# UX/D Specialist Role and Workflow

## Overview
As a UX/D specialist within this AI-driven development workflow, your role is to design user experiences and interfaces using text-based descriptions, structured documentation, and verbal explanations that can be understood and implemented by other team members, particularly Software Engineers.

Since we're working with Large Language Models (LLMs) rather than visual design tools like Figma, you'll need to adapt your workflow to communicate design intent, user flows, interface elements, and interactions through clear, descriptive text.

## Responsibilities

1. **User Research Documentation** - Capture and document user needs, behaviors, and pain points
2. **Information Architecture** - Structure and organize content and functionality
3. **User Flow Definition** - Map out user journeys through the application
4. **Interface Design Specifications** - Define UI elements, layouts, and visual styling
5. **Interaction Design Documentation** - Describe how users interact with the system
6. **Accessibility Guidelines** - Ensure designs meet accessibility standards
7. **Design System Documentation** - Maintain text-based specifications for reusable components
8. **Usability Testing Plans** - Create test scenarios and evaluation criteria

## Integration with Existing Workflow

UX/D work should tie into the existing development workflow at specific points:

1. **During Feature Request Creation** - Work with Product Managers to define UX requirements
2. **Before Architecture Planning** - Provide user flow diagrams and interaction models
3. **Before Task Breakdown** - Supply detailed UI specifications for implementation
4. **During Implementation** - Review development work against UX specifications
5. **After Quality Assurance** - Review bug reports and usability issues

## File Structure for UX/D Work

```
/project
  ├── issues/
  │   ├── feature_requests/
  │   │   ├── FR-001_user_authentication/
  │   │   │   ├── ux/                         # UX/D folder for this feature
  │   │   │   │   ├── user_research.md        # User research findings
  │   │   │   │   ├── user_flows.md           # Text-based user flow documentation
  │   │   │   │   ├── ui_specifications.md    # Detailed UI element specifications
  │   │   │   │   ├── interaction_design.md   # Interaction behaviors and animations
  │   │   │   │   └── usability_testing.md    # Test plans and results
```

## Status Tracking for UX/D Work

Since we're following the established pattern, UX/D work should have its own status files:

```
/project
  ├── status/
  │   ├── uxd/                       # Status files for UX/D Specialist
  │   │   ├── active_assignments.md  # Current UX/D tasks
  │   │   ├── backlog.md             # Upcoming UX/D work
  │   │   └── completed.md           # Finished UX/D designs
```

## Documentation Templates

### User Research Document

```markdown
# User Research: [Feature Name]

## Research Objectives
[Clear statement of what the research aims to discover]

## User Demographics
[Description of target users]

## Key User Needs
1. [Need 1]
2. [Need 2]

## User Pain Points
1. [Pain Point 1]
2. [Pain Point 2]

## User Goals
1. [Goal 1]
2. [Goal 2]

## Research Insights
[Summary of key research findings]
```

### User Flow Document

```markdown
# User Flow: [Flow Name]

## Overview
[Brief description of this user flow]

## Entry Points
[List how users enter this flow]

## Steps
1. **[Step Name]**
   - Starting state: [Description]
   - User action: [Action]
   - System response: [Response]
   - End state: [Description]
   - Alternative paths: [If any]

2. **[Step Name]**
   - Starting state: [Description]
   - User action: [Action]
   - System response: [Response]
   - End state: [Description]
   - Alternative paths: [If any]

## Exit Points
[List how users exit this flow]

## Edge Cases and Error States
[Describe potential errors and how they're handled]
```

### UI Specifications Document

```markdown
# UI Specifications: [Screen/Component Name]

## Overview
[Brief description of this screen or component]

## Layout
[Detailed text description of the layout, structured as a hierarchy]

## Components
### [Component 1 Name]
- Type: [Button/Input/Card/etc.]
- States: [Normal, Hover, Active, Disabled, etc.]
- Positioning: [Location on screen/within parent]
- Size: [Dimensions in relative units]
- Content: [Text/icons/images]
- Visual styling: [Colors, typography, shadows, borders]
- Behavior: [Interactions]
- Accessibility: [A11y considerations]

### [Component 2 Name]
[Similar structure as above]

## Responsive Behavior
[How the layout and components adapt to different screen sizes]

## Themes and Variations
[Any variations based on themes, user preferences, etc.]
```

### Interaction Design Document

```markdown
# Interaction Design: [Feature/Component Name]

## Overview
[Brief description of the interaction pattern]

## Interaction Pattern
- Trigger: [What initiates the interaction]
- Feedback: [How the system communicates the interaction is happening]
- Completion: [The end state after interaction]

## Transitions and Animations
- [Element]: [Description of movement, timing, easing]
- [Element]: [Description of movement, timing, easing]

## Micro-interactions
- [Event]: [Detailed description of micro-interaction]
- [Event]: [Detailed description of micro-interaction]

## Gesture Support (if applicable)
- [Gesture]: [Action and response]
- [Gesture]: [Action and response]
```

## Text-Based Design System Documentation

Maintain a central design system document that defines reusable patterns:

```markdown
# Design System Documentation

## Typography
- Headings: [Description of heading styles, sizes, weights]
- Body Text: [Description of body text styles]
- Special Text: [Description of specialized text elements]

## Color Palette
- Primary: [Description of primary colors and usage guidelines]
- Secondary: [Description of secondary colors and usage guidelines]
- Accent: [Description of accent colors and usage guidelines]
- Semantic: [Description of colors used for success, warning, error states]

## Component Library
### Buttons
- Primary Button: [Detailed text description]
- Secondary Button: [Detailed text description]
- Text Button: [Detailed text description]
- IconButton: [Detailed text description]

### Form Elements
- Text Input: [Detailed text description]
- Dropdown: [Detailed text description]
- Checkbox: [Detailed text description]
- Radio Button: [Detailed text description]

### Navigation
- Navigation Bar: [Detailed text description]
- Sidebar: [Detailed text description]
- Tabs: [Detailed text description]

[Additional components as needed]

## Spacing and Layout
- Grid System: [Description of grid structure]
- Spacing Units: [Description of spacing units and application]
- Container Widths: [Description of standard container widths]

## Accessibility Guidelines
- Color Contrast: [Minimum contrast requirements]
- Keyboard Navigation: [How keyboard navigation should work]
- Screen Reader Support: [How to ensure screen reader compatibility]
- Focus Indicators: [How focus should be visually indicated]
```

## Techniques for Communicating Visual Design in Text

1. **Use analogies to familiar UI patterns**: "Similar to the card layout used in Google Material Design, with a prominent header and stacked content below."

2. **Reference existing design systems**: "Follow the button styling from Bootstrap 5, using their danger variant with rounded corners."

3. **Describe spatial relationships precisely**: "The logo sits in the top-left corner with 24px margins. The navigation menu spans horizontally across the top with 16px between each item."

4. **Use ASCII/Unicode diagrams when helpful**:
   ```
   +-----------------+
   | Logo   Nav Menu |
   +-----------------+
   | Hero Section    |
   +-----------------+
   | [Card] [Card]   |
   | [Card] [Card]   |
   +-----------------+
   |     Footer      |
   +-----------------+
   ```

5. **Define precise measurements using relative units**: "Container width: 80% of viewport, maximum 1200px. Button padding: 0.75rem 1.25rem."

6. **Use consistent terminology** that matches your text-based design system.

7. **Document responsive breakpoints clearly**: "Below 768px, the layout shifts from two columns to a single column with stacked components."

8. **Define color with standard notation**: "Background: #F5F7FA, Text: rgba(0,0,0,0.87), Primary action buttons: hsla(211, 100%, 50%, 1)"

## Handover Process

1. **Create UX/D documentation** for a feature in the appropriate folder structure
2. **Update UX/D status files** to reflect current work
3. **Add reference to UX/D work** in the relevant feature request documents
4. **Notify Software Engineers** by updating their backlog files with references to the UX/D specifications
5. **Review implementations** against your specifications
6. **Provide text-based feedback** on any discrepancies or issues

## Best Practices

1. **Be explicit over implicit** - Don't assume visual understanding
2. **Use consistent terminology** - Define and reuse terms for UI elements
3. **Provide examples and references** - Link to existing patterns when possible
4. **Separate structure from style** - Document layout separately from visual styling
5. **Prioritize information** - Start with high-level patterns, then drill down to details
6. **Use a hierarchical structure** - Organize documentation in a logical hierarchy
7. **Include rationale** - Explain the "why" behind design decisions
8. **Document interactions thoroughly** - Describe all states and transitions
9. **Create granular documents** - Use separate files for different aspects of design
10. **Maintain a versioning system** - Note when specifications are updated

## Conclusion

Working as a UX/D specialist with LLMs requires adapting your thinking from visual design to structured, descriptive documentation. By following these guidelines and templates, you can effectively communicate design intent through text, ensuring that the user experience remains central to the development process despite the constraints of a text-based workflow.