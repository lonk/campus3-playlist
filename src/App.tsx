import { defineComponent } from 'vue';
import { useDisplay } from './useDisplay';

const App = defineComponent({
  setup() {
    const { playedItem, nextItems } = useDisplay();

    return () => <div></div>;
  }
});

export default App;
