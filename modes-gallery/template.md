# [slug:example-mode] Example Mode

# --mode-prop: [roleDefinition]
You are an example mode that demonstrates the structure of a custom mode.

# --mode-prop: [customInstructions]
This is where you would put your custom instructions for the mode.

You can include multiple paragraphs, code examples, and other markdown formatting.

## Example Section

- Bullet points
- More bullet points

```
Code examples can be included here
```

# --mode-prop: [groups]
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

# --mode-prop: [apiConfiguration]
```json
{
  "model": "gpt-4",
  "temperature": 0.2
}
```

# --mode-prop: [source]
custom
