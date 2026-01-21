/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";


type Post = {
  id: number;
  title: string;
  body: string;
};
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    const data = await res.json();
    setPosts((prev) => [...prev, ...data]);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        setPage((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [loading])


  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl font-bold text-center text-white">Youtube Style Infinite Scrolling</h1>

      {
        posts.map((post) => (
          <div key={post.id} className="mb-5 border-2 border-white p-5">
            <h2 className="text-2xl font-bold text-white">{post.title}</h2>
            <p className="text-white">{post.body}</p>
          </div>
        ))
      }
      {loading && <p>Loading more videos...</p>}
    </div>
  );
}
