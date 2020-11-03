import { computed, onMounted, ref } from 'vue';
import { parseStringPromise } from 'xml2js';
import axios from 'axios';

import { Playlist } from './types';

const sourceUrl = process.env.VUE_APP_XML_SOURCE;

export const useDisplay = () => {
  const playlist = ref<Playlist>();
  const millisecondsSinceLastPolling = ref(0);
  const lastPolling = ref(0);

  const updateLocalTimer = () => {
    millisecondsSinceLastPolling.value =
      new Date().getTime() - lastPolling.value;
    requestAnimationFrame(updateLocalTimer);
  };

  const pollSource = async () => {
    if (!sourceUrl) return;

    try {
      const result = await axios.get<string>(sourceUrl);

      playlist.value = await parseStringPromise(result.data, {
        explicitArray: false
      });

      lastPolling.value = new Date().getTime();
    } catch (err) {
      console.log(err);
      return;
    }

    setTimeout(pollSource, 500);
  };

  onMounted(() => {
    pollSource();
    requestAnimationFrame(updateLocalTimer);
  });

  const playlistItems = computed(() =>
    (playlist.value?.Playlist.PlaylistItem || []).map(data => {
      const classes = data.$.State === 'playing' ? 'table-primary' : '';

      const start = data.$.State === 'none' ? data.$.Time : 'En cours';

      const displayProgressBar = data.$.State === 'playing';

      const playbackEnd =
        data.$.State === 'playing' ? parseFloat(data.$.PlaybackEnd) * 100 : 1;

      const playbackPosition =
        data.$.State === 'playing'
          ? Math.min(
              parseFloat(data.$.PlaybackPosition) * 100 +
                millisecondsSinceLastPolling.value,
              playbackEnd
            )
          : 0;

      const completion =
        data.$.State === 'playing' ? (playbackPosition / playbackEnd) * 100 : 0;

      const label =
        data.$.State === 'playing'
          ? `${(playbackPosition / 100).toFixed(0)}s / ${(
              playbackEnd / 100
            ).toFixed(0)}s`
          : `0s / ${data.Duration}s`;

      const progressBarColor =
        playbackEnd - playbackPosition < 10000
          ? 'progress-bar progress-bar-striped bg-danger'
          : 'progress-bar progress-bar-striped';

      return {
        id: data.DatabaseID,
        title: data.Title,
        classes,
        start,
        displayProgressBar,
        label,
        completion,
        progressBarColor
      };
    })
  );

  return { playlistItems };
};
