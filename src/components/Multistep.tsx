interface MultistepProps {
  step: number;
  active: number;
}

export function Multistep({ active, step }: MultistepProps) {
  let arrStep = [];
  for (let i = 1; i <= step; i++) {
    arrStep.push(i);
  }
  return (
    <div className="w-full">
      <span className="text-gray-200 text-xs">
        Passo {active} de {step}
      </span>
      <div className="flex items-center gap-2">
        {arrStep.map((step) => (
          <div
            key={step}
            className={`w-full h-1 ${
              active >= step ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
