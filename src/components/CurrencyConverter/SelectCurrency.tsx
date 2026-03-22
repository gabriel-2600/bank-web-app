import CURRENCY_LIST from "./currency-list";

interface SelectCurrencyProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

function SelectCurrency({ currency, setCurrency }: SelectCurrencyProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrency(e.target.value);
  }

  return (
    <div>
      <select
        className="w-full rounded-xl bg-white px-3 py-2"
        value={currency}
        onChange={handleChange}
      >
        {CURRENCY_LIST.map((CURRENCY) => (
          <option key={CURRENCY.code} value={CURRENCY.code}>
            {CURRENCY.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCurrency;
