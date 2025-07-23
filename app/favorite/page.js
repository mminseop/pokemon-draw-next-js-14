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
    const fetchFavoritePokemons = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          favoriteIds.map(async (id) => {
            const res = await fetch(`/api/pokemon/${id}`);
            if (!res.ok) {
              throw new Error(`포켓몬 ${id} 요청 실패`);
            }
            return await res.json();
          })
        );
        setFavoritePokemons(results);
      } catch (error) {
        console.error("찜한 포켓몬 불러오기 실패:", error);
        setFavoritePokemons([]);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      fetchFavoritePokemons();
    } else {
      setFavoritePokemons([]);
      setLoading(false);
    }
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-20">
        <ClipLoader color="#333" size={40} />
        <p className="mt-4 text-gray-600">찜한 포켓몬을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">찜한 포켓몬</h2>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <ClipLoader color="#333" size={30} />
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
