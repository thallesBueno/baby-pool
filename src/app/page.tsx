"use client";

const bets = [
  {
    name: "Yasmin",
    date: "2025-08-30",
  },
  {
    name: "Rosa",
    date: "2025-08-28",
  },
  {
    name: "Pamela",
    date: "2025-09-04",
  },
];

// Função para saber quem tá vencendo (mais próximo da data)
function getClosestBet(today: Date) {
  const betsWithDistance = bets.map((bet) => {
    const betDate = new Date(bet.date);
    const diff = Math.abs(betDate.getTime() - today.getTime());
    return { ...bet, diff };
  });

  return betsWithDistance.sort((a, b) => a.diff - b.diff)[0];
}

export default function Home() {
  const today = new Date("2025-07-11");
  const closest = getClosestBet(today);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-12 md:px-8 gap-10 font-sans text-neutral-800">
      <header className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-2">
          Bolão do Arthur 🍼💙
        </h1>
      </header>

      <section
        aria-label="Palpite mais próximo"
        className="bg-white border border-blue-200 rounded-lg p-4 md:p-6 shadow-md text-center w-full max-w-md"
      >
        <p className="mb-2 text-md font-semibold text-blue-800">
         Se o Arthur nascer hoje, o campeão será:{" "} <br />
        </p>
        <span className="text-2xl pt-4 font-extrabold text-blue-900"> 🏆 {closest.name}! 🏆 </span>
      </section>

      <section
        aria-label="Regras do Bolão"
        className="bg-white border border-blue-200 rounded-lg p-6 shadow-sm text-center max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-3">
          Regras do Bolão
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          Cada pessoa dá um palpite com data. Quem chegar mais perto do nascimento do Arthur ganha! Em caso de empate, o bolão será decidido de forma justa. Divirta-se e boa sorte! 🎉
        </p>
      </section>

      <section
        aria-label="Tabela de Palpites"
        className="w-full max-w-5xl overflow-x-auto"
      >
        <table className="w-full shadow-sm text-sm md:text-base">
          <caption className="caption-top mb-2 font-semibold text-blue-700">
            Palpites
          </caption>
          <thead className="bg-blue-200 text-blue-900">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">Nome</th>
              <th scope="col" className="px-4 py-3 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, idx) => (
              <tr
                key={idx}
                className={`${
                  bet.name === closest.name
                    ? "bg-blue-50 font-semibold"
                    : "bg-white"
                } even:bg-blue-50`}
              >
                <td className="px-4 py-3">{bet.name}</td>
                <td className="px-4 py-3">
                  {new Date(bet.date).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
