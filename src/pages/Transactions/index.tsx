import { Summary } from "../../components/Summary";
import { Header } from "./../../components/Header/index";
import { SearchForm } from "./components/SearchForm";
import {
  TransactionsContainer,
  TransactionsTable,
  PriceHighLight,
} from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export const Transactions = () => {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions &&
              transactions.map((elem) => {
                return (
                  <tr key={elem.id}>
                    <td width="40%">{elem.description}</td>
                    <td>
                      <PriceHighLight variant={elem.type}>
                        {elem.type === "outcome" && "- "}
                        {priceFormatter.format(elem.price)}
                      </PriceHighLight>
                    </td>
                    <td>{elem.category}</td>
                    <td>{dateFormatter.format(new Date(elem.createdAt))}</td>
                  </tr>
                );
              })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
