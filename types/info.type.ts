interface IconObject {
  /**
   * 内置图标ID
   */
  builtInId?: string;
  /**
   * 文件路径
   */
  file?: string;
  /**
   * 图标标识符
   */
  identifier: string;
  /**
   * 图标类型
   */
  type: 'builtIn' | 'file';
}

interface TextConfigObject {
  /**
   * 输入框高度
   */
  height?: number;
  /**
   * 关键词数组
   */
  keyWords?: string[];
  /**
   * 占位符文本
   */
  placeholderText?: string;
  /**
   * 输入框类型
   */
  type: 'secure' | 'visible';
}

interface MenuObject {
  /**
   * 默认插件图标标识符
   */
  defaultPluginIconIdentifier: string;
  /**
   * 默认插件名称
   */
  defaultPluginName: string;
  /**
   * 菜单项标题
   */
  title: string;
  /**
   * 菜单项值
   */
  value: string;
}

interface OptionObject {
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 选项描述
   */
  desc?: string;
  /**
   * 选项标识符
   */
  identifier: string;
  /**
   * 是否为关键选项
   */
  isKeyOption?: boolean;
  /**
   * 菜单值数组
   */
  menuValues?: MenuObject[];
  /**
   * 文本配置
   */
  textConfig?: TextConfigObject;
  /**
   * 选项标题
   */
  title: string;
  /**
   * 选项类型
   */
  type: 'text' | 'menu';
}

export interface Info {
  /**
   * 应用更新信息URL
   */
  appcast?: string;
  /**
   * 作者名称
   */
  author?: string;
  /**
   * 插件类别
   */
  category: string;
  /**
   * 主页URL
   */
  homepage?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 图标数组
   */
  icons?: IconObject[];
  /**
   * 插件标识符
   */
  identifier: string;
  /**
   * 最低Bob版本要求
   */
  minBobVersion?: string;
  /**
   * 插件名称
   */
  name: string;
  /**
   * 插件选项数组
   */
  options?: Record<string, OptionObject>[];
  /**
   * 插件简介
   */
  summary?: string;
  /**
   * 插件版本
   */
  version: string;
}