#!/usr/bin/env node

/**
 * A minimalist TypeScript CLI that reports its version and supports commands
 */

// Import required modules
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, basename, dirname } from 'path';

/**
 * Get the package version from package.json
 */
function getVersion(): string {
  try {
    const packageJsonPath = join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('Error reading package.json:', error);
    return 'unknown';
  }
}

/**
 * Check if a file is a valid RU custom mode file
 * @param filePath Path to the JSON file
 * @returns boolean indicating if the file is a valid RU custom mode file
 */
function isValidModeFile(filePath: string): boolean {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    // Check for required fields in the mode file
    return (
      typeof jsonData.slug === 'string' &&
      typeof jsonData.name === 'string' &&
      typeof jsonData.roleDefinition === 'string' &&
      Array.isArray(jsonData.groups) &&
      typeof jsonData.customInstructions === 'string' &&
      jsonData.source === 'custom'
    );
  } catch (error) {
    return false;
  }
}

/**
 * Extract custom instructions from a mode file and save to markdown
 * @param filePath Path to the mode JSON file
 */
function extractCustomInstructions(filePath: string): void {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    if (!jsonData.customInstructions) {
      console.log(`No custom instructions found in ${filePath}`);
      return;
    }

    // Create output filename
    const fileName = basename(filePath, '.json');
    const outputPath = join(dirname(filePath), `${fileName}.custominstructions.markdown`);

    // Create markdown content
    const markdownContent = `# Custom Instructions for ${jsonData.name}\n\n${jsonData.customInstructions}`;

    // Ensure directory exists
    const dir = dirname(outputPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write to file
    writeFileSync(outputPath, markdownContent);
    console.log(`Extracted custom instructions to ${outputPath}`);
  } catch (error) {
    console.error(`Error extracting custom instructions from ${filePath}:`, error);
  }
}

/**
 * Process all JSON files in the modes directory
 * @param modesDir Path to the modes directory
 */
function processModesDirectory(modesDir: string): void {
  try {
    if (!existsSync(modesDir)) {
      console.error(`Modes directory not found: ${modesDir}`);
      return;
    }

    const files = readdirSync(modesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log(`No JSON files found in ${modesDir}`);
      return;
    }

    let validFilesCount = 0;

    for (const file of jsonFiles) {
      const filePath = join(modesDir, file);
      if (isValidModeFile(filePath)) {
        extractCustomInstructions(filePath);
        validFilesCount++;
      } else {
        console.log(`Skipping ${file} - not a valid RU custom mode file`);
      }
    }

    console.log(`Processed ${validFilesCount} valid mode files out of ${jsonFiles.length} JSON files`);
  } catch (error) {
    console.error(`Error processing modes directory:`, error);
  }
}

/**
 * Display help information
 */
function showHelp(): void {
  console.log(`
minimal-ts-cli version: ${getVersion()}

Usage:
  minimal-cli [command]

Commands:
  extract     Extract custom instructions from mode files
  version     Display the CLI version
  help        Display this help information

Examples:
  minimal-cli extract     Extract custom instructions from all mode files
  minimal-cli version     Display the CLI version
  minimal-cli help        Display help information
  `);
}

/**
 * Main CLI function
 */
function main(): void {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'extract':
      const modesDir = join(__dirname, '..', 'modes');
      processModesDirectory(modesDir);
      break;

    case 'version':
      console.log(`minimal-ts-cli version: ${getVersion()}`);
      break;

    case 'help':
      showHelp();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
      break;
  }
}

// Execute the main function
main();