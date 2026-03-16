import { useEffect, useState } from "react";

function CurrencyConverter() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const apiKey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(
          "https://api.wise.com/v1/rates?source=EUR&target=USD",
          {
            mode: "cors",
            method: "GET",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{data && data[0]["rate"]}</h2>
      <p>{data && data[0]["source"]}</p>
      <p>{data && data[0]["target"]}</p>
    </div>
  );
}

export default CurrencyConverter;
