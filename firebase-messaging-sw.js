importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC0Zc4seMa9YvG70QUgFuczREPdNoof2cU",
  authDomain: "peakberry.firebaseapp.com",
  databaseURL: "https://peakberry-default-rtdb.firebaseio.com",
  projectId: "peakberry",
  storageBucket: "peakberry.firebasestorage.app",
  messagingSenderId: "74123358428",
  appId: "1:74123358428:web:bd23a7d87789b70aad8419"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신
messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || '피크베리 알림';
  const body  = payload.notification?.body  || '';
  const icon  = payload.notification?.icon  || '/icon-192.png';

  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    badge: icon,
    tag: payload.data?.tag || 'peakberry',
    data: payload.data || {},
    vibrate: [200, 100, 200]
  });
});

// 알림 클릭 시 앱 포커스
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(list) {
      for (var c of list) {
        if (c.url && 'focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
