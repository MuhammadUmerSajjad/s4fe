import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";
import ValidationComponent from 'react-native-form-validator';

const { height, width } = Dimensions.get('window');

export default class PhoneNumber extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: 0,
            verificationCode: 0,
            firstCode: '',
            secondCode: '',
            thirdCode: '',
            fourthCode: '',
        }
        this.inputRef = React.createRef();
        this.state.phoneNumber = this.props.navigation.getParam('phoneNumber')

    }

    handleChange = (value) => {
        this.setState({verificationCode: value });
        console.log('state', typeof this.state.verificationCode)
    }

    handleNext() {
        const isValid =  this.validate({
            phoneNumber: {required: true},
            verificationCode: {required: true},
        });
        if (isValid) {
            this.props.navigation.navigate('SignupEmail', {
                phoneVerificationData: this.state
            })
        }
    }
    focus = () => {this.inputRef.focus()}

    render() {
        const { navigation } = this.props;
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={['#EBA721', '#EBA721']}
                style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}>
                <Block flex middle>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <Block style={{ marginTop: height * 0.2 }}>
                            <Block row center space="between">
                                <Text style={{color: 'white', fontSize: 25, padding: 20,}}>
                                    Please enter the 4-digit code sent to your number {' '}
                                    {this.state.phoneNumber}
                                </Text>
                            </Block>
                        </Block>

                        <Block flex={1} style={{ marginTop: height * 0.05 }} center space="between">
                            <Block center>
                                <Input
                                    color={theme.COLORS.ERROR}
                                    autoFocus
                                    type='number-pad'
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    borderless
                                    color="white"
                                    autoCapitalize="none"
                                    style={[styles.code]}
                                    maxLength={4}
                                    onChangeText={text => this.handleChange(text)}
                                    returnKeyType="done"
                                />
                            </Block>

                            <Block left>
                                <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                                    {this.getErrorMessages()}
                                </Text>
                            </Block>

                            <Block flex top style={{ marginTop: 20 }}>
                                <Button
                                    shadowless
                                    style={{ height: 48 }}
                                    color={materialTheme.COLORS.WHITE}
                                    onPress={() => this.handleNext()}
                                >
                                    <Text>SUBMIT</Text>
                                </Button>

                                <Block style={{marginTop: 20}}>
                                    <Text left color={theme.COLORS.WHITE} size={theme.SIZES.FONT + 2}>
                                        You haven't received a code?
                                    </Text>

                                    <Text
                                        onPress={() => navigation.navigate('PhoneNumber')}
                                        left
                                        color={theme.COLORS.WHITE}
                                        size={theme.SIZES.FONT + 2}
                                    >
                                        Edit your phone number
                                    </Text>
                                </Block>

                            </Block>
                        </Block>
                    </KeyboardAvoidingView>
                </Block>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    signup: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1
    },
    input: {
        width: width * 0.9,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    },
    code: {
        width: width * 0.5,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
        marginRight: 20
    },
    inputActive: {
        borderBottomColor: "white",
    },
});
