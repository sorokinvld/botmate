import { format, Logform } from 'winston';

export default (...levels: string[]): Logform.Format => {
  return format((info) => (levels.some((level) => info.level.includes(level)) ? info : false))();
};
