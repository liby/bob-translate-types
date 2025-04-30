import { Data } from "./data.type";

interface FileWriteOptions {
  /**
   * $data 类型
   */
  data: Data;
  /**
   * 目标路径
   */
  path: string;
}

interface FileCopyMoveOptions {
  /**
   * 目标路径
   */
  dst: string;
  /**
   * 源路径
   */
  src: string;
}

export interface FileConstructor {
  /**
   * 复制文件
   */
  copy(options: FileCopyMoveOptions): boolean;
  /**
   * 删除文件
   */
  delete(path: string): boolean;
  /**
   * 检查文件或目录是否存在
   */
  exists(path: string): boolean;
  /**
   * 检查路径是否为目录
   */
  isDirectory(path: string): boolean;
  /**
   * 列出目录内容
   */
  list(path: string): string[];
  /**
   * 创建目录
   */
  mkdir(path: string): boolean;
  /**
   * 移动文件
   */
  move(options: FileCopyMoveOptions): boolean;
  /**
   * 读取文件内容
   */
  read(path: string): Data;
  /**
   * 写入文件
   */
  write(options: FileWriteOptions): boolean;
}
