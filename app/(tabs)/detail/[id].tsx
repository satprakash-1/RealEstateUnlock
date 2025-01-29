import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { fetchHomes } from '../../../api/mockApi'
import { useQuery } from 'react-query'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { calculateDistance } from '../../../utils/locationUtils'
import { Image } from 'react-native'

const HomeDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data: homes } = useQuery('homes', fetchHomes)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isUnlocked, setIsUnlocked] = useState(false)

    // Find the home with the matching ID
    const home = homes?.find((h: any) => h.id === id)

    // Request location permission and get current location
    useEffect(() => {
        ;(async () => {
            setIsLoading(true)
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setIsLoading(false)
                setErrorMsg('Permission to access location was denied')
                return
            }

            let location = await Location.getCurrentPositionAsync({})
            setIsLoading(false)
            setLocation(location)
        })()
    }, [])

    // Simulate API call to unlock the home
    const simulateUnlockAPI = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.5 // Simulate success/failure
                if (success) {
                    resolve('Home unlocked successfully!')
                } else {
                    reject('Failed to unlock the home. Please try again.')
                }
            }, 1000) // Simulate network delay
        })
    }

    // Handle Unlock Button Press
    const handleUnlock = async () => {
        if (location && home) {
            const distance = calculateDistance(location.coords.latitude, location.coords.longitude, home.latitude, home.longitude)

            if (distance <= 30) {
                setIsLoading(true)
                try {
                    const result = await simulateUnlockAPI()
                    setIsUnlocked(true)
                    Alert.alert('Success', result as string)
                } catch (error) {
                    Alert.alert('Error', error as string)
                } finally {
                    setIsLoading(false)
                }
            } else {
                Alert.alert('Error', 'You are too far to unlock the home.')
            }
        }
    }

    if (!home) {
        return (
            <View style={styles.container}>
                <Text>Home not found.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: home.image }} style={styles.homeImage} />

            <Text style={styles.homeAddress}>{home.address}</Text>
            <Text style={styles.homeDescription}>{home.description}</Text>

            {location && calculateDistance(location.coords.latitude, location.coords.longitude, home.latitude, home.longitude) <= 30 && (
                <TouchableOpacity style={[styles.unlockButton, isUnlocked && styles.unlockButtonDisabled]} onPress={handleUnlock} disabled={isLoading || isUnlocked}>
                    <Text style={styles.unlockButtonText}>{isUnlocked ? 'Unlocked' : 'Unlock'}</Text>
                </TouchableOpacity>
            )}

            {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
            <SafeAreaView style={{ flex: 1 }} />
            {isLoading && <ActivityIndicator color="#fff" size={'large'}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 16,
        backgroundColor: '#000',
    },
    homeAddress: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        color: '#fff',
    },
    homeDescription: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 24,
    },
    unlockButton: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    unlockButtonDisabled: {
        backgroundColor: '#ccc',
    },
    unlockButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 16,
    },
    homeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
    },
})

export default HomeDetails
