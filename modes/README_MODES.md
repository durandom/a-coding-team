# Custom Modes Format

This document provides the bare minimum information about the format for custom modes files in Roo. Custom modes allow you to tailor Roo's behavior to specific tasks or workflows.

## Basic Structure

Custom modes are defined in JSON files with the following structure:

```json
{
  "slug": "mode-slug",
  "name": "Mode Display Name",
  "roleDefinition": "Description of the mode's role and capabilities",
  "groups": ["read", "edit"],
  "customInstructions": "Additional behavioral guidelines"
}
```

## Required Properties

### `slug`
- A unique identifier for the mode
- Use lowercase letters, numbers, and hyphens
- Keep it short and descriptive
- Example: `"docs-writer"`, `"test-engineer"`

### `name`
- The display name shown in the UI
- Can include spaces and proper capitalization
- Example: `"Documentation Writer"`, `"Test Engineer"`

### `roleDefinition`
- Detailed description of the mode's role and capabilities
- Defines Roo's expertise and personality for this mode
- Example: `"You are a technical writer specializing in clear documentation"`

### `groups`
- Array of allowed tool groups
- Available groups: `"read"`, `"edit"`, `"browser"`, `"command"`, `"mcp"`
- Can include file restrictions for the `"edit"` group

#### File Restrictions Format
```json
["edit", {
  "fileRegex": "\\.md$",
  "description": "Markdown files only"
}]
```

## Optional Properties

### `customInstructions`
- Additional behavioral guidelines for the mode
- Example: `"Focus on explaining concepts and providing examples"`

### `apiConfiguration`
- Optional settings to customize the AI model and parameters for this mode
- Example: `{"model": "gpt-4", "temperature": 0.2}`

### `source`
- Optional, indicates the source of the mode (e.g., "project")
- Example: `"project"`

## Examples

### Documentation Writer (Markdown files only)
```json
{
  "slug": "docs-writer",
  "name": "Documentation Writer",
  "roleDefinition": "You are a technical writer specializing in clear documentation",
  "groups": [
    "read",
    ["edit", { "fileRegex": "\\.md$", "description": "Markdown files only" }]
  ],
  "customInstructions": "Focus on clear explanations and examples",
  "source": "custom"
}
```

### Test Engineer (Test files only)
```json
{
  "slug": "test-engineer",
  "name": "Test Engineer",
  "roleDefinition": "You are a test engineer focused on code quality",
  "groups": [
    "read",
    ["edit", { "fileRegex": "\\.(test|spec)\\.(js|ts)$", "description": "Test files only" }]
  ],
  "source": "custom"
}
```

### Full-Stack Developer (JS/TS files)
```json
{
  "slug": "fullstack-dev",
  "name": "Full-Stack Developer",
  "roleDefinition": "You are a full-stack developer with expertise in JavaScript and TypeScript",
  "groups": [
    "read",
    ["edit", { "fileRegex": "\\.(js|ts|jsx|tsx)$", "description": "JavaScript and TypeScript files" }],
    "browser",
    "command"
  ],
  "customInstructions": "Focus on writing clean, maintainable code with proper error handling",
  "source": "custom"
}
```

## Important Notes

1. In JSON, backslashes must be escaped with another backslash. So `\.md$` becomes `\\.md$`
2. File regex patterns match against the full file path, not just the filename
3. Regex patterns are case-sensitive by default
4. Custom modes can be global (available across all projects) or project-specific