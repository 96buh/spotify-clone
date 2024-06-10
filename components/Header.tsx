"use client";
import { usePathname } from "next/navigation";

export default function Header({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    let style;
    if (pathname === "/signup" || pathname === "/login") {
        style = "hidden";
    } else if (pathname === "/search") {
        style =
            "mt-1 flex px-2 py-3 justify-between items-center rounded-tl-md rounded-tr-md select-none bg-primary";
    } else {
        style =
            "mt-1 flex px-2 py-3 justify-end items-center rounded-tl-md rounded-tr-md select-none bg-primary";
    }

    return (
        <header className={style}>
            {/* 登入和註冊按鈕 */}
            {children}
        </header>
    );
}
