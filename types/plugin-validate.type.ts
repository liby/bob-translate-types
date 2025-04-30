import { ServiceError } from "./service-error.type";

/**
 * 插件验证结果接口
 */
interface ValidationResult {
  /**
   * 验证结果
   */
  result: boolean;
  /**
   * 错误信息（如果验证失败）
   */
  error?: ServiceError;
}

/**
 * 验证完成回调函数类型
 * @param result 验证结果对象
 */
export type ValidationCompletion = (result: ValidationResult) => void;

/**
 * 插件验证函数类型
 * @param completion 用于返回验证结果的回调函数
 */
export type PluginValidate = (completion: ValidationCompletion) => void;