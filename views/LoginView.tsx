import { Text, TouchableOpacity, View, TextInput } from 'react-native';

export function LoginView({ navigation }: any) {
    return (
        <View className='flex-1 justify-center items-center bg-gray-500 pr-5 pl-5 justify-betwenn'>
            <View className='p-6 justify-center items-center bg-white rounded-lg w-full'>
                <Text className='font-bold text-3xl'>Login</Text>
                <View className='justify-center items-centerw-full'>
                    <Text className='self-start font-semibold mb-3'>Usuário</Text>
                    <TextInput
                        className='border border-gray-300 rounded-lg p-6 w-full'
                        placeholder='Informe o seu usuário' />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <View className='p-6 justify-center items-center bg-green-500 rounded-lg'>
                        <Text className='text-white font-bold'>Entrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
