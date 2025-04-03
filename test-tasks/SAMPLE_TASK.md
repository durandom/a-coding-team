# AI-Driven Development Workflow: "Hello World" Shell Script Application

This document outlines the structured tasks for each role in implementing a simple "Hello World" shell script application following our AI-driven development workflow. Each section includes a prompt that can be copied and pasted to an AI agent when working in that particular role.

## Product Manager

### Prompt for Product Manager:
```
We need a simple shell script to print "Hello World".

The script should just print "Hello World" to the console when executed and exit successfully. It should be straightforward to run on Linux, macOS, and potentially Windows environments that support shell scripts.
```

- Create feature request `FR-001_hello_world_script`
- Define user requirements for a simple shell script that outputs "Hello World"
- Specify acceptance criteria:
  - Script should be executable
  - Script should display "Hello World" when run
  - Script should return exit code 0 on successful execution
- Identify potential users and use cases
- Document any constraints or dependencies

## Software Architect
- Review the feature request
- Design architecture plan:
  - Determine shell type (bash, zsh, etc.)
  - Define execution environment requirements
  - Consider portability across different operating systems
- Define file structure and execution permissions
- Break down into `EP-001_hello_world_implementation` epic
- Document any technical decisions or trade-offs

### Prompt for Software Architect:
```
I just reviewed the feature request FR-001 for the "Hello World" script. It's pretty straightforward, but I should probably define a few technical details before we implement it.

We'll need to decide which shell to target - I'm thinking bash would be most universal. We should also make sure it works across our supported environments.

I'd like to set up the epic for this (EP-001_hello_world_implementation) and define the high-level architecture. Even though it's simple, let's make sure we follow our standards for script structure, error handling, and documentation.

I also want to make some recommendations about where this script should live in our repo structure and how it should be packaged for new developers.
```

## Team Lead
- Review the epic
- Break down into tasks:
  - `T-001`: Create shell script file with Hello World functionality
  - `T-002`: Make script executable with proper permissions
  - `T-003`: Add documentation and usage instructions
- Assign priorities to tasks
- Define dependencies between tasks
- Estimate effort required for each task

### Prompt for Team Lead:
```
Looking at the architect's plan for the Hello World script, I need to break this down into specific tasks for the team.

I'm thinking we need three distinct tasks here:
1. First, we need someone to write the actual script file with the Hello World functionality
2. Then we need to set up the proper permissions to make it executable
3. Finally, we need documentation so new devs know how to use it

The first task is highest priority, and the other two depend on that being completed. These should all be pretty quick to implement, but let's make sure we do it right.

I'll need to get these tasks assigned for our next sprint. Can you help me break these down with all the necessary details for our engineers?
```

## Software Engineer
- Review task details
- Implement `T-001`:
  - Write the shell script with appropriate shebang line
  - Implement "Hello World" output
  - Add error handling if necessary
- Implement `T-002`:
  - Set proper execution permissions
  - Ensure script works in target environments
- Implement `T-003`:
  - Document usage instructions
  - Add comments within the script
- Document implementation decisions
- Create completion summary for each task

### Prompt for Software Engineer:
```
I've been assigned task T-001 to create the Hello World shell script. Looking at the details, it should be pretty straightforward.

I need to write a basic bash script that prints "Hello World" to the console. I'll make sure to follow our coding standards with proper shebang, comments, and basic error handling.

The architect mentioned this needs to work across Linux and macOS at minimum, so I'll keep that in mind. I should be able to get this done quickly and then document what I did.

Let me work on the implementation and notes for this task now.
```

## QA Engineer
- Test the script on various environments:
  - Different operating systems (if required)
  - Different shell configurations
- Verify:
  - Execution works correctly
  - "Hello World" displays as expected
  - Script handles errors appropriately
  - Documentation is complete and accurate
- Check that the script meets all acceptance criteria
- Close tasks or create bug reports if issues are found
- Validate that the implementation satisfies the original feature request

### Prompt for QA Engineer:
```
The Hello World script implementation is ready for testing. I need to verify that it works as expected across our supported environments.

I'll need to run the script on Linux and macOS to make sure it executes correctly and outputs "Hello World" as expected. I should also check that the permissions are set correctly so it can be executed without additional steps.

I want to review the documentation as well to make sure it's clear for new developers. This is a simple script, but we should still make sure it meets all our quality standards before we mark it as complete.

If I find any issues, I'll document them and send them back to the engineer for fixes.
```

This workflow ensures that even a simple "Hello World" script is implemented with proper documentation, testing, and quality control following software engineering best practices.