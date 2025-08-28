import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const useAudio = (source: number) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const loadSound = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(source);
    setSound(newSound);
  };

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    } else {
      await loadSound();
      await playSound();
    }
  };

  useEffect(() => {
    if (source) {
      loadSound();
    }
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [source]);

  return { playSound };
};