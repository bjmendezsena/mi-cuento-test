import * as dateFns from "date-fns";

export const formatDate = (date: Date | string, format: string): string => {
  return dateFns.format(date, format);
};

export const parseDate = (date: string, format: string): Date => {
  return dateFns.parse(date, format, new Date());
};
