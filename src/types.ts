export interface Playlist {
  PlaylistItem: (PlayingItem | NoneItem)[];
}

type PlayingItem = {
  $: {
    State: 'playing';
    PlaybackPosition: string;
    PlaybackEnd: string;
  };
  Title: string;
  DatabaseId: string;
};

type NoneItem = {
  $: {
    State: 'none';
    Time: string;
  };
  Title: string;
  DatabaseId: string;
};
