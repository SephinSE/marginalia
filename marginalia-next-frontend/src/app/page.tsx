"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("Try searching for your book!");
  const [query, setQuery] = useState("");

  const handleClick = async () => {
    try {
      const res = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      if (res.data && res.data.docs && res.data.docs.length > 0) {
        const docs = res.data.docs;
        setResponse(`Title: ${docs[0].title}, Author: ${docs[0].author_name[0]}`);

        const ocaid = docs[0]?.ia?.[1];
        if (ocaid) {
          // const pdfUrl = `https://archive.org/download/${ocaid}/${ocaid}_djvu.txt`;
          const pdfUrl = `https://archive.org/download/${ocaid}/${ocaid}.pdf`;
          window.open(pdfUrl, "_blank");
        } else {
          alert("No PDF found!");
        }
        // console.log(docs);
      } else {
        console.log("No results found.");
        setResponse("No results found.");
      }
    } catch (error) {
      console.log(error);
      setResponse(error.message);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_0fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <input 
        className="border-2 p-2 rounded-lg"
        value={query} 
        onChange={
          (e) => {
            setQuery(e.target.value);
            if (e.target.value.trim() === "") {
              setResponse("");
            }
          }
        } 
        placeholder="Search for books..." 
      />
      <button className="cursor-pointer bg-white text-black px-4 rounded" onClick={handleClick}>
        Search
      </button>
      <p>{query.length > 0  && response ? response : "Try searching for your book!"}</p>
    </div>
  );
}
