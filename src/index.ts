#!/usr/bin/env node

/**
 * roo-modes: A TypeScript CLI for managing Roo custom modes
 */

// Import required modules
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { EOL } from 'os';

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
function isValidModeFile(filePath: string): { valid: boolean; reason?: string } {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    // Check for required fields in the mode file
    if (typeof jsonData.slug !== 'string') {
      return { valid: false, reason: "Missing or invalid 'slug' field (must be a string)" };
    }
    if (typeof jsonData.name !== 'string') {
      return { valid: false, reason: "Missing or invalid 'name' field (must be a string)" };
    }
    if (typeof jsonData.roleDefinition !== 'string') {
      return { valid: false, reason: "Missing or invalid 'roleDefinition' field (must be a string)" };
    }
    if (!Array.isArray(jsonData.groups)) {
      return { valid: false, reason: "Missing or invalid 'groups' field (must be an array)" };
    }
    if (typeof jsonData.customInstructions !== 'string') {
      return { valid: false, reason: "Missing or invalid 'customInstructions' field (must be a string)" };
    }

    // Make source field optional with default value of "project"
    if (jsonData.source !== undefined && typeof jsonData.source !== 'string') {
      return { valid: false, reason: "Invalid 'source' field (must be a string if provided)" };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, reason: `Error parsing file: ${error}` };
  }
}

/**
 * Parse markdown content to extract JSON fields
 * @param markdownContent The markdown content to parse
 * @param existingJsonData Existing JSON data to update
 * @returns Updated JSON data
 */
function parseMarkdownToJson(markdownContent: string, existingJsonData: any): any {
  const jsonData = { ...existingJsonData };

  // Extract the title and slug from the first line
  const titleMatch = markdownContent.match(/^# \[slug:([^\]]+)\]\s+(.+?)(?:\n|$)/m);
  if (titleMatch) {
    jsonData.slug = titleMatch[1].trim();
    jsonData.name = titleMatch[2].trim();
  }

  // Use the new machine-readable format to extract sections
  // Look for patterns like "# --mode-prop: [propName]" followed by content
  const sectionRegex = /# --mode-prop: \[([^\]]+)\]\s*\n([\s\S]+?)(?=\n# --mode-prop: \[|$)/g;

  // Process sections in the new format
  let match;
  while ((match = sectionRegex.exec(markdownContent)) !== null) {
    const sectionName = match[1].trim();
    let sectionContent = match[2].trim();

    processSectionContent(sectionName, sectionContent, jsonData);
  }

  return jsonData;
}

/**
 * Process section content based on section name
 * @param sectionName The name of the section
 * @param sectionContent The content of the section
 * @param jsonData The JSON data to update
 */
function processSectionContent(sectionName: string, sectionContent: string, jsonData: any): void {
  // Handle different section types
  switch (sectionName) {
    case 'roleDefinition':
      jsonData.roleDefinition = sectionContent;
      break;
    case 'customInstructions':
      jsonData.customInstructions = sectionContent;
      break;
    case 'groups':
    case 'apiConfiguration':
      // Extract JSON content from code blocks
      const jsonMatch = sectionContent.match(/```json\s*([\s\S]+?)\s*```/);
      if (jsonMatch) {
        try {
          jsonData[sectionName] = JSON.parse(jsonMatch[1]);
        } catch (error) {
          console.error(`Error parsing JSON in ${sectionName} section:`, error);
        }
      }
      break;
    case 'source':
      jsonData.source = sectionContent;
      break;
  }
}

/**
 * Convert JSON data to markdown content
 * @param jsonData JSON data to convert
 * @returns Markdown content as a string
 */
function jsonToMarkdownContent(jsonData: any): string {
  if (!jsonData.customInstructions) {
    throw new Error("No custom instructions found in JSON data");
  }

  // Create markdown content with machine-readable format
  let markdownContent = '';

  // Add slug
  markdownContent += `# [slug:${jsonData.slug}] ${jsonData.name}\n\n`;

  // Add role definition
  markdownContent += `# --mode-prop: [roleDefinition]\n${jsonData.roleDefinition}\n\n`;

  // Add custom instructions
  markdownContent += `# --mode-prop: [customInstructions]\n${jsonData.customInstructions}\n\n`;

  // Add groups
  markdownContent += `# --mode-prop: [groups]\n\`\`\`json\n${JSON.stringify(jsonData.groups, null, 2)}\n\`\`\`\n\n`;

  // Add apiConfiguration if it exists
  if (jsonData.apiConfiguration) {
    markdownContent += `# --mode-prop: [apiConfiguration]\n\`\`\`json\n${JSON.stringify(jsonData.apiConfiguration, null, 2)}\n\`\`\`\n\n`;
  }

  // Add source (default to "project" if not provided)
  markdownContent += `# --mode-prop: [source]\n${jsonData.source || 'project'}\n`;

  return markdownContent;
}

/**
 * Convert JSON mode file to markdown (json2md)
 * @param filePath Path to the mode JSON file
 */
function convertJsonToMarkdown(filePath: string): void {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    try {
      // Create output filename
      const fileName = basename(filePath, '.json');
      const outputPath = join(dirname(filePath), `${fileName}.md`);

      // Convert JSON to markdown content
      const markdownContent = jsonToMarkdownContent(jsonData);

      // Ensure directory exists
      const dir = dirname(outputPath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      // Write to file
      writeFileSync(outputPath, markdownContent);
      console.log(`Converted JSON to markdown: ${outputPath} (${fileName}.md)`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error generating markdown content: ${error.message}`);
      } else {
        console.error(`Error generating markdown content: ${error}`);
      }
    }
  } catch (error) {
    console.error(`Error converting JSON to markdown from ${filePath}:`, error);
  }
}

/**
 * Convert markdown file to JSON mode file (md2json)
 * @param jsonFilePath Path to the mode JSON file
 */
/**
 * Check if a markdown file has all required sections for a valid mode
 * @param markdownPath Path to the markdown file
 * @returns Object indicating if the file is valid and reason if not
 */
function isValidMarkdownFile(markdownPath: string): { valid: boolean; reason?: string } {
  try {
    const markdownContent = readFileSync(markdownPath, 'utf8');

    // Check for title and slug
    const titleMatch = markdownContent.match(/^# \[slug:([^\]]+)\]\s+(.+?)(?:\n|$)/m);
    if (!titleMatch) {
      return { valid: false, reason: "Missing or invalid title format with slug" };
    }

    // Check for required sections using the section regex
    const sectionRegex = /# --mode-prop: \[([^\]]+)\]\s*\n([\s\S]+?)(?=\n# --mode-prop: \[|$)/g;
    const foundSections = new Set<string>();

    let match;
    while ((match = sectionRegex.exec(markdownContent)) !== null) {
      foundSections.add(match[1].trim());
    }

    // Check required sections
    if (!foundSections.has('roleDefinition')) {
      return { valid: false, reason: "Missing 'roleDefinition' section" };
    }
    if (!foundSections.has('customInstructions')) {
      return { valid: false, reason: "Missing 'customInstructions' section" };
    }
    if (!foundSections.has('groups')) {
      return { valid: false, reason: "Missing 'groups' section" };
    }

    // Check if groups section contains valid JSON
    const groupsMatch = markdownContent.match(/# --mode-prop: \[groups\]\s*\n```json\s*([\s\S]+?)\s*```/);
    if (!groupsMatch) {
      return { valid: false, reason: "Invalid 'groups' section format (must contain JSON code block)" };
    }

    try {
      const groupsJson = JSON.parse(groupsMatch[1]);
      if (!Array.isArray(groupsJson)) {
        return { valid: false, reason: "'groups' section must contain a valid JSON array" };
      }
    } catch (error) {
      return { valid: false, reason: `Error parsing JSON in 'groups' section: ${error}` };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, reason: `Error reading or parsing markdown file: ${error}` };
  }
}

/**
 * Convert markdown file to JSON mode file (md2json)
 * @param markdownPath Path to the markdown file
 */
function convertMarkdownToJson(markdownPath: string): void {
  try {
    // Create the corresponding JSON file path
    const fileName = basename(markdownPath, '.md');
    const jsonFilePath = join(dirname(markdownPath), `${fileName}.json`);

    // Read the markdown file
    const markdownContent = readFileSync(markdownPath, 'utf8');

    // Initialize JSON data (either from existing file or new object)
    let jsonData: any = {};
    if (existsSync(jsonFilePath)) {
      try {
        const jsonContent = readFileSync(jsonFilePath, 'utf8');
        jsonData = JSON.parse(jsonContent);
      } catch (error) {
        console.log(`Creating new JSON file for ${markdownPath} (existing file couldn't be parsed)`);
      }
    }

    // Parse the markdown content to extract JSON fields
    jsonData = parseMarkdownToJson(markdownContent, jsonData);

    // Write the updated JSON back to the file
    writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log(`Converted markdown to JSON: ${jsonFilePath} (${fileName}.json)`);
  } catch (error) {
    console.error(`Error converting markdown to JSON for ${markdownPath}:`, error);
  }
}

/**
 * Process all JSON files in the modes directory for json2md conversion
 * @param modesDir Path to the modes directory
 */
function processModesDirectoryForJson2Md(modesDir: string): void {
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
      const validation = isValidModeFile(filePath);
      if (validation.valid) {
        convertJsonToMarkdown(filePath);
        validFilesCount++;
      } else {
        console.log(`Skipping ${file} - not a valid RU custom mode file: ${validation.reason}`);
      }
    }

    console.log(`Processed ${validFilesCount} valid mode files out of ${jsonFiles.length} JSON files`);
  } catch (error) {
    console.error(`Error processing modes directory for json2md:`, error);
  }
}

/**
 * Process all markdown files in the modes directory for md2json conversion
 * @param modesDir Path to the modes directory
 */
function processModesDirectoryForMd2Json(modesDir: string): void {
  try {
    if (!existsSync(modesDir)) {
      console.error(`Modes directory not found: ${modesDir}`);
      return;
    }

    const files = readdirSync(modesDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    if (markdownFiles.length === 0) {
      console.log(`No markdown files found in ${modesDir}`);
      return;
    }

    let validFilesCount = 0;
    let processedFilesCount = 0;

    for (const file of markdownFiles) {
      const filePath = join(modesDir, file);
      const validation = isValidMarkdownFile(filePath);

      if (validation.valid) {
        convertMarkdownToJson(filePath);
        validFilesCount++;
        processedFilesCount++;
      } else {
        console.log(`Skipping ${file} - not a valid markdown mode file: ${validation.reason}`);
      }
    }

    console.log(`Processed ${validFilesCount} valid markdown files out of ${markdownFiles.length} markdown files`);
  } catch (error) {
    console.error(`Error processing modes directory for md2json:`, error);
  }
}

/**
 * Parse command line arguments to extract options
 * @param args Command line arguments
 * @returns Object containing parsed options
 */
function parseOptions(args: string[]): { modesDir: string, templateJson: boolean, templateMd: boolean } {
  let modesDir = 'modes'; // Default value
  let templateJson = false;
  let templateMd = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--modes-dir' && i + 1 < args.length) {
      modesDir = args[i + 1];
      // Remove the option and its value from args
      args.splice(i, 2);
      i--; // Adjust index after removal
    } else if (args[i] === '--template-json') {
      templateJson = true;
      // Remove the option from args
      args.splice(i, 1);
      i--; // Adjust index after removal
    } else if (args[i] === '--template-md') {
      templateMd = true;
      // Remove the option from args
      args.splice(i, 1);
      i--; // Adjust index after removal
    }
  }

  return { modesDir, templateJson, templateMd };
}

/**
 * Get a template JSON object for a mode
 * @returns Template JSON object
 */
function getTemplateJson(): any {
  return {
    slug: "example-mode",
    name: "Example Mode",
    roleDefinition: "You are an example mode that demonstrates the structure of a custom mode.",
    groups: [
      "read",
      ["edit", {
        "fileRegex": "\\.md$",
        "description": "Markdown files only"
      }],
      "browser",
      "command"
    ],
    customInstructions: "This is where you would put your custom instructions for the mode.\n\nYou can include multiple paragraphs, code examples, and other markdown formatting.\n\n## Example Section\n\n- Bullet points\n- More bullet points\n\n```\nCode examples can be included here\n```",
    apiConfiguration: {
      "model": "gpt-4",
      "temperature": 0.2
    },
    source: "custom"
  };
}

/**
 * Create a template JSON file
 * @param outputPath Path to save the template JSON file
 * @param modesDir Directory where modes are stored
 */
function createTemplateJson(outputPath: string, modesDir: string): void {
  try {
    const templateJson = getTemplateJson();

    // Ensure directory exists
    const dir = dirname(outputPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write to file
    writeFileSync(outputPath, JSON.stringify(templateJson, null, 2));
    console.log(`Created template JSON file at ${outputPath}`);
  } catch (error) {
    console.error(`Error creating template JSON file:`, error);
  }
}

/**
 * Create a template markdown file
 * @param outputPath Path to save the template markdown file
 * @param modesDir Directory where modes are stored
 */
function createTemplateMd(outputPath: string, modesDir: string): void {
  try {
    // Get the template JSON object
    const templateJson = getTemplateJson();

    // Convert the JSON object to markdown content
    const templateMd = jsonToMarkdownContent(templateJson);

    // Ensure directory exists
    const dir = dirname(outputPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write to file
    writeFileSync(outputPath, templateMd);
    console.log(`Created template markdown file at ${outputPath}`);
  } catch (error) {
    console.error(`Error creating template markdown file:`, error);
  }
}

/**
 * Display help information
 */
function showHelp(): void {
  console.log(`
roo-modes version: ${getVersion()}

Usage:
  roo-modes [options] [command]

Options:
  --modes-dir <path>  Specify the directory to look for mode files (default: "modes")
  --template-json     Create a template JSON file (used with json2md or md2json commands)
  --template-md       Create a template markdown file (used with json2md or md2json commands)

Commands:
  json2md     Convert mode JSON files to markdown
  md2json     Convert markdown files to mode JSON files
  version     Display the CLI version
  help        Display this help information

Examples:
  roo-modes json2md                           Convert all mode JSON files to markdown in the default directory
  roo-modes --modes-dir custom-modes json2md  Convert all mode JSON files to markdown in the custom-modes directory
  roo-modes md2json                           Convert all valid markdown files to mode JSON files in the default directory
  roo-modes --modes-dir custom-modes md2json  Convert all valid markdown files to mode JSON files in the custom-modes directory
  roo-modes --template-json json2md           Create a template JSON file in the default directory
  roo-modes --template-md md2json             Create a template markdown file in the default directory
  roo-modes version                           Display the CLI version
  roo-modes help                              Display help information
  `);
}

/**
 * Main CLI function
 */
function main(): void {
  const args = process.argv.slice(2);
  const options = parseOptions(args);
  const command = args[0] || 'help';

  // Base directory for modes
  const modesDir = join(__dirname, '..', options.modesDir);

  switch (command) {
    case 'json2md':
      if (options.templateJson) {
        const templatePath = join(modesDir, 'template.json');
        createTemplateJson(templatePath, modesDir);
      } else if (options.templateMd) {
        const templatePath = join(modesDir, 'template.md');
        createTemplateMd(templatePath, modesDir);
      } else {
        processModesDirectoryForJson2Md(modesDir);
      }
      break;

    case 'md2json':
      if (options.templateJson) {
        const templatePath = join(modesDir, 'template.json');
        createTemplateJson(templatePath, modesDir);
      } else if (options.templateMd) {
        const templatePath = join(modesDir, 'template.md');
        createTemplateMd(templatePath, modesDir);
      } else {
        processModesDirectoryForMd2Json(modesDir);
      }
      break;

    case 'version':
      console.log(`roo-modes version: ${getVersion()}`);
      break;

    case 'help':
      showHelp();
      break;

    // For backward compatibility
    case 'extract':
      console.log('Note: The "extract" command is deprecated. Please use "json2md" instead.');
      processModesDirectoryForJson2Md(modesDir);
      break;

    case 'include':
      console.log('Note: The "include" command is deprecated. Please use "md2json" instead.');
      processModesDirectoryForMd2Json(modesDir);
      break;

    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
      break;
  }
}

// Execute the main function
main();
