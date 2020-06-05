<template>
  <Layout>
    <h2 class="about__title">Heart Cry Ensemble</h2>
    <section class="columns is-centered">
      <div class="about__content column is-10-tablet is-8-desktop">
        <blockquote class="about__mission-statement">
          Heart Cry Ensemble is a small mixed ensemble dedicated to preserving
          the quality of our spiritual musical heritage by impacting our
          community through the heart cry of music.
        </blockquote>
        <p>
          Heart Cry Ensemble was founded in 2018 by friends from two families:
          Wendell and Twyla Diefenbacher, and Kendall and Kyle Roth. They had
          grown up singing and wished to pursue it in a more organized fashion.
          Having been exposed to singing in various forms throughout childhood,
          they desired to continue this tradition in a small group setting.
        </p>
        <p>
          The ensemble has been singing together for several seasons. Although
          the ensemble was created as a mixed ensemble, it experimented with
          men's music when enough female singers could not be found for a
          season. Each season begins with several months of weekly rehearsals
          before a month of programs, both near and far.
        </p>
        <p>
          The ensemble has given programs in a variety of churches and
          audiences, ranging from Markham, ON to Detroit, MI. The group's
          primary focus has been to bring encouragement to churches with a
          minimal youth presence, but welcomes any opportunity to share their
          message.
        </p>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="scss" scoped>
@import "@styles/_variables";

.about__title {
  text-align: center;
  margin: 24px 0;
}

.about__content {
  padding: 0 32px;
  margin-bottom: 32px;

  > p:not(:first-of-type) {
    margin-top: 16px;
  }
}

.about__mission-statement {
  margin-bottom: 32px;
  padding: 8px 16px;
  font-weight: 500;
  color: $pink-dark;
  border: 4px solid $pink-light;
  border-top: none;
  border-bottom: none;
  border-radius: 4px;
}
</style>
