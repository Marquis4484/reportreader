'use client';

import { SignInButton } from "@clerk/nextjs";

const SignInCtaButton = () => {
    return (
        <SignInButton mode="modal">
            <button type="button" className="library-cta-primary mt-6 inline-flex items-center justify-center">
                <span className="text-[var(--text-primary)] dark:text-slate-100">Sign in</span>
            </button>
        </SignInButton>
    )
}

export default SignInCtaButton
