# roo-modes CLI

A TypeScript CLI for managing Roo custom modes.

## Features

- Written in TypeScript
- Minimal dependencies
- Reports CLI version

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
npm run dev -- extract
npm run dev -- --modes-dir custom-modes include
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

## License

MIT