"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectFavoriteIds } from "@/app/RTK/pokemonSlice";
import PokemonCard from "@/app/components/PokemonCard";
import { ClipLoader } from "react-spinners";

function Favorite() {
  const favoriteIds = useSelector(selectFavoriteIds);
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoriteIds.length === 0) {
        setFavoritePokemons([]);
        return;
      }

      setLoading(true);

      try {
        const responses = await Promise.all(
          favoriteIds.map((id) =>
            fetch(`/api/pokemon/${id}`).then((res) => {
              if (!res.ok) throw new Error("Fetch 실패");
              return res.json();
            })
          )
        );

        setFavoritePokemons(responses);
      } catch (err) {
        console.error("찜한 포켓몬 불러오기 실패", err);
        setFavoritePokemons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteIds]);

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">찜한 포켓몬</h2>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-[300px] gap-4">
                  <ClipLoader color="#333" size={30} />
                  <div className="text-gray-700 text-2xl">찜한 포켓몬을 불러오는 중...</div>
                </div>
      ) : favoritePokemons.length === 0 ? (
        <p className="text-gray-500">찜한 포켓몬이 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start max-w-[1100px]">
          {favoritePokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorite;
