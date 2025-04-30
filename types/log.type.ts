/**
 * 日志接口
 * 用于插件日志记录
 */
export interface Log {
  /**
   * 记录错误日志
   * @param object 需要记录的对象
   */
  error(object: any): void;
  /**
   * 记录信息日志
   * @param object 需要记录的对象
   */
  info(object: any): void;
}
