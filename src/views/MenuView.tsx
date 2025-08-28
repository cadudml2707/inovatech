import { Text, View, TouchableOpacity } from 'react-native';
import { MenuViewModel } from '~/viewmodel/MenuViewModel';

export function MenuView() {

    const { playFeliz, playTriste, playIrritado, playMedo } = MenuViewModel(); 

    return (
        <View className='flex-1 justify-center items-center bg-gray-900 gap-10 pr-10 pl-10'>
            <Text className='text-white text-2xl font-bold'>Como você está se sentindo?</Text>
            <TouchableOpacity onPress={playFeliz} className='items-center bg-yellow-500 p-4 rounded-lg w-full'>
                <Text className='text-white text-2xl'>Feliz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playTriste} className='items-center bg-blue-500 p-4 rounded-lg w-full'>
                <Text className='text-white text-2xl'>Triste</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playIrritado} className='items-center bg-red-500 p-4 rounded-lg w-full'>
                <Text className='text-white text-2xl'>Irritado</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playMedo} className='items-center bg-indigo-500 p-4 rounded-lg w-full'>
                <Text className='text-white text-2xl'>Medo</Text>
            </TouchableOpacity>
        </View>
    );
}
