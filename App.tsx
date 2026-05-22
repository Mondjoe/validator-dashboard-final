/*
 * DESIGN: Cyberpunk Noir — App Router
 * - Dark theme forced (no light mode)
 * - All dashboard routes registered
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NFTGallery from "./pages/NFTGallery";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import DeFi from "./pages/DeFi";
import Contracts from "./pages/Contracts";
import GasTracker from "./pages/GasTracker";
import MultiChain from "./pages/MultiChain";
import Settings from "./pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nfts" component={NFTGallery} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/defi" component={DeFi} />
      <Route path="/contracts" component={Contracts} />
      <Route path="/gas" component={GasTracker} />
      <Route path="/chains" component={MultiChain} />
      <Route path="/settings" component={Settings} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: '#0A0F1E',
                border: '1px solid rgba(0,245,255,0.2)',
                color: '#E8F4F8',
                fontFamily: 'Space Grotesk, sans-serif',
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
