<template>
  <v-container>

    <v-row class="d-none d-md-flex justify-space-between align-center mb-6" style="height: 50px;">
      <v-col cols="6" class="d-flex align-center">
        <v-text-field label="Filter by name" placeholder="Science, Law, Computer" v-model="filterName"></v-text-field>
        <v-btn @click="clearSearch" class="ml-2" aria-label="Clear search">Clear</v-btn>
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <v-label class="mr-2">Date</v-label>
        <v-btn-toggle v-model="sortOrder" dense>
          <v-btn value="asc" aria-label="Ascending Date">Asc</v-btn>
          <v-btn value="desc" aria-label="Descending date">Desc</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row class="d-md-none" >
      <v-col cols="12" class="d-flex align-center" style="height: 50px;" >
        <v-text-field label="Filter by name" placeholder="Science, Law, Computer" v-model="filterName"></v-text-field>
        <v-btn @click="clearSearch" class="ml-2" aria-label="Clear search">Clear</v-btn>
      </v-col>
    </v-row>

    <v-row class="d-md-none" >
      <v-col cols="12" class="d-flex  justify-center align-center" style="height: 50px;">
        <v-label class="mr-2" >Date</v-label>
        <v-btn-toggle v-model="sortOrder" dense>
          <v-btn value="asc" aria-label="Ascending Date">Asc</v-btn>
          <v-btn value="desc" aria-label="Descending date">Desc</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row v-if="paginatedItems.length !== 0">
      <v-col v-for="(item) in paginatedItems" :key="item.id" cols="12" md="6" class="mb-3">
        <v-lazy :min-height="200" :options="{ threshold: 0.5 }" transition="fade-transition">
          <v-hover
          v-slot="{ isHovering, props }"
          close-delay="200"
          >
            <v-card
              variant="tonal"
              :elevation="9"
              :style="{
                minHeight: '200px',
                backgroundColor: isHovering ? '#7E57C2' : 'inherit'
              }"
              cover
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="redirectToWebinar(item.id)"
            >
            <v-card-item>
              <v-card-title :style="{ color : isHovering ? '#EDE7F6' : 'inherit' }">
                <h2 class="text-md-h6 text-wrap text-h6">{{ item.title }}</h2>
              </v-card-title>
              <v-card-subtitle :style="{ color : isHovering ? '#EDE7F6' : 'inherit' }">
                <p>{{ item.date }}</p>
              </v-card-subtitle>
            </v-card-item>
            <v-card-text class="text-black">
              <p>{{ item.description }}</p>
            </v-card-text>
          </v-card>
        </v-hover>

        </v-lazy>
      </v-col>
    </v-row>

    <v-row v-else-if="paginatedItems.length == 0 && isPending">
      <v-col v-for="n in 4" :key="n" cols="12" md="6" class="mb-3" v-show="isPending">
        <v-skeleton-loader height="200" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-sheet min-height="200" class="d-flex justify-center align-center">
          No data available
        </v-sheet>
      </v-col>
    </v-row>

    <v-pagination v-show="!isPending && paginatedItems.length !== 0" aria-label="Pagination control for navigation system" class="mb-2"  v-model="currentPage" :length="totalPages" :total-visible="4"
      :size="paginationSize" @update:model-value="scrollToTop" />

  </v-container>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useDisplay } from 'vuetify';
import { EventType } from '@/types/WebinarSchema';
import { APIResponse } from '@/types/WebinarSchema';
import { useRouter } from 'vue-router';


const { name } = useDisplay();
const itemsPerPage = 10;
const currentPage = ref(1);
const sortOrder = ref('');
const filterName = ref('');
const router = useRouter()

const { data, isPending } = useQuery<APIResponse>({
  queryKey: ['events'],
  queryFn: async (): Promise<APIResponse> => {
    const response = await fetch('https://api.npoint.io/05e71abeb07fd4b175b0');
    const data: EventType[] = await response.json();
    return { data };
  },
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
});


const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedItems.value.length / itemsPerPage);
});

const paginationSize = computed(() => {
  return name.value === 'xs' || name.value === 'sm' ? '30px' : 'default';
});

const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const fullYear = year < 100 ? 2000 + year : year;
  return new Date(fullYear, month - 1, day);
};

const filteredAndSortedItems = computed(() => {
  let result = data.value?.data ?? []


  if (filterName.value) {
    result = result.filter(item =>
      item.title.toLowerCase().includes(filterName.value.toLowerCase())
    );
    currentPage.value = 1
  }


  if (sortOrder.value) {
    result.sort((a, b) => {
      const dateA = parseDateString(a.date);
      const dateB = parseDateString(b.date);
      return sortOrder.value === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    currentPage.value = 1
  }

  return result;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredAndSortedItems.value.slice(start, start + itemsPerPage);
});

const clearSearch = () => {
  filterName.value = '';
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const redirectToWebinar = (id : string) => {
  router.push({name: 'WebinarView', params:{ id }})
}
</script>


