<!-- src/components/AuditTrail.vue -->
<template>
  <section>
    <h2>Audit Trail</h2>
    <ul>
      <li v-for="(entry, index) in auditTrail" :key="index">
        <span v-if="entry.type === 'approval'">Approval: {{ entry.tx }}</span>
        <span v-else-if="entry.type === 'contributor'">Contributor: {{ entry.wallet }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useValidatorStore } from '../store/validator.js'
const store = useValidatorStore()
const auditTrail = store.auditTrail
</script>
