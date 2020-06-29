import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    Dimensions,
    TouchableOpacity,
    FlatList,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            data: [],
            usertoken: '',
            isLoading: true,
        }
    }
    componentDidMount() {
        this.readToken()
    }
    readToken = async () => {
        try {
            const value = await AsyncStorage.getItem('usertoken')
            if (value !== null) {
                // value previously stored
                console.log(value)
                this.setState({ usertoken: value, isLoading: false }, () => {
                    this.afterSetStateFinished()
                })

            }
        } catch (e) {
            // error reading value
        }
    }

    afterSetStateFinished() {
        const url = "http://10.0.2.2:8000/api/userlist/";
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Token ' + this.state.usertoken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({ data: res['data'], count: res['data'].length })
                console.log(this.state.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }

  

    render() {
        if (this.state.isLoading == true) {
            return <View><Text>Loading...</Text></View>;
        }
        else if (this.state.count === 0) { return <View><Text>Loading...</Text></View>; }
        else {
            return (
                <View style={styles.container}>
                    <FlatList style={styles.list}
                        contentContainerStyle={styles.listContainer}
                        data={this.state.data}
                        horizontal={false}
                        numColumns={2}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }}>
                                    <View style={styles.cardHeader}>
                                        <Image style={styles.icon} source={{ uri: "https://img.icons8.com/flat_round/64/000000/hearts.png" }} />
                                    </View>
                                    <Image style={styles.userImage} source={require('../../assets/dummy_image.jpeg')} />
                                    <View style={styles.cardFooter}>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={styles.name}>{item.first_name + ' ' + item.last_name}</Text>
                                            <TouchableOpacity style={styles.ViewButton} onPress={() =>  this.props.navigation.navigate('UserProfile',{data:item})}>
                                                <Text style={styles.ViewButtonText}>View Profile</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#3268a8',
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: '#3268a8',

    },
    listContainer: {
        alignItems: 'center'
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        borderColor: "#DCDCDC",
        borderWidth: 3,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontWeight: 'bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#696969"
    },
    ViewButton: {
        marginTop: 10,
        height: 35,
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#3268a8",
    },
    ViewButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    icon: {
        height: 20,
        width: 20,
    }
});     