<template>
  <v-app>
    <v-main style="min-height: 300px;" class="text-deep-purple-lighten-1">
      <header class="d-flex justify-center pa-1 mt-3">
        <RouterLink to="/" >
          <h1 class="text-md-h3 text-h4 text-center">Webinar and Courses</h1>
        </RouterLink>
      </header>
      <RouterView />
    </v-main>
    <VueQueryDevtools />
  </v-app>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue';
import { useHead } from '@unhead/vue';
import logoImage from '@/assets/logo.jpg'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';


useHead({
  title: 'List of upcoming courses and Webinars',
  meta: [
    { name: 'description', content: 'Explore our upcoming courses and webinars to enhance your skills.' },
    { property: 'og:title', content: 'Upcoming Courses and Webinars' },
    { property: 'og:description', content: 'Join us for engaging courses and webinars.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: logoImage },
    { property: 'og:url', content: 'https://yourwebsite.com' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'language', content: 'en' },
    { name: 'robots', content: 'index, follow' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: 'Upcoming Courses and Webinars' },
    { property: 'twitter:description', content: 'Join us for engaging courses and webinars.' },
    { property: 'twitter:image', content: logoImage },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', sizes: '192x192', href: '/android-chrome-192x192.png' },
    { rel: 'icon', sizes: '512x512', href: '/android-chrome-512x512.png' },
  ],


})

useSeoMeta({
  title: 'Learn and Grow with Our Courses and Webinars',
  description: 'Stay ahead in your field with our expert-led courses and webinars. Join now!',
  ogDescription: 'We are a company that help you grow your skills through webinars and courses',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Learn and Grow with Our Courses and Webinars',
  twitterDescription: 'Explore our upcoming courses and webinars to enhance your skills.',
  twitterImage: logoImage,

});
</script>

<style>
a {
  color: inherit;
  text-decoration: none;
  outline: none;
}

a:active, a:focus, a:visited {
  color: inherit;         /* Inherit color for all states */
  text-decoration: none;  /* Keep no underline in any state */
  outline: none;          /* Ensure no outline shows on focus */
}
</style>
