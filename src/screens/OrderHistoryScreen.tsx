import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Importing necessary components from React Native library

import React, {useState} from 'react';
// Importing React library and useState hook

import {useStore} from '../store/store';
// Importing a custom hook for state management from the store

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
// Importing a hook to get the height of the bottom tab bar

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
// Importing constants for styling from a theme file

import HeaderBar from '../components/HeaderBar';
// Importing a custom HeaderBar component

import EmptyListAnimation from '../components/EmptyListAnimation';
// Importing a custom EmptyListAnimation component for empty list animations

import PopUpAnimation from '../components/PopUpAnimation';
// Importing a custom PopUpAnimation component for popup animations

import OrderHistoryCard from '../components/OrderHistoryCard';
// Importing a custom OrderHistoryCard component for displaying order history

const OrderHistoryScreen = ({navigation}: any) => {
// Main functional component for the OrderHistoryScreen

  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  // Using custom hook to access the order history list from the store

  const tabBarHeight = useBottomTabBarHeight();
  // Getting the height of the bottom tab bar

  const [showAnimation, setShowAnimation] = useState(false);
  // Defining state variable to show or hide the popup animation

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };
  // Function to handle navigation to the details screen with the given parameters

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };
  // Function to handle button press, shows animation for 2 seconds

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {/* Setting the status bar color */}

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}
      {/* Conditionally rendering the popup animation */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* ScrollView for the main content, disabling vertical scroll indicator */}

        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          {/* View to contain the main content, adjusting margin for bottom tab bar */}

          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />
            {/* Rendering the header bar with the title "Order History" */}

            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
            {/* Conditionally rendering the empty list animation or the list of order history cards */}
          </View>

          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {/* Conditionally rendering the download button if there are items in the order history list */}
        </View>
      </ScrollView>
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
    height: 250,
  },
  // Styles for the Lottie animation

  ScrollViewFlex: {
    flexGrow: 1,
  },
  // Styles for the ScrollView content container

  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  // Styles for the inner view of the ScrollView

  ItemContainer: {
    flex: 1,
  },
  // Styles for the container of items within the ScrollView

  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
  },
  // Styles for the container of the list items

  DownloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  // Styles for the download button

  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  // Styles for the text inside the download button
});

export default OrderHistoryScreen;
// Exporting the OrderHistoryScreen component as default
