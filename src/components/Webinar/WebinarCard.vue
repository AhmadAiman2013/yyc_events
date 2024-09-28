<template>
  <v-container>
    <v-row >
      <v-col v-for="(item, index) in paginatedItems" :key="index" cols="6" class="mb-3" >
        <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
          <v-skeleton-loader :loading="isLoading" height="200">
            <v-responsive>
              <v-card :title="item" subtitle="date" text="description" variant="tonal" :elevation="9"
                style="min-height: 200px;" cover>
              </v-card>
            </v-responsive>
          </v-skeleton-loader>
        </v-lazy>
      </v-col>
    </v-row>

    <v-pagination
    v-model="currentPage"
    :length="totalPages"
    :total-visible="4"
    >
    </v-pagination>
  </v-container>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';

const items = ref(Array.from({length: 20}, (_, i) => `Item ${ i + 1}`))
const itemsPerpage = 10;
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(items.value.length / itemsPerpage)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerpage
  return items.value.slice(start, start + itemsPerpage)
})

let isLoading = false
</script>
