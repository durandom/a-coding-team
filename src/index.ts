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
 * Parse markdown content to extract JSON fields
 * @param markdownContent The markdown content to parse
 * @param existingJsonData Existing JSON data to update
 * @returns Updated JSON data
 */
function parseMarkdownToJson(markdownContent: string, existingJsonData: any): any {
  const jsonData = { ...existingJsonData };

  // Split the content into sections by level 1 and level 2 headers
  const sections = markdownContent.split(/^# |\n## /m);

  // Process the first section (title with slug)
  if (sections.length > 0) {
    const titleMatch = sections[0].match(/\[slug:([^\]]+)\]\s+(.+?)(?:\n|$)/);
    if (titleMatch) {
      jsonData.slug = titleMatch[1].trim();
      jsonData.name = titleMatch[2].trim();
    }
  }

  // Process the remaining sections
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const sectionMatch = section.match(/\[([^\]]+)\]\s*\n([\s\S]+?)(?=\n## \[|$)/);

    if (sectionMatch) {
      const sectionName = sectionMatch[1].trim();
      let sectionContent = sectionMatch[2].trim();

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
  }

  return jsonData;
}

/**
 * Convert JSON mode file to markdown (json2md)
 * @param filePath Path to the mode JSON file
 */
function convertJsonToMarkdown(filePath: string): void {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    if (!jsonData.customInstructions) {
      console.log(`No custom instructions found in ${filePath}`);
      return;
    }

    // Create output filename
    const fileName = basename(filePath, '.json');
    const outputPath = join(dirname(filePath), `${fileName}.md`);

    // Create markdown content with machine-readable tags
    let markdownContent = '';

    // Add slug
    markdownContent += `# [slug:${jsonData.slug}] ${jsonData.name}\n\n`;

    // Add role definition
    markdownContent += `## [roleDefinition]\n${jsonData.roleDefinition}\n\n`;

    // Add custom instructions
    markdownContent += `## [customInstructions]\n${jsonData.customInstructions}\n\n`;

    // Add groups
    markdownContent += `## [groups]\n\`\`\`json\n${JSON.stringify(jsonData.groups, null, 2)}\n\`\`\`\n\n`;

    // Add apiConfiguration if it exists
    if (jsonData.apiConfiguration) {
      markdownContent += `## [apiConfiguration]\n\`\`\`json\n${JSON.stringify(jsonData.apiConfiguration, null, 2)}\n\`\`\`\n\n`;
    }

    // Add source
    markdownContent += `## [source]\n${jsonData.source || 'custom'}\n`;

    // Ensure directory exists
    const dir = dirname(outputPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write to file
    writeFileSync(outputPath, markdownContent);
    console.log(`Converted JSON to markdown: ${outputPath} (${fileName}.md)`);
  } catch (error) {
    console.error(`Error converting JSON to markdown from ${filePath}:`, error);
  }
}

/**
 * Convert markdown file to JSON mode file (md2json)
 * @param jsonFilePath Path to the mode JSON file
 */
function convertMarkdownToJson(jsonFilePath: string): void {
  try {
    // Check if the corresponding markdown file exists
    const fileName = basename(jsonFilePath, '.json');
    const markdownPath = join(dirname(jsonFilePath), `${fileName}.md`);

    if (!existsSync(markdownPath)) {
      console.log(`No custom instructions file found for ${jsonFilePath}`);
      return;
    }

    // Read the JSON file
    const jsonContent = readFileSync(jsonFilePath, 'utf8');
    let jsonData: any;

    try {
      jsonData = JSON.parse(jsonContent);
    } catch (error) {
      console.error(`Error parsing JSON file ${jsonFilePath}:`, error);
      return;
    }

    // Read the markdown file
    const markdownContent = readFileSync(markdownPath, 'utf8');

    // Parse the markdown content to extract JSON fields
    jsonData = parseMarkdownToJson(markdownContent, jsonData);

    // Write the updated JSON back to the file
    writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log(`Converted markdown to JSON: ${jsonFilePath} (${fileName}.json)`);
  } catch (error) {
    console.error(`Error converting markdown to JSON for ${jsonFilePath}:`, error);
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
      if (isValidModeFile(filePath)) {
        convertJsonToMarkdown(filePath);
        validFilesCount++;
      } else {
        console.log(`Skipping ${file} - not a valid RU custom mode file`);
      }
    }

    console.log(`Processed ${validFilesCount} valid mode files out of ${jsonFiles.length} JSON files`);
  } catch (error) {
    console.error(`Error processing modes directory for json2md:`, error);
  }
}

/**
 * Process all JSON files in the modes directory for md2json conversion
 * @param modesDir Path to the modes directory
 */
function processModesDirectoryForMd2Json(modesDir: string): void {
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

    let updatedFilesCount = 0;

    for (const file of jsonFiles) {
      const filePath = join(modesDir, file);
      if (isValidModeFile(filePath)) {
        convertMarkdownToJson(filePath);
        updatedFilesCount++;
      } else {
        console.log(`Skipping ${file} - not a valid RU custom mode file`);
      }
    }

    console.log(`Processed ${updatedFilesCount} valid mode files out of ${jsonFiles.length} JSON files`);
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
 * Create a template JSON file
 * @param outputPath Path to save the template JSON file
 * @param modesDir Directory where modes are stored
 */
function createTemplateJson(outputPath: string, modesDir: string): void {
  try {
    const templateJson = {
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
      customInstructions: "This is where you would put your custom instructions for the mode.",
      apiConfiguration: {
        "model": "gpt-4",
        "temperature": 0.2
      },
      source: "custom"
    };

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
    // Create a template JSON object first
    const templateJson = {
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

    // Convert the template JSON to markdown
    const templateMd = `# [slug:${templateJson.slug}] ${templateJson.name}

## [roleDefinition]
${templateJson.roleDefinition}

## [customInstructions]
${templateJson.customInstructions}

## [groups]
\`\`\`json
${JSON.stringify(templateJson.groups, null, 2)}
\`\`\`

## [apiConfiguration]
\`\`\`json
${JSON.stringify(templateJson.apiConfiguration, null, 2)}
\`\`\`

## [source]
${templateJson.source}
`;

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
  roo-modes md2json                           Convert markdown files to mode JSON files in the default directory
  roo-modes --modes-dir custom-modes md2json  Convert markdown files to mode JSON files in the custom-modes directory
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