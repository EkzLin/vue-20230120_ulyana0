import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      title: '',
      meetupId: '',
    };
  },
  watch: {
    meetupId: {
      handler(newValue, oldValue) {
        this.title = fetchMeetupById(newValue, oldValue).then((data) => {
          this.title = data.title;
        });
      },
    },
  },
});
const app = createApp(App);
const vm = app.mount('#app');

window.vm = vm;
