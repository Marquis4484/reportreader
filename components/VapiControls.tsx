'use client';

import {Keyboard, Mic, MicOff, Send, Volume2} from "lucide-react";
import useVapi from "@/hooks/useVapi";
import {IBook} from "@/types";
import Image from "next/image";
import Transcript from "@/components/Transcript";
import {toast} from "sonner";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import type {FormEvent} from "react";

const VapiControls = ({ book }: { book: IBook }) => {
    const {
        status,
        isActive,
        messages,
        currentMessage,
        currentUserMessage,
        duration,
        start,
        stop,
        sendTextMessage,
        isTextMessagePending,
        clearError,
        limitError,
        isBillingError,
        maxDurationSeconds
    } = useVapi(book)
    const [inputMode, setInputMode] = useState<'voice' | 'keyboard'>('voice');
    const [keyboardMessage, setKeyboardMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (limitError) {
            toast.error(limitError);
            if (isBillingError) {
                router.push("/subscriptions");
            } else {
                router.push("/");
            }
            clearError();
        }
    }, [isBillingError, limitError, router, clearError]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getStatusDisplay = () => {
        switch (status) {
            case 'connecting': return { label: 'Connecting...', color: 'vapi-status-dot-connecting' };
            case 'starting': return { label: 'Starting...', color: 'vapi-status-dot-starting' };
            case 'listening': return { label: 'Listening', color: 'vapi-status-dot-listening' };
            case 'thinking': return { label: 'Thinking...', color: 'vapi-status-dot-thinking' };
            case 'speaking': return { label: 'Speaking', color: 'vapi-status-dot-speaking' };
            default: return { label: 'Ready', color: 'vapi-status-dot-ready' };
        }
    };

    const statusDisplay = getStatusDisplay();
    const isKeyboardMode = inputMode === 'keyboard';
    const trimmedKeyboardMessage = keyboardMessage.trim();
    const isKeyboardDisabled = !isActive || status === 'connecting' || status === 'starting' || isTextMessagePending;

    const handleInputModeToggle = () => {
        setInputMode((currentMode) => currentMode === 'voice' ? 'keyboard' : 'voice');
    };

    const handleKeyboardSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!trimmedKeyboardMessage || isKeyboardDisabled) {
            return;
        }

        const wasSent = sendTextMessage(trimmedKeyboardMessage);

        if (wasSent) {
            setKeyboardMessage('');
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header Card */}
                <div className="vapi-header-card">
                    <div className="vapi-cover-wrapper">
                        <Image
                            src={book.coverURL || "/images/book-placeholder.png"}
                            alt={book.title}
                            width={120}
                            height={180}
                            className="vapi-cover-image !w-[120px] !h-auto"
                            priority
                        />
                        <div className="vapi-mic-wrapper relative">
                            {isActive && (status === 'speaking' || status === 'thinking') && (
                                <div className="absolute inset-0 rounded-full bg-[var(--bg-card)] animate-ping opacity-75" />
                            )}
                            <button
                                type="button"
                                onClick={isActive ? stop : start}
                                disabled={status === 'connecting'}
                                className={`vapi-mic-btn shadow-md !w-[60px] !h-[60px] z-10 ${isActive ? 'vapi-mic-btn-active' : 'vapi-mic-btn-inactive'}`}
                                aria-label={isActive ? 'Stop voice input' : 'Start voice input'}
                            >
                                {isActive ? (
                                    <Mic className="size-7 text-white" />
                                ) : (
                                    <MicOff className="size-7 text-[var(--text-primary)]" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 flex-1 min-w-0">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)] mb-1">
                                {book.title}
                            </h1>
                            <p className="text-[var(--text-secondary)] font-medium">by {book.author}</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="vapi-status-indicator">
                                <span className={`vapi-status-dot ${statusDisplay.color}`} />
                                <span className="vapi-status-text">{statusDisplay.label}</span>
                            </div>

                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">Voice: {book.persona || "Daniel"}</span>
                            </div>

                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">
                                    {formatDuration(duration)}/{formatDuration(maxDurationSeconds)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="vapi-input-mode-action">
                        <button
                            type="button"
                            onClick={handleInputModeToggle}
                            className="vapi-input-mode-btn"
                            aria-label={isKeyboardMode ? 'Switch to voice input' : 'Switch to keyboard input'}
                        >
                            {isKeyboardMode ? (
                                <Volume2 className="size-4" aria-hidden="true" />
                            ) : (
                                <Keyboard className="size-4" aria-hidden="true" />
                            )}
                            <span>
                                {isKeyboardMode ? 'Switch to voice input' : 'Switch to keyboard input'}
                            </span>
                        </button>
                    </div>
                </div>

            <div className="vapi-transcript-wrapper">
                <div className="transcript-container min-h-[400px]">
                    <Transcript
                        messages={messages}
                        currentMessage={currentMessage}
                        currentUserMessage={currentUserMessage}
                    />
                </div>
                <div
                    className={`vapi-keyboard-input-panel ${
                        isKeyboardMode ? 'vapi-keyboard-input-panel-visible' : 'vapi-keyboard-input-panel-hidden'
                    }`}
                    aria-hidden={!isKeyboardMode}
                >
                    <form className="vapi-keyboard-input-form" onSubmit={handleKeyboardSubmit}>
                        <label htmlFor="vapi-keyboard-message" className="sr-only">
                            Type a message to the voice assistant
                        </label>
                        <input
                            id="vapi-keyboard-message"
                            type="text"
                            value={keyboardMessage}
                            onChange={(event) => setKeyboardMessage(event.target.value)}
                            className="vapi-keyboard-input"
                            placeholder={isActive ? 'Type your message...' : 'Start the voice session to type a message'}
                            aria-label="Type a message to the voice assistant"
                            disabled={!isKeyboardMode || isKeyboardDisabled}
                            tabIndex={isKeyboardMode ? 0 : -1}
                        />
                        <button
                            type="submit"
                            className="vapi-keyboard-submit-btn"
                            disabled={!isKeyboardMode || isKeyboardDisabled || !trimmedKeyboardMessage}
                            aria-label="Send typed message"
                            tabIndex={isKeyboardMode ? 0 : -1}
                        >
                            <Send className="size-5" aria-hidden="true" />
                            <span className="sr-only">Send</span>
                        </button>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}
export default VapiControls
