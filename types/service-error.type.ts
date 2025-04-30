// https://bobtranslate.com/plugin/object/serviceerror.html#service-error
/**
 * 服务错误类型
 */
type ServiceErrorType =
  | 'unknown'
  | 'param'
  | 'unsupportedLanguage'
  | 'secretKey'
  | 'network'
  | 'api'
  | 'notFound';

/**
 * 服务错误接口
 * 详细文档: https://bobtranslate.com/plugin/object/serviceerror.html#service-error
 */
export interface ServiceError {
  /**
   * 附加信息，可以是任何可 json 序列化的数据类型，用于 debug
   */
  addition?: string;
  /**
   * 错误描述，用于展示给用户看
   */
  message: string;
  /**
   * 故障排除的链接，目前主要用在插件验证的功能
   */
  troubleshootingLink?: string;
  /**
   * 错误类型
   */
  type: ServiceErrorType;
}