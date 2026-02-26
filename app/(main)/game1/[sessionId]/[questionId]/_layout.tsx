import GameActions from '@/core/components/game1/teams/game-actions';
import Container from '@/core/components/ui/shared/container';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function QuestionLayout() {

    return (
        <Container backgroundColor="#00A6DA">
            <View className="flex-1 flex-row">
                <GameActions isTeamA teamName="Team A" />
                <View className='flex-1 mb-2 items-center ms-1'>
                    <View className='border border-error bg-white rounded-md px-6 py-2 mt-0.5'>
                        <Text className='text-error font-cairo-bold text-xl'>
                            إسلاميات
                        </Text>
                    </View>
                    <View className="flex-1 w-full bg-white mx-2 mt-1 rounded-xl">
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: 'transparent' }
                            }} />
                    </View>
                </View>
                <GameActions teamName="Team B" />
            </View>
        </Container>

    );
}