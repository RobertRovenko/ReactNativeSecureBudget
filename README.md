# SecureBudgetReactNativeApp
My project for my React Native app using Javascript



My app is called Secure Budget and is an all in one economics app, used to track and calculate income and expenses, 
getting tips on when to save with a fear and greed index and a custom wishlist where you add stuff you want to save 
up to. Just create an account, or login to get started!

Aop.js is where I have done my navigation logic and set up the logic for my custom fonts. 

Screens folder is where i store all my screens, HomeScreen.js, LoginScreen.js, Stocks.js and Wishlist.js. 

Components folder is where I have different logic, Hello.tsk where I used typescript to make a rating system 
and Task.js where the logic for the Wishlist is made.

Lastly is my assets and images folders i put icons, logos, images and gifs which i use.

LOGIN SCREEN where you can register or login using firebase authentication. The logo is a hidden button where 
you can find extra text about the app. When you login you go to the home screen. If the user hasn't logged out 
since last use, it will automatically log in.

HOME SCREEN, you will be greeted with your email you signed up with and then you total budget. Followed by two 
buttons, one to add income to your total and one to subtract your expenses. It will update your total budget and 
display your balance history down under. Lastly there are four icons to navigate between at the bottom, the first
one is Stocks Screen, second one is the Wishlist, third one is a button to delete your balance history and reset 
your budget and lastly we have the settings icon. 

STOCKS SCREEN is a simple screen where you just get a live updating picture from alternative.me which displays the 
latest fear and greed index and you don't do much else here then to get an idea if you should save or invest. 

WISHLIST SCREEN is a different type of todo-list where you input items you wish to purchase and they get saved in a 
list. You type in what you want, then press the plus-button. If you wish to delete an item you can longpress to delete 
the items one by one. It consists of 2 components: my Task.js which is the logic and Wishlist.js which is the UI.  

SETTINGS is a modal from the home screen and has 3 main usages, the first one is to change the currency which ur budget 
is calculated with, to either SEK, USD or EURO, then we have s simple app rating system with stars wrote in typescript 
and lastly you can logout from the app!

I've used a lot of different concepts such as Authenticator with Firebase, Navigator, TypeScript, Stylesheet, useEffect, 
useState, AsyncStorage, useRef, StatusBar, Animations and easier stuff like KeyboardAvoidingView, Text, View, Image, 
TextInput, TouchableOpacity, TouchableHighlight, Modal, Pressable, FlatList, Alert, Animated, Easing, ScrollView and lastly custom fonts!

What makes my app so nice and dynamic would be the Authenticator and AsyncStorage, I use Authenticator so each user has a 
separate account which makes the app secure and I use Async to save the users balance, balancehistory and wishlist items. 
So everytime the user logs out and back in, all their data is saved and stored. Then when the user inputs cash i play a 
small animation at the top of the homescreen as a confirmation.

My design is darktheme with suiting gray and white colors to make the text easy to read. I use icons for navigation 
and big buttons. I use flex with views to structure each screen and inside the views I design each component. 

![loginscreen](https://user-images.githubusercontent.com/32544623/216104807-203cfeb7-0bd0-4716-b977-4375686f28a4.JPG)
![homescreen](https://user-images.githubusercontent.com/32544623/216104822-ad02e153-b12a-4b29-af61-bb421c3e0214.JPG)
