import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { MainCardTitle } from './main-card-title';

interface MainCardProps {
    title: string;
    content: ReactNode;
    infoPopup?: boolean
}

export function MainCard({ title, content, infoPopup }: MainCardProps) {
    return (
        <View className="relative flex-row justify-between px-2 mt-2 rounded-xl border border-error">
            <MainCardTitle title={title} />
            {content}
            {
                infoPopup && (
                    <View className='absolute bottom-1 -end-1'>
                        <Text className='p-1 rounded-full bg-error'>
                            i
                        </Text>
                    </View>
                )
            }
        </View>
    );
};