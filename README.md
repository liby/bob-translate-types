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

This step is necessary if TypeScript doesn't automatically include the types from this package.

## Usage

```ts
// main.ts
import { PluginValidate } from '@bob-translate/types';

const pluginValidate: PluginValidate = (completion) => {
  // do something
}
```

## 发布流程

本项目使用 GitHub Actions 发布到 npm。发布流程如下：

1. 将更改合并到 `main`
2. 在 GitHub Actions 中手动运行 `Bump Version and Publish to NPM`，填写版本号（例如 `1.2.0`）和标签说明
3. 该 workflow 会更新 `package.json` 中的版本号、提交并推送带版本号的 Git 标签，然后发布到 npm

### 手动发布

如需手动发布，请按照以下步骤操作：

```bash
# 安装依赖
pnpm install

# 运行类型检查
pnpm run prepublishOnly

# 发布到NPM
pnpm publish
```

需要确保您有正确的NPM权限来发布此包。