import { Language } from "./lang.type";
import { ServiceError } from "./service-error.type";

export interface TtsQuery {
  /**
   * 需要合成的文本
   */
  text: string;
  /**
   * 当前文本的语言，一定不是 auto。
   */
  lang: Exclude<Language, 'auto'>;
}

export interface TtsResult {
  /**
   * 数据类型，必传。
   */
  type: 'url' | 'base64';
  /**
   * 值，必传。
   */
  value: string;
  /**
   * 如果插件内部调用了某语音合成接口，可将接口原始数据传回，方便定位问题，可不传。
   */
  raw?: any;
}

type TtsCompletion = (args: TtsResult | ServiceError) => void;

export type Tts = (query: TtsQuery, completion: TtsCompletion) => void;