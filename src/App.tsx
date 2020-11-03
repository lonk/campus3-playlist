import { ref, defineComponent } from 'vue';

const App = defineComponent({
  setup() {
    const foo = ref('Foo');

    return () => <div>{foo.value}</div>;
  }
});

export default App;
