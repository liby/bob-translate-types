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

本项目使用GitHub Actions自动发布到NPM。发布流程如下：

1. 更新版本号（在`package.json`中）
2. 提交更改并推送到GitHub
3. 创建一个新的GitHub Release或推送一个带版本号的Git标签（例如`v1.2.0`）
4. GitHub Actions将自动构建并发布包到NPM

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