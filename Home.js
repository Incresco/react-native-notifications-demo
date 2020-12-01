import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Notifications} from 'react-native-notifications';

const scheduleNotification = (title, body, id, index) => {
  const date = new Date(Date.now() + 20 * (index + 1) * 1000);
  console.log(date);
  const notification = {
    title,
    body,
    silent: false,
    userInfo: {},
    fireDate: date,
  };
  Notifications.postLocalNotification(notification, id);
};

class Home extends Component {
  constructor(props) {
    super(props);
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
      (
        notification: Notification,
        completion: (response: NotificationCompletion) => void,
      ) => {
        console.log('Notification Received - Foreground', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      },
    );
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Button
          title="Send Local notification"
          onPress={() =>
            Notifications.postLocalNotification({
              title: 'Local notification',
              body: 'This notification was generated by the app!',
              extra: 'data',
            })
          }></Button>

        {/* <Button
          style={{marginVertical: 10}}
          title="Send Local notification in 1 min"
          onPress={() =>
            scheduleNotification(
              'Local notification in 1 min',
              'This notification was generated by the app!',
              11231,
              6,
            )
          }></Button> */}
      </View>
    );
  }
}

export default Home;
