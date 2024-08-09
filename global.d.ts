
declare global {
  /**
   * @description Upstream update time: 10/13/23, 3:27 PM
   * @remarks Bob 1.6.0+ 可用
   */
  const $env: import('./types/env.type').Env;

  /**
   * @description Upstream update time: 5/22/22, 11:45 PM
   */
  const $info: import('./types/info.type').Info;

  const $option: Record<string, string>;

  /**
   * @description Upstream update time: 5/22/22, 11:45 PM
   */
  const $log: import('./types/log.type').Log;

  /**
   * @description Upstream update time: 10/13/23, 3:27 PM
   */
  const $http: import('./types/http.type').Http;

  /**
   * @description Upstream update time: 10/13/23, 3:27 PM
   * @remarks Bob 1.6.0+ 可用
   */
  const $websocket: import('./types/websocket.type').WebSocketConstructor;

  /**
   * @description Upstream update time: 10/13/23, 3:27 PM
   */
  const $file: import('./types/file.type').FileConstructor;

  /**
   * @description Upstream update time: 3/14/23, 11:59 AM
   */
  const $data: import('./types/data.type').DataConstructor;

  /**
   * @description Upstream update time: 10/13/23, 3:27 PM
   */
  const $timer: import('./types/timer.type').Timer;

  /**
   * @description Upstream update time: 10/13/23, 3:27 PM
   */
  const $signal: import('./types/signal.type').SignalConstructor;
}

export {};