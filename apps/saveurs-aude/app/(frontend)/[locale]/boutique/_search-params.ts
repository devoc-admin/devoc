import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParamsParsers = {
  category: parseAsString.withDefault(""),
  onSale: parseAsBoolean.withDefault(false),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest"),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
