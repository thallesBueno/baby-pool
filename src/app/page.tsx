"use client";

const bets = [
  {
    name: "Yasmim",
    date: "2025/08/13",
  },
  {
    name: "Rosa",
    date: "2025/08/18",
  },
  {
    name: "Pamela",
    date: "2025/08/15",
  },
  {
    name: "Rosane",
    date: "2025/08/06",
  },
  {
    name: "Catarina",
    date: "2025/08/12",
  },
  {
    name: "Charles",
    date: "2025/08/10",
  },
];

// Função para saber quem tá vencendo (mais próximo da data)
function getClosestBets(today: Date) {
  // Função para zerar horas, minutos, segundos e ms, retornando só o dia local
  function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const todayStart = startOfDay(today);

  const betsWithDistance = bets
    .filter((bet) => !!bet.date)
    .map((bet) => {
      const betDate = startOfDay(new Date(bet.date));

      const diffInMs = Math.abs(betDate.getTime() - todayStart.getTime());
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // converte ms para dias
      return { ...bet, diff: diffInDays };
    });

  betsWithDistance.sort((a, b) => a.diff - b.diff);

  const closestDiff = betsWithDistance[0]?.diff;

  const winners = betsWithDistance.filter((bet) => bet.diff === closestDiff);

  return winners;
}

export default function Home() {
  const today = new Date();
  const closestBets = getClosestBets(today);
  // Cria uma cópia ordenada
  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <>
      {/* BACKGROUND BLUR LAYER */}
      <div
        className="fixed inset-0 z-0 bg-[url('/bg.png')] bg-cover bg-center filter blur-[1px] opacity-80"
        aria-hidden="true"
      />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="relative z-10 flex flex-col items-center min-h-screen bg-transparent px-4 py-12 md:px-8 gap-4 font-sans text-neutral-800">

        <section
          aria-label="Palpite mais próximo"
          className="bg-sky-50 border border-sky-200 rounded-lg p-4 md:p-6 py-8 shadow-md text-center w-full max-w-md"
        >
          <p className="mb-1 text-md font-semibold text-sky-800">
            {closestBets.length === 1
              ? "Se o Arthur nascer hoje, o campeão será:"
              : "Se o Arthur nascer hoje, os campeões serão:"}
            <br />
          </p>
         {closestBets.map((bet) => (
            <p key={bet.name} className="text-4xl pt-4 font-extrabold text-sky-700">
              🏆 {bet.name} 🏆
            </p>
            ))}
            <p className="my-4 text-md font-semibold text-sky-800">
              Com o prêmio corrente de:
            <br />
          </p>
          <p className="text-2xl font-extrabold text-green-700">💰 R${bets.length * 10},00 💰</p>
        </section>

     <section
  aria-label="Regras do Bolão"
  className="bg-sky-50 border border-sky-200 rounded-lg p-6 shadow-sm text-center max-w-2xl"
>
  <h2 className="text-xl font-bold text-sky-700 mb-3">
    Regras do Bolão
  </h2>
  <ul className="text-neutral-700 text-md list-decimal list-inside leading-relaxed space-y-2 text-left max-w-md mx-auto">
    <li className="mb-2">Cada participante dá um palpite com data.</li>
    <li className="mb-2">R$10,00 para participar.</li>
    <li className="mb-2">O ganhador leva todo o valor arrecadado.</li>
    <li className="mb-2">Em caso de empate, o prêmio será dividido igualmente entre os vencedores.</li>
    <li>Boa sorte e divirta-se! 🎉</li>
  </ul>
</section>


        <section
          aria-label="Tabela de Palpites"
          className="overflow-x-auto bg-sky-50 border border-sky-200 rounded-lg p-4 md:p-6 shadow-md text-center w-full max-w-md"
        >
          <table className="w-full shadow-sm text-sm md:text-base">
            <caption className="text-xl font-bold text-sky-700 mb-4">
              Palpites
            </caption>
            <thead className="bg-blue-200 text-sky-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left rounded-tl-md">
                  Nome
                </th>
                <th scope="col" className="px-4 py-3 text-left rounded-tr -md">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBets.map((bet, idx) => (
                <tr
                  key={idx}
                  className={`${
                    closestBets.some((winner) => winner.name === bet.name)
                      ? "!bg-blue-400 font-semibold"
                      : "bg-sky-50"
                  } even:bg-blue-100 text-left`}
                >
                  <td className="px-4 py-3">
                    {bet.name}
                    {closestBets.some((winner) => winner.name === bet.name) && " 🏆"}
                  </td>
                  <td className="px-4 py-3">
                    {bet.date
                      ? new Date(bet.date).toLocaleDateString("pt-BR")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
