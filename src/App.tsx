import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions/index";
import { TransactionProvider } from "./contexts/TransactionsContext";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionProvider>
        <Transactions />
      </TransactionProvider>
    </ThemeProvider>
  );
};

export default App;
