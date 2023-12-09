import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styled";
import { MagnifyingGlass } from "phosphor-react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

// memo vai verificar se mudou alguma coisa nos hooks do componente ou se mudou algo nas props do componente
// ele guarda o componente na memoria e assim n precisa de uma verificação do proprio react

const seartFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof seartFormSchema>;

export const SearchForm = () => {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(seartFormSchema),
  });

  const handlerSearchTransactions = async (data: SearchFormInputs) => {
    await fetchTransactions(data.query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handlerSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
