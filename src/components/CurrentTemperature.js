import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default CurrentTemperature = (props) => {

    const language = props.language;
    return (
        <View style={styles.viewDisplayCurrentWeather}>
            <Image
                source={{ uri: props.iconWeather }}
                style={styles.iconWeather}
            />
            <Text style={styles.currentTemperature}>
                {props.currentTemperature}C
            </Text>
            <Text style={styles.textWeatherDescription}>
                {props.weatherDescription}
            </Text>
            <View style={styles.line}></View>
            <View style={styles.viewMoreInfo}>
                <View style={styles.itemMoreInfo}>
                    <Text style={{ ...TEXT }}>
                        {language === 'en' ? 'Wind Speed' : 'Tốc độ gió'}
                    </Text>
                    <Text style={{ ...TEXT }}>
                        {props.windSpeed} km/h
                    </Text>
                </View>
                <View style={styles.itemMoreInfo}>
                    <Text style={{ ...TEXT }}>
                        {language === 'en' ? 'Wind Direction' : 'Hướng gió'}
                    </Text>
                    <Text style={{ ...TEXT }}>
                        {props.windDirection}
                    </Text>
                </View>
                <View style={styles.itemMoreInfo}>
                    <Text style={{ ...TEXT }}>
                        {language === 'en' ? 'Wind Gust' : 'Cơn gió mạnh'}
                    </Text>
                    <Text style={{ ...TEXT }}>
                        {props.windGust}
                    </Text>
                </View>
            </View>
            <View style={styles.line}></View>
        </View>
    );
}

const TEXT = {
    color: "#fff",
}

const styles = StyleSheet.create({
    viewDisplayCurrentWeather: {
        alignItems: 'center',
        marginBottom: 10,
    },
    currentTemperature: {
        ...TEXT,
        fontSize: 50,

    },
    textWeatherDescription: {
        ...TEXT,
        fontSize: 25,
    },
    iconWeather: {
        width: 80,
        height: 80,

    },
    line: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        width: '100%',
        marginVertical: 15
    },
    viewMoreInfo: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    itemMoreInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})