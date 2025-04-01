#!/usr/bin/env node

/**
 * A minimalist TypeScript CLI that reports its version
 */

// Import package.json to get the version
import { readFileSync } from 'fs';
import { join } from 'path';

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
 * Main CLI function
 */
function main(): void {
  console.log(`minimal-ts-cli version: ${getVersion()}`);
}

// Execute the main function
main();