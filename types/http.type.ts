import { Data } from "./data.type";
import { Signal } from "./signal.type";

const HTTP_ERROR_CODES = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
} as const;

type HttpErrorCode = keyof typeof HTTP_ERROR_CODES;

type HttpMethod =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT';

interface HttpRequestFiles {
  /**
   * 文件内容类型
   */
  contentType: string;
  /**
   * 二进制数据
   */
  data: Data;
  /**
   * 上传后的文件名
   */
  filename: string;
  /**
   * 上传表单中的名称
   */
  name: string;
}

interface HttpRequestConfig {
  /**
   * 请求体
   */
  body?: Record<string, any> | Data;
  /**
   * 取消信号
   */
  cancelSignal?: Signal;
  /**
   * 文件数组
   */
  files?: HttpRequestFiles[];
  /**
   * 处理响应的回调函数
   */
  handler?: (response: HttpResponse) => void;
  /**
   * 请求头
   */
  header?: Record<string, string>;
  /**
   * HTTP 方法
   */
  method: HttpMethod;
  /**
   * 超时时间（毫秒）
   */
  timeout?: number;
  /**
   * 请求 URL
   */
  url: string;
}

interface HttpStream {
  /**
   * 原始数据
   */
  rawData: Data;
  /**
   * 文本内容
   */
  text?: string;
}

interface HttpStreamRequestConfig extends HttpRequestConfig {
  /**
   * 处理流式响应的回调函数
   */
  streamHandler?: (stream: HttpStream) => void;
}

/**
 * @deprecated Bob 1.8.0 之前的结构
 */
interface LegacyHttpResponseError {
  /**
   * 错误代码
   */
  code: number;
  /**
   * 域
   */
  domain: string;
  /**
   * 本地化描述
   */
  localizedDescription: string;
  /**
   * 本地化失败原因
   */
  localizedFailureReason: string;
  /**
   * 本地化恢复建议
   */
  localizedRecoverySuggestion: string;
  /**
   * 用户信息
   */
  userInfo: any;
}

interface HttpResponseError {
  /**
   * 调试信息
   */
  debugMessage: string;
  /**
   * 错误消息
   */
  message: string;
}

interface HttpResponseInfo {
  /**
   * 内容长度
   */
  expectedContentLength: number;
  /**
   * HTTP 头信息
   */
  headers: Record<string, string>;
  /**
   * MIME 类型
   */
  MIMEType: string;
  /**
   * HTTP 状态码
   */
  statusCode: HttpErrorCode;
  /**
   * 建议的文件名
   */
  suggestedFilename: string;
  /**
   * 文本编码名称
   */
  textEncodingName: string;
  /**
   * 请求 URL
   */
  url: string;
}

export interface HttpResponse<T = Record<string, any>> {
  /**
   * 响应数据
   */
  data: T | string | Data;
  /**
   * 错误信息
   */
  error?: HttpResponseError | LegacyHttpResponseError;
  /**
   * 原始数据
   */
  rawData: Data;
  /**
   * 响应信息
   */
  response: HttpResponseInfo;
}

type HttpResponsePromise<T = any> = Promise<HttpResponse<T>>;

export interface Http {
  /**
   * @deprecated The method should not be used
   */
  get<T = any, R = HttpResponsePromise<T>>(config: HttpRequestConfig): Promise<R>;
  /**
   * @deprecated The method should not be used
   */
  post<T = any, R = HttpResponsePromise<T>>(config: HttpRequestConfig): Promise<R>;
  /**
   * 发送 HTTP 请求
   */
  request<T = any, R = HttpResponsePromise<T>>(config: HttpRequestConfig): Promise<R>;
  /**
   * 发送流式 HTTP 请求
   */
  streamRequest<T = any, R = HttpResponsePromise<T>>(config: HttpStreamRequestConfig): Promise<R>;
}
