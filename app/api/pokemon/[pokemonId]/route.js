export async function GET(req, { params }) {
  const { pokemonId } = params;

  try {
    const [res, speciesRes] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`),
    ]);

    if (!res.ok || !speciesRes.ok) {
      throw new Error("포켓몬 정보 요청 실패");
    }

    const data = await res.json();
    const speciesData = await speciesRes.json();

    const koreanName =
      speciesData.names.find((n) => n.language.name === "ko")?.name ??
      data.name;

    const description =
      speciesData.flavor_text_entries.find((x) => x.language.name === "ko")
        ?.flavor_text ?? "";

    const result = {
      id: data.id,
      name: data.name,
      koreaName: koreanName,
      front: data.sprites.front_default,
      back: data.sprites.back_default,
      types: data.types.map((t) => t.type.name),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((a) => a.ability.name),
      moves: data.moves.slice(0, 3).map((m) => m.move.name),
      description,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API 오류:", error.message);
    return new Response(
      JSON.stringify({ error: "포켓몬 데이터를 불러오는 데 실패했습니다." }),
      { status: 500 }
    );
  }
}
