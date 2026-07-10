const fs = require('fs');
const path = require('path');

const languagesDir = path.join(__dirname, '..', 'node_modules', 'highlight.js', 'lib', 'languages');
const legacyHighlightEntry = path.join(__dirname, '..', 'node_modules', 'highlight.js', 'lib', 'highlight.js');

const aliases = [
  {
    legacy: 'cs.js',
    target: 'csharp.js',
  },
  {
    legacy: 'nimrod.js',
    target: 'nim.js',
  },
  {
    legacy: 'tex.js',
    target: 'latex.js',
  },
];

function ensureAlias(aliasFile, targetFile) {
  const aliasPath = path.join(languagesDir, aliasFile);
  const targetPath = path.join(languagesDir, targetFile);

  if (!fs.existsSync(targetPath)) {
    return;
  }

  const content = `// Auto-generated compatibility alias for Storybook 5 dependencies.\nmodule.exports = require('./${targetFile.replace('.js', '')}');\n`;

  if (fs.existsSync(aliasPath)) {
    return;
  }

  fs.writeFileSync(aliasPath, content, 'utf8');
  console.log(`[highlight.js-compat] Created ${aliasFile} -> ${targetFile}`);
}

function ensureLegacyHighlightExport() {
  if (!fs.existsSync(legacyHighlightEntry)) {
    return;
  }

  const current = fs.readFileSync(legacyHighlightEntry, 'utf8');

  if (current.includes("module.exports = require('./core')")) {
    return;
  }

  const replacement = "// Auto-generated compatibility entry for packages expecting CommonJS export.\nmodule.exports = require('./core');\n";

  fs.writeFileSync(legacyHighlightEntry, replacement, 'utf8');
  console.log('[highlight.js-compat] Patched lib/highlight.js to export core');
}

if (!fs.existsSync(languagesDir)) {
  console.log('[highlight.js-compat] Skipped: highlight.js languages directory not found');
  process.exit(0);
}

for (const { legacy, target } of aliases) {
  ensureAlias(legacy, target);
}

ensureLegacyHighlightExport();
