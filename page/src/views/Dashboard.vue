<!-- src/views/Dashboard.vue -->
<template>
  <main>
    <h1>Validator Dashboard</h1>
    <AuditTrail />
    <SnapshotViewer />
  </main>
</template>

<script setup>
import AuditTrail from '../components/AuditTrail.vue'
import SnapshotViewer from '../components/SnapshotViewer.vue'
</script>

<style>
main {
  padding: 2rem;
  font-family: Arial, sans-serif;
}
</style>
