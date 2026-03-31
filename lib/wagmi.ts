import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { base } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected({ shimDisconnect: true })],
  transports: { [base.id]: http() },
  ssr: true
});

// TODO(builder-code): append the official Base builder code data suffix here.
// Replace the placeholder below once the final builder code is provided.
// const BUILDER_CODE_SUFFIX = "TODO_REPLACE_WITH_BUILDER_CODE_SUFFIX";



