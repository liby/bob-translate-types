import { Language } from "./lang.type";
import { Data } from "./data.type";
import { ServiceError } from "./service-error.type";

interface OcrText {
  /**
   * 识别出的文本内容
   */
  text: string;
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
}

export interface OcrResult {
  /**
   * 图片中的文字的主要语种，可与查询参数中传入的 from 不一致，可不传
   */
  from?: Language;
  /**
   * 如果插件内部调用了某文本识别接口，可将接口原始数据传回，方便定位问题，可不传
   */
  raw?: any;
  /**
   * 文本识别结果数组，按照段落分割，必传
   */
  texts: Array<OcrText>;
}

/**
 * OCR 完成回调函数类型
 */
type OcrCompletion = (args: OcrResult | ServiceError) => void;

/**
 * OCR 识别函数类型
 * @param query 包含图片数据和语言信息的查询参数
 * @param completion 回调函数，用于返回识别结果
 */
export type Ocr = (query: OcrQuery, completion: OcrCompletion) => void;