<!-- src/components/SnapshotViewer.vue -->
<template>
  <section>
    <h2>Snapshot Viewer</h2>
    <p>Snapshot ID: {{ snapshotId }}</p>
    <h3>Contributors</h3>
    <ul>
      <li v-for="wallet in contributors" :key="wallet">{{ wallet }}</li>
    </ul>
  </section>
</template>

<script setup>
import { useValidatorStore } from '../store/validator.js'
const store = useValidatorStore()
const snapshotId = store.snapshotId
const contributors = store.contributors
</script>
