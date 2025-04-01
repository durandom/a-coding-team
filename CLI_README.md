# Minimal TypeScript CLI

A minimalist TypeScript CLI that reports its version.

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
node dist/index.js
```

Or use the executable script:

```bash
./bin/cli.js
```

### Global Installation

You can install the CLI globally on your system:

```bash
npm install -g .
```

After global installation, you can run it from anywhere:

```bash
minimal-cli
```

## Distribution Options

### Using npx without Installation

You can run the CLI without installing it using npx:

```bash
npx minimal-ts-cli
```

### Publishing to npm

To make the CLI available to others, publish it to npm:

```bash
npm publish
```

## Project Structure

```
minimal-ts-cli/
├── bin/           # Executable scripts
│   └── cli.js     # CLI entry point wrapper
├── src/           # TypeScript source files
│   └── index.ts   # Main CLI implementation
├── dist/          # Compiled JavaScript (generated)
├── package.json   # Dependencies and scripts
└── tsconfig.json  # TypeScript configuration
```

## License

MIT