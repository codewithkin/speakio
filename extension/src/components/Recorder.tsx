import { useState, useEffect } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function Recorder() {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(false);
            setError(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [success, error]);

    const addAudioElement = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);

        // Upload the file
        fetch(`http://localhost:8080/api/speakio/recording`, {
            method: 'POST',
            body: blob
        })
            .then((res: Response) => {
                if (res.ok) {
                    setSuccess(true);
                } else {
                    setError(`Failed to upload recording: ${res.status} ${res.statusText}`);
                }
            })
            .catch((err: Error) => {
                setError(`Failed to upload recording: ${err.message}`);
            })
    };

    return (
        <>
            <AudioRecorder 
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                    autoGainControl: true
                }} 
                downloadOnSavePress={false}
                downloadFileExtension="mp3"
            />

            <article>
                {success && (
                    <article className="p-4 font-semibold bg-green-500 text-slate-800 rounded-xl">
                        Recording uploaded successfully
                    </article>
                )}

                {error && (
                    <article className="p-4 font-semibold bg-red-500 text-slate-800 rounded-xl">
                        Failed to upload recording
                    </article>
                )}
            </article>
        </>
    )
}

