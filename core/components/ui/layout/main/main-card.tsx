import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { MainCardTitle } from './main-card-title';
import { VIEW_SCALE_FACTOR } from '@/core/constants';
import { boxShadow } from '@/core/utils/cn';
import { moderateScale, scale, verticalScale } from '@/core/utils/sizes';

interface MainCardProps {
    title: string;
    content: ReactNode;
    infoPopup?: boolean
}

export function MainCard({ title, content, infoPopup }: MainCardProps) {
    return (
        <View
            style={[{ width: scale(250) * VIEW_SCALE_FACTOR, height: verticalScale(230) * VIEW_SCALE_FACTOR }, boxShadow().button]}
            className="relative flex-1 pb-2 mt-2 rounded-xl border border-error bg-white">
            <MainCardTitle title={title} />
            {content}
            {
                infoPopup && (
                    <View className='absolute rounded-full bg-error bottom-1 -end-1 z-10 items-center justify-center p-1'>
                        <Text
                            style={{width: scale(24), height: scale(24), fontSize: moderateScale(20)}}
                            className='text-center font-bagel-regular text-white'>
                            i
                        </Text>
                    </View>
                )
            }
        </View>
    );
};