import React, { Suspense } from "react";
import Search from "./search";
import { ClipLoader } from "react-spinners";

export default function SearchPage() {
  return (
    <Suspense fallback={
        <>
        <div className="flex justify-center items-center h-30">
          <ClipLoader color="#333" size={30} />
        </div>
        <div className="text-gray-700 text-2xl">포켓몬을 불러오는 중...</div>
      </>
    }>
      <Search />
    </Suspense>
  );
}