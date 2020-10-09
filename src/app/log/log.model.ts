export enum LogLevel {
  Info,
  Warn,
  Error,
  Critical,
}

export interface LogRecord {
  time: string;
  level: LogLevel;
  message: string;
}

export interface LogMeta {
  caption: string;
  css: string;
}

export const LOG_META: { [level: number]: LogMeta } = {
  [LogLevel.Info]: { caption: 'Info', css: 'info' },
  [LogLevel.Warn]: { caption: 'Warn', css: 'warn' },
  [LogLevel.Error]: { caption: 'Error', css: 'error' },
  [LogLevel.Critical]: { caption: 'Critical', css: 'critical' },
};

export const ALL_LOG_LEVELS = [LogLevel.Info, LogLevel.Warn, LogLevel.Error, LogLevel.Critical];
