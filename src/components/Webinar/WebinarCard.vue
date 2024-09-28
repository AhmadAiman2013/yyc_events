<template>
  <v-container>
    <v-row v-for="n in 10" :key="n">
      <v-col v-for="n in 2" :key="n" cols="6">
        <v-card variant="tonal" min-height="200" :elevation="9">
          <v-card-item>
            <v-card-title>this is title</v-card-title>
            <v-card-subtitle>this is date</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            this is text
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>
