# roo-modes CLI

A TypeScript CLI for managing Roo custom modes.

## Features

- Written in TypeScript
- Minimal dependencies
- Reports CLI version
- Convert between JSON mode files and markdown files
- Generate template files for quick mode creation

## Installation

### Local Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

### Usage

Run the CLI directly:

```bash
node dist/index.js [command]
```

Or use the executable script:

```bash
./bin/roo-modes.js [command]
```

### Global Installation

You can install the CLI globally on your system:

```bash
npm install -g .
```

After global installation, you can run it from anywhere:

```bash
roo-modes
```

## Distribution Options

### Using npx without Installation

You can run the CLI without installing it using npx:

```bash
npx roo-modes
```

### Publishing to npm

To make the CLI available to others, publish it to npm:

```bash
npm publish
```

## Development Mode

There are two ways to run the CLI in development mode:

### Method 1: Direct Execution with ts-node

Run the CLI directly without compiling using ts-node:

```bash
npm run dev -- [command]
```

For example:
```bash
npm run dev -- json2md
npm run dev -- --modes-dir custom-modes md2json
npm run dev -- --template-json json2md
npm run dev -- --template-md md2json
```

The `--` is necessary to pass arguments to the script rather than to npm.

### Method 2: Watch and Compile

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the TypeScript compiler in watch mode:
   ```bash
   npm run watch
   ```

3. In a separate terminal, run the CLI:
   ```bash
   node dist/index.js [command]
   ```

   Or use the executable script:
   ```bash
   ./bin/roo-modes.js [command]
   ```

This second method allows you to make changes to the source code and have them automatically compiled and available for testing.

## Commands

### json2md (formerly extract)

Converts JSON mode files to markdown files with machine-readable tags.

```bash
roo-modes json2md
roo-modes --modes-dir custom-modes json2md
```

### md2json (formerly include)

Converts markdown files to JSON mode files.

```bash
roo-modes md2json
roo-modes --modes-dir custom-modes md2json
```

### Template Generation

Create template files to help you get started with custom modes:

```bash
# Create a template JSON file
roo-modes --template-json json2md

# Create a template markdown file
roo-modes --template-md md2json
```

The template files include all possible fields and demonstrate the proper structure for both JSON and markdown formats.

### Other Commands

```bash
# Display the CLI version
roo-modes version

# Display help information
roo-modes help
```

## File Format

The CLI uses a special markdown format with machine-readable tags to facilitate conversion between JSON and markdown:

```markdown
# [slug:example-mode] Example Mode

## [roleDefinition]
You are an example mode that demonstrates the structure of a custom mode.

## [customInstructions]
This is where you would put your custom instructions for the mode.

## [groups]
```json
[
  "read",
  ["edit", { "fileRegex": "\\.md$", "description": "Markdown files only" }],
  "browser",
  "command"
]
```

## [apiConfiguration]
```json
{
  "model": "gpt-4",
  "temperature": 0.2
}
```

## [source]
custom
```

This format ensures that all JSON fields are properly preserved when converting between formats.

## License

MIT