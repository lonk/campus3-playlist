import { defineComponent } from 'vue';
import { useDisplay } from './useDisplay';

const App = defineComponent({
  setup() {
    const { playlistItems } = useDisplay();

    return () => (
      <table class="table table-striped">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titre</th>
            <th scope="col">Début</th>
            <th scope="col">Progression</th>
          </tr>
        </thead>
        <tbody>
          {playlistItems.value.map((data, index) => (
            <tr key={data.id} class={data.classes}>
              <th scope="row">{index + 1}</th>
              <td>{data.title}</td>
              <td>{data.start}</td>
              <td>
                {data.displayProgressBar ? (
                  <div class="progress">
                    <div
                      class={data.progressBarColor}
                      role="progressbar"
                      style={`width: ${data.completion}%`}
                      aria-valuenow={data.completion}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {data.label}
                    </div>
                  </div>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
});

export default App;
