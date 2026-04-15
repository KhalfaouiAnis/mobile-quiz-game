import { Stack } from 'expo-router';
import { useGameChallengeEvents } from '@/src/hooks/useGameChallengeEvents';

/**
 * useGameChallengeEvents is called here — once — so it stays alive across all game
 * screens. Listeners are attached immediately; the socket connects in lobby.
 */
export default function GameLayout() {
    useGameChallengeEvents();
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: '#0F0F13' } }} />
    );
}