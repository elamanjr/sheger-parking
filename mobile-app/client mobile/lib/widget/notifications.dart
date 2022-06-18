import 'package:awesome_notifications/awesome_notifications.dart';

import '../constants/uniqueId.dart';

Future<void> createNotification(String branchName, String startingTime, String startDate, String slot) async {
  await AwesomeNotifications().createNotification(
    content: NotificationContent(
        id: createUniqueId(),
        channelKey: 'basic_channel',
        title: 'Sheger Parking',
        body:
            'Your reservation at branch $branchName on slot $slot is expiring in 10 minutes. ($startDate | $startingTime)',
        notificationLayout: NotificationLayout.BigText),
  );
}
