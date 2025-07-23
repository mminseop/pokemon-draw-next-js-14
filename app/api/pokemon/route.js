export async function GET() {
  try {
    const pokemonCount = 151;
    const pokemonIds = Array.from({ length: pokemonCount }, (_, i) => i + 1);

    const responses = await Promise.all(
      pokemonIds.map(async (id) => {
        // 기본 포켓몬 정보
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        // species 정보 (한글 이름, 설명 등)
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const speciesData = await speciesRes.json();

        const koreanName =
          speciesData.names.find((n) => n.language.name === "ko")?.name ??
          data.name;

        return {
          id,
          name: data.name,
          koreaName: koreanName,
          front: data.sprites.front_default,
          back: data.sprites.back_default,
          types: data.types.map((t) => t.type.name),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((a) => a.ability.name),
          moves: data.moves.slice(0, 3),
          description:
            speciesData.flavor_text_entries.find(
              (x) => x.language.name === "ko"
            )?.flavor_text ?? "",
        };
      })
    );

    return new Response(JSON.stringify(responses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "포켓몬 데이터를 불러오지 못했습니다." }),
      {
        status: 500,
      }
    );
  }
}