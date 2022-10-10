<template>
  <div id="app">
    <h1>Hello, world!</h1>
    <button class="btn-install" @click="installApp">
      <span>Cài đặt ứng dụng</span>
    </button>
  </div>
</template>

<script>
// eslint-disable-next-line
import firebase from './firebaseinit';

export default {
  data() {
    return {
      swRegistration: null,
      lengthNoti: 0,
      count: 0,
      beforeinstallprompt: null,
    };
  },
  created() {
    this.getNotiJob();
    this.initializeApp();
    this.getNotiTrouble();
    this.getNotiKTCloseTrouble();
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.beforeinstallprompt = e;
    });
  },
  methods: {
    async installApp() {
      this.beforeinstallprompt.prompt();
    },
    // noti job
    async getNotiJob() {
      this.initialGetNoti('new_job/', (snapshot) => {
        const idJob = snapshot.id;
        this.displayNotification({
          title: 'Có công việc mới',
          body: snapshot.title_task,
          data: `job/${idJob}`,
        });
      });
    },
    // noti trouble
    async getNotiTrouble() {
      this.initialGetNoti('new_trouble/', (snapshot) => {
        const idTrouble = snapshot.id;
        this.displayNotification({
          title: 'Có sự cố mới',
          body: snapshot.title_trouble,
          data: `trouble/${idTrouble}`,
        });
      });
    },
    // noti trouble
    async getNotiKTCloseTrouble() {
      this.initialGetNoti('next_step_trouble/', (snapshot) => {
        const idTrouble = snapshot.id;
        this.displayNotification({
          title: 'Có sự cố mới',
          body: snapshot.title_trouble,
          data: `trouble/${idTrouble}`,
        });
      });
    },
    initialGetNoti(key, cb) {
      const ref = firebase.database().ref(key);
      ref.on('child_added', (snapshot, ...rest) => {
        cb(snapshot.val(), ...rest);
      });
    },
    initializeApp() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready.then((swReg) => {
          this.swRegistration = swReg;
        });
      }
    },
    displayNotification(param) {
      const options = {
        body: param.body,
        data: `${window.location.origin}/#/quan-ly-${param.url}`,
      };
      if (window.Notification && Notification.permission === 'granted') {
        this.swRegistration.showNotification(param.title, options);
      } else if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission((status) => {
          if (status === 'granted') {
            this.swRegistration.showNotification(param.title, options);
          }
        });
      }
    },
  },
};
</script>
