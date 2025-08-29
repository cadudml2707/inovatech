import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { FrasesViewModel } from "~/viewmodel/FrasesViewModel";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function FrasesView() {

    const { playBomDia, playBoaNoite, playBoaTarde, playComoVai, playEstouBem } = FrasesViewModel();
    const [pesquisa, setPesquisa] = useState('');

    return (
        <View className="flex-1 bg-gray-900 justify-start items-center pr-10 pl-10 pt-10 gap-5">
            <View className="w-full items-center">
                <Text className='font-semibold mb-3 text-white text-2xl'>O que você deseja falar?</Text>
                <View className="flex-row w-full gap-5">
                    <TextInput
                        className='bg-gray-800 rounded-lg p-5 text-white flex-1'
                        placeholder='Informe o o que deseja falar'
                        placeholderTextColor="#9CA3AF"
                        onChangeText={setPesquisa}
                        value={pesquisa}
                    />
                    <TouchableOpacity className="bg-blue-500 p-6 rounded-lg">
                        <MaterialCommunityIcons name="account-voice" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="w-full h-[1px] bg-gray-600 my-4" />
            <View className="items-center w-full gap-4">
                <Text className=' font-semibold mb-3 text-white text-2xl'>Conte o que você deseja</Text>
                <TouchableOpacity onPress={playBomDia} className="items-center bg-yellow-500 p-4 rounded-lg w-full">
                    <Text className="text-white text-2xl">Bom dia!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playBoaNoite} className="items-center bg-blue-500 p-4 rounded-lg w-full">
                    <Text className="text-white text-2xl">Boa noite!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playBoaTarde} className="items-center bg-red-500 p-4 rounded-lg w-full">
                    <Text className="text-white text-2xl">Boa tarde!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playComoVai} className="items-center bg-indigo-500 p-4 rounded-lg w-full">
                    <Text className="text-white text-2xl">Como vai?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playEstouBem } className="items-center bg-green-500 p-4 rounded-lg w-full">
                    <Text className="text-white text-2xl">Estou bem!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
