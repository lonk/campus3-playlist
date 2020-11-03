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

    setTimeout(pollSource, 1000);
  };

  onMounted(pollSource);

  const playedItem = computed(() => playlist.value?.PlaylistItem[0]);
  const nextItems = computed(() =>
    playlist.value?.PlaylistItem.filter(item => item.$.State === 'none')
  );

  return { playedItem, nextItems };
};
