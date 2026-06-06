"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
const NavSearch_14 = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") ?? ""
  );
  const {replace} = useRouter();
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if(value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/store_14/products_14?${params.toString()}`);
  }, 500);

  return (
    <Input
      type="search"
      placeholder="Search Products..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value)
        
        handleSearch(e.target.value);
      }}
      className="max-w-xs border-gray dark:bg-muted-foreground/10 dark:border-muted-foreground/50 dark:focus-visible:ring-muted-foreground/50"
    />
  );
};

export default NavSearch_14;
