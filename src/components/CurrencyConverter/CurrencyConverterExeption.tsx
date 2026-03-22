interface CurrencyConverterExceptionProps {
  error: string;
}

function CurrencyConverterException({
  error,
}: CurrencyConverterExceptionProps) {
  return (
    <>
      {" "}
      <p className="text-sm text-red-500">{error}</p>
    </>
  );
}

export default CurrencyConverterException;
