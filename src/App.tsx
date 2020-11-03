import { defineComponent } from 'vue';
import { useDisplay } from './useDisplay';

const App = defineComponent({
  setup() {
    const { playedItem, playlistItems } = useDisplay();

    return () => (
      <table class="table table-striped">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titre</th>
            <th scope="col">Début</th>
            <th scope="col">Fin</th>
            <th scope="col">Progression</th>
          </tr>
        </thead>
        <tbody>
          {playlistItems.value.map((data, index) => {
            const classes =
              data.DatabaseID === playedItem.value?.DatabaseID
                ? ['table-primary']
                : [];

            const start = data.$.State === 'none' ? data.$.Time : 'En cours';

            return (
              <tr key={data.DatabaseID} class={classes}>
                <th scope="row">{index}</th>
                <td>{data.Title}</td>
                <td>{start}</td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
});

export default App;
