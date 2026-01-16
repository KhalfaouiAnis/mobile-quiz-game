import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { MainCardTitle } from './main-card-title';
import { VIEW_SCALE_FACTOR } from '@/core/constants';
import { boxShadow } from '@/core/utils/cn';

interface MainCardProps {
    title: string;
    content: ReactNode;
    infoPopup?: boolean
}

export function MainCard({ title, content, infoPopup }: MainCardProps) {
    return (
        <View
            style={[{ width: 260 * VIEW_SCALE_FACTOR, height: 210 * VIEW_SCALE_FACTOR }, boxShadow().button]}
            className="relative flex-1 pb-2 mt-2 rounded-xl border border-error bg-white">
            <MainCardTitle title={title} />
            {content}
            {
                infoPopup && (
                    <View className='absolute rounded-full bg-error bottom-1 -end-1 z-10 items-center justify-center p-1'>
                        <Text className='text-center font-bagel-regular text-white text-xl w-6 h-6'>
                            i
                        </Text>
                    </View>
                )
            }
        </View>
    );
};