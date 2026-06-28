import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <section className="wrapper mb-10 md:mb-16">
            <div className="library-hero-card">
                <div className="library-hero-content">
                    {/* Left Part */}
                    <div className="library-hero-text">
                        <h1 className="library-hero-title text-4xl font-serif font-bold">Your Library</h1>
                        <p className="library-hero-description">
                            Convert your books into interactive AI conversations. <br className="hidden md:block" />
                            Listen, learn, and discuss your favorite reads.
                        </p>
                        <Link href="/books/new" className="library-cta-primary mt-4 flex items-center justify-center">
                            <span className="text-3xl font-light mb-1 mr-2">+</span>
                            <span className="text-[var(--text-primary)] dark:text-slate-100">Add new book</span>
                        </Link>
                    </div>

                    {/* Right Part */}
                    <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 shadow-soft-md">
                        <ul className="space-y-6">
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-[var(--border-subtle)] dark:border-slate-700 flex items-center justify-center font-medium text-lg text-[var(--text-primary)] dark:text-slate-100">1</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">Upload PDF</h3>
                                    <p className="library-step-description text-gray-500 dark:text-slate-400">Add your book file</p>
                                </div>
                            </li>
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-[var(--border-subtle)] dark:border-slate-700 flex items-center justify-center font-medium text-lg text-[var(--text-primary)] dark:text-slate-100">2</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">AI Processing</h3>
                                    <p className="library-step-description text-gray-500 dark:text-slate-400">We analyze the content</p>
                                </div>
                            </li>
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-[var(--border-subtle)] dark:border-slate-700 flex items-center justify-center font-medium text-lg text-[var(--text-primary)] dark:text-slate-100">3</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">Voice Chat</h3>
                                    <p className="library-step-description text-gray-500 dark:text-slate-400">Discuss with AI</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
