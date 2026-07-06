import React from 'react'
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import {getAllBooks} from "@/lib/actions/book.actions";
import Search from "@/components/Search";
import {auth} from "@clerk/nextjs/server";
import SignInCtaButton from "@/components/SignInCtaButton";

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { query } = await searchParams;
    const { userId } = await auth();

    const bookResults = userId ? await getAllBooks(query) : { success: true, data: [] }
    const books = bookResults.success ? bookResults.data ?? [] : []

    return (
        <main className="wrapper container">
            <HeroSection />

            {userId ? (
                <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
                        <h2 className="text-3xl font-serif font-bold text-[var(--text-primary)] dark:text-slate-100">Recent Books</h2>
                        <Search />
                    </div>

                    <div className="library-books-grid">
                        {books.map((book) => (
                            <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
                        ))}
                    </div>
                </>
            ) : (
                <section className="library-empty-card text-center">
                    <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] dark:text-slate-100">
                        Sign in to save your documents
                    </h2>
                    <p className="mt-3 text-base text-[var(--text-secondary)] dark:text-slate-400">
                        Create a private library, upload PDFs, and return to your saved reading sessions anytime.
                    </p>
                    <SignInCtaButton />
                </section>
            )}
        </main>
    )
}

export default Page
