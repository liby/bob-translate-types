# @bob-translate/types

Type definitions for [Bob translate](https://bobtranslate.com/plugin/api/intro.html).

## Installation

```bash
npm install --save-dev @bob-translate/types
```

## TypeScript Configuration

To ensure TypeScript correctly recognizes the types from `@bob-translate/types`, you may need to add it to your _tsconfig.json_:

```json
{
  "compilerOptions": {
    "types": ["@bob-translate/types"]
  }
}
```

This step is necessary if TypeScript doesn’t automatically include the types from this package.

## Usage

```ts
// main.ts
import { PluginValidate } from '@bob-translate/types';

const pluginValidate: PluginValidate = (completion) => {
  // do something
}
```