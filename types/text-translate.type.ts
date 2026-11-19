import { Language } from "./lang.type";
import { ServiceError } from "./service-error.type";
import { Signal } from "./signal.type";
import { TtsResult } from "./tts.type";

interface PhoneticObject {
  /**
   * 音标类型，值可以是 us 或 uk，分别对应美式音标和英式音标
   */
  type: 'us' | 'uk';
  /**
   * 音标发音数据
   */
  tts?: TtsResult;
  /**
   * 音标字符串。例如 ɡʊd
   */
  value?: string;
}

interface PartObject {
  /**
   * 词义 string 数组
   */
  means: string[];
  /**
   * 单词词性，例如 n.、vi. 等等
   */
  part: string;
}

interface ExchangeObject {
  /**
   * 形式的名字，例如比较级、最高级等等
   */
  name: string;
  /**
   * 该形式对于的单词 string 数组，一般只有一个
   */
  words: string[];
}

interface RelatedWordObject {
  /**
   * 词义 string 数组
   */
  means?: string[];
  /**
   * 单词本身
   */
  word: string;
}

interface RelatedWordPartObject {
  /**
   * 词性
   */
  part?: string;
  /**
   * 相关的单词数组，见 RelatedWordObject
   */
  words: Array<RelatedWordObject>;
}

interface AdditionObject {
  /**
   * 附加内容名称
   */
  name: string;
  /**
   * 附加内容
   */
  value: string;
}

interface ToDictObject {
  /**
   * 附加内容数组，考虑到以上字段无法覆盖所有词典内容，比如例句、记忆技巧等
   * 可将相应数据添加到该数组，最终也会显示到翻译结果中
   */
  additions?: Array<AdditionObject>;
  /**
   * 其他形式数组，一般英文查词会有
   */
  exchanges?: Array<ExchangeObject>;
  /**
   * 词性词义数组，一般英文查词会有
   */
  parts: Array<PartObject>;
  /**
   * 音标数据数组，一般英文查词会有
   */
  phonetics: Array<PhoneticObject>;
  /**
   * 相关的单词数组，一般中文查词会有，表示和该中文对应的英文单词有哪些
   */
  relatedWordParts?: Array<RelatedWordPartObject>;
  /**
   * 单词/词组，一般英文查词会有
   * @remarks Bob 0.6.0+ 可用
   */
  word: string;
}

/**
 * 该对象用于描述推理类型的大模型思考过程信息
 * @remarks  Bob 1.15.0+ 可用
 */
interface ThinkInfo {
  /**
   * 内容
   */
  content: string;
  /**
   * 是否拆分思考标签
   */
  splitThinkTag: boolean;
}

/**
 * 该对象用于描述译文文本及其展示格式
 * @remarks Bob 1.21.0+ 可用
 */
interface ContentObject {
  /**
   * 文本格式，决定 Bob 如何解析 text，不传时为 plain。
   * plain 按原样展示纯文本；markdown 按 Markdown 渲染；
   * lines 为逐行译文，Bob 会将每一行对应到原文的非空行
   */
  format?: 'plain' | 'markdown' | 'lines';
  /**
   * 译文文本，流式输出时传入累积后的完整文本
   */
  text?: string;
}

export interface TextTranslateResult {
  /**
   * 译文内容，优先级高于 toParagraphs。
   * content、toParagraphs、toDict 至少有一个有值，
   * 同时传入 content 和 toParagraphs 可兼容 Bob 1.21.0 之前的版本
   * @remarks Bob 1.21.0+ 可用
   */
  content?: ContentObject;
  /**
   * 由翻译接口提供的源语种，可以与查询时的 from 不同
   */
  from: Language;
  /**
   * 原文分段拆分过后的 string 数组，可不传
   * @deprecated The field should not be used
   */
  fromParagraphs?: string[];
  /**
   * 原文的语音合成数据
   * @deprecated The field should not be used
   */
  fromTTS?: TtsResult;
  /**
   * 如果插件内部调用了某翻译接口，可将接口原始数据传回，方便定位问题
   */
  raw?: any;
  /**
   * 推理类型大模型思考过程信息。
   * 流式输出阶段 thinkInfo 有值时，content 可以为空。可不传。
   * @remarks Bob 1.15.0+ 可用
   */
  thinkInfo?: ThinkInfo;
  /**
   * 由翻译接口提供的目标语种，可以与查询时的 to 不同
   */
  to: Language;
  /**
   * 词典结果
   */
  toDict?: ToDictObject;
  /**
   * 译文分段拆分过后的 string 数组
   * @deprecated Bob 1.21.0 起请使用 content，仅在需要兼容更早版本时传入
   */
  toParagraphs?: string[];
  /**
   * 译文的语音合成数据
   */
  toTTS?: TtsResult;
}

interface TextTranslateCompletionResult {
  /**
   * 翻译结果
   */
  result: TextTranslateResult | TtsResult;
}

interface TextTranslateCompletionError {
  /**
   * 错误信息
   */
  error: ServiceError;
}

/**
 * 处理流式响应的回调函数类型
 */
type HandleStream = (args: TextTranslateCompletionResult) => void;

/**
 * 处理完成响应的回调函数类型
 */
type HandleCompletion = (args: TextTranslateCompletionResult | TextTranslateCompletionError) => void;

export interface TextTranslateQuery {
  /**
   * 取消信号
   * @remarks Bob 1.8.0+ 可用
   */
  cancelSignal: Signal;
  /**
   * 检测过后的源语种
   */
  detectFrom: Exclude<Language, 'auto'>;
  /**
   * 检测过后的目标语种
   */
  detectTo: Exclude<Language, 'auto'>;
  /**
   * 目前用户选中的源语言，可能是 auto
   */
  from: Language;
  /**
   * 完成回调函数
   * @remarks Bob 1.8.0+ 可用
   */
  onCompletion: HandleCompletion;
  /**
   * 流式回调函数
   * @remarks Bob 1.8.0+ 可用
   */
  onStream: HandleStream;
  /**
   * Bob 预处理（例如合并换行、拆分单词）之前的原始文本
   * @remarks Bob 1.20.0+ 可用
   */
  originalText?: string;
  /**
   * 需要翻译的文本
   */
  text: string;
  /**
   * 用户选中的目标语种标准码
   */
  to: Language;
}

/**
 * 文本翻译函数类型
 * @param query - 用于传入需要翻译的文本信息
 * @param completion - Bob 1.8.0 之前可以调用本函数回调翻译结果，Bob 1.8.0+ 不再推荐使用
 */
export type TextTranslate = (query: TextTranslateQuery, completion: HandleCompletion) => void;
