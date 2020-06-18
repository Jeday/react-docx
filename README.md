# React-Docx

React-based rendered for Docx

## Plan

- Refactor, Split Code
- Tables
- Media
- Styles
- Other elements
- Rebuild as package
- Release

## Usage

Use lowercased names of Docx.JS classes
Shortcuts for Paragraph and TextRun are provided.
Text outside textrun tag is implicitly wrapped with one and treated as a child element. All props are passed as in to constructor.

```
  <document>
    <section>
      <p>
        <t>Hello</t>
      </p>
    </section>
  </document>
```
