<template>
  <v-container >
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-label class="mr-2">Date</v-label>
        <v-btn-toggle v-model="sortOrder">
          <v-btn value="asc">Asc</v-btn>
          <v-btn value="desc">Desc</v-btn>
        </v-btn-toggle>
      </v-col>
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
        :size="paginationSize" @update:model-value="scrollToTop"/>
  </v-container>

</template>

<script setup lang="ts">
import { ref, computed, watch} from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useDisplay } from 'vuetify';

interface EventType {
  id: string
  title: string
  date: string
  description: string
}

interface APIResponse {
  data?: EventType[]
  error?: string
}

const { name } = useDisplay();
const queryClient = useQueryClient()
const itemsPerpage = 10;
const currentPage = ref(1);
const sortOrder = ref('')


const { data, isPending } = useQuery<APIResponse>({
  queryKey: ['events'],
  queryFn: async (): Promise<APIResponse> => {
    try {
      const response = await fetch('https://api.npoint.io/05e71abeb07fd4b175b0');
      if (!response.ok) {
        throw new Error('Network error');
      }
      const data: EventType[] = await response.json();
      return { data };
    } catch (err) {
      return ({ error: (err as Error).message });
    }
  },
});

const items = ref<EventType[]>([]);
watch(data, (newData) => {
  items.value = newData?.data ?? [];
});

watch(sortOrder, () => {
  currentPage.value = 1;
});


const totalPages = computed(() => {
  return Math.ceil(items.value.length / itemsPerpage);
});

const paginationSize = computed(() => {
  if (name.value === 'xs' || name.value === 'sm') {
    return '30px';
  } else {
    return 'default';
  }
});

const parseDateString = (dateString : string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const fullYear = year < 100 ? 2000 + year : year;
  return new Date(fullYear, month - 1, day);
};

const sortedItems = computed(() => {
  if (items.value.length === 0) return [];

  return [...items.value].sort((a, b) => {
    let dateA = parseDateString(a.date)
    let dateB = parseDateString(b.date)

    return sortOrder.value === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
  })
})

const filteredItems = computed(() => {

})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerpage;

  const currentItems = sortOrder.value ? sortedItems.value : items.value;

  return currentItems.slice(start, start + itemsPerpage) ?? [];
});

const scrollToTop = () => {
  queryClient.refetchQueries( {queryKey: ['events']})
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};


</script>
