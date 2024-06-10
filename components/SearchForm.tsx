"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    // 如果不再/search頁面，則不顯示搜尋表單
    if (pathname !== "/search") {
        return null;
    }
    return (
        <div>
            <form>
                <input
                    type="text"
                    className="bg-[#727272]/15 shadow-2xl rounded-xl py-2 px-4 w-[350px] mx-2 text-white"
                    name="query"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
            </form>
        </div>
    );
}
