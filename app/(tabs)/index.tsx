import React from 'react'
import { FlatList, TouchableOpacity, Text, StyleSheet, Image, View, SafeAreaView } from 'react-native'
import { useQuery } from 'react-query'
import { fetchHomes, Home } from '../../api/mockApi'
import { useRouter } from 'expo-router'

const HomeList = () => {
    const { data: homes, isLoading } = useQuery('homes', fetchHomes)
    const router = useRouter()

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={homes}
                keyExtractor={(item: Home) => item.id}
                renderItem={({ item }: { item: Home }) => (
                    <TouchableOpacity
                        style={styles.homeItem}
                        onPress={() => {
                            router.replace(`/detail/${item.id}` as any)
                        }}
                    >
                        <Image source={{ uri: item.image }} style={styles.homeImage} />
                        <View style={styles.homeTextContainer}>
                            <Text style={styles.homeAddress}>{item.address}</Text>
                            <Text style={styles.homeDescription}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContent}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    flatListContent: {
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    homeItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    homeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    homeTextContainer: {
        padding: 16,
    },
    homeAddress: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    homeDescription: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default HomeList
