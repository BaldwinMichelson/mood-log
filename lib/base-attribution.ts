import { Attribution } from "ox/erc8021";

export const BASE_APP_ID = "69cb25e6a7654b8774320f17";
export const BUILDER_CODE = "bc_rtf4v5ku";
export const EXPECTED_DATA_SUFFIX = "0x62635f7274663476356b750b0080218021802180218021802180218021";

export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BUILDER_CODE]
});

export const DATA_SUFFIX_MATCHES_EXPECTED = DATA_SUFFIX.toLowerCase() === EXPECTED_DATA_SUFFIX.toLowerCase();
