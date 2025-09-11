import {create} from 'zustand';

interface PlayerStoreState {
  isPlaying: boolean;
  currentTrackId: string;
  playFromItem: any;
  isBismillah: boolean;
  pausePlaying: boolean;
  isDownloading: boolean;
  trackIndex: any;
  duaPlaying: boolean;
  stopPlaying: boolean;
  playTrack: (trackId: string) => void;
  pauseTrack: () => void;
}

const playerStore = create<PlayerStoreState>((set, get) => ({
  isPlaying: false,
  currentTrackId: '',
  playFromItem: null,
  isBismillah: false,
  pausePlaying: false,
  isDownloading: false,
  trackIndex: 0,
  duaPlaying: false,
  stopPlaying: false,
  playTrack: (trackId: string) => {
    set({
      isPlaying: true,
      currentTrackId: trackId,
      playFromItem: 0,
      isBismillah: false,
      pausePlaying: false,
      isDownloading: false,
      trackIndex: 0,
      duaPlaying: false,
      stopPlaying: true,
    });
  },
  pauseTrack: () => {
    set({
      isPlaying: false,
      currentTrackId: '',
    });
  },
}));

export default playerStore;