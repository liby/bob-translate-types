import { Data } from "./data.type";
import { Language } from "./lang.type";
import { ServiceError } from "./service-error.type";

/**
 * OCR 位置信息中的归一化坐标点
 * @remarks Bob 1.20.0+ 可用
 */
export interface OcrPoint {
  /**
   * 横坐标，取值范围 [0, 1]
   */
  x: number;
  /**
   * 纵坐标，取值范围 [0, 1]
   */
  y: number;
}

/**
 * OCR 位置信息
 * @remarks Bob 1.20.0+ 可用
 */
export interface OcrBoundingBox {
  /**
   * 归一化坐标的四个顶点，左上角为原点，x 向右、y 向下
   */
  points: [OcrPoint, OcrPoint, OcrPoint, OcrPoint];
}

export interface OcrText {
  /**
   * 文本的位置信息，可不传
   * @remarks Bob 1.20.0+ 可用
   */
  boundingBox?: OcrBoundingBox;
  /**
   * 识别出的文本，推荐为一整行文字
   */
  text: string;
}

/**
 * OCR 段落信息
 * @remarks Bob 1.20.0+ 可用
 */
export interface OcrParagraphInfo {
  /**
   * 段落的位置信息，可不传
   */
  boundingBox?: OcrBoundingBox;
  /**
   * 段落内按阅读顺序排列的文本行数组
   */
  texts: Array<OcrText>;
}

/**
 * OCR 区域信息
 * @remarks Bob 1.20.0+ 可用
 */
export interface OcrRegionInfo {
  /**
   * 区域的位置信息，可不传
   */
  boundingBox?: OcrBoundingBox;
  /**
   * 段落信息数组
   */
  paragraphInfos: Array<OcrParagraphInfo>;
}

export interface OcrQuery {
  /**
   * 图片中最可能的语言
   */
  detectFrom: Exclude<Language, 'auto'>;
  /**
   * 目前用户选中的源语言，可能是 auto
   */
  from: Language;
  /**
   * 需要识别的图片数据
   */
  image: Data;
  /**
   * 图片像素宽度，可用于将 OCR 服务返回的像素坐标归一化
   * @remarks Bob 1.20.0+ 可用
   */
  pixelWidth?: number;
  /**
   * 图片像素高度，可用于将 OCR 服务返回的像素坐标归一化
   * @remarks Bob 1.20.0+ 可用
   */
  pixelHeight?: number;
}

interface OcrResultBase {
  /**
   * 图片中的文字的主要语种，可与查询参数中传入的 from 不一致，可不传
   */
  from?: Language;
  /**
   * 如果插件内部调用了某文本识别接口，可将接口原始数据传回，方便定位问题，可不传
   */
  raw?: any;
}

/**
 * 扁平模式 OCR 结果
 */
export interface OcrFlatResult extends OcrResultBase {
  /**
   * 扁平模式不应同时返回结构化识别结果
   */
  regionInfos?: never;
  /**
   * 扁平文本行识别结果数组，与 regionInfos 二选一
   */
  texts: Array<OcrText>;
}

/**
 * 结构化模式 OCR 结果
 * @remarks Bob 1.20.0+ 可用
 */
export interface OcrStructuredResult extends OcrResultBase {
  /**
   * 结构化识别结果数组，与 texts 二选一
   */
  regionInfos: Array<OcrRegionInfo>;
  /**
   * 结构化模式不应同时返回扁平文本行识别结果
   */
  texts?: never;
}

/**
 * OCR 识别成功的结果
 */
export type OcrResult = OcrFlatResult | OcrStructuredResult;

export interface OcrCompletionResult {
  /**
   * OCR 识别成功的结果
   */
  error?: never;
  result: OcrResult;
}

export interface OcrCompletionError {
  /**
   * OCR 识别失败的错误信息
   */
  error: ServiceError;
  result?: never;
}

/**
 * OCR 完成回调函数类型
 */
type OcrCompletion = (args: OcrCompletionResult | OcrCompletionError) => void;

/**
 * OCR 识别函数类型
 * @param query 包含图片数据和语言信息的查询参数
 * @param completion 回调函数，用于返回识别结果
 */
export type Ocr = (query: OcrQuery, completion: OcrCompletion) => void;

/**
 * 声明 OCR 服务是否支持返回文字位置信息
 * @remarks Bob 1.20.0+ 可用
 */
export type SupportBoundingBox = () => boolean;
