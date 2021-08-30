import React, { useState } from 'react';
import { FlatList, Image, SectionList, StyleSheet, Text, View } from 'react-native';

const convertDateToDayName = (date, lang) => {
    let daysArray = lang === 'en' ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        : ['CHủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    var dateObj = new Date(date);
    let weekdayNum = dateObj.getDay();
    return daysArray[weekdayNum];

}

const filterData = (data,lang) => {
    let newData = [];
    let dataSize = data.length - 1;
    let index = 0;
    let prevDate = '';
    for (let i = 0; i < dataSize; i++) {
        let [date, time] = data[i].dt_txt.split(' ', 2);
        if (prevDate !== date) {
            newData.push(
                {
                    title: `${convertDateToDayName(date,lang)} (${date})`,
                    data: [{
                        time: time.slice(0, 5),
                        icon: data[i].weather[0].icon,
                        temp_min: Math.round(data[i].main.temp_min),
                        temp_max: Math.round(data[i].main.temp_max),
                        weather_description: data[i].weather[0].description
                    }]
                }
            );
            index++;
        } else {
            if (index > 0) {
                newData[index - 1].data.push(
                    {
                        time: time.slice(0, 5),
                        icon: data[i].weather[0].icon,
                        temp_min: Math.round(data[i].main.temp_min),
                        temp_max: Math.round(data[i].main.temp_max),
                        weather_description: data[i].weather[0].description
                    }
                );
            } else {
                newData.push(
                    {
                        title: date,
                        data: [{
                            time: time.slice(0, 5),
                            icon: data[i].weather[0].icon,
                            temp_min: Math.round(data[i].main.temp_min),
                            temp_max: Math.round(data[i].main.temp_max),
                            weather_description: data[i].weather[0].description
                        }]
                    }
                );
                index++;
            }

        }
        prevDate = date;
    }
    return newData;
}

export default WeatherForecast = (props) => {
    const language = props.language;
    const [data, setData] = useState(filterData(props.DATA,props.language));

    const renderItem = ({ item }) =>
        <View style={styles.viewItem}>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ ...TEXT }}>{item.time}</Text>
            </View>

            <View style={{ alignItems: 'center', width: '40%' }}>
                <Image
                    source={{ uri: `http://openweathermap.org/img/wn/${item.icon}@2x.png` }}
                    style={{ width: 50, height: 50 }}
                />
                <Text style={{ ...TEXT }}>{item.weather_description}</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>

                <Text style={{ ...TEXT }}>{item.temp_min}C</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ ...TEXT }}>{item.temp_max}C</Text>
            </View>
        </View>

    const renderSectionHeader = ({ section }) =>
        <Text style={{
            ...TEXT,
            textAlign: 'center',
            fontSize: 16,
            borderStyle: 'dotted',
            borderTopColor: '#ddd',
            borderTopWidth: 1,
            paddingTop: 5
        }}>
            {section.title}
        </Text>

    return (
        <View style={styles.container}>
            <Text style={styles.textFutures}>
                {language === 'en' ? 'Future (5 days)' : 'Dự báo (5 ngày)'}
            </Text>
            <SectionList
                sections={data}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => index}
            />

        </View>
    );
}

const TEXT = {
    color: "#fff",
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewItem: {
        flexDirection: "row",
        justifyContent: 'space-around',
        paddingVertical: 5,
    },
    textFutures: {
        ...TEXT,
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    }

})