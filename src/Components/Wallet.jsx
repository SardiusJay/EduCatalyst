import React, { useState, useEffect } from 'react';
import { Wallet, Eye, RefreshCw } from 'lucide-react';
import { DotsThreeVertical } from 'phosphor-react';
import { Link } from 'react-router-dom';
import Layout from "../Components/Layout";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains';
import { formatUnits } from 'viem';
import { createPublicClient, http } from 'viem';

const WalletDashboard = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [networkBalances, setNetworkBalances] = useState({
    mainnet: 0,
    polygon: 0,
    arbitrum: 0,
    optimism: 0,
    base: 0
  });
  const [tokenPrices, setTokenPrices] = useState({
    ETH: 0,
    MATIC: 0
  });
  
  // Use wagmi hooks to get account information
  const { address, isConnected } = useAccount();

  // Fetch token prices from CoinGecko
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,matic-network&vs_currencies=usd'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        
        const data = await response.json();
        
        setTokenPrices({
          ETH: data.ethereum.usd || 4500,
          MATIC: data['matic-network'].usd || 1.5
        });
      } catch (error) {
        console.error('Error fetching token prices:', error);
        // Fallback to default values
        setTokenPrices({
          ETH: 4500,
          MATIC: 1.5
        });
      }
    };
    
    fetchPrices();
  }, []);

  // Function to fetch balances
  const fetchBalances = async () => {
    if (!isConnected || !address) {
      setNetworkBalances({
        mainnet: 0,
        polygon: 0,
        arbitrum: 0,
        optimism: 0,
        base: 0
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Fetching balances for address:", address);
      
      
      const ETHEREUM_MAINNET = import.meta.env.VITE_ETHEREUM_MAINNET || "demo";
      const POLYGON_MAINNET = import.meta.env.VITE_POLYGON_MAINNET || "demo";
      const ARBITRUM_MAINNET = import.meta.env.VITE_ARBITRUM_MAINNET || "demo";
      const OPTIMISM_MAINNET = import.meta.env.VITE_OPTIMISM_MAINNET || "demo";
      const BASE_MAINNET = import.meta.env.VITE_BASE_MAINNET || "demo";
      
      // For debugging
      console.log("Using ETH RPC key:", ETHEREUM_MAINNET);
      
      // Create clients for each network
      const mainnetClient = createPublicClient({
        chain: mainnet,
        transport: http(`https://eth-mainnet.g.alchemy.com/v2/${ETHEREUM_MAINNET}`)
      });
      
      const polygonClient = createPublicClient({
        chain: polygon,
        transport: http(`https://polygon-mainnet.g.alchemy.com/v2/${POLYGON_MAINNET}`)
      });
      
      const arbitrumClient = createPublicClient({
        chain: arbitrum,
        transport: http(`https://arb-mainnet.g.alchemy.com/v2/${ARBITRUM_MAINNET}`)
      });
      
      const optimismClient = createPublicClient({
        chain: optimism,
        transport: http(`https://opt-mainnet.g.alchemy.com/v2/${OPTIMISM_MAINNET}`)
      });
      
      const baseClient = createPublicClient({
        chain: base,
        transport: http(`https://base-mainnet.g.alchemy.com/v2/${BASE_MAINNET}`)
      });
      
      // Fetch balances in parallel for better performance
      console.log("Fetching balances from networks...");
      const [mainnetBalance, polygonBalance, arbitrumBalance, optimismBalance, baseBalance] = await Promise.all([
        mainnetClient.getBalance({ address }).catch(err => {
          console.error("Error fetching mainnet balance:", err);
          return 0n;
        }),
        polygonClient.getBalance({ address }).catch(err => {
          console.error("Error fetching polygon balance:", err);
          return 0n;
        }),
        arbitrumClient.getBalance({ address }).catch(err => {
          console.error("Error fetching arbitrum balance:", err);
          return 0n;
        }),
        optimismClient.getBalance({ address }).catch(err => {
          console.error("Error fetching optimism balance:", err);
          return 0n;
        }),
        baseClient.getBalance({ address }).catch(err => {
          console.error("Error fetching base balance:", err);
          return 0n;
        })
      ]);
      
      console.log("Fetched balances:", {
        mainnet: formatUnits(mainnetBalance || 0n, 18),
        polygon: formatUnits(polygonBalance || 0n, 18),
        arbitrum: formatUnits(arbitrumBalance || 0n, 18),
        optimism: formatUnits(optimismBalance || 0n, 18),
        base: formatUnits(baseBalance || 0n, 18)
      });
      
      // Update state with formatted balances
      setNetworkBalances({
        mainnet: Number(formatUnits(mainnetBalance || 0n, 18)),
        polygon: Number(formatUnits(polygonBalance || 0n, 18)),
        arbitrum: Number(formatUnits(arbitrumBalance || 0n, 18)),
        optimism: Number(formatUnits(optimismBalance || 0n, 18)),
        base: Number(formatUnits(baseBalance || 0n, 18))
      });
    } catch (error) {
      console.error("Error in fetchBalances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch balances when address changes or connection status changes
  useEffect(() => {
    fetchBalances();
  }, [address, isConnected]);

  const projects = [
    {
      name: "Tech Innovators cohort",
      fundingAmount: "10 ETH",
      minimumThreshold: "7 ETH",
      startDate: "Apr 12, 2025",
      endDate: "Apr 20, 2025",
    },
    {
      name: "Hackathon for Sustainability",
      fundingAmount: "20 ETH",
      minimumThreshold: "10 ETH",
      startDate: "May 12, 2025",
      endDate: "May 20, 2025",
    },
    {
      name: "Women in Tech Bootcamp",
      fundingAmount: "25 ETH",
      minimumThreshold: "15 ETH",
      startDate: "Jun 12, 2025",
      endDate: "Jun 20, 2025",
    },
    {
      name: "AI in Education Summit",
      fundingAmount: "100 ETH",
      minimumThreshold: "70 ETH",
      startDate: "Jul 12, 2025",
      endDate: "Jul 20, 2025",
    }
  ];

  // Calculate total balance across all networks
  const calculateTotalBalance = () => {
    if (!isConnected) return 0;
    
    // Calculate value for each network using real-time prices
    const mainnetValue = networkBalances.mainnet * tokenPrices.ETH;
    const polygonValue = networkBalances.polygon * tokenPrices.MATIC;
    const arbitrumValue = networkBalances.arbitrum * tokenPrices.ETH; // Using ETH price for L2s
    const optimismValue = networkBalances.optimism * tokenPrices.ETH;
    const baseValue = networkBalances.base * tokenPrices.ETH;
    
    // Sum all values
    return mainnetValue + polygonValue + arbitrumValue + optimismValue + baseValue;
  };

  // Format the balance for display
  const displayBalance = () => {
    if (!isConnected) {
      return isBalanceVisible ? '$0.00' : '********';
    }
    
    const totalUsdBalance = calculateTotalBalance().toFixed(2);
    return isBalanceVisible ? `$${totalUsdBalance}` : '********';
  };

  // Calculate a slightly lower value for payout balance (just for demo purposes)
  const displayPayoutBalance = () => {
    if (!isConnected) {
      return isBalanceVisible ? '$0.00' : '********';
    }
    
    const totalBalance = calculateTotalBalance();
    const usdBalance = (totalBalance * 0.995).toFixed(2); // 0.5% less for fees
    
    return isBalanceVisible ? `$${usdBalance}` : '********';
  };

  return (
    <Layout>
      <div className="flex-1">
        <h1 className="text-2xl text-purple-800 font-bold mb-6">Wallet</h1>
        
        <div className="mb-6 flex justify-between items-center">
          <h2>Connect wallet</h2>
          <div className="custom-connect-button">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button 
                            onClick={openConnectModal} 
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button 
                            onClick={openChainModal} 
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Wrong Network
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center">
                          <button
                            onClick={openAccountModal}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                          >
                            {account.displayName}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>

        {/* Available Balance */}
        <div className="bg-purple-700 text-white p-6 rounded-lg mb-14 flex justify-between items-center relative">
          <div>
            <p className="text-xs mb-2">Available Balance</p>
            <h3 className="text-xl font-bold mb-2">
              {displayBalance()}
            </h3>
            <p className="text-xs mb-2">Payout Balance: {displayPayoutBalance()}</p>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-xs opacity-50">Current Network: {isConnected ? networkBalances.mainnet.toFixed(6) + ' ETH' : 'Not connected'}</p>
            )}
          </div>
          <div className="flex space-x-2">
            {isLoading ? (
              <div className="animate-spin">
                <RefreshCw size={20} />
              </div>
            ) : (
              <button 
                onClick={fetchBalances} 
                className="hover:text-purple-200 transition-colors"
                title="Refresh balances"
              >
                <RefreshCw size={20} />
              </button>
            )}
            <button 
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="hover:text-purple-200 transition-colors"
            >
              {isBalanceVisible ? <Eye /> : <Eye className="line-through" />}
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-purple-50 rounded-xl text-left">
              <tr>
                <th className="p-4 text-xs">Project Name</th>
                <th className="p-4 text-xs">Funding Amount</th>
                <th className="p-4 text-xs">Minimum <br />Threshold</th>
                <th className="p-4 text-xs">Start Date</th>
                <th className="p-4 text-xs">End Date</th>
                <th className="p-4 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 text-xs">{project.name}</td>
                  <td className="p-4 text-xs">{project.fundingAmount}</td>
                  <td className="p-4 text-xs">{project.minimumThreshold}</td>
                  <td className="p-4 text-xs">{project.startDate}</td>
                  <td className="p-4 text-xs">{project.endDate}</td>
                  <td className="p-4 text-xs">
                    <button 
                      className={`px-3 py-1 rounded-xl ${
                        isConnected 
                          ? 'bg-purple-700 text-white hover:bg-purple-800' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isConnected}
                    >
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center p-4">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded">&lt;</button>
              {[1,2,3,4,5,6].map(page => (
                <button 
                  key={page} 
                  className={`px-3 py-1 rounded ${
                    page === currentPage 
                      ? 'bg-purple-700 text-white' 
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1 border rounded">&gt;</button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 left-5 flex items-left bg-white p-2 rounded-lg shadow">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
            E
          </div>
          <div className="mr-2">
            <div className="text-sm font-medium">EduTech Global</div>
            <div className="text-xs text-gray-500">@edutechglobal</div>
          </div>
          <button className="ml-2 text-gray-500">
            <DotsThreeVertical size={16} />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default WalletDashboard;