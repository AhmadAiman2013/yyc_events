<template>
  <v-container>
    <v-row >
      <v-col v-for="n in 20" :key="n" cols="6" class="mb-3" >
        <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
          <v-skeleton-loader :loading="isLoading" height="200">
            <v-responsive>
              <v-card :title="n" subtitle="date" text="description" variant="tonal" :elevation="9"
                style="min-height: 200px;" cover>
              </v-card>
            </v-responsive>
          </v-skeleton-loader>
        </v-lazy>
      </v-col>
    </v-row>

   
  </v-container>
</template>


<script setup lang="ts">
let isLoading = false
</script>
