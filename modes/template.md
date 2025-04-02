# [slug:example-mode] Example Mode

## [roleDefinition]
You are an example mode that demonstrates the structure of a custom mode.

## [customInstructions]
This is where you would put your custom instructions for the mode.

## [groups]
```json
[
  "read",
  [
    "edit",
    {
      "fileRegex": "\\.md$",
      "description": "Markdown files only"
    }
  ],
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
