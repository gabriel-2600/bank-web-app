import { useEffect, useState } from "react";

interface Rate {
  rate: number;
  source: string;
  target: string | null;
}

function useExchangeRate(sourceCurrency: string, targetCurrency: string) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resultData = data[0];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.wise.com/v1/rates?source=${sourceCurrency}&target=${targetCurrency}`,
          {
            mode: "cors",
            method: "GET",
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        );

        if (!response.ok) {
          console.log(response.status);
        }

        const result: Rate[] = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError("Failed to retrieve Data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [sourceCurrency, targetCurrency]);

  return { resultData, loading, error };
}

export default useExchangeRate;
