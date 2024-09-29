<template>
  <v-container>
    <v-row v-if="webinar">
      <v-col cols="12">
        <v-card variant="tonal" :elevation="9"
            style="min-height: 200px;" cover>
            <v-card-item>
              <v-card-title>
                  <h2 class="text-md-h6 text-wrap text-h6">{{ webinar.title }}</h2>
              </v-card-title>
              <v-card-subtitle>
                <p>{{ webinar.date }}</p>
              </v-card-subtitle>
            </v-card-item>
            <v-card-text class="text-black">
              <p>{{ webinar.description }}</p>
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-skeleton-loader height="200" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { APIResponse, EventType } from '@/types/WebinarSchema';
import { useQueryClient } from '@tanstack/vue-query';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const queryClient = useQueryClient()
const webinar = ref<EventType>()
const webinars = queryClient.getQueryData(['events']) as APIResponse

watchEffect(() => {
  const id = route.params.id as string;
  if (webinars.data) {
    webinar.value = webinars.data.find(w => w.id === id);
    console.log(webinar)
  }
})

</script>
