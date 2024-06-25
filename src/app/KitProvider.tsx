'use client';
import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { http, createConfig } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const wagmiConfig = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: 'yourAppName',
      preference: 'all',
      version: '4',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
 
type Props = { children: ReactNode };
 
function KitProvider({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
        
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={"mKNTyUF1dSdDrQ5aJl7J0kLIYd1VAkzY"}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
        
      </QueryClientProvider>
    </WagmiProvider>
  );
}
 
export default KitProvider;