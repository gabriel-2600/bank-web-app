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
        <p>{error}</p>
      </div>
    );
  }

  if (!resultData) {
    return <p>No rate data available.</p>;
  }

  return (
    <div>
      <div className="flex">
        <input type="number" value={amount} onChange={handleInput} />
        <SelectCurrency
          currency={targetCurrency}
          setCurrency={setTargetCurrency}
        />
        <p>to</p>
        <SelectCurrency
          currency={sourceCurrency}
          setCurrency={setSourceCurrency}
        />
      </div>

      <div className="flex">
        <h2>{resultData.rate * numericAmount}</h2>
        <p>{resultData.source}</p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
