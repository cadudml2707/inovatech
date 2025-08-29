import { useAudio } from "~/components/useAudio";

export function FrasesViewModel() {

    const audioBomDia = require('../assets/audios/bom_dia.mp3');
    const audioBoaNoite = require('../assets/audios/boa_noite.mp3');
    const audioBoaTarde = require('../assets/audios/boa_tarde.mp3');
    const audioComoVai = require('../assets/audios/como_vai.mp3');
    const audioEstouBem = require('../assets/audios/estou_bem.mp3');

    const { playSound: playBomDiaSound } = useAudio(audioBomDia);
    const { playSound: playBoaNoiteSound } = useAudio(audioBoaNoite);
    const { playSound: playBoaTardeSound } = useAudio(audioBoaTarde);
    const { playSound: playComoVaiSound } = useAudio(audioComoVai);
    const { playSound: playEstouBemSound } = useAudio(audioEstouBem);

    return {
        playBomDia: playBomDiaSound,
        playBoaNoite: playBoaNoiteSound,
        playBoaTarde: playBoaTardeSound,
        playComoVai: playComoVaiSound,
        playEstouBem: playEstouBemSound
    };
}