<template>
  <div class="song-list elevation-3">
    <div v-for="song in songs" :key="song._key" class="song">
      <div class="song__title can-truncate">{{ song.name }}</div>
      <div class="song__arranger">{{ song.arranger }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeasonSongsList",
  props: {
    /**
     * Season songs
     */
    songs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
  background-color: white;
  border-radius: 8px;

  > .song:not(:last-of-type) {
    border-bottom: 1px solid $color-grey-light;
  }
}

.song {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 12px;

  @include smUp() {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.song__title {
  font-weight: 500;
  color: $theme-primary-dark;
}

.song__arranger {
  color: $color-grey-dark;
  font-size: 0.9rem;
  font-weight: 300;
}
</style>
