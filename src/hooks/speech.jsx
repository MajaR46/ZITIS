import { useState, useEffect, useRef } from 'react';

const useSpeech = (commands) => {
    const [speaking, setSpeaking] = useState(false);
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => setSpeaking(true);
            utterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Speech synthesis not supported in this browser');
        }
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setListening(true);
            console.log("Voice recognition started. Try speaking into the microphone.");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Voice command detected:", transcript);

            if (commands && commands[transcript]) {
                commands[transcript]();
            }
        };

        recognition.onerror = (event) => {
            console.error("Error occurred in speech recognition:", event.error);
        };

        recognition.onend = () => {
            setListening(false);
            console.log("Voice recognition ended.");
        };

        recognitionRef.current = recognition;

        recognition.start();

        return () => recognition.stop();
    }, [commands]);

    return { speak, speaking, listening };
};

export default useSpeech;
