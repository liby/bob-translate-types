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
  data: Data; // Binary data
  name: string; // Name in the upload form
  filename: string; // Filename after upload
  contentType: string; // File format
}

interface HttpRequestConfig {
  method: HttpMethod;
  url: string;
  header?: Record<string, string>;
  body?: Record<string, any> | Data;
  files?: HttpRequestFiles[];
  timeout?: number; // Timeout in milliseconds
  cancelSignal?: Signal;
  handler?: (response: HttpResponse) => void;
}

interface HttpStream {
  text?: string;
  rawData: Data;
}

interface HttpStreamRequestConfig extends HttpRequestConfig {
  streamHandler?: (stream: HttpStream) => void;
}

/**
 * @deprecated Bob 1.8.0 之前的结构
 */
interface LegacyHttpResponseError {
  domain: string;
  code: number;
  userInfo: any;
  localizedDescription: string;
  localizedFailureReason: string;
  localizedRecoverySuggestion: string;
}

interface HttpResponseError {
  message: string;
  debugMessage: string;
}

interface HttpResponseInfo {
  url: string; // url
  MIMEType: string; // MIME 类型
  expectedContentLength: number; // 长度
  textEncodingName: string; // 编码
  suggestedFilename: string; // 建议的文件名
  statusCode: HttpErrorCode; // HTTP 状态码
  headers: Record<string, string>; // HTTP header
}

export interface HttpResponse<T = Record<string, any>> {
  data: T | string | Data;
  rawData: Data;
  response: HttpResponseInfo;
  error?: HttpResponseError | LegacyHttpResponseError;
}

type HttpResponsePromise<T = any> = Promise<HttpResponse<T>>;

export interface Http {
  request<T = any, R = HttpResponsePromise<T>>(config: HttpRequestConfig): Promise<R>;
  /**
   * @deprecated The method should not be used
   */
  get<T = any, R = HttpResponsePromise<T>>(config: HttpRequestConfig): Promise<R>;
  /**
   * @deprecated The method should not be used
   */
  post<T = any, R = HttpResponsePromise<T>>(config: HttpRequestConfig): Promise<R>;
  streamRequest<T = any, R = HttpResponsePromise<T>>(config: HttpStreamRequestConfig): Promise<R>;
}
