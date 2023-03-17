import { StyleSheet } from 'react-native'

export const useToggleColor = (value: boolean, width: any) => {
    if (value) {
        return StyleSheet.create({
            style: {
                backgroundColor: 'red',
                color: '#fff',
                width: width * 0.8,
                fontSize: 19,
                fontWeight: 'bold',
                marginTop: 20,
                padding: 10,
                borderRadius: 10,
                borderColor: '#000',
                borderWidth: 1,
                borderStyle: 'dashed',
            }
        })
    }
    return StyleSheet.create({
        style: {
            width: width * 0.8,
            fontSize: 19,
            fontWeight: 'bold',
            color: '#000',
            marginTop: 20,
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderColor: '#000',
            borderWidth: 1,
            borderStyle: 'dashed',
        }
    })

}