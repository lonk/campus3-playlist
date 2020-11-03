export interface Playlist {
  Playlist: {
    PlaylistItem: (PlayingItem | NoneItem)[];
  };
}

type PlayingItem = {
  $: {
    State: 'playing';
    PlaybackPosition: string;
    PlaybackEnd: string;
  };
  Title: string;
  DatabaseID: string;
  Duration: string;
};

type NoneItem = {
  $: {
    State: 'none';
    Time: string;
  };
  Title: string;
  DatabaseID: string;
  Duration: string;
};
