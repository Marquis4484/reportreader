'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading-shadow-wrapper bg-[var(--bg-card)] shadow-soft-lg dark:bg-slate-900 dark:border dark:border-slate-700">
                <div className="loading-shadow">
                    <Loader2 className="loading-animation w-12 h-12 text-[var(--color-brand)]" />
                    <h2 className="loading-title">Synthesizing Your Book</h2>
                    <p className="text-[var(--text-muted)] text-center max-w-xs dark:text-slate-400">
                        Please wait while we process your PDF and prepare your interactive literary experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
