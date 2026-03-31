import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { base } from "wagmi/chains";

import { DATA_SUFFIX } from "@/lib/base-attribution";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected({ shimDisconnect: true })],
  transports: { [base.id]: http() },
  dataSuffix: DATA_SUFFIX,
  ssr: true
});
