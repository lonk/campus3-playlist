import { computed, onMounted, ref } from 'vue';
import { parseStringPromise } from 'xml2js';
import axios from 'axios';

import { Playlist } from './types';

const sourceUrl = process.env.VUE_APP_XML_SOURCE;

export const useDisplay = () => {
  const playlist = ref<Playlist>();

  const pollSource = async () => {
    if (!sourceUrl) return;

    try {
      const result = await axios.get<string>(sourceUrl);

      playlist.value = await parseStringPromise(result.data, {
        explicitArray: false
      });
    } catch (err) {
      console.log(err);
      return;
    }

    setTimeout(pollSource, 500);
  };

  onMounted(pollSource);

  const playlistItems = computed(() =>
    (playlist.value?.Playlist.PlaylistItem || []).map(data => {
      const classes = data.$.State === 'playing' ? ['table-primary'] : [];

      const start = data.$.State === 'none' ? data.$.Time : 'En cours';

      const displayProgressBar = data.$.State === 'playing';

      const label =
        data.$.State === 'playing'
          ? `${data.$.PlaybackPosition}s / ${data.$.PlaybackEnd}s`
          : `0s / ${data.Duration}s`;

      const completion =
        data.$.State === 'playing'
          ? (parseFloat(data.$.PlaybackPosition) /
              parseFloat(data.$.PlaybackEnd)) *
            100
          : 0;

      return {
        id: data.DatabaseID,
        title: data.Title,
        classes,
        start,
        displayProgressBar,
        label,
        completion
      };
    })
  );

  return { playlistItems };
};
