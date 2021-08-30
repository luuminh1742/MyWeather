import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import HomeStyle from './styles/HomeStyle';
import { Picker } from '@react-native-picker/picker';
import CurrentTemperature from '../components/CurrentTemperature';
import WeatherForecast from '../components/WeatherForecast';
import DataProvinces from '../components/DataProvinces';
const styles = HomeStyle;

export default HomeScreen = () => {
    const [selectedProvince, setSelectedProvince] = useState('Thanh Hóa');
    const provinces = DataProvinces();
    const [selectedLanguage, setSelectedLanguage] = useState('vi');
    const languages = ['vi', 'en'];

    const [loadWeather, setLoadWeather] = useState(false);
    const [loadFutureWeather, setLoadFutureWeather] = useState(false);
    const [myWeather, setMyWeather] = useState({
        temperature: 0,
        weatherDescription: '',
        iconWeather: '',
        windSpeed: 0,
        windDirection: 0,
        windGust: 0
    });

    const [myFutureWeather, setMyFutureWeather] = useState([]);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedProvince}&appid=52ee5b22e95271b9fb71f00f0aa63743&units=metric&lang=${selectedLanguage}`)
            .then(res => res.json())
            .then(json => {
                setMyWeather({
                    temperature: json.main.temp,
                    weatherDescription: json.weather[0].description,
                    iconWeather: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
                    windSpeed: json.wind.speed,
                    windDirection: json.wind.deg,
                    windGust: json.wind.gust
                });
            }).catch(err => { console.log(error.message) })
            .finally(() => setLoadWeather(true));

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedProvince}&appid=52ee5b22e95271b9fb71f00f0aa63743&units=metric&lang=${selectedLanguage}`)
            .then(res => res.json())
            .then(json => {
                setMyFutureWeather(json.list);
            }).catch(err => { console.log(error.message) })
            .finally(() => setLoadFutureWeather(true));

        return () => {
            setMyWeather({});
            setMyFutureWeather([]);
            setLoadWeather(false);
            setLoadFutureWeather(false);
        }
    }, [selectedProvince, selectedLanguage]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/background.jpg')}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Picker
                        style={{
                            marginTop: 10,
                            color: '#fff',
                            width: '50%'
                        }}
                        selectedValue={selectedProvince}
                        onValueChange={itemVal => setSelectedProvince(itemVal)}
                        dropdownIconRippleColor='#0ff'
                        dropdownIconColor='#ffff'

                    >
                        {
                            provinces.map((item, index) => (
                                <Picker.Item
                                    label={item}
                                    value={item}
                                    key={index}

                                />
                            ))
                        }
                    </Picker>
                    <Picker
                        style={{
                            marginTop: 10,
                            color: '#fff',
                            width: '50%'
                        }}
                        selectedValue={selectedLanguage}
                        onValueChange={item => setSelectedLanguage(item)}
                        dropdownIconRippleColor='#0ff'
                        dropdownIconColor='#ffff'

                    >
                        {
                            languages.map((item, index) => (
                                <Picker.Item
                                    label={item === 'vi' ? 'Tiếng Việt' : 'English'}
                                    value={item}
                                    key={index}

                                />
                            ))
                        }
                    </Picker>
                </View>


                {
                    !loadWeather ?
                        <ActivityIndicator size="large" color="#00ff00" /> :
                        <CurrentTemperature
                            currentTemperature={myWeather.temperature}
                            weatherDescription={myWeather.weatherDescription}
                            iconWeather={myWeather.iconWeather}
                            windSpeed={myWeather.windSpeed}
                            windDirection={myWeather.windDirection}
                            windGust={myWeather.windGust}
                            language={selectedLanguage}
                        />
                }
                {
                    !loadFutureWeather ?
                        <ActivityIndicator size="large" color="#00ff00" /> :
                        <WeatherForecast
                            DATA={myFutureWeather}
                            language={selectedLanguage}
                        />
                }



            </ImageBackground>
        </View>
    );
}
