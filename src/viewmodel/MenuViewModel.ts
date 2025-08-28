import { useAudio } from "~/components/useAudio";

export function MenuViewModel() {

    const audioFeliz = require('../assets/audios/feliz.mp3');
    const audioTriste = require('../assets/audios/triste.mp3');
    const audioIrritado = require('../assets/audios/irritado.mp3');
    const audioMedo = require('../assets/audios/medo.mp3');

    const { playSound: playFelizSound } = useAudio(audioFeliz);
    const { playSound: playTristeSound } = useAudio(audioTriste);
    const { playSound: playIrritadoSound } = useAudio(audioIrritado);
    const { playSound: playMedoSound } = useAudio(audioMedo);

    return {
        playFeliz: playFelizSound,
        playTriste: playTristeSound,
        playIrritado: playIrritadoSound,
        playMedo: playMedoSound
    };
}