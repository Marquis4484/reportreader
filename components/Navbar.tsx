'use client';

import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import {cn} from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
    { label: "Pricing", href: "/subscriptions" },
]

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 801px)");

        const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
            if (event.matches) {
                closeMenu();
            }
        };

        handleViewportChange(mediaQuery);
        mediaQuery.addEventListener("change", handleViewportChange);

        return () => mediaQuery.removeEventListener("change", handleViewportChange);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        document.body.classList.add("mobile-menu-open");
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.classList.remove("mobile-menu-open");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    return (
        <header className="w-full fixed z-50 bg-[var(--bg-primary)]">
            <div className="wrapper navbar-height py-4 flex justify-between items-center relative">
                <Link href="/" className="flex gap-0.5 items-center" onClick={closeMenu}>
                    <Image src="/assets/ReportReaderTitle.png" alt="ReportReader" width={240} height={240} className="navbar-logo-image"/>
                   
                </Link>

                <div className="navbar-theme-toggle">
                    <ThemeToggle />
                </div>

                <nav className="desktop-nav w-fit flex gap-7.5 items-center" aria-label="Primary navigation">
                    {navItems.map(({ label, href }) => {
                        const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                        return (
                            <Link href={href} key={label} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-[var(--text-primary)] hover:opacity-70 dark:text-slate-100')}>
                                {label}
                            </Link>
                        )
                    })}

                    <div className="flex gap-7.5 items-center">
                        <SignedOut>
                            <SignInButton mode="modal" />
                        </SignedOut>
                        <SignedIn>
                            <div className="nav-user-link">
                                <UserButton />
                                {user?.firstName && (
                                    <Link href="/subscriptions" className="nav-user-name">
                                        {user.firstName}
                                    </Link>
                                )}
                            </div>
                        </SignedIn>
                    </div>
                </nav>

                <button
                    type="button"
                    className="mobile-menu-trigger"
                    aria-label="Open menu"
                    aria-controls="mobile-sidebar-menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu aria-hidden="true" className="h-6 w-6" />
                </button>
            </div>

            <div
                className={cn("mobile-sidebar-overlay", isMenuOpen && "mobile-sidebar-overlay-open")}
                aria-hidden={!isMenuOpen}
                onClick={closeMenu}
            />

            <aside
                id="mobile-sidebar-menu"
                className={cn("mobile-sidebar", isMenuOpen && "mobile-sidebar-open")}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                aria-hidden={!isMenuOpen}
            >
                <div className="mobile-sidebar-header">
                    <span className="sr-only">Navigation menu</span>
                    <button
                        type="button"
                        className="mobile-sidebar-close"
                        aria-label="Close menu"
                        onClick={closeMenu}
                    >
                        <X aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mobile-sidebar-nav" aria-label="Mobile primary navigation">
                    {navItems.map(({ label, href }) => {
                        const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                        return (
                            <Link
                                href={href}
                                key={label}
                                className={cn("mobile-sidebar-link", isActive && "mobile-sidebar-link-active")}
                                onClick={closeMenu}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="mobile-sidebar-auth">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button type="button" className="mobile-sidebar-signin" onClick={closeMenu}>
                                Sign in
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <div className="mobile-sidebar-user">
                            <UserButton />
                            {user?.firstName && (
                                <Link href="/subscriptions" className="mobile-sidebar-user-name" onClick={closeMenu}>
                                    {user.firstName}
                                </Link>
                            )}
                        </div>
                    </SignedIn>
                </div>
            </aside>
        </header>
    )
}

export default Navbar
