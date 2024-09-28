<template>
  <v-container>
    <v-row class="d-flex justify-space-between align-center mb-6" style="height: 50px;">

      <v-col cols="6" class="d-flex align-center">
        <v-text-field label="Filter by name" placeholder="Science, Law, Computer" v-model="filterName"></v-text-field>
        <v-btn @click="clearSearch" class="ml-2">Clear</v-btn>
      </v-col>

      <v-col cols="auto" class="d-flex align-center">
        <v-label class="mr-2">Date</v-label>
        <v-btn-toggle v-model="sortOrder" dense>
          <v-btn value="asc">Asc</v-btn>
          <v-btn value="desc">Desc</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(item) in paginatedItems" :key="item.id" cols="12" md="6" class="mb-3">
        <v-lazy :min-height="200" :options="{ threshold: 0.5 }" transition="fade-transition">
          <v-card :title="item.title" :subtitle="item.date" :text="item.description" variant="tonal" :elevation="9"
            style="min-height: 200px;" cover>
          </v-card>
        </v-lazy>
      </v-col>
      <v-col v-for="n in 4" :key="n" cols="12" md="6" class="mb-3" v-show="isPending">
        <v-skeleton-loader height="200" />
      </v-col>
    </v-row>
    <v-pagination class="mb-2" v-show="!isPending" v-model="currentPage" :length="totalPages" :total-visible="4"
      :size="paginationSize" @update:model-value="scrollToTop" />
  </v-container>

</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useDisplay } from 'vuetify';

interface EventType {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface APIResponse {
  data?: EventType[];
  error?: string;
}

const fetchedItems = ref<EventType[]>([]);
const { name } = useDisplay();
const itemsPerPage = 10;
const currentPage = ref(1);
const sortOrder = ref('');
const filterName = ref('');

const { data, isPending } = useQuery<APIResponse>({
  queryKey: ['events'],
  queryFn: async (): Promise<APIResponse> => {
    const response = await fetch('https://api.npoint.io/05e71abeb07fd4b175b0');
    const data: EventType[] = await response.json();
    return { data };
  },
});

watch(data, (newData) => {
  fetchedItems.value = newData?.data ?? [];
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
  let result = [...fetchedItems.value];


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

</script>
