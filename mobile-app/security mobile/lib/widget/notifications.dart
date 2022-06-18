import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:sheger_parking_security/constants/uniqueId.dart';

Future<void> createNotification(String plateNumber) async {
  await AwesomeNotifications().createNotification(
    content: NotificationContent(
        id: createUniqueId(),
        channelKey: 'basic_channel',
        title: 'Sheger Parking',
        body: 'The reservation with plate number $plateNumber has expired!',
        notificationLayout: NotificationLayout.BigText),
  );
}
