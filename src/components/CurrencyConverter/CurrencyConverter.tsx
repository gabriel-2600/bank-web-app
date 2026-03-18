import { useState } from "react";
import SelectCurrency from "./SelectCurrency";
import useExchangeRate from "./use-exchange-rate";

function CurrencyConverter() {
  const [sourceCurrency, setSourceCurrency] = useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("PHP");
  const { resultData, loading, error } = useExchangeRate(
    sourceCurrency,
    targetCurrency,
  );
  const [amount, setAmount] = useState("1");
  const numericAmount = Number(amount) || 0;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!resultData) {
    return <p>No rate data available.</p>;
  }

  return (
    <div className="bg-slate-100 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          type="number"
          value={amount}
          onChange={handleInput}
        />
        <SelectCurrency
          currency={targetCurrency}
          setCurrency={setTargetCurrency}
        />
        <p className="text-sm font-medium text-slate-500">to</p>
        <SelectCurrency
          currency={sourceCurrency}
          setCurrency={setSourceCurrency}
        />
      </div>

      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-semibold text-slate-900">
          {resultData.rate * numericAmount}
        </h2>
        <p className="text-sm text-slate-500">{resultData.source}</p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
