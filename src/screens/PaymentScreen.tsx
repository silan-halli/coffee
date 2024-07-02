import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// Importing necessary components from React Native library

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
// Importing constants for styling from a theme file

import GradientBGIcon from '../components/GradientBGIcon';
// Importing a custom GradientBGIcon component

import PaymentMethod from '../components/PaymentMethod';
// Importing a custom PaymentMethod component

import PaymentFooter from '../components/PaymentFooter';
// Importing a custom PaymentFooter component

import LinearGradient from 'react-native-linear-gradient';
// Importing LinearGradient component for gradient backgrounds

import Icon from 'react-native-vector-icons/FontAwesome';
// Importing Icon component from react-native-vector-icons library

import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import {useStore} from '../store/store';
// Importing a custom hook for state management from the store

import PopUpAnimation from '../components/PopUpAnimation';
// Importing a custom PopUpAnimation component for popup animations

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];
// Defining a list of payment methods with their respective names, icons, and icon type

const PaymentScreen = ({navigation, route}: any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  // Using custom hook to access the calculateCartPrice function from the store

  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );
  // Using custom hook to access the addToOrderHistoryListFromCart function from the store

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  // Defining state variable to store the selected payment mode

  const [showAnimation, setShowAnimation] = useState(false);
  // Defining state variable to show or hide the popup animation

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };
  // Function to handle button press, shows animation for 2 seconds, updates the order history and cart price, then navigates to the history screen

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {/* Setting the status bar color */}

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      {/* Conditionally rendering the popup animation */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* ScrollView for the main content, disabling vertical scroll indicator */}

        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          {/* TouchableOpacity for the back button with a GradientBGIcon */}

          <Text style={styles.HeaderText}>Payments</Text>
          {/* Header text "Payments" */}

          <View style={styles.EmptyView} />
          {/* Empty view for spacing/alignment purposes */}
        </View>

        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode == 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.LinearGradientStyle}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                  <View style={styles.CreditCardRow}>
                    <Icon1
                      name="integrated-circuit-chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Icon
                      name="cc-visa"
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>8923</Text>
                    <Text style={styles.CreditCardNumber}>6745</Text>
                    <Text style={styles.CreditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {/* TouchableOpacity to select Credit Card as the payment method, with detailed card information */}

          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
          {/* Mapping through PaymentList to render each payment method as a TouchableOpacity component */}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{price: route.params.amount, currency: '$'}}
        buttonPressHandler={buttonPressHandler}
      />
      {/* PaymentFooter component with a button to pay using the selected payment mode */}
    </View>
  );
};
// Returning the main component view

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  // Styles for the main container view

  LottieAnimation: {
    flex: 1,
  },
  // Styles for the Lottie animation

  ScrollViewFlex: {
    flexGrow: 1,
  },
  // Styles for the ScrollView content container

  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Styles for the header container

  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  // Styles for the header text

  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  // Styles for an empty view used for spacing/alignment

  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  // Styles for the payment options container

  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  // Styles for the credit card container

  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  // Styles for the credit card title

  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  // Styles for the credit card background

  LinearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  // Styles for the linear gradient background

  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    // Styles for the credit card row (chip and visa icon row)

    CreditCardNumberContainer: {
      flexDirection: 'row',
      gap: SPACING.space_10,
      alignItems: 'center',
    },
    // Styles for the container holding the credit card number blocks
  
    CreditCardNumber: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_18,
      color: COLORS.primaryWhiteHex,
      letterSpacing: SPACING.space_4 + SPACING.space_2,
    },
    // Styles for the credit card numbers
  
    CreditCardNameSubitle: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_12,
      color: COLORS.secondaryLightGreyHex,
    },
    // Styles for the credit card subtitle text (e.g., "Card Holder Name")
  
    CreditCardNameTitle: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_18,
      color: COLORS.primaryWhiteHex,
    },
    // Styles for the credit card title text (e.g., "Robert Evans")
  
    CreditCardNameContainer: {
      alignItems: 'flex-start',
    },
    // Styles for the container holding the cardholder's name
  
    CreditCardDateContainer: {
      alignItems: 'flex-end',
    },
    // Styles for the container holding the card's expiry date
  });
  
  export default PaymentScreen;
  
  
