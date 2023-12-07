import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styled";
import { MagnifyingGlass } from "phosphor-react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../../../contexts/TransactionsContext";

const seartFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof seartFormSchema>;

export const SearchForm = () => {
  const { fetchTransactions } = useContext(TransactionContext);

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
